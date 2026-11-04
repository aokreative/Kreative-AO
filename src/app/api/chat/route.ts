import { after } from "next/server";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/knowledge";
import { hasSupabase, supabaseAdmin } from "@/lib/supabase";
import { scoreLead } from "@/lib/score";
import { sendInternalAlert, sendVisitorAutoReply } from "@/lib/email";
import { GeminiError, generate, streamChat } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_TURNS = 24;

const bodySchema = z.object({
  visitorId: z.string().min(8).max(64),
  sessionId: z.string().uuid().nullish(),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(MAX_TURNS),
});

/**
 * Per-instance rate limit. This is a serverless function, so the map is per
 * warm instance rather than global — it is a speed bump against a single
 * abusive visitor, not a hard quota. A real quota belongs in Postgres or a
 * KV store; this is deliberately the cheap version until traffic justifies it.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 12;

function rateLimited(id: string) {
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const UNAVAILABLE =
  "The assistant can't answer right now. Please message us on WhatsApp or use the contact form.";

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json(
      { error: "The assistant isn't configured yet. Please use the contact form." },
      { status: 503 },
    );
  }
  let parsed;
  try {
    parsed = bodySchema.parse(await req.json());
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const { visitorId, messages } = parsed;
  if (rateLimited(visitorId)) {
    return Response.json(
      { error: "That's a lot of questions at once — give it a moment." },
      { status: 429 },
    );
  }
  if (!messages.some((m) => m.role === "user")) {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  let reply;
  try {
    reply = await streamChat(buildSystemPrompt(), messages);
  } catch (e) {
    const err = e as GeminiError;
    console.error("[chat] Gemini request failed", err.status, err.message, err.detail);
    return Response.json({ error: UNAVAILABLE }, { status: 502 });
  }

  // The full reply is collected while it streams, then saved after the
  // response has finished, so saving never slows the visitor down.
  let full = "";
  let finish: () => void = () => {};
  const finished = new Promise<void>((resolve) => (finish = resolve));
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const text of reply.chunks) {
          full += text;
          controller.enqueue(encoder.encode(text));
        }
        if (!full.trim()) controller.enqueue(encoder.encode(UNAVAILABLE));
      } catch (e) {
        console.error("[chat] stream failed", e);
        if (!full) controller.enqueue(encoder.encode(UNAVAILABLE));
      } finally {
        controller.close();
        finish();
      }
    },
  });

  after(async () => {
    await finished;
    if (!full.trim()) return;
    await persist(parsed, full).catch((e) => console.error("[chat] persist failed", e));
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Model": reply.model,
    },
  });
}

/**
 * Health check: GET /api/chat makes one tiny request and reports whether the
 * assistant can answer, and which model it is using. Cached for 10 minutes so
 * it can't be used to run up the bill.
 */
let health: { at: number; body: Record<string, unknown> } | null = null;

export async function GET() {
  if (health && Date.now() - health.at < 600_000) return Response.json(health.body);
  let body: Record<string, unknown>;
  try {
    const { model, text } = await generate("Reply with the single word OK.", "Are you working?");
    body = { ok: Boolean(text.trim()), model };
  } catch (e) {
    const err = e as GeminiError;
    body = { ok: false, status: err.status ?? 500, error: err.message };
  }
  health = { at: Date.now(), body };
  return Response.json(body, { headers: { "Cache-Control": "no-store" } });
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]{2,}/;

async function persist(
  parsed: z.infer<typeof bodySchema>,
  reply: string,
): Promise<void> {
  if (!hasSupabase()) return alertWithoutDatabase(parsed);
  const supabase = supabaseAdmin();
  const { visitorId, messages } = parsed;

  let sessionId = parsed.sessionId ?? null;
  if (!sessionId) {
    const { data } = await supabase
      .from("chat_sessions")
      .insert({ visitor_id: visitorId })
      .select("id")
      .single();
    sessionId = (data?.id as string) ?? null;
  }
  if (!sessionId) return;

  const last = messages[messages.length - 1];
  await supabase.from("chat_messages").insert([
    { session_id: sessionId, role: last.role, content: last.content },
    { session_id: sessionId, role: "assistant", content: reply },
  ]);

  // Lead capture is triggered by the visitor giving an email address, not by
  // the model deciding to call a tool. A deterministic trigger cannot be
  // talked out of firing, and cannot fire when it shouldn't.
  const transcript = messages.filter((m) => m.role === "user").map((m) => m.content);
  const email = transcript.join(" ").match(EMAIL_RE)?.[0];
  if (!email) return;

  const { data: existing } = await supabase
    .from("leads")
    .select("id")
    .eq("email", email)
    .limit(1);
  if (existing && existing.length > 0) return;

  const details = await extractLead(transcript.join("\n"), email);
  if (!details) return;

  const score = scoreLead({
    email,
    company: details.company,
    interest: details.interest,
    sourcePage: "/chat",
    fromChat: true,
  });

  const { data: lead } = await supabase
    .from("leads")
    .insert({
      name: details.name ?? "Website visitor",
      email,
      company: details.company ?? null,
      interest: details.interest ?? "other",
      message: details.summary,
      source: "chat",
      source_page: "/chat",
      score,
    })
    .select("id")
    .single();

  if (!lead) return;

  await supabase
    .from("chat_sessions")
    .update({ lead_id: lead.id, summary: details.summary })
    .eq("id", sessionId);

  const payload = {
    id: lead.id as string,
    name: details.name ?? "Website visitor",
    email,
    company: details.company,
    interest: details.interest,
    message: details.summary,
    sourcePage: "the assistant",
    score,
  };
  await Promise.allSettled([
    sendInternalAlert(payload),
    sendVisitorAutoReply(payload),
  ]);
}

/**
 * No database: email the team once, on the turn where the visitor first
 * gives an email address, so a chat lead still reaches someone.
 */
async function alertWithoutDatabase(parsed: z.infer<typeof bodySchema>) {
  const users = parsed.messages.filter((m) => m.role === "user").map((m) => m.content);
  const email = users.at(-1)?.match(EMAIL_RE)?.[0];
  if (!email || users.slice(0, -1).some((t) => t.includes(email))) return;
  const details = await extractLead(users.join("\n"), email);
  if (!details) return;
  const score = scoreLead({
    email,
    company: details.company,
    interest: details.interest,
    sourcePage: "/chat",
    fromChat: true,
  });
  const payload = {
    id: crypto.randomUUID(),
    name: details.name ?? "Website visitor",
    email,
    company: details.company,
    interest: details.interest,
    message: details.summary,
    sourcePage: "the assistant",
    score,
  };
  await Promise.allSettled([sendInternalAlert(payload), sendVisitorAutoReply(payload)]);
}

const INTERESTS = [
  "brand-strategy",
  "web-design",
  "content-social",
  "campaigns",
  "ads-growth",
  "ai-automation",
  "pos-erp",
  "duka-pos",
  "ams",
  "other",
] as const;

type LeadDetails = {
  name?: string;
  company?: string;
  interest?: string;
  summary: string;
};

/** One small structured call, only ever run once an email has been given. */
async function extractLead(
  conversation: string,
  email: string,
): Promise<LeadDetails | null> {
  if (!process.env.GEMINI_API_KEY) return null;

  const { text } = await generate(
    "Extract lead details from a website chat. Reply with JSON only, no prose. " +
      `Schema: {"name": string|null, "company": string|null, "interest": one of ${INTERESTS.join("|")}, "summary": string}. ` +
      "summary is one or two sentences describing what the visitor needs, written for the sales team. " +
      "Use null when a field was not actually stated — never guess a name from an email address.",
    `Visitor email: ${email}\n\nConversation:\n${conversation}`,
  );

  try {
    const json = JSON.parse(text.replace(/^```(?:json)?|```$/g, "").trim());
    const interest = INTERESTS.includes(json.interest) ? json.interest : "other";
    return {
      name: json.name ?? undefined,
      company: json.company ?? undefined,
      interest,
      summary: String(json.summary ?? "Enquiry via the website assistant."),
    };
  } catch {
    return { summary: "Enquiry via the website assistant.", interest: "other" };
  }
}

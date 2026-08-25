import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { buildSystemPrompt } from "@/lib/knowledge";
import { supabaseAdmin } from "@/lib/supabase";
import { scoreLead } from "@/lib/score";
import { sendInternalAlert, sendVisitorAutoReply } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";
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

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
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

  const anthropic = new Anthropic({ apiKey: key });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder();
      let full = "";
      try {
        const s = anthropic.messages.stream({
          model: MODEL,
          max_tokens: 700,
          system: buildSystemPrompt(),
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of s) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            full += event.delta.text;
            controller.enqueue(enc.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("[chat] stream failed", err);
        controller.enqueue(
          enc.encode(
            "\n\nSomething went wrong on my end. Email hello@aokreative.com and a human will pick it up.",
          ),
        );
      } finally {
        controller.close();
      }

      // Persistence and lead capture happen after the visitor has their
      // answer, so neither can slow down or break the reply.
      void persist(parsed, full).catch((e) =>
        console.error("[chat] persist failed", e),
      );
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]{2,}/;

async function persist(
  parsed: z.infer<typeof bodySchema>,
  reply: string,
): Promise<void> {
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
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const anthropic = new Anthropic({ apiKey: key });

  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 400,
    system:
      "Extract lead details from a website chat. Reply with JSON only, no prose. " +
      `Schema: {"name": string|null, "company": string|null, "interest": one of ${INTERESTS.join("|")}, "summary": string}. ` +
      "summary is one or two sentences describing what the visitor needs, written for the sales team. " +
      "Use null when a field was not actually stated — never guess a name from an email address.",
    messages: [
      {
        role: "user",
        content: `Visitor email: ${email}\n\nConversation:\n${conversation}`,
      },
    ],
  });

  const text = res.content
    .map((b) => (b.type === "text" ? b.text : ""))
    .join("")
    .trim();

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

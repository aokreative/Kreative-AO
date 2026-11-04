/**
 * Thin client for the Gemini REST API.
 *
 * Calls the API directly instead of through an SDK, so a new model name never
 * depends on an SDK upgrade. Models are tried in order: if Google retires one
 * (HTTP 404), the next is used. Set GEMINI_MODEL in Vercel to pin a model.
 * Current models: https://ai.google.dev/gemini-api/docs/deprecations
 */

const API = "https://generativelanguage.googleapis.com/v1beta/models";

export const GEMINI_MODELS = [
  process.env.GEMINI_MODEL,
  "gemini-3.8-flash",
  "gemini-3.6-flash",
  "gemini-2.5-flash",
].filter((m, i, all): m is string => Boolean(m) && all.indexOf(m) === i);

export type ChatTurn = { role: "user" | "assistant"; content: string };

type Part = { text?: string; thought?: boolean };
type Chunk = {
  candidates?: { content?: { parts?: Part[] } }[];
  promptFeedback?: { blockReason?: string };
};

export class GeminiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly detail: string,
  ) {
    super(message);
  }
}

function body(system: string, turns: ChatTurn[]) {
  // Gemini wants the conversation to open with the user, so a greeting the
  // website shows first is dropped here.
  const firstUser = turns.findIndex((t) => t.role === "user");
  const contents = turns.slice(Math.max(firstUser, 0)).map((t) => ({
    role: t.role === "assistant" ? "model" : "user",
    parts: [{ text: t.content }],
  }));
  return JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents,
    generationConfig: { temperature: 0.6 },
  });
}

/** POSTs to the first model that exists; returns the response and the model used. */
async function call(method: string, payload: string, query = "") {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new GeminiError("GEMINI_API_KEY is not set", 503, "");
  let last: GeminiError | null = null;
  for (const model of GEMINI_MODELS) {
    const res = await fetch(`${API}/${model}:${method}${query}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: payload,
    });
    if (res.ok) return { res, model };
    const detail = (await res.text()).slice(0, 400);
    last = new GeminiError(`Gemini ${model} returned ${res.status}`, res.status, detail);
    // Only a missing model moves on to the next one; anything else
    // (bad key, quota, safety) would fail the same way on every model.
    if (res.status !== 404) break;
  }
  throw last ?? new GeminiError("No Gemini model configured", 500, "");
}

const textOf = (c: Chunk) =>
  (c.candidates?.[0]?.content?.parts ?? [])
    .filter((p) => typeof p.text === "string" && !p.thought)
    .map((p) => p.text)
    .join("");

/** Streams the reply as plain text chunks. */
export async function streamChat(system: string, turns: ChatTurn[]) {
  const { res, model } = await call("streamGenerateContent", body(system, turns), "?alt=sse");
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  async function* chunks() {
    let buffer = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let cut: number;
      while ((cut = buffer.indexOf("\n")) >= 0) {
        const line = buffer.slice(0, cut).trim();
        buffer = buffer.slice(cut + 1);
        if (!line.startsWith("data:")) continue;
        try {
          const text = textOf(JSON.parse(line.slice(5)) as Chunk);
          if (text) yield text;
        } catch {
          // A partial or non-JSON line: skip it.
        }
      }
    }
  }
  return { model, chunks: chunks() };
}

/** One non-streaming reply. */
export async function generate(system: string, prompt: string) {
  const { res, model } = await call("generateContent", body(system, [{ role: "user", content: prompt }]));
  return { model, text: textOf((await res.json()) as Chunk) };
}

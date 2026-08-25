"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const OPENER: Msg = {
  role: "assistant",
  content:
    "Hi — I'm the A&O assistant. Tell me what you're trying to do and I'll tell you whether we can help, and roughly how we'd approach it.",
};

const PROMPTS = [
  "What do you actually do?",
  "How much does a website cost?",
  "Tell me about Duka POS",
];

function visitorId() {
  const KEY = "aok-visitor";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([OPENER]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const next = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: visitorId(),
          messages: next.slice(1).slice(-20),
        }),
      });

      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => null);
        setError(j?.error ?? "The assistant is unavailable right now.");
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setError("Connection dropped. Try again, or email hello@aokreative.com.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="aok-assistant"
        className="fixed bottom-5 right-5 z-[90] flex items-center gap-2.5 rounded-full bg-teal py-3.5 pl-4 pr-5 text-[14px] font-semibold text-parchment shadow-e1 transition-transform hover:-translate-y-0.5 dark:bg-parchment dark:text-teal-deep"
      >
        <span aria-hidden className="signal h-2.5 w-2.5 rounded-full" />
        {open ? "Close" : "Ask us anything"}
      </button>

      {open && (
        <div
          id="aok-assistant"
          ref={panelRef}
          role="dialog"
          aria-label="A&O Kreative assistant"
          className="fixed bottom-24 right-5 z-[90] flex max-h-[min(620px,calc(100vh-8rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-e1"
        >
          <header className="flex items-center gap-3 border-b border-line-soft px-5 py-4">
            <span aria-hidden className="signal h-8 w-1 rounded-full" />
            <div>
              <p className="text-[15px] font-semibold">A&amp;O Assistant</p>
              <p className="text-[12.5px] text-ink-3">
                Answers from our real work — not a sales script
              </p>
            </div>
          </header>

          <div
            ref={logRef}
            className="flex flex-1 flex-col gap-3.5 overflow-y-auto px-5 py-5"
            aria-live="polite"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-teal px-3.5 py-2.5 text-[14.5px] leading-relaxed text-parchment dark:bg-teal-mid"
                    : "max-w-[92%] whitespace-pre-wrap text-[14.5px] leading-relaxed text-ink-2"
                }
              >
                {m.content}
                {busy && i === messages.length - 1 && m.role === "assistant" && (
                  <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-accent align-middle" />
                )}
              </div>
            ))}

            {busy && messages[messages.length - 1]?.role === "user" && (
              <p className="text-[13px] text-ink-3">Thinking…</p>
            )}

            {error && (
              <p role="alert" className="text-[13.5px] text-accent-ink">
                {error}
              </p>
            )}

            {messages.length === 1 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {PROMPTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => send(p)}
                    className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2 border-t border-line-soft p-3"
          >
            <label htmlFor="aok-msg" className="sr-only">
              Message the assistant
            </label>
            <textarea
              id="aok-msg"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask about services, pricing or our work…"
              className="max-h-28 min-h-[42px] flex-1 resize-none rounded-[7px] border border-line bg-bg px-3 py-2.5 text-[14.5px] text-ink"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-[7px] bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent disabled:opacity-50"
            >
              Send
            </button>
          </form>

          <p className="border-t border-line-soft px-5 py-2.5 text-[11.5px] text-ink-3">
            AI assistant — it can be wrong. For anything that matters,{" "}
            <a href="/book" className="underline underline-offset-2">
              book a call
            </a>
            .
          </p>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useChat } from "ai/react";

type Msg = { id?: string; role: "user" | "assistant" | "system" | "data"; content: string };

const OPENER: Msg = {
  id: "opener",
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
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, append } = useChat({
    initialMessages: [OPENER as any],
    body: { visitorId: visitorId() },
  });

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    if (!text.trim() || isLoading) return;
    await append({ role: "user", content: text });
  }

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
      drag
      dragMomentum={false}
      style={{ touchAction: "none" }}
    >
      {open && (
        <div
          id="aok-assistant"
          ref={panelRef}
          role="dialog"
          aria-label="A&O Kreative assistant"
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute bottom-full right-0 mb-4 flex max-h-[min(620px,calc(100vh-8rem))] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-e1 cursor-default"
        >
          <header className="flex items-center gap-3 border-b border-line-soft px-5 py-4">
            <span aria-hidden className="signal h-8 w-1 rounded-full" />
            <div>
              <p className="text-[15px] font-semibold">A&amp;O AI Assistant</p>
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
                {isLoading && i === messages.length - 1 && m.role === "assistant" && (
                  <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-accent align-middle" />
                )}
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <p className="text-[13px] text-ink-3">Thinking…</p>
            )}

            {error && (
              <p role="alert" className="text-[13.5px] text-accent-ink">
                {error.message}
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
            onSubmit={handleSubmit}
            className="flex items-end gap-2 border-t border-line-soft p-3"
          >
            <label htmlFor="aok-msg" className="sr-only">
              Message the assistant
            </label>
            <textarea
              id="aok-msg"
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // We must construct a synthetic event for handleSubmit
                  const form = e.currentTarget.form;
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
              placeholder="Ask about services, pricing or our work…"
              className="max-h-28 min-h-[42px] flex-1 resize-none rounded-[7px] border border-line bg-bg px-3 py-2.5 text-[14.5px] text-ink"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="aok-assistant"
        className="glass flex items-center gap-2.5 rounded-full bg-teal py-3.5 pl-4 pr-5 text-[14px] font-semibold text-parchment shadow-e1 transition-transform hover:-translate-y-0.5 dark:bg-parchment dark:text-teal-deep cursor-grab active:cursor-grabbing"
      >
        <span aria-hidden className="signal h-2.5 w-2.5 rounded-full" />
        {open ? "Close" : "Chat with AI Assistant"}
      </button>
    </motion.div>
  );
}

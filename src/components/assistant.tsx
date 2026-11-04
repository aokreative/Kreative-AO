"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { SITE } from "@/lib/site";

type Msg = { id?: string; role: "user" | "assistant"; content: string };

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
  // On phones the launcher waits until the visitor scrolls, so it never
  // covers the first screen.
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 480) {
        setRevealed(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>([OPENER]);
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Sends the conversation to /api/chat and streams the reply into the
  // last message as it arrives (the route returns plain text).
  async function send(text: string) {
    const content = text.trim();
    if (!content || isLoading) return;
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setLoading(true);
    const setReply = (reply: string) =>
      setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: reply }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorId: visitorId(),
          messages: history
            .filter((m) => m.id !== "opener" && m.content.trim())
            .slice(-24)
            .map(({ role, content: c }) => ({ role, content: c })),
        }),
      });
      if (!res.ok || !res.body) {
        let msg = "The assistant can't answer right now.";
        try {
          msg = (await res.json()).error ?? msg;
        } catch {}
        throw new Error(msg);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
      if (!reply.trim()) throw new Error("The assistant can't answer right now.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      // Drop the empty reply bubble so the conversation can carry on.
      setMessages((m) => (m.at(-1)?.role === "assistant" && !m.at(-1)?.content ? m.slice(0, -1) : m));
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div 
      className={`fixed bottom-4 right-4 z-[100] flex flex-col items-end transition-opacity duration-300 sm:bottom-6 sm:right-6 sm:opacity-100 ${revealed || open ? "opacity-100" : "pointer-events-none opacity-0 sm:pointer-events-auto"}`}
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
            {messages.map((m, i) => !m.content ? null : (
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

            {isLoading && !messages.at(-1)?.content && (
              <p className="text-[13px] text-ink-3">Thinking…</p>
            )}

            {error && (
              <p role="alert" className="text-[13.5px] text-accent-ink">
                {error}{" "}
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
                  WhatsApp us
                </a>
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
      <div className="flex items-center gap-2">
        {!open && (
          <Link
            href="/book"
            onPointerDown={(e) => e.stopPropagation()}
            className="lg-navy flex h-11 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-semibold text-white"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="2" y="3" width="12" height="11" rx="2.5" />
              <path d="M2 6.5h12M5.5 1.8v2.4M10.5 1.8v2.4" strokeLinecap="round" />
            </svg>
            Book a call
          </Link>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="aok-assistant"
          className="lg flex h-11 cursor-grab items-center gap-2 rounded-full pl-3.5 pr-4 text-[13.5px] font-semibold text-ink active:cursor-grabbing"
        >
          <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />
          {open ? (
            "Close"
          ) : (
            <>
              <span className="sm:hidden">Ask us</span>
              <span className="hidden sm:inline">Ask our AI assistant</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";

/**
 * Opening title card. Shown once per browser session — an intro that replays
 * on every navigation stops being an intro and becomes an obstacle.
 *
 * It is deliberately skippable: any key, any click, any scroll, or 2.6s.
 * Nothing behind it depends on JavaScript, so a visitor who never sees this
 * loses nothing at all.
 */
const KEY = "aok-splash-seen";
const HOLD_MS = 2600;

export function Splash() {
  const [state, setState] = useState<"hidden" | "showing" | "leaving">("hidden");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* private mode or blocked storage — just show it */
    }

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (seen || reduced) return;

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    setState("showing");
    document.body.style.overflow = "hidden";

    const dismiss = () => setState("leaving");
    const t = setTimeout(dismiss, HOLD_MS);
    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("pointerdown", dismiss, { once: true });
    window.addEventListener("wheel", dismiss, { once: true, passive: true });

    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (state !== "leaving") return;
    const t = setTimeout(() => {
      setState("hidden");
      document.body.style.overflow = "";
    }, 700);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "hidden") return null;

  return (
    <div
      aria-hidden
      className={`skyline fixed inset-0 z-[200] grid place-items-center overflow-hidden transition-opacity duration-700 ${
        state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="skyline-veil" />
      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        <div className="animate-[splashUp_.9s_ease-out_both]">
          <Logo width={132} onDark priority />
        </div>
        <h1 className="animate-[splashUp_.9s_ease-out_.15s_both] font-display text-[clamp(38px,6vw,64px)] font-medium leading-none text-parchment">
          A&amp;O Kreative
        </h1>
        <p className="label animate-[splashUp_.9s_ease-out_.3s_both] text-orange-lift">
          Marketing · Branding · AI — Nairobi
        </p>
      </div>
    </div>
  );
}

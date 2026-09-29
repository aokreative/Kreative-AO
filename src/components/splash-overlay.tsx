"use client";

import { useEffect } from "react";

export function SplashOverlay() {
  useEffect(() => {
    const el = document.documentElement;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.setAttribute("data-splash", "skip");
    }
    
    if (el.getAttribute("data-splash") === "skip") {
      return;
    }

    const dismiss = () => {
      if (el.getAttribute("data-splash") === "done" || el.getAttribute("data-splash") === "skip") return;
      el.setAttribute("data-splash", "done");
      try {
        sessionStorage.setItem("ao-splash", "1");
      } catch {
        // ignore
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
    };

    const t = setTimeout(dismiss, 1900);
    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("pointerdown", dismiss, { once: true });
    window.addEventListener("wheel", dismiss, { once: true, passive: true });

    return () => {
      clearTimeout(t);
      cleanup();
    };
  }, []);

  return (
    <div
      id="splash"
      aria-hidden
      className="fixed inset-0 z-[10000] bg-navy flex flex-col items-center justify-center gap-6 transition-[opacity,visibility] duration-[900ms] ease-spring [.splash-done_&]:opacity-0 [.splash-done_&]:invisible [.splash-done_&]:pointer-events-none"
    >
      <div className="font-display text-[28px] text-cream tracking-[-0.02em] opacity-0 animate-[splashFadeIn_0.6s_0.3s_forwards]">
        A<span className="text-gold">&amp;</span>O Kreative
      </div>
      <div className="w-[130px] h-[1px] bg-[rgba(200,160,90,.18)] relative overflow-hidden opacity-0 animate-[splashFadeIn_0.4s_0.5s_forwards] after:content-[''] after:absolute after:left-[-100%] after:top-0 after:bottom-0 after:w-full after:bg-[linear-gradient(90deg,transparent,var(--color-gold),transparent)] after:animate-[splashScan_1.3s_0.7s_ease-in-out_infinite]" />
    </div>
  );
}

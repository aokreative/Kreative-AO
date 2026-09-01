"use client";

import { useEffect } from "react";
import { Logo } from "./logo";
import { Ridges } from "./graphics/ridges";

/**
 * Opening title card.
 * Markup ships in the server-rendered HTML from layout.tsx, id="splash", always present.
 * A blocking inline script in <head> sets document.documentElement.dataset.splash = 'skip' before first paint if seen.
 * CSS keyframes drive the entire sequence. It runs correctly before React hydrates.
 */
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

    const t = setTimeout(dismiss, 2800);
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
      className="skyline fixed inset-0 z-[200] grid place-items-center overflow-hidden animate-[splash-out_700ms_forwards_2100ms]"
    >
      {/* 0.00s .skyline ground, already painted. Grain overlay at 6%. */}
      <div className="skyline-veil" />
      <div className="absolute inset-0 bg-white/[0.06] opacity-100" style={{ mixBlendMode: 'overlay' }}></div>
      
      <div className="relative flex flex-col items-center gap-6 px-6 text-center mt-32">
        {/* 0.05s Ridges draw. 20 concentric fingerprint paths, 40ms stagger, 1.0s total, --color-orange-lift */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-lift">
          <Ridges size={600} draw={true} />
        </div>
        
        {/* 0.85s Logo mark rises 16px into the ridge centre, 600ms. */}
        <div className="animate-[splashLogoUp_600ms_cubic-bezier(.22,1,.36,1)_850ms_both]">
          <Logo width={132} onDark priority />
        </div>
        
        {/* 1.25s A&O KREATIVE wordmark, letters staggered 25ms. */}
        <h1 className="font-display text-[clamp(38px,6vw,64px)] font-medium leading-none text-parchment flex gap-[2px]">
          {"A&O KREATIVE".split("").map((char, i) => (
            <span 
              key={i} 
              className="animate-[splashFadeUp_400ms_cubic-bezier(.22,1,.36,1)_both]" 
              style={{ animationDelay: `${1250 + i * 25}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        
        {/* 1.55s Mono line beneath */}
        <p className="label text-orange-lift animate-[splashFadeUp_400ms_cubic-bezier(.22,1,.36,1)_1550ms_both]">
          MARKETING · BRANDING · AI — NAIROBI
        </p>
      </div>
    </div>
  );
}

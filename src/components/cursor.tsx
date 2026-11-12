"use client";

import { useEffect, useRef } from "react";

/**
 * Round follower cursor: a small dot that tracks the pointer exactly and a
 * larger ring that trails it with easing and swells over links and buttons.
 * Desktop only — it mounts a class that hides the native arrow, but only on
 * devices with a fine pointer that can hover, and never when the visitor
 * prefers reduced motion. Touch devices keep their normal behaviour.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let shown = false;

    const reveal = () => {
      if (shown) return;
      shown = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      reveal();
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: Event) => {
      const el = e.target as Element | null;
      const hit = el?.closest?.("a, button, [role='button'], [data-cursor]") as Element | null;
      if (hit) {
        ring.classList.add("is-grow");
        label.textContent = hit.getAttribute("data-cursor") || "";
      } else {
        ring.classList.remove("is-grow");
        label.textContent = "";
      }
    };

    const onEnter = () => reveal();
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerenter", onEnter);
    document.addEventListener("pointerleave", onLeave);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerenter", onEnter);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Watches sections marked data-tone="cream|sand|mist|white" and sets the
   tone of whichever one holds the middle of the screen on <html>. The
   fixed .ambient layer eases its tint and light to match. */
export function BackdropTone() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-tone]"));
    if (!els.length) {
      root.dataset.tone = "white";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) root.dataset.tone = (e.target as HTMLElement).dataset.tone;
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

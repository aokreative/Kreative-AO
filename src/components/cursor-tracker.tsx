"use client";

import { useEffect, useRef } from "react";

export function CursorTracker() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if device is touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const animC = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      rafId = requestAnimationFrame(animC);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest('a, button, [data-cursor], .svc-card, .pc, .wk-item, .ai-card, .uc-card, .post-c, .blog-feat, .tc, .cob-card');
      document.body.classList.toggle('cx', !!t);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    rafId = requestAnimationFrame(animC);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('cx');
    };
  }, []);

  return (
    <>
      <div 
        id="cdot" 
        ref={dotRef} 
        className="fixed top-0 left-0 z-[9999] w-2 h-2 bg-accent rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply hidden md:block" 
      />
      <div 
        id="cring" 
        ref={ringRef} 
        className="fixed top-0 left-0 z-[9998] w-10 h-10 border-[1.5px] border-accent rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-60 transition-[width,height,opacity] duration-[180ms] ease-spring hidden md:block [.cx_&]:w-16 [.cx_&]:h-16 [.cx_&]:opacity-95" 
      />
    </>
  );
}

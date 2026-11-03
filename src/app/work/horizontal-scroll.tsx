"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { CASE_STUDIES } from "@/content/case-studies";
import { Frame } from "@/components/frame";

export function HorizontalScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Total 5 items. The container will be roughly 500vw total if each is 100vw, but 
  // they overlap or sit next to each other. Let's make each item about 80vw.
  // We need to move from 0 to -100% of the scrollable track width.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]); // roughly -80% if there are 5 items, allowing the last one to be fully visible.

  return (
    <section ref={targetRef} data-tone="white" className="relative lg:h-[400vh]">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[calc(100vh-68px)] lg:flex-col lg:justify-center lg:overflow-hidden py-16 lg:py-0">
        
        {/* Desktop uses motion.div for translation */}
        <motion.div 
          style={{ x }} 
          className="hidden lg:flex gap-12 px-[10vw] min-w-max"
        >
          {CASE_STUDIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group relative flex h-[600px] w-[70vw] max-w-[900px] flex-col overflow-hidden rounded-[32px] border border-white/70 shadow-[0_30px_60px_-30px_rgba(19,35,58,0.45)]"
            >
              <div className="absolute inset-0">
                <Frame 
                  src={`/brand/work/${c.slug}.jpg`} 
                  alt={c.client}
                  className="w-full h-full transition-all duration-500 group-hover:scale-[1.02]" 
                />
              </div>
              <div className="lg-dark absolute bottom-6 left-6 right-6 grid grid-cols-[1fr_auto] items-end gap-12 rounded-[24px] bg-midnight/65 p-8 text-white">
                <div className="flex flex-col gap-3">
                  <span className="text-[13px] font-medium text-white/75">
                    0{i + 1} · {c.category} · {c.tags} · {c.year}
                  </span>
                  <h2 className="text-[32px] leading-tight text-white">{c.client}</h2>
                  <p className="text-[17px] text-white/80 max-w-[40ch]">{c.headline}</p>
                </div>
                <dl className="flex gap-8 border-l border-white/10 pl-8">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <dt className="tnum font-display text-[28px] leading-none text-white">
                        {m.value}
                      </dt>
                      <dd className="mt-2 text-[13.5px] leading-snug text-white/70">
                        {m.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          ))}
        </motion.div>
        
        {/* Mobile uses standard snap scrolling */}
        <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-8 no-scrollbar">
          {CASE_STUDIES.map((c, i) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group relative flex h-[500px] min-w-[85vw] snap-center flex-col overflow-hidden rounded-[28px] border border-white/70 shadow-[0_24px_48px_-28px_rgba(19,35,58,0.45)]"
            >
              <div className="absolute inset-0">
                <Frame 
                  src={`/brand/work/${c.slug}.jpg`} 
                  alt={c.client}
                  className="w-full h-full transition-all duration-500 group-hover:scale-[1.02]" 
                />
              </div>
              <div className="lg-dark absolute bottom-3 left-3 right-3 flex flex-col gap-2 rounded-[22px] bg-midnight/70 p-5 text-white">
                <span className="text-[13px] font-medium text-white/75">
                  0{i + 1} · {c.category}
                </span>
                <h2 className="text-[24px] leading-tight text-white">{c.client}</h2>
                <p className="text-[15px] text-white/80 line-clamp-2">{c.headline}</p>
                <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mt-2">
                  {c.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <dt className="tnum font-display text-[20px] leading-none text-white">
                        {m.value}
                      </dt>
                      <dd className="mt-1.5 text-[12px] leading-snug text-white/70">
                        {m.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop Progress Rail */}
        <div className="hidden lg:flex w-[80vw] mx-auto mt-12 items-center justify-between text-[13px] text-ink-3">
          <span>01</span>
          <div className="mx-4 h-[2px] flex-1 bg-line-soft overflow-hidden rounded-full relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-ink" 
              style={{ width: "100%", scaleX: scrollYProgress, transformOrigin: "left" }} 
            />
          </div>
          <span>0{CASE_STUDIES.length}</span>
        </div>

      </div>
    </section>
  );
}

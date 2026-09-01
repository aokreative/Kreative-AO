"use client";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { Section, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/frame";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Fade out sticky heading as section ends
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  return (
    <Section>
      <div ref={containerRef} className="grid lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-4 h-full">
          <motion.div 
            style={{ opacity }}
            className="lg:sticky lg:top-[calc(var(--nav-h)+40px)]"
          >
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Everything your brand needs to grow
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] text-ink-2">
              Seven things, done properly. Pick one or let us handle the lot —
              most clients start with whatever&apos;s hurting most right now.
            </p>
          </Reveal>
        </motion.div>
      </div>

      <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => {
            const isLarge = i === 0 || i === 3;
            const imgSrc = `/brand/services/${s.slug}.jpg`;
            return (
              <Reveal key={s.slug} delay={i * 0.1}>
                <Link
                  href={`/services/${s.slug}`}
                  className={`glass group relative overflow-hidden flex flex-col rounded-xl border border-line bg-surface shadow-e1 transition-all hover:border-ink-3 hover:shadow-lg ${
                    i === 0 ? "sm:col-span-2" :
                    i === 3 ? "sm:col-span-2" :
                    i === 6 ? "sm:col-span-2 md:flex-row items-stretch" : ""
                  } h-full`}
                >
                  <div className={`shrink-0 ${i === 6 ? "md:w-[40%] md:border-r md:border-b-0" : ""} border-b border-line`}>
                    <Frame src={imgSrc} alt={s.name} className="w-full h-full" />
                  </div>
                  <div className="flex flex-col gap-4 p-7 sm:p-8 flex-grow">
                    <div className="flex flex-col gap-2">
                      <h3 className={`${isLarge || i === 6 ? "text-[26px]" : "text-[21px]"} leading-tight`}>{s.name}</h3>
                      <p className={`text-[14.5px] leading-relaxed text-ink-2 ${isLarge ? "max-w-[42ch]" : ""}`}>
                        {s.summary}
                      </p>
                    </div>
                    <span className="mt-auto pt-2 text-[13.5px] font-semibold text-accent-ink group-hover:underline">
                      {s.kicker} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

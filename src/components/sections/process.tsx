"use client";
import { PROCESS } from "@/content/services";
import { Section, Eyebrow, Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <Section className="border-t border-line-soft bg-surface-2 overflow-hidden">
      <div className="max-w-[56ch]">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Simple, and no surprises
          </h2>
        </Reveal>
      </div>
      
      <div ref={ref} className="relative mt-16 min-h-[200vh]">
        <div className="sticky top-[20vh]">
          {/* Ridge-arc progress line */}
          <div className="absolute top-8 left-0 right-0 h-1 hidden lg:block overflow-hidden">
             <div className="h-full bg-line-soft w-full absolute rounded-full" />
             <motion.div 
               className="h-full bg-accent absolute rounded-full" 
               style={{ width: "100%", scaleX: scrollYProgress, transformOrigin: "left" }} 
             />
          </div>
          
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {PROCESS.map((p, i) => {
              // Highlight steps dynamically based on scroll progress
              const stepStart = i / PROCESS.length;
              const stepEnd = (i + 1) / PROCESS.length;
              
              return (
                <li key={p.step} className="flex flex-col gap-3 relative pt-4 lg:pt-12">
                  <Reveal delay={0.1 * i}>
                    <div className="hidden lg:block absolute top-0 left-0 w-3 h-3 rounded-full bg-surface border-2 border-accent transform -translate-y-[10px]" />
                    <span className="label tnum text-accent-ink">{p.step}</span>
                    <h3 className="text-[20px] leading-tight">{p.title}</h3>
                    <p className="text-[14.5px] leading-relaxed text-ink-2">
                      {p.body}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}

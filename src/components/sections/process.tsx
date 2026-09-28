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
    <Section className="overflow-x-clip relative border-t border-white/[0.06]">
      <div className="max-w-[56ch]">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1] text-white">
            Simple, and no surprises
          </h2>
        </Reveal>
      </div>
      
      <div ref={ref} className="relative mt-16 min-h-[120vh]">
        <div className="sticky top-[15vh]">
          {/* Progress line */}
          <div className="absolute top-8 left-0 right-0 h-px hidden lg:block overflow-hidden">
             <div className="h-full bg-white/[0.08] w-full absolute" />
             <motion.div 
               className="h-full bg-[#0070F3] absolute" 
               style={{ width: "100%", scaleX: scrollYProgress, transformOrigin: "left" }} 
             />
          </div>
          
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10 pt-8 lg:pt-0">
            {PROCESS.map((p, i) => {
              // Highlight steps dynamically based on scroll progress
              const stepStart = i / PROCESS.length;
              const stepEnd = (i + 1) / PROCESS.length;
              
              return (
                <li key={p.step} className="relative pt-4 lg:pt-14">
                  <Reveal delay={0.1 * i}>
                    <div className="hidden lg:block absolute top-0 left-0 w-3 h-3 rounded-full bg-[#09090b] border-2 border-[#0070F3] transform -translate-y-[6px]" />
                    <div className="flex flex-col gap-3 p-6 rounded-xl bg-[#12121a] border border-white/[0.08] transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                      <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#0070F3]">{p.step}</span>
                      <h3 className="text-[20px] leading-tight text-white">{p.title}</h3>
                      <p className="text-[14.5px] leading-relaxed text-white/70">
                        {p.body}
                      </p>
                    </div>
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

"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import { HEADLINE_STATS } from "@/content/case-studies";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/frame";
import Image from "next/image";
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <section ref={ref} className="relative w-full min-h-[70vh] flex items-center overflow-hidden bg-[#0D1B35]">
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0 bg-[#0D1B35]">
        <Image src="/brand/hero.jpg" fill priority className="object-cover object-center opacity-40 mix-blend-luminosity" alt="Workspace" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B35] via-[#0D1B35]/60 to-transparent" />
      </div>

      {/* 3. THE TEXT CONTENT LAYER */}
      <div className="relative z-20 w-full container mx-auto px-6 grid lg:grid-cols-12 gap-8 pt-24 pb-4">
        <div className="col-span-12 lg:col-span-7 text-[#F5F0E6] text-left flex flex-col items-start">
          <Reveal>
                <div className="inline-flex items-center rounded-full border border-[#C8A05A]/20 bg-[#C8A05A]/5 px-4 py-1.5 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C8A05A]">Marketing · Branding · AI — Nairobi</span>
                </div>
              </Reveal>
              
              <motion.div style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: "left center" }}>
                <Reveal delay={0.1}>
                  <h1 className="mt-5 max-w-[20ch] text-[clamp(44px,7.5vw,96px)] font-medium leading-[1.05] text-[#F5F0E6] drop-shadow-2xl">
                    We build the software, and we bring you the{" "}
                    <span className="text-[#C8A05A]">customers</span>.
                  </h1>
                </Reveal>
              </motion.div>
              
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-[56ch] text-[19px] leading-relaxed text-[#F5F0E6]/90 drop-shadow-md">
                  Most agencies sell you activity — posts, reach, impressions. We care
                  about one thing: did it actually grow your business? Every project
                  starts with that question and ends with the numbers to answer it.
                </p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap justify-start gap-4">
                  <Button href="/book" className="!px-8 !py-4 text-lg bg-[#C8A05A] text-[#0D1B35] hover:bg-[#0D1B35] hover:text-[#F5F0E6] transition-colors rounded-full border-0 font-medium">
                    Book a call
                  </Button>
                  <Button
                    href="/work"
                    className="!px-8 !py-4 text-lg bg-transparent text-[#F5F0E6] border border-[#F5F0E6]/20 hover:border-[#F5F0E6]/40 hover:bg-[#F5F0E6]/10 transition-colors rounded-full font-medium"
                  >
                    See our work
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Stat Card */}
            <div className="col-span-12 lg:col-span-5 self-end pb-0">
              <Reveal delay={0.4}>
                <div className="flex w-full flex-col items-center justify-center rounded-2xl p-6 shadow-2xl bg-[#0D1B35] border border-[#C8A05A]/15">
                  <span className="tnum font-display text-[48px] leading-none text-[#F5F0E6] drop-shadow-lg">
                    {HEADLINE_STATS[0].value}
                  </span>
                  <span className="mt-2 text-[14px] leading-snug text-[#F5F0E6]/60 uppercase tracking-widest text-center">
                    {HEADLINE_STATS[0].label}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
    </section>
  );
}

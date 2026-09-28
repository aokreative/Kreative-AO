"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative w-full min-h-[100vh] lg:min-h-[80vh] flex items-end lg:items-center overflow-hidden">
      {/* 1. BACKGROUND IMAGE — sharp, visible, no heavy filters */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/hero.jpg"
          fill
          priority
          className="object-cover object-[70%_center]"
          alt="Workspace"
          style={{ filter: "url(#grade-hero) contrast(1.08) saturate(1.05)" }}
        />
        {/* Bottom fade to transition into next section */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none bg-gradient-to-t from-[#09090b] to-transparent" />
      </div>

      {/* Localized text scrim — left side only */}
      <div className="absolute inset-y-0 left-0 w-[55%] pointer-events-none z-10 bg-gradient-to-r from-[#09090b]/90 via-[#09090b]/60 to-transparent" />

      {/* Subtle glow */}
      <div className="hero-glow z-10" />

      {/* 2. TEXT CONTENT */}
      <div className="relative z-20 w-full container mx-auto px-6 pb-16 pt-32 lg:py-0">
        <div className="w-full lg:w-[46%] text-white text-left flex flex-col items-start">
          <Reveal>
            <div className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-white/60">Marketing · Branding · AI — Nairobi</span>
            </div>
          </Reveal>

          <motion.div style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: "left center" }}>
            <Reveal delay={0.1}>
              <h1 className="mt-2 text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
                We build the software, and we bring you the{" "}
                <span className="text-gradient-brand">customers</span>.
              </h1>
            </Reveal>
          </motion.div>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[46ch] text-[19px] leading-relaxed text-white/75" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
              Most agencies sell you activity — posts, reach, impressions. We care
              about one thing: did it actually grow your business? Every project
              starts with that question and ends with the numbers to answer it.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap justify-start gap-4">
              <Button href="/book" className="!px-8 !py-4 text-lg font-medium text-white bg-[#0070F3] hover:bg-[#0060D0] rounded-lg transition-colors border-0 shadow-[0_0_20px_rgba(0,112,243,0.25)]">
                Book a call
              </Button>
              <Button
                href="/work"
                className="!px-8 !py-4 text-lg font-medium text-white/90 hover:text-white bg-white/[0.06] hover:bg-white/[0.10] rounded-lg transition-colors border border-white/[0.08] hover:border-white/[0.14]"
              >
                See our work
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Stat Card */}
        <div className="mt-16 lg:mt-0 lg:absolute lg:bottom-12 lg:right-12 z-20">
          <Reveal delay={0.4}>
            <div className="flex flex-col items-center justify-center rounded-xl p-6 bg-[#12121a] border border-white/[0.08] w-64 text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <span className="tnum font-display text-[48px] leading-none text-white font-bold">
                46+
              </span>
              <span className="mt-2 text-[14px] leading-snug uppercase tracking-widest text-white/50">
                Brands helped grow across East Africa
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

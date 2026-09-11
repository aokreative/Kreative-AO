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
    <section ref={ref} className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
      {/* 1. BACKGROUND IMAGE LAYER */}
      <div className="absolute inset-0 z-0">
        <Image src="/brand/hero.jpg" fill priority className="object-cover object-center" alt="Workspace" />
      </div>
      
      {/* 2. THE DARK VEIL LAYER (HARDCODED) */}
      <div className="header-veil-dark"></div>

      {/* 3. THE TEXT CONTENT LAYER */}
      <div className="relative z-20 w-full container mx-auto px-6 grid lg:grid-cols-12 gap-8 pt-24 pb-4">
        <div className="col-span-12 lg:col-span-7 text-[#F3F0E6] text-left flex flex-col items-start">
          <Reveal>
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-teal-soft">Marketing · Branding · AI — Nairobi</span>
                </div>
              </Reveal>
              
              <motion.div style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: "left center" }}>
                <Reveal delay={0.1}>
                  <h1 className="mt-5 max-w-[20ch] text-[clamp(44px,7.5vw,96px)] font-medium leading-[1.05] text-parchment drop-shadow-2xl">
                    We build the software, and we bring you the{" "}
                    <span className="signal-text bg-clip-text text-transparent bg-gradient-to-r from-orange-lift to-parchment">customers</span>.
                  </h1>
                </Reveal>
              </motion.div>
              
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-[56ch] text-[19px] leading-relaxed text-teal-soft/90 drop-shadow-md">
                  Most agencies sell you activity — posts, reach, impressions. We care
                  about one thing: did it actually grow your business? Every project
                  starts with that question and ends with the numbers to answer it.
                </p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap justify-start gap-4">
                  <Button href="/book" variant="accent" className="!px-8 !py-4 text-lg">
                    Book a call
                  </Button>
                  <Button
                    href="/work"
                    variant="ghost"
                    className="!border-white/20 !bg-white/5 !text-parchment hover:!bg-white/10 !px-8 !py-4 text-lg"
                  >
                    See our work
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Stat Card */}
            <div className="col-span-12 lg:col-span-5 self-end pb-0">
              <Reveal delay={0.4}>
                <div className="glass flex w-full flex-col items-center justify-center rounded-2xl p-6 shadow-2xl">
                  <span className="tnum font-display text-[48px] leading-none text-parchment drop-shadow-lg">
                    {HEADLINE_STATS[0].value}
                  </span>
                  <span className="mt-2 text-[14px] leading-snug text-teal-soft uppercase tracking-widest text-center">
                    {HEADLINE_STATS[0].label}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
    </section>
  );
}

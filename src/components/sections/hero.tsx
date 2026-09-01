"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import { HEADLINE_STATS } from "@/content/case-studies";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/frame";

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
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-teal-deep text-parchment flex flex-col items-center justify-center pt-[var(--nav-h)]">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 h-full w-full">
          <motion.div style={{ y: photoY, height: "115%" }} className="relative w-full">
            <Frame
              src="/brand/hero.jpg"
              alt="Workspace"
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Overlay Veil */}
        <motion.div 
          style={{ opacity: veilOpacity }} 
          className="absolute inset-0 z-0 bg-teal-deep/70 pointer-events-none mix-blend-multiply" 
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-teal-deep via-transparent to-teal-deep/50 pointer-events-none" />

        <Container className="relative z-10 flex h-full w-full flex-col items-center justify-center text-center pb-24 pt-12">
          <Reveal>
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-soft">Marketing · Branding · AI — Nairobi</span>
            </div>
          </Reveal>
          
          <motion.div style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: "center center" }}>
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
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/book" variant="accent" className="!px-8 !py-4 text-lg">
                Book a call
              </Button>
              <Button
                href="/work"
                variant="ghost"
                className="!border-white/20 !bg-white/5 !text-parchment hover:!bg-white/10 !px-8 !py-4 text-lg backdrop-blur-sm"
              >
                See our work
              </Button>
            </div>
          </Reveal>

          {/* Stat card — positioned cleanly at the bottom */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-full max-w-sm px-6">
            <Reveal delay={0.4}>
              <div className="glass flex w-full flex-col items-center justify-center rounded-2xl border border-white/10 p-6 shadow-2xl bg-white/5 backdrop-blur-xl">
                <span className="tnum font-display text-[48px] leading-none text-parchment drop-shadow-lg">
                  {HEADLINE_STATS[0].value}
                </span>
                <span className="mt-2 text-[14px] leading-snug text-teal-soft uppercase tracking-widest text-center">
                  {HEADLINE_STATS[0].label}
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

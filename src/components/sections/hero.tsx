"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

import Image from "next/image";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section 
      ref={ref} 
      className="relative w-full min-h-[100vh] flex items-end pb-[13vh] pt-32 overflow-hidden bg-navy"
    >
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 bg-navy">
        <Image
          src="/brand/hero.jpg"
          fill
          priority
          className="object-cover object-[70%_center] opacity-50 mix-blend-luminosity"
          alt="Workspace"
        />
        {/* Dark gradient overlay so the light text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent w-[65%]" />
      </div>
      
      {/* Animated blob */}
      <motion.div 
        animate={{ 
          borderRadius: ["60% 40% 55% 45%/50% 55% 45% 50%", "45% 55% 42% 58%/55% 45% 58% 42%", "55% 45% 60% 40%/42% 58% 45% 55%", "60% 40% 55% 45%/50% 55% 45% 50%"],
          y: [0, -18, 10, 0]
        }}
        transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-[6%] right-0 w-[58vw] max-w-[860px] h-[82vh] pointer-events-none z-0 mix-blend-screen opacity-60"
        style={{
          background: "radial-gradient(ellipse at 45% 45%, rgba(200,160,90,.12) 0%, rgba(13,27,53,.06) 50%, transparent 70%)"
        }}
      />

      <div className="relative z-20 w-full container mx-auto px-6 max-w-[880px] ml-[7vw]">
        <motion.div style={{ y: yTransform, opacity: opacityTransform }}>
          <Reveal>
            <p className="text-[11px] font-normal tracking-[0.14em] uppercase text-gold mb-6">
              Digital Marketing & Creative Strategy — Nairobi, Kenya
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(58px,9.5vw,130px)] font-normal leading-[0.91] tracking-[-0.03em] text-cream mb-8">
              <span className="block overflow-hidden"><span className="inline-block">Strategy that</span></span>
              <span className="block overflow-hidden"><span className="inline-block text-gold">moves culture.</span></span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-[16px] font-light leading-[1.75] text-cream/70 max-w-[400px]">
              A&O Kreative is a creative strategy and digital marketing partner for brands ready to own their next chapter.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex items-center gap-6 flex-wrap">
              <Button href="/work" variant="accent">
                See our work
              </Button>
              <Button href="/services" variant="ghost" className="!border-cream/35 !text-cream hover:!bg-gold hover:!text-navy hover:!border-gold">
                Explore services
              </Button>
            </div>
          </Reveal>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <Reveal delay={0.5}>
        <div className="absolute bottom-11 right-[7vw] flex flex-col items-center gap-2.5 z-20">
          <motion.div 
            animate={{ scaleY: [1, 0.2], y: [0, 28], opacity: [1, 0] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            className="w-px h-14 origin-top"
            style={{ background: "linear-gradient(to bottom, var(--color-gold), transparent)" }}
          />
          <span className="text-[10px] tracking-[0.14em] uppercase text-cream/30 [writing-mode:vertical-rl]">
            Scroll
          </span>
        </div>
      </Reveal>
    </section>
  );
}

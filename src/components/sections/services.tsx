"use client";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { Section, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

function BentoCard({ s, i, isLarge }: { s: any; i: number; isLarge: boolean }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className={`group flex flex-col rounded-xl bg-navy-mid border border-gold/15 overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 ${
        i === 0 ? "sm:col-span-2" :
        i === 3 ? "sm:col-span-2" :
        i === 6 ? "sm:col-span-2" : ""
      }`}
    >
      {/* Image Zone */}
      <div className={`relative w-full shrink-0 overflow-hidden ${isLarge || i === 6 ? "aspect-video" : "aspect-[16/10]"}`}>
        <Image
          src={s.image}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          alt={s.name}
          sizes={isLarge || i === 6 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
      </div>

      {/* Text Zone */}
      <div className="flex flex-col gap-3 p-6 sm:p-7 flex-grow">
        <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-gold">{s.kicker}</span>
        <h3 className={`${isLarge || i === 6 ? "text-[26px]" : "text-[21px]"} font-normal text-cream leading-tight`}>
          {s.name}
        </h3>
        <p className={`text-[14.5px] leading-relaxed text-cream/70 ${isLarge ? "max-w-[42ch]" : ""}`}>
          {s.summary}
        </p>
        <span className="mt-auto pt-3 text-[13px] font-medium text-gold group-hover:text-gold/80 transition-colors">
          Learn more →
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1] text-navy">
              Everything your brand needs to grow
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] text-navy/70">
              Seven things, done properly. Pick one or let us handle the lot —
              most clients start with whatever&apos;s hurting most right now.
            </p>
          </Reveal>
        </motion.div>
      </div>

      <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <BentoCard s={s} i={i} isLarge={i === 0 || i === 3} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

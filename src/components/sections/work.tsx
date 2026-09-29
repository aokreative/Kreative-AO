"use client";
import Link from "next/link";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { Button, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/frame";
import { motion } from "motion/react";

export function Work() {

  return (
    <Section className="border-t border-cream-dark">
      <div className="grid lg:grid-cols-12 gap-8 items-end w-full pb-12">
        <div className="col-span-12 lg:col-span-7 flex flex-col items-start">
          <Reveal>
            <Eyebrow>Recent work</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1] text-navy">
              Brands we&apos;ve built
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] max-w-[52ch] text-navy/65">
              Real results from recent projects — the problem, the work, and the
              numbers that came out the other side.
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 lg:col-span-5 self-end flex flex-wrap items-end gap-8">
          <dl className="hidden gap-12 sm:flex">
            {HEADLINE_STATS.slice(1).map((s, i) => (
              <div key={s.label} className="relative z-10 flex flex-col justify-center items-start">
                <dt className="tnum font-display text-[32px] leading-none text-navy">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[13px] leading-snug text-navy/60">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
          <Reveal delay={0.3}>
            <Button href="/work" variant="ghost">
              All case studies
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CASE_STUDIES.slice(0, 4).map((c, i) => (
          <Reveal key={c.slug} delay={0.1 * i}>
            <Link
              href={`/work/${c.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl bg-transparent border border-transparent transition-all duration-300"
            >
              <div className="relative h-[240px] w-full overflow-hidden shrink-0 rounded-lg">
                <Frame 
                  src={`/brand/work/${c.slug}.jpg`} 
                  alt={c.client} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 pt-6 pb-2">
                <span className="text-[11px] font-sans uppercase tracking-[0.15em] text-gold">{c.category}</span>
                <h3 className="text-[20px] font-normal leading-tight text-navy transition-colors group-hover:text-gold">{c.client}</h3>
                <p className="text-[15px] leading-relaxed text-navy/70 line-clamp-2 flex-1">
                  {c.headline}
                </p>
                <div className="mt-3 pt-4 border-t border-cream-dark">
                  <p className="tnum font-display text-[26px] font-normal leading-none text-navy">
                    {c.metrics[0].value}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-navy/50 font-normal uppercase tracking-wider">
                    {c.metrics[0].label}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

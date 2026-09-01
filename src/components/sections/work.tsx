"use client";
import Link from "next/link";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { Button, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Frame } from "@/components/frame";
import { motion } from "motion/react";

export function Work() {

  return (
    <Section className="border-t border-line-soft bg-surface-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[52ch]">
          <Reveal>
            <Eyebrow>Recent work</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Brands we&apos;ve built
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] text-ink-2">
              Real results from recent projects — the problem, the work, and the
              numbers that came out the other side.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-wrap items-end gap-8">
          <dl className="hidden gap-12 sm:flex">
            {HEADLINE_STATS.slice(1).map((s, i) => (
              <div key={s.label} className="relative z-10 flex flex-col justify-center items-center">
                <dt className="tnum font-display text-[32px] leading-none text-ink">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[13px] leading-snug text-ink-3">
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
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ink-3 hover:shadow-md"
            >
              <div className="relative h-[240px] w-full overflow-hidden">
                <Frame 
                  src={`/brand/work/${c.slug}.jpg`} 
                  alt={c.client} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="label text-accent font-semibold">{c.category}</span>
                <h3 className="text-[20px] font-medium leading-tight text-ink">{c.client}</h3>
                <p className="text-[15px] leading-relaxed text-ink-2 line-clamp-2 flex-1">
                  {c.headline}
                </p>
                <div className="mt-3 pt-4 border-t border-line-soft">
                  <p className="tnum font-display text-[26px] font-medium leading-none text-ink">
                    {c.metrics[0].value}
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-ink-3 font-medium uppercase tracking-wider">
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

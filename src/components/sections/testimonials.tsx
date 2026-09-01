"use client";
import { TESTIMONIALS } from "@/content/services";
import { Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <Section className="border-t border-line-soft">
      <div className="max-w-[56ch]">
        <Reveal>
          <Eyebrow>In their words</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            What it&apos;s like to work with us
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col gap-5 rounded-lg border border-line bg-surface p-7 shadow-e1">
              <blockquote className="font-display text-[18px] leading-[1.5] text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-[14.5px] font-semibold">{t.name}</p>
                <p className="text-[13px] text-ink-3">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

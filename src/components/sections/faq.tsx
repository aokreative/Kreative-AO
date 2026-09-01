"use client";
import { FAQS } from "@/content/services";
import { Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function FAQ() {
  return (
    <Section className="border-t border-line-soft bg-surface-2">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <Eyebrow>Good to know</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] leading-[1.12]">
              Questions we get a lot
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[15.5px] text-ink-2">
              Can&apos;t see yours? Ask the assistant in the corner, or send it
              over — we usually reply the same day.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.1}>
              <details className="group border-b border-line py-5 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold marker:content-['']">
                  {f.q}
                  <span
                    aria-hidden
                    className="text-[20px] leading-none text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

"use client";
import { SITE } from "@/lib/site";
import { Button, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  return (
    <Section className="border-t border-line-soft bg-surface-2">
      <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Let&apos;s grow your brand
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17px] text-ink-2">
            Tell us what you&apos;re working on — or what&apos;s not working.
            We&apos;ll reply within one business day with honest thoughts on how
            we&apos;d help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/book" variant="accent">
              Book a discovery call
            </Button>
            <Button href="/contact" variant="ghost">
              Send a message instead
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="label mt-2 text-ink-3">{SITE.tagline}</p>
        </Reveal>
      </div>
    </Section>
  );
}

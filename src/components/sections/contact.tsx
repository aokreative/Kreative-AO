"use client";
import { SITE } from "@/lib/site";
import { Button, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  return (
    <Section className="border-t border-[#0D1B35]/10">
      <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.1] text-[#0D1B35]">
            Let&apos;s grow your brand
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17px] text-[#0D1B35]/70">
            Tell us what you&apos;re working on — or what&apos;s not working.
            We&apos;ll reply within one business day with honest thoughts on how
            we&apos;d help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Button href="/book" className="!px-8 !py-4 text-lg bg-[#C8A05A] text-[#0D1B35] hover:bg-[#0D1B35] hover:text-[#F5F0E6] transition-colors rounded-full border-0 font-medium">
              Book a discovery call
            </Button>
            <Button href="/contact" className="!px-8 !py-4 text-lg bg-transparent text-[#0D1B35] border border-[#0D1B35]/20 hover:border-[#0D1B35]/40 hover:bg-[#0D1B35]/5 transition-colors rounded-full font-medium">
              Send a message instead
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="label mt-2 text-[#0D1B35]/50">{SITE.tagline}</p>
        </Reveal>
      </div>
    </Section>
  );
}

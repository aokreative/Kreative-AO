import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";
import { HorizontalScroll } from "./horizontal-scroll";
import { ResultsStats } from "./results-stats";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from A&O Kreative — the problem, what we did about it, and the numbers that came out the other side.",
};

export default function WorkPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Frame src="/brand/hero.jpg" alt="Work" className="absolute inset-0 !h-full w-full z-0" priority />
        <div className="header-veil" />
        <Container className="relative z-10">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
            The full stories
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] text-ink-2">
            The problem, what we did about it, and the numbers that came out the
            other side. Real clients, real figures.
          </p>
          <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-3">
            {HEADLINE_STATS.map((s) => (
              <div key={s.label}>
                <dt className="tnum font-display text-[34px] leading-none">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[13.5px] leading-snug text-ink-2">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <HorizontalScroll />

      <Section className="border-t border-line-soft bg-surface-2">
        <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.1]">
            Get results like these
          </h2>
          <p className="text-[16.5px] text-ink-2">
            Every one of these started with a conversation about what
            wasn&apos;t working. Yours can too.
          </p>
          
          <ResultsStats />

          <Button href="/book" variant="accent" className="mt-8">
            Book a discovery call
          </Button>
        </div>
      </Section>
    </>
  );
}

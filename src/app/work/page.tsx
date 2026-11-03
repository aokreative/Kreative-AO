import type { Metadata } from "next";
import { HEADLINE_STATS } from "@/content/case-studies";
import { Button, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";
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
      <PageHero
        eyebrow="Case studies"
        title="The full stories"
        intro={
          <p>
            The problem, what we did about it, and the numbers that came out the
            other side. Real clients, real figures.
          </p>
        }
      >
        <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-6 border-t border-ink/10 pt-8 sm:grid-cols-3">
          {HEADLINE_STATS.map((s) => (
            <div key={s.label}>
              <dt className="tnum font-display text-[34px] leading-none text-ink">{s.value}</dt>
              <dd className="mt-2 text-[13.5px] leading-snug text-ink-3">{s.label}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <HorizontalScroll />

      <Section tone="mist">
        <div className="lg mx-auto flex max-w-[860px] flex-col items-center gap-6 rounded-[32px] px-6 py-12 text-center sm:px-12">
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

import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";
import Image from "next/image";
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
      <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
        {/* 1. BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 z-0">
          <Image src="/brand/hero.jpg" fill priority className="object-cover object-center" alt="Work" />
        </div>
        
        {/* 2. THE DARK VEIL LAYER (HARDCODED) */}
        <div className="header-veil-dark"></div>

        {/* 3. THE TEXT CONTENT LAYER */}
        <div className="relative z-20 w-full container mx-auto px-6 grid lg:grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 text-[#F3F0E6]">
            <Eyebrow>Case studies</Eyebrow>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
              The full stories
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] text-[#F3F0E6]/90">
              The problem, what we did about it, and the numbers that came out the
              other side. Real clients, real figures.
            </p>
            <dl className="mt-12 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-6 border-t border-white/20 pt-8 sm:grid-cols-3">
              {HEADLINE_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="tnum font-display text-[34px] leading-none">
                    {s.value}
                  </dt>
                  <dd className="mt-2 text-[13.5px] leading-snug text-[#F3F0E6]/80">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
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

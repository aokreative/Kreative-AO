import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from A&O Kreative — the problem, what we did about it, and the numbers that came out the other side.",
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-20">
        <Container>
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

      <Section>
        <div className="flex flex-col gap-5">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group grid gap-6 rounded-lg border border-line bg-surface p-8 shadow-e1 transition-colors hover:border-ink-3 md:grid-cols-[1.3fr_1fr] md:items-center"
            >
              <div className="flex flex-col gap-3">
                <span className="label text-ink-3">
                  {c.category} · {c.tags} · {c.year}
                </span>
                <h2 className="text-[26px] leading-tight">{c.client}</h2>
                <p className="text-[16px] text-ink-2">{c.headline}</p>
                <span className="pt-1 text-[14px] font-semibold text-accent-ink group-hover:underline">
                  Read the case study →
                </span>
              </div>
              <dl className="grid grid-cols-3 gap-4 border-t border-line-soft pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="tnum font-display text-[24px] leading-none">
                      {m.value}
                    </dt>
                    <dd className="mt-1.5 text-[12.5px] leading-snug text-ink-3">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.1]">
            Get results like these
          </h2>
          <p className="text-[16.5px] text-ink-2">
            Every one of these started with a conversation about what
            wasn&apos;t working. Yours can too.
          </p>
          <Button href="/book" variant="accent">
            Book a discovery call
          </Button>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, caseStudyBySlug } from "@/content/case-studies";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudyBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.client} — case study`,
    description: `${c.headline}. ${c.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join(", ")}.`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = caseStudyBySlug(slug);
  if (!c) notFound();

  const others = CASE_STUDIES.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Eyebrow>
            {c.category} · {c.tags} · {c.year}
          </Eyebrow>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            {c.client}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[19px] leading-relaxed text-ink-2">
            {c.headline}
          </p>

          <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-line pt-8 sm:grid-cols-3">
            {c.metrics.map((m) => (
              <div key={m.label}>
                <dt className="tnum font-display text-[clamp(34px,4vw,46px)] leading-none">
                  {m.value}
                </dt>
                <dd className="mt-2 text-[14px] leading-snug text-ink-2">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow>The problem</Eyebrow>
            <p className="text-[17px] leading-relaxed text-ink-2">{c.problem}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow>What we did</Eyebrow>
            <p className="text-[17px] leading-relaxed text-ink-2">{c.work}</p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <Eyebrow>More work</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/work/${o.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-ink-3"
            >
              <span className="label text-ink-3">{o.category}</span>
              <h2 className="text-[19px] leading-tight">{o.client}</h2>
              <p className="text-[14.5px] text-ink-2">{o.headline}</p>
              <span className="mt-auto pt-2 text-[13.5px] font-semibold text-accent-ink group-hover:underline">
                Read →
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/book" variant="accent">
            Start a project like this
          </Button>
          <Button href="/work" variant="ghost">
            All case studies
          </Button>
        </div>
      </Section>
    </>
  );
}

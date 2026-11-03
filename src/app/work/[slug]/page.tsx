import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, caseStudyBySlug } from "@/content/case-studies";
import { Button, Eyebrow, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";

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
      <PageHero
        eyebrow={<>{c.category} · {c.tags} · {c.year}</>}
        title={c.client}
        intro={<p className="text-[19px]">{c.headline}</p>}
      >
        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 border-t border-ink/10 pt-8 sm:grid-cols-3">
          {c.metrics.map((m) => (
            <div key={m.label}>
              <dt className="tnum font-display text-[clamp(34px,4vw,46px)] leading-none text-ink">{m.value}</dt>
              <dd className="mt-2 text-[14px] leading-snug text-ink-3">{m.label}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <Section tone="white">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="lg flex flex-col gap-3 rounded-[28px] p-8">
            <Eyebrow>The problem</Eyebrow>
            <p className="text-[17px] leading-relaxed text-ink-2">{c.problem}</p>
          </div>
          <div className="lg flex flex-col gap-3 rounded-[28px] p-8">
            <Eyebrow>What we did</Eyebrow>
            <p className="text-[17px] leading-relaxed text-ink-2">{c.work}</p>
          </div>
        </div>
      </Section>

      <Section tone="mist" className="pt-0">
        <Eyebrow>More work</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/work/${o.slug}`}
              className="lg lg-lift group flex flex-col gap-2 rounded-[24px] p-6"
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
          <Button href="/contact" variant="accent">
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

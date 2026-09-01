import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, serviceBySlug } from "@/content/services";
import { CASE_STUDIES } from "@/content/case-studies";
import { Button, Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return { title: s.name, description: s.summary };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const related = CASE_STUDIES.filter((c) => c.category === service.name).slice(0, 2);
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Eyebrow>
            Services · {service.kicker}
          </Eyebrow>
          <h1 className="mt-4 max-w-[18ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            {service.name}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17.5px] leading-relaxed text-ink-2">
            {service.pitch}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/contact?interest=${service.slug}`} variant="accent">
              {service.cta}
            </Button>
            <Button href="/book" variant="ghost">
              Book a call
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <Eyebrow>What&apos;s included</Eyebrow>
        <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {service.items.map((item) => (
            <div key={item.name} className="flex gap-3">
              <Check />
              <div className="flex flex-col gap-1">
                <h2 className="text-[17px] font-semibold">{item.name}</h2>
                <p className="text-[15px] leading-relaxed text-ink-2">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="border-t border-line-soft bg-surface-2">
          <Eyebrow>Proof</Eyebrow>
          <h2 className="mt-3 text-[28px] leading-tight">
            {service.name} work we&apos;ve shipped
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {related.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-7 shadow-e1 transition-colors hover:border-ink-3"
              >
                <h3 className="text-[21px] leading-tight">{c.client}</h3>
                <p className="text-[15px] text-ink-2">{c.headline}</p>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
                  {c.metrics.slice(0, 2).map((m) => (
                    <span key={m.label} className="text-[15px]">
                      <b className="tnum font-display text-[20px]">{m.value}</b>{" "}
                      <span className="text-ink-3">{m.label}</span>
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-2 text-[14px] font-semibold text-accent-ink group-hover:underline">
                  Read the case study →
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-line-soft">
        <Eyebrow>Also from us</Eyebrow>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-full border border-line px-4 py-2 text-[14px] text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

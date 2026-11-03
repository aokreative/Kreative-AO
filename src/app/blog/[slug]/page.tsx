import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, articleBySlug } from "@/content/articles";
import { Button, Eyebrow, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";
import { Frame } from "@/components/frame";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  const description = a.metaDescription ?? a.excerpt;
  return {
    title: a.seoTitle ?? a.title,
    description,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { type: "article", title: a.title, description },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={<>{a.category} · {a.date} · {a.readMinutes} min read</>}
        title={a.title}
        intro={<p>{a.excerpt}</p>}
        wide
      >
        {a.image && (
          <div className="mt-10 aspect-[16/7] w-full overflow-hidden rounded-[24px]">
            <Frame src={a.image} alt={a.title} className="h-full w-full object-cover" />
          </div>
        )}
      </PageHero>

      <Section tone="white" className="pt-12">
        <article
          className="prose-aok max-w-[68ch]"
          /* Body copy is authored by A&O in this repository — never user
             input — so rendering it as HTML is safe here. */
          dangerouslySetInnerHTML={{ __html: a.body }}
        />

        <div className="lg mt-14 flex max-w-[68ch] flex-col gap-4 rounded-[28px] p-8">
          <div aria-hidden className="signal h-1 w-12 rounded-full" />
          <h2 className="text-[24px] leading-tight">{a.ctaTitle}</h2>
          <p className="text-[16px] text-ink-2">{a.ctaBody}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            {a.primaryCta ? (
              <Button
                href={a.primaryCta.href}
                variant="accent"
                external={a.primaryCta.external}
              >
                {a.primaryCta.label}
              </Button>
            ) : (
              <Button href="/book" variant="accent">
                Book a call
              </Button>
            )}
            <Button href="/contact" variant="ghost">
              Send a message
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="mist" className="pt-0">
        <Eyebrow>Keep reading</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {more.map((m) => (
            <Link
              key={m.slug}
              href={`/blog/${m.slug}`}
              className="lg lg-lift group flex flex-col gap-2 rounded-[24px] p-6"
            >
              <span className="label text-ink-3">{m.category}</span>
              <h3 className="text-[17px] leading-snug">{m.title}</h3>
              <span className="mt-auto pt-2 text-[13px] text-ink-3">
                {m.readMinutes} min read
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

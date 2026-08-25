import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, articleBySlug } from "@/content/articles";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";

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
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { type: "article", title: a.title, description: a.excerpt },
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
      <section className="border-b border-line-soft bg-surface-2 py-14 sm:py-20">
        <Container>
          <Eyebrow>
            {a.category} · {a.date} · {a.readMinutes} min read
          </Eyebrow>
          <h1 className="mt-4 max-w-[24ch] text-[clamp(30px,4.2vw,50px)] leading-[1.08]">
            {a.title}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[18px] leading-relaxed text-ink-2">
            {a.excerpt}
          </p>
        </Container>
      </section>

      <Section>
        <article
          className="prose-aok max-w-[68ch]"
          /* Body copy is authored by A&O in this repository — never user
             input — so rendering it as HTML is safe here. */
          dangerouslySetInnerHTML={{ __html: a.body }}
        />

        <div className="mt-14 flex max-w-[68ch] flex-col gap-4 rounded-lg border border-line bg-surface-2 p-8">
          <div aria-hidden className="signal h-1 w-12 rounded-full" />
          <h2 className="text-[24px] leading-tight">{a.ctaTitle}</h2>
          <p className="text-[16px] text-ink-2">{a.ctaBody}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button href="/book" variant="accent">
              Book a call
            </Button>
            <Button href="/contact" variant="ghost">
              Send a message
            </Button>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <Eyebrow>Keep reading</Eyebrow>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {more.map((m) => (
            <Link
              key={m.slug}
              href={`/blog/${m.slug}`}
              className="group flex flex-col gap-2 rounded-lg border border-line bg-surface p-6 transition-colors hover:border-ink-3"
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

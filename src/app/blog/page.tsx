import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/content/articles";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical thinking on marketing, branding and growing a business in Kenya — written for people who'd rather do the work than read theory.",
};

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-20">
        <Container>
          <Eyebrow>The blog</Eyebrow>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
            Ideas worth stealing
          </h1>
          <p className="mt-6 max-w-[60ch] text-[17px] text-ink-2">
            Practical thinking on marketing, branding and growing a business in
            Kenya — written for people who&apos;d rather do the work than read
            theory.
          </p>
        </Container>
      </section>

      <Section>
        <Link
          href={`/blog/${featured.slug}`}
          className="group flex flex-col gap-4 rounded-lg border border-line bg-surface p-8 shadow-e1 transition-colors hover:border-ink-3 sm:p-10"
        >
          <span className="label text-accent-ink">
            Featured · {featured.category}
          </span>
          <h2 className="max-w-[24ch] text-[clamp(24px,3vw,34px)] leading-[1.15]">
            {featured.title}
          </h2>
          <p className="max-w-[62ch] text-[16.5px] leading-relaxed text-ink-2">
            {featured.excerpt}
          </p>
          <p className="label text-ink-3">
            {featured.date} · {featured.readMinutes} min read
          </p>
          <span className="pt-1 text-[14px] font-semibold text-accent-ink group-hover:underline">
            Read the article →
          </span>
        </Link>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-7 transition-colors hover:border-ink-3"
            >
              <span className="label text-ink-3">{a.category}</span>
              <h2 className="text-[19px] leading-snug">{a.title}</h2>
              <p className="text-[14.5px] leading-relaxed text-ink-2">
                {a.excerpt}
              </p>
              <span className="mt-auto pt-2 text-[12.5px] text-ink-3">
                {a.date} · {a.readMinutes} min
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

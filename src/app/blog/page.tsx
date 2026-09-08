import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/content/articles";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical thinking on marketing, branding and growing a business in Kenya — written for people who'd rather do the work than read theory.",
};

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Frame src="/brand/blog.jpg" alt="Journal" className="absolute inset-0 !h-full w-full z-0" priority />
        <div className="header-veil" />
        <Container className="relative z-10">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <Link
            href={`/blog/${featured.slug}`}
            className="card glass group flex flex-col md:col-span-12 overflow-hidden bg-surface md:flex-row"
          >
            <div className="md:w-[45%] shrink-0 border-b md:border-b-0 md:border-r border-line-soft">
              <Frame src={featured.image || "/brand/blog.jpg"} alt={featured.title} className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-4 p-8 sm:p-10 flex-grow">
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
          </div>
        </Link>

        {rest.map((a, i) => {
          let spanClass = "md:col-span-12 md:flex-row";
          let borderClass = "md:border-r";
          if (i % 3 === 0) {
            spanClass = "md:col-span-10 md:col-start-3 md:flex-row-reverse";
            borderClass = "md:border-l";
          } else if (i % 3 === 1) {
            spanClass = "md:col-span-8 md:col-start-1 md:flex-row";
            borderClass = "md:border-r";
          } else {
            spanClass = "md:col-span-11 md:col-start-2 md:flex-row-reverse";
            borderClass = "md:border-l";
          }
          
          return (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className={`card glass group flex flex-col overflow-hidden bg-surface ${spanClass}`}
            >
              <div className={`md:w-[40%] shrink-0 border-b md:border-b-0 ${borderClass} border-line-soft`}>
                <Frame src={a.image || "/brand/blog.jpg"} alt={a.title} className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-3 p-7 flex-grow">
                <span className="label text-ink-3">{a.category}</span>
                <h2 className="text-[19px] leading-snug">{a.title}</h2>
                <p className="text-[14.5px] leading-relaxed text-ink-2">
                  {a.excerpt}
                </p>
                <span className="mt-auto pt-2 text-[12.5px] text-ink-3">
                  {a.date} · {a.readMinutes} min
                </span>
              </div>
            </Link>
          );
        })}
        </div>
      </Section>
    </>
  );
}

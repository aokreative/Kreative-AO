"use client";
import Link from "next/link";
import { ARTICLES } from "@/content/articles";
import { Button, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Journal() {
  const featured = ARTICLES[0];
  
  return (
    <Section className="border-t border-line-soft">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-[52ch]">
          <Reveal>
            <Eyebrow>The blog</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Ideas worth stealing
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Button href="/blog" variant="ghost">
            All articles
          </Button>
        </Reveal>
      </div>
      <Reveal delay={0.3}>
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-10 flex flex-col gap-4 rounded-lg border border-line bg-surface p-8 shadow-e1 transition-colors hover:border-ink-3 sm:p-10"
        >
          <span className="label text-accent-ink">
            Featured · {featured.category}
          </span>
          <h3 className="max-w-[26ch] text-[clamp(22px,2.8vw,32px)] leading-[1.15]">
            {featured.title}
          </h3>
          <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink-2">
            {featured.excerpt}
          </p>
          <span className="pt-1 text-[14px] font-semibold text-accent-ink group-hover:underline">
            Read the article →
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}

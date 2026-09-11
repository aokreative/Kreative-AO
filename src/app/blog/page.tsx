import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/content/articles";
import { Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical thinking on marketing, branding and growing a business in Kenya — written for people who'd rather do the work than read theory.",
};

export default function BlogPage() {
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
        {/* 1. BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 z-0">
          <Image src="/brand/blog.jpg" fill priority className="object-cover object-center" alt="Journal" />
        </div>
        
        {/* 2. THE DARK VEIL LAYER (HARDCODED) */}
        <div className="header-veil-dark"></div>

        {/* 3. THE TEXT CONTENT LAYER */}
        <div className="relative z-20 w-full container mx-auto px-6 grid lg:grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 text-[#F3F0E6]">
            <Eyebrow>The blog</Eyebrow>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
              Ideas worth stealing
            </h1>
            <p className="mt-6 max-w-[60ch] text-[17px] text-[#F3F0E6]/90">
              Practical thinking on marketing, branding and growing a business in
              Kenya — written for people who&apos;d rather do the work than read
              theory.
            </p>
          </div>
        </div>
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
              Read the article â†’
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

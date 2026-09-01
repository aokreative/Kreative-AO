import fs from 'fs';
import path from 'path';

const SECTIONS_DIR = 'src/components/sections';
if (!fs.existsSync(SECTIONS_DIR)) fs.mkdirSync(SECTIONS_DIR, { recursive: true });

const files = {
  'hero.tsx': `"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import { HEADLINE_STATS } from "@/content/case-studies";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.8]);

  return (
    <section ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden hero-photo text-parchment flex flex-col justify-center pt-[var(--nav-h)]">
        <div className="hero-veil absolute inset-0 z-0 pointer-events-none" />
        <motion.div 
          style={{ opacity: veilOpacity }} 
          className="absolute inset-0 z-0 bg-teal-deep pointer-events-none" 
        />

        <Container className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Marketing · Branding · AI — Nairobi</Eyebrow>
            </Reveal>
            <motion.div style={{ scale: headlineScale, opacity: headlineOpacity, transformOrigin: "left center" }}>
              <Reveal delay={0.1}>
                <h1 className="mt-5 max-w-[17ch] text-[clamp(40px,6.2vw,74px)] font-medium leading-[1.03] text-parchment">
                  We build the software, and we bring you the{" "}
                  <span className="signal-text">customers</span>.
                </h1>
              </Reveal>
            </motion.div>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[52ch] text-[17.5px] leading-relaxed text-teal-soft">
                Most agencies sell you activity — posts, reach, impressions. We care
                about one thing: did it actually grow your business? Every project
                starts with that question and ends with the numbers to answer it.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/book" variant="accent">
                  Book a call
                </Button>
                <Button
                  href="/work"
                  variant="ghost"
                  className="!border-teal-mid !text-parchment hover:!bg-white/5"
                >
                  See our work
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative mt-12 lg:col-span-7 lg:col-start-6 lg:mt-0 lg:-mr-[calc(50vw-50%)]">
            <motion.div style={{ y: photoY }} className="relative aspect-[4/3] overflow-hidden rounded-l-2xl border border-white/10 lg:aspect-auto lg:h-[650px]">
              <img
                src="/brand/hero.jpg"
                alt="Workspace"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>
            
            <Reveal delay={0.4}>
              <div className="glass absolute -left-4 bottom-4 z-20 flex flex-col items-start justify-center rounded-2xl border border-white/20 p-6 shadow-2xl sm:-left-8 sm:bottom-8 lg:-ml-24 lg:bottom-16">
                <span className="tnum font-display text-[48px] leading-none text-parchment">
                  {HEADLINE_STATS[0].value}
                </span>
                <span className="mt-2 text-[14px] leading-snug text-teal-soft">
                  {HEADLINE_STATS[0].label}
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
`,
  'services.tsx': `"use client";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { Section, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Services() {
  return (
    <Section>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Everything your brand needs to grow
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] text-ink-2">
              Seven things, done properly. Pick one or let us handle the lot —
              most clients start with whatever&apos;s hurting most right now.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-8 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s, i) => {
            const isLarge = i === 0 || i === 3;
            const hasImage = isLarge;
            const imgSrc = i === 0 ? "/brand/services-build.jpg" : i === 3 ? "/brand/services-growth.jpg" : null;
            return (
              <Reveal key={s.slug} delay={i * 0.1}>
                <Link
                  href={\`/services/\${s.slug}\`}
                  className={\`group relative overflow-hidden flex flex-col gap-4 rounded-xl border border-line bg-surface p-8 shadow-e1 transition-all hover:border-ink-3 hover:shadow-lg \${
                    i === 0 ? "sm:col-span-2 min-h-[320px]" :
                    i === 3 ? "sm:col-span-2 min-h-[320px]" :
                    i === 6 ? "sm:col-span-2 min-h-[200px] flex-row items-center justify-between" : ""
                  } h-full\`}
                >
                  {hasImage && imgSrc && (
                    <div className="absolute inset-0 z-0">
                      <img src={imgSrc} alt="" className="h-full w-full object-cover opacity-[0.08] transition-opacity duration-500 group-hover:opacity-[0.15]" />
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col gap-3">
                    <h3 className={\`\${isLarge || i === 6 ? "text-[26px]" : "text-[21px]"} leading-tight\`}>{s.name}</h3>
                    <p className={\`text-[14.5px] leading-relaxed text-ink-2 \${isLarge ? "max-w-[42ch]" : ""}\`}>
                      {s.summary}
                    </p>
                  </div>
                  <span className="relative z-10 mt-auto pt-2 text-[13.5px] font-semibold text-accent-ink group-hover:underline">
                    {s.kicker} →
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
`,
  'work.tsx': `"use client";
import Link from "next/link";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { Button, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { Ridges } from "@/components/graphics/ridges";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Work() {
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true, margin: "-12%" });

  return (
    <Section className="border-t border-line-soft bg-surface-2">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[52ch]">
          <Reveal>
            <Eyebrow>Recent work</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Brands we&apos;ve built
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] text-ink-2">
              Real results from recent projects — the problem, the work, and the
              numbers that came out the other side.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-wrap items-end gap-8">
          <dl ref={statsRef} className="hidden gap-12 sm:flex">
            {HEADLINE_STATS.slice(1).map((s, i) => (
              <div key={s.label} className="relative z-10 flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center justify-center -z-10 text-orange-lift opacity-20 scale-[0.4]">
                  <Ridges size={300} draw={isInView} />
                </div>
                <dt className="tnum font-display text-[32px] leading-none text-ink">
                  {s.value}
                </dt>
                <dd className="mt-1 text-[13px] leading-snug text-ink-3">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
          <Reveal delay={0.3}>
            <Button href="/work" variant="ghost">
              All case studies
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CASE_STUDIES.slice(0, 4).map((c, i) => (
          <Reveal key={c.slug} delay={0.1 * i}>
            <Link
              href={\`/work/\${c.slug}\`}
              className="group flex h-full flex-col gap-3 rounded-lg border border-line bg-surface p-6 shadow-e1 transition-colors hover:border-ink-3"
            >
              <span className="label text-ink-3">{c.category}</span>
              <h3 className="text-[19px] leading-tight">{c.client}</h3>
              <p className="text-[14px] leading-relaxed text-ink-2">
                {c.headline}
              </p>
              <div className="mt-auto pt-3">
                <p className="tnum font-display text-[26px] leading-none">
                  {c.metrics[0].value}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-snug text-ink-3">
                  {c.metrics[0].label}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
`,
  'products.tsx': `"use client";
import { PRODUCTS, dukaTrialLink } from "@/lib/site";
import { Badge, Button, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Products() {
  return (
    <Section className="border-t border-line-soft">
      <div className="max-w-[62ch]">
        <Reveal>
          <Eyebrow>Our products</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            We don&apos;t just build software for clients
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 text-[17px] text-ink-2">
            We run our own in production — which is a different discipline
            entirely. Supporting real shops on a bad network teaches you things
            a project brief never will.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <div className="flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-8 shadow-e1">
              <Badge tone={p.status === "live" ? "live" : "building"}>
                {p.statusLabel}
              </Badge>
              <h3 className="text-[25px] leading-tight">{p.name}</h3>
              <p className="text-[15.5px] text-ink-2">{p.summary}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-3">
                {p.status === "live" ? (
                  <>
                    <Button href={dukaTrialLink()} variant="accent" external>
                      Start free trial
                    </Button>
                    <Button href={p.href} variant="ghost">
                      Pricing & features
                    </Button>
                  </>
                ) : (
                  <Button href={p.href} variant="primary">
                    Join the waitlist
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
`,
  'process.tsx': `"use client";
import { PROCESS } from "@/content/services";
import { Section, Eyebrow, Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <Section className="border-t border-line-soft bg-surface-2 overflow-hidden">
      <div className="max-w-[56ch]">
        <Reveal>
          <Eyebrow>How we work</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Simple, and no surprises
          </h2>
        </Reveal>
      </div>
      
      <div ref={ref} className="relative mt-16 min-h-[200vh]">
        <div className="sticky top-[20vh]">
          {/* Ridge-arc progress line */}
          <div className="absolute top-8 left-0 right-0 h-1 hidden lg:block overflow-hidden">
             <div className="h-full bg-line-soft w-full absolute rounded-full" />
             <motion.div 
               className="h-full bg-accent absolute rounded-full" 
               style={{ width: "100%", scaleX: scrollYProgress, transformOrigin: "left" }} 
             />
          </div>
          
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
            {PROCESS.map((p, i) => {
              // Highlight steps dynamically based on scroll progress
              const stepStart = i / PROCESS.length;
              const stepEnd = (i + 1) / PROCESS.length;
              
              return (
                <li key={p.step} className="flex flex-col gap-3 relative pt-4 lg:pt-12">
                  <Reveal delay={0.1 * i}>
                    <div className="hidden lg:block absolute top-0 left-0 w-3 h-3 rounded-full bg-surface border-2 border-accent transform -translate-y-[10px]" />
                    <span className="label tnum text-accent-ink">{p.step}</span>
                    <h3 className="text-[20px] leading-tight">{p.title}</h3>
                    <p className="text-[14.5px] leading-relaxed text-ink-2">
                      {p.body}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
`,
  'testimonials.tsx': `"use client";
import { TESTIMONIALS } from "@/content/services";
import { Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <Section className="border-t border-line-soft">
      <div className="max-w-[56ch]">
        <Reveal>
          <Eyebrow>In their words</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            What it&apos;s like to work with us
          </h2>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="flex h-full flex-col gap-5 rounded-lg border border-line bg-surface p-7 shadow-e1">
              <blockquote className="font-display text-[18px] leading-[1.5] text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-[14.5px] font-semibold">{t.name}</p>
                <p className="text-[13px] text-ink-3">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
`,
  'faq.tsx': `"use client";
import { FAQS } from "@/content/services";
import { Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function FAQ() {
  return (
    <Section className="border-t border-line-soft bg-surface-2">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <Eyebrow>Good to know</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] leading-[1.12]">
              Questions we get a lot
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[15.5px] text-ink-2">
              Can&apos;t see yours? Ask the assistant in the corner, or send it
              over — we usually reply the same day.
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.1}>
              <details className="group border-b border-line py-5 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold marker:content-['']">
                  {f.q}
                  <span
                    aria-hidden
                    className="text-[20px] leading-none text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-2">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
`,
  'journal.tsx': `"use client";
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
          href={\`/blog/\${featured.slug}\`}
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
`,
  'contact.tsx': `"use client";
import { SITE } from "@/lib/site";
import { Button, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function Contact() {
  return (
    <Section className="border-t border-line-soft bg-surface-2">
      <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Let&apos;s grow your brand
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[17px] text-ink-2">
            Tell us what you&apos;re working on — or what&apos;s not working.
            We&apos;ll reply within one business day with honest thoughts on how
            we&apos;d help.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/book" variant="accent">
              Book a discovery call
            </Button>
            <Button href="/contact" variant="ghost">
              Send a message instead
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="label mt-2 text-ink-3">{SITE.tagline}</p>
        </Reveal>
      </div>
    </Section>
  );
}
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(SECTIONS_DIR, filename), content);
}

// Rewrite page.tsx
const PAGE_CONTENT = `import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Products } from "@/components/sections/products";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { Journal } from "@/components/sections/journal";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Products />
      <Process />
      <Testimonials />
      <FAQ />
      <Journal />
      <Contact />
    </>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', PAGE_CONTENT);

// Build magnetic button wrapper and apply it
const MAGNETIC_BTN = `"use client";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Calculate distance from center
    const distance = Math.sqrt(middleX * middleX + middleY * middleY);
    if (distance < 100) {
      // 6px max pull
      setPosition({ x: (middleX / width) * 12, y: (middleY / height) * 12 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
`;
fs.writeFileSync('src/components/motion/magnetic.tsx', MAGNETIC_BTN);

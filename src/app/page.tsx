import Link from "next/link";
import { SERVICES, PROCESS, TESTIMONIALS, FAQS } from "@/content/services";
import { CASE_STUDIES, HEADLINE_STATS } from "@/content/case-studies";
import { ARTICLES } from "@/content/articles";
import { PRODUCTS, SITE, dukaTrialLink } from "@/lib/site";
import {
  Badge,
  Button,
  Container,
  Eyebrow,
  Section,
  SignalRule,
} from "@/components/ui/primitives";

export default function Home() {
  const featured = ARTICLES[0];

  return (
    <>
      {/* ---------------------------------------------------------------
          Hero. Same backdrop as the opening card, so the page resolves out
          of the splash rather than cutting to something unrelated.
      --------------------------------------------------------------- */}
      <section className="skyline relative overflow-hidden border-b border-white/10 pb-20 pt-20 text-parchment sm:pb-28 sm:pt-28">
        <div className="skyline-veil" />
        <Container className="relative">
          <Eyebrow>Marketing · Branding · AI — Nairobi</Eyebrow>
          <h1 className="mt-5 max-w-[17ch] text-[clamp(40px,6.2vw,74px)] font-medium leading-[1.03] text-[#F5F2EA]">
            We build the software, and we bring you the{" "}
            <span className="signal-text">customers</span>.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17.5px] leading-relaxed text-teal-soft">
            Most agencies sell you activity — posts, reach, impressions. We care
            about one thing: did it actually grow your business? Every project
            starts with that question and ends with the numbers to answer it.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/book" variant="accent">
              Book a discovery call
            </Button>
            <Button
              href="/work"
              variant="ghost"
              className="!border-teal-mid !text-parchment hover:!bg-white/5"
            >
              See our work
            </Button>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-6 border-t border-teal-mid/40 pt-8 sm:grid-cols-3">
            {HEADLINE_STATS.map((s) => (
              <div key={s.label}>
                <dt className="tnum font-display text-[36px] leading-none text-[#F5F2EA]">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[13.5px] leading-snug text-teal-soft">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --------------------------- Services --------------------------- */}
      <Section>
        <div className="max-w-[62ch]">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Everything your brand needs to grow
          </h2>
          <p className="mt-4 text-[17px] text-ink-2">
            Seven things, done properly. Pick one or let us handle the lot —
            most clients start with whatever&apos;s hurting most right now.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-7 shadow-e1 transition-colors hover:border-ink-3"
            >
              <span className="label tnum text-ink-3">{s.number}</span>
              <h3 className="text-[21px] leading-tight">{s.name}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-2">
                {s.summary}
              </p>
              <span className="mt-auto pt-2 text-[13.5px] font-semibold text-accent-ink group-hover:underline">
                {s.kicker} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------------------------- Work ------------------------------ */}
      <Section className="border-t border-line-soft bg-surface-2">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[52ch]">
            <Eyebrow>Recent work</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Brands we&apos;ve built
            </h2>
            <p className="mt-4 text-[17px] text-ink-2">
              Real results from recent projects — the problem, the work, and the
              numbers that came out the other side.
            </p>
          </div>
          <Button href="/work" variant="ghost">
            All case studies
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CASE_STUDIES.slice(0, 4).map((c) => (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-6 shadow-e1 transition-colors hover:border-ink-3"
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
          ))}
        </div>
      </Section>

      {/* --------------------------- Products --------------------------- */}
      <Section className="border-t border-line-soft">
        <div className="max-w-[62ch]">
          <Eyebrow>Our products</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            We don&apos;t just build software for clients
          </h2>
          <p className="mt-4 text-[17px] text-ink-2">
            We run our own in production — which is a different discipline
            entirely. Supporting real shops on a bad network teaches you things
            a project brief never will.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <div
              key={p.slug}
              className="flex flex-col gap-4 rounded-lg border border-line bg-surface p-8 shadow-e1"
            >
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
          ))}
        </div>
      </Section>

      {/* --------------------------- Process ---------------------------- */}
      <Section className="border-t border-line-soft bg-surface-2">
        <div className="max-w-[56ch]">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Simple, and no surprises
          </h2>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <li key={p.step} className="flex flex-col gap-3">
              <span className="label tnum text-accent-ink">{p.step}</span>
              <SignalRule className="max-w-[40px]" />
              <h3 className="text-[20px] leading-tight">{p.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-2">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ------------------------- Testimonials ------------------------- */}
      <Section className="border-t border-line-soft">
        <div className="max-w-[56ch]">
          <Eyebrow>In their words</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            What it&apos;s like to work with us
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 shadow-e1"
            >
              <blockquote className="font-display text-[18px] leading-[1.5] text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-[14.5px] font-semibold">{t.name}</p>
                <p className="text-[13px] text-ink-3">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ----------------------------- FAQ ------------------------------ */}
      <Section className="border-t border-line-soft bg-surface-2">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Good to know</Eyebrow>
            <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] leading-[1.12]">
              Questions we get a lot
            </h2>
            <p className="mt-4 text-[15.5px] text-ink-2">
              Can&apos;t see yours? Ask the assistant in the corner, or send it
              over — we usually reply the same day.
            </p>
          </div>
          <div className="flex flex-col">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group border-b border-line py-5 first:border-t"
              >
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
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------- Journal --------------------------- */}
      <Section className="border-t border-line-soft">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[52ch]">
            <Eyebrow>The blog</Eyebrow>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
              Ideas worth stealing
            </h2>
          </div>
          <Button href="/blog" variant="ghost">
            All articles
          </Button>
        </div>
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
      </Section>

      {/* ----------------------------- Close ---------------------------- */}
      <Section className="border-t border-line-soft bg-surface-2">
        <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Let&apos;s grow your brand
          </h2>
          <p className="text-[17px] text-ink-2">
            Tell us what you&apos;re working on — or what&apos;s not working.
            We&apos;ll reply within one business day with honest thoughts on how
            we&apos;d help.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/book" variant="accent">
              Book a discovery call
            </Button>
            <Button href="/contact" variant="ghost">
              Send a message instead
            </Button>
          </div>
          <p className="label mt-2 text-ink-3">{SITE.tagline}</p>
        </div>
      </Section>
    </>
  );
}

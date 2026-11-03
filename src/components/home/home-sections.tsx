import Link from "next/link";
import { Button, Container } from "@/components/ui/primitives";
import { CASE_STUDIES } from "@/content/case-studies";
import { ARTICLES } from "@/content/articles";
import { AMS_LAUNCH_LABEL, SITE } from "@/lib/site";
import { OrbTimeline } from "./orb-timeline";

export function Hero() {
  return (
    <section data-tone="white" className="relative">
      <Container className="flex flex-col items-center pb-14 pt-10 text-center sm:pt-14">
        <h1 className="text-[clamp(38px,4.7vw,62px)] text-ink">
          <span className="sm:block">We build the system. </span>
          <span className="sm:block">Then we bring the customers.</span>
        </h1>
        <p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-ink-2">
          A&amp;O Kreative is a growth and technology partner in Nairobi.
          Branding, digital marketing, websites, AI automation and POS
          systems, planned by one team.
        </p>
        <div className="mt-2 w-full">
          <OrbTimeline />
        </div>
      </Container>
      <div className="mx-auto hidden w-full max-w-[1200px] justify-between px-8 pb-6 text-[13px] text-ink-3 md:flex">
        <span>Growth and technology partner</span>
        <span>Made in Nairobi, working across Kenya and the UAE</span>
      </div>
    </section>
  );
}

export function WorkList() {
  return (
    <section data-tone="white" className="py-[var(--space-section)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(30px,3.6vw,44px)] text-ink">Recent work</h2>
          <Link href="/work" className="text-[15px] font-semibold text-ink underline decoration-gold underline-offset-4">
            All case studies
          </Link>
        </div>
        <ul className="mt-10 border-b border-line">
          {CASE_STUDIES.map((c) => {
            const m = c.metrics[0];
            return (
              <li key={c.slug} className="border-t border-line">
                <Link
                  href={`/work/${c.slug}`}
                  className="group grid items-baseline gap-x-8 gap-y-1 py-6 transition-colors sm:grid-cols-[minmax(0,280px)_minmax(0,1fr)_200px] sm:py-7"
                >
                  <span className="text-[22px] font-semibold text-ink" style={{ fontStretch: "112%" }}>
                    {c.client}
                  </span>
                  <span className="text-[16px] text-ink-3 transition-colors group-hover:text-ink">
                    {c.headline}
                  </span>
                  {m && (
                    <span className="mt-2 flex items-baseline gap-2 sm:mt-0 sm:flex-col sm:items-end sm:gap-0">
                      <span className="tnum text-[26px] font-semibold text-ink" style={{ fontStretch: "112%" }}>
                        {m.value}
                      </span>
                      <span className="text-[13px] text-ink-3">{m.label}</span>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function AmsNote() {
  return (
    <section data-tone="cream" className="pb-[var(--space-section)]">
      <Container>
        <div className="flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[24px] text-ink">Agency Management System</h2>
            <p className="mt-2 max-w-[56ch] text-[16px] text-ink-3">
              Our next product: policies, renewals, claims and commissions in one
              place for insurance agencies and brokerages. Launching{" "}
              {AMS_LAUNCH_LABEL}.
            </p>
          </div>
          <Button href="/products/ams" variant="ghost" className="w-fit">
            Join the waitlist
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function JournalList() {
  const posts = ARTICLES.slice(0, 3);
  return (
    <section data-tone="sand" className="pb-[var(--space-section)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[clamp(30px,3.6vw,44px)] text-ink">From the blog</h2>
          <Link href="/blog" className="text-[15px] font-semibold text-ink underline decoration-gold underline-offset-4">
            All articles
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex flex-col border-t border-line pt-6">
              <span className="text-[13.5px] text-ink-3">{a.category}</span>
              <span
                className="mt-3 text-[21px] font-semibold leading-snug tracking-[-0.015em] text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-gold"
                style={{ fontStretch: "106%" }}
              >
                {a.title}
              </span>
              <span className="mt-4 text-[14px] text-ink-3">
                {a.readMinutes} min read
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Closing() {
  return (
    <section
      className="text-white"
      style={{
        background:
          "radial-gradient(55% 75% at 88% 0%, rgba(184,144,47,0.30), rgba(184,144,47,0) 70%), linear-gradient(180deg, #13233A 0%, #0B1524 100%)",
      }}
    >
      <Container className="py-[var(--space-section)]">
        <div className="lg-dark max-w-[820px] rounded-[32px] px-7 py-10 sm:px-12 sm:py-14">
          <h2 className="text-[clamp(34px,5vw,64px)] text-white">
            Tell us what&apos;s slowing the business down.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-haze">
            Start with a 30-minute call. No pitch deck, and if we&apos;re not
            the right fit, we&apos;ll say so.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/book" variant="accent">
              Book a call
            </Button>
            <Button href={SITE.whatsapp} variant="light" external>
              WhatsApp us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

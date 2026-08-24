import Link from "next/link";
import { PRODUCTS, SERVICES, SITE, dukaTrialLink } from "@/lib/site";
import {
  Badge,
  Button,
  Check,
  Container,
  Eyebrow,
  Section,
  SignalRule,
} from "@/components/ui/primitives";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------
          Hero — the thesis. Both halves of the business in one sentence.
      --------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-white/10 bg-teal-deep pb-20 pt-20 text-parchment sm:pb-28 sm:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] top-1/3 h-[520px] w-[620px] rounded-full opacity-[.18] blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, #B6571A 0%, #7A5460 45%, transparent 70%)",
          }}
        />
        <Container className="relative">
          <Eyebrow>Martech · Nairobi</Eyebrow>
          <h1 className="mt-5 max-w-[16ch] text-[clamp(42px,6.5vw,76px)] font-medium leading-[1.02] text-[#F5F2EA]">
            We build the software, and we bring you the{" "}
            <span className="signal-text">customers</span>.
          </h1>
          <p className="mt-7 max-w-[54ch] text-[17.5px] leading-relaxed text-teal-soft">
            Most agencies do one or the other. A&amp;O Kreative does both — we run
            marketing that fills the pipeline, and we write the software the
            business runs on. Including our own.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/book" variant="accent">
              Book a discovery call
            </Button>
            <Button
              href="/products/duka-pos"
              variant="ghost"
              className="!border-teal-mid !text-parchment hover:!bg-white/5"
            >
              See Duka POS
            </Button>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-teal-mid/40 pt-8 sm:grid-cols-4">
            {[
              ["2", "products in market"],
              ["4", "Duka POS tiers"],
              ["3", "service lines"],
              ["1", "team behind both"],
            ].map(([n, label]) => (
              <div key={label}>
                <dt className="tnum font-display text-[34px] leading-none text-[#F5F2EA]">
                  {n}
                </dt>
                <dd className="mt-2 text-[13.5px] leading-snug text-teal-soft">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ---------------------------------------------------------------
          The three doors
      --------------------------------------------------------------- */}
      <Section>
        <div className="max-w-[62ch]">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Three parts of the same problem
          </h2>
          <p className="mt-4 text-[17px] text-ink-2">
            A business needs a system that works, customers who know it exists,
            and fewer hours lost to work a machine could do. Buying those from
            three different suppliers is how they end up not talking to each
            other.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group flex flex-col gap-4 rounded-lg border border-line bg-surface p-7 shadow-e1 transition-colors hover:border-ink-3"
            >
              <h3 className="text-[22px] leading-tight">{s.name}</h3>
              <p className="text-[15px] text-ink-2">{s.summary}</p>
              <ul className="flex flex-col gap-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[14px] text-ink-2">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-2 text-[14px] font-semibold text-accent-ink group-hover:underline">
                Explore {s.name} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Products — status encoded in the badge, not just the words
      --------------------------------------------------------------- */}
      <Section className="border-t border-line-soft bg-surface-2">
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
              <p className="label text-ink-3">{p.audience}</p>
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

      {/* ---------------------------------------------------------------
          Proof. Until client case studies land, the products are the proof.
      --------------------------------------------------------------- */}
      <Section className="border-t border-line-soft">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="mt-3 text-[clamp(26px,3.2vw,38px)] leading-[1.12]">
              The people marketing your product also know how it&apos;s built
            </h2>
            <SignalRule className="mt-7 max-w-[180px]" />
          </div>
          <ul className="flex flex-col gap-6">
            {[
              [
                "A campaign that understands the funnel",
                "When the same team owns the signup flow and the ad that leads to it, the drop-off between them stops being someone else's problem.",
              ],
              [
                "Software shaped by demand, not guesses",
                "We see which features people actually ask about before they buy, because we are the ones answering.",
              ],
              [
                "One accountable team",
                "No agency blaming the developers, no developers blaming the agency.",
              ],
            ].map(([title, body]) => (
              <li key={title} className="flex flex-col gap-2">
                <h3 className="text-[19px] font-semibold">{title}</h3>
                <p className="text-[15.5px] leading-relaxed text-ink-2">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------
          Close
      --------------------------------------------------------------- */}
      <Section className="border-t border-line-soft bg-surface-2">
        <div className="mx-auto flex max-w-[52ch] flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(28px,3.6vw,42px)] leading-[1.1]">
            Tell us what you&apos;re trying to build
          </h2>
          <p className="text-[17px] text-ink-2">
            Fifteen minutes, no deck. We&apos;ll tell you whether we&apos;re the
            right people for it — and if we&apos;re not, who is.
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

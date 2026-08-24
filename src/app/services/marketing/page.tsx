import type { Metadata } from "next";
import { Button, Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Digital marketing",
  description:
    "Performance campaigns, social, content and SEO measured against pipeline, not impressions.",
};

const WORK = [
  ["Paid acquisition", "Meta, Google and TikTok campaigns built around cost per qualified lead, not cost per click."],
  ["Content & SEO", "Pages and articles that answer what buyers actually search, structured so they keep earning."],
  ["Social management", "An editorial line with a point of view, posted consistently — not filler."],
  ["Reporting", "Tied back to leads and revenue, so you can tell what to stop spending on."],
];

export default function MarketingPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Eyebrow>Services · Digital marketing</Eyebrow>
          <h1 className="mt-4 max-w-[18ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            Marketing judged on pipeline, not impressions
          </h1>
          <p className="mt-6 max-w-[56ch] text-[17.5px] leading-relaxed text-ink-2">
            Reach is easy to buy and easy to report. We&apos;d rather be measured
            on the number that pays salaries — qualified leads that turn into
            customers.
          </p>
          <div className="mt-8">
            <Button href="/contact?interest=marketing" variant="accent">
              Talk about your campaign
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {WORK.map(([title, body]) => (
            <div key={title} className="flex flex-col gap-3">
              <h2 className="text-[21px] font-semibold">{title}</h2>
              <p className="text-[15.5px] leading-relaxed text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <div className="max-w-[60ch]">
          <Eyebrow>The difference</Eyebrow>
          <h2 className="mt-3 text-[28px] leading-tight">
            We can change the product, not just the ad
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              "When the signup flow is the reason conversions are low, we can fix the signup flow.",
              "Landing pages are built by the same team, so a test takes days rather than a change request.",
              "Tracking is set up properly at the source instead of inferred later.",
            ].map((p) => (
              <li key={p} className="flex gap-3 text-[15.5px] text-ink-2">
                <Check />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

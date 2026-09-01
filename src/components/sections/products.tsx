"use client";
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

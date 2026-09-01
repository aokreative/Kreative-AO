import type { Metadata } from "next";
import { Container, Eyebrow, Section, SignalRule } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "About",
  description:
    "A&O Kreative is a martech company: we build software and bring customers to it.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Frame src="/brand/about.jpg" alt="About" className="absolute inset-0 !h-full w-full z-0" priority />
        <div className="header-veil" />
        <Container className="relative z-10">
          <Eyebrow>About</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
            A martech company, in the literal sense
          </h1>
          <SignalRule className="mt-8 max-w-[200px]" />
        </Container>
      </section>

      <Section>
        <div className="flex max-w-[64ch] flex-col gap-6 text-[17px] leading-relaxed text-ink-2">
          <p>
            &ldquo;Martech&rdquo; usually means a company that sells marketing
            software. We mean something simpler: we do the marketing and we
            write the technology, and the two sides sit in the same room.
          </p>
          <p>
            That started for practical reasons. Building software for clients
            taught us how much of a product&apos;s success is decided by whether
            anyone hears about it. Running campaigns taught us how often the
            thing blocking a campaign is the product itself — a signup form, a
            slow page, a checkout that loses people. Owning both meant we could
            fix whichever one was actually broken.
          </p>
          <p>
            So we build our own products too. Duka POS is live and supporting
            real shops. An Agency Management System for insurance brokerages is
            in development. Our CRM isn&apos;t for sale — it exists because we
            needed one — but it is what the company runs on.
          </p>
          <p>
            Being our own customer keeps us honest. It is a different kind of
            attention when the support call comes to you.
          </p>
        </div>
      </Section>
    </>
  );
}

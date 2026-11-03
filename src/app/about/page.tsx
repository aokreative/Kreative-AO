import type { Metadata } from "next";
import { Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "About",
  description:
    "A&O Kreative is a martech company: we build software and bring customers to it.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A martech company, in the literal sense"
        intro={
          <p>
            We do the marketing and we write the technology, and the two sides sit
            in the same room.
          </p>
        }
      />

      <Section tone="white" className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-[17px] leading-relaxed text-ink-2">
          <div className="card glass md:col-span-12 flex flex-col md:flex-row overflow-hidden bg-surface">
            <div className="md:w-[45%] shrink-0 border-b md:border-b-0 md:border-r border-line-soft">
              <Frame src="/brand/about.jpg" alt="About us" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-6 p-8 flex-grow justify-center">
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
            </div>
          </div>

          <div className="card glass md:col-span-10 md:col-start-3 flex flex-col md:flex-row-reverse overflow-hidden bg-surface">
            <div className="md:w-[45%] shrink-0 border-b md:border-b-0 md:border-l border-line-soft">
              <Frame src="/brand/contact.jpg" alt="Our products" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-6 p-8 flex-grow justify-center">
              <p>
                So we build our own products too. Duka POS is live and supporting
                real shops. An Agency Management System for insurance brokerages is
                in development. Our CRM isn&apos;t for sale — it exists because we
                needed one — but it is what the company runs on.
              </p>
            </div>
          </div>

          <div className="card glass md:col-span-8 md:col-start-1 flex flex-col md:flex-row overflow-hidden bg-surface">
            <div className="md:w-[45%] shrink-0 border-b md:border-b-0 md:border-r border-line-soft">
              <Frame src="/brand/skyline.jpg" alt="Our perspective" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-6 p-8 flex-grow justify-center">
              <p>
                Being our own customer keeps us honest. It is a different kind of
                attention when the support call comes to you.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

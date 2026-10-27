import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Button, Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Marketing & AI Automation Agency for Dubai, UAE",
  description:
    "WhatsApp AI agents, lead routing, CRM pipelines and digital marketing for businesses in Dubai and the UAE, with a focus on real-estate sales teams.",
  alternates: { canonical: "/uae" },
};

const BUILDS = [
  {
    name: "WhatsApp AI agents",
    detail:
      "Reply to every enquiry in seconds, answer the common questions and collect the details your team needs, day or night.",
  },
  {
    name: "Lead qualification & routing",
    detail:
      "Score each lead on budget, area and timeline, then hand it to the right person with the full conversation attached.",
  },
  {
    name: "Sales pipelines & CRM",
    detail:
      "One pipeline for leads from ads, portals, your website and walk-ins, so nothing sits in someone's personal phone.",
  },
  {
    name: "Owner dashboards",
    detail:
      "Live numbers on lead volume, response times, conversion by agent and by source, without waiting for a weekly report.",
  },
  {
    name: "Paid ads & landing pages",
    detail:
      "Meta, Google and TikTok campaigns pointed at pages built to convert, with tracking that shows which spend brings buyers.",
  },
  {
    name: "Brand & content",
    detail:
      "Positioning, identity and a steady content calendar, so your brand looks as serious as the deals you close.",
  },
];

const REAL_ESTATE_PROBLEMS = [
  "Leads from portals and ads arrive faster than agents can reply",
  "Warm enquiries go cold overnight and over weekends",
  "Each agent works from their own WhatsApp, so management can't see the pipeline",
  "Nobody can say which campaign or portal actually produces closed deals",
];

const FAQS = [
  {
    q: "Do you work with UAE companies remotely?",
    a: "Yes. Discovery, build and support all run over video calls, WhatsApp and shared dashboards. When a project needs it, we plan time on the ground.",
  },
  {
    q: "What hours do you work?",
    a: "We're in Nairobi, one hour behind Dubai, so our working day overlaps almost completely with yours.",
  },
  {
    q: "Is this only for real estate?",
    a: "No. Real estate is where we see the most demand in the UAE, but the same systems work for clinics, car dealers, recruiters, training providers and any business that sells through enquiries.",
  },
  {
    q: "Do we have to change the tools we already use?",
    a: "Not usually. We connect to your existing WhatsApp Business number, CRM and ad accounts where we can, and only recommend replacing something when it's genuinely holding you back.",
  },
];

export default function UaePage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Eyebrow>Dubai · Abu Dhabi · across the UAE</Eyebrow>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            Sales automation and marketing for UAE businesses
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17.5px] leading-relaxed text-ink-2">
            We build the systems that answer, qualify and route your leads
            automatically, then run the marketing that fills them. A&amp;O
            Kreative is a Nairobi team working with businesses in Dubai and
            across the UAE, one hour behind you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/book" variant="accent">
              Book a call
            </Button>
            <Button href={SITE.whatsapp} variant="ghost" external>
              Message us on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <Section>
        <Eyebrow>What we build</Eyebrow>
        <h2 className="mt-3 max-w-[24ch] text-[clamp(26px,3.4vw,36px)] leading-tight">
          From first enquiry to signed deal, without the gaps
        </h2>
        <div className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {BUILDS.map((b) => (
            <div key={b.name} className="flex flex-col gap-2">
              <h3 className="text-[18px] leading-snug">{b.name}</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">{b.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>Real estate</Eyebrow>
            <h2 className="mt-3 text-[28px] leading-tight">
              Built for property sales teams
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
              In UAE real estate, the agency that replies first usually gets
              the viewing. We build lead systems for brokerages and developers
              that respond instantly on WhatsApp, qualify each buyer or tenant,
              and put them in front of the right agent while they&apos;re
              still interested.
            </p>
          </div>
          <div>
            <h3 className="label text-ink-3">What we usually find</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {REAL_ESTATE_PROBLEMS.map((p) => (
                <li key={p} className="flex gap-3 text-[15.5px] text-ink-2">
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Questions</Eyebrow>
        <h2 className="mt-3 text-[28px] leading-tight">Working with us from the UAE</h2>
        <dl className="mt-8 grid max-w-[72ch] gap-8">
          {FAQS.map((f) => (
            <div key={f.q}>
              <dt className="text-[17px] font-medium">{f.q}</dt>
              <dd className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{f.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/book" variant="accent">
            Book a call
          </Button>
          <Button href="/services/ai-automation" variant="ghost">
            See AI &amp; automation services
          </Button>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Button, Check, Eyebrow, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbSchema, FaqList, type Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "Website Design Company in Nairobi",
  description:
    "Fast, mobile-first websites for Nairobi businesses, built to show up on Google and turn visitors into WhatsApp enquiries. A fixed written quote before we start.",
  alternates: { canonical: "/website-design-nairobi" },
};

const INCLUDED = [
  { name: "Design around your brand", detail: "A clean, on-brand look that builds trust in the first few seconds, on a phone first." },
  { name: "Fast, mobile-first build", detail: "Most of your visitors arrive on a phone, often on mobile data. We build for that, so pages load quickly." },
  { name: "WhatsApp and enquiry forms", detail: "Click-to-chat on WhatsApp, call buttons and short forms, so every visitor has an obvious next step." },
  { name: "Leads that go somewhere", detail: "Enquiries land in your inbox, WhatsApp or CRM with the details you need, instead of getting lost." },
  { name: "SEO foundations", detail: "Page titles, descriptions, structured data, a sitemap and Google Search Console set up from day one." },
  { name: "Google Business Profile", detail: "We connect your site to your Business Profile, so you can show up on Maps when people search nearby." },
  { name: "Online shops", detail: "Product pages and checkout set up to sell, with the payment options your customers use." },
  { name: "Care and hosting", detail: "We keep the site fast, secure and up to date after launch, so it doesn't quietly break." },
];

const PRICE_FACTORS = [
  "How many pages you need, and who writes the words",
  "Whether you need an online shop, bookings or payments",
  "Photography, video and other content",
  "Connections to your CRM, POS or other tools",
  "More than one language, for example English and Swahili or Arabic",
  "Ongoing care, hosting and marketing after launch",
];

const STEPS = [
  { step: "01", title: "A short call", body: "We talk about your business, your customers and what the site has to do. No pitch deck." },
  { step: "02", title: "A written plan and price", body: "Pages, features, a timeline and a fixed price, in plain language. You approve it before we start." },
  { step: "03", title: "Design, then build", body: "You see the design first and give feedback. Then we build it, test it on real phones and connect your tools." },
  { step: "04", title: "Launch and grow", body: "We launch, set up Google Search Console and your Business Profile, and can run the ads and content that bring people to it." },
];

const FAQS: Faq[] = [
  {
    q: "How much does a website cost in Nairobi?",
    a: "It depends on what the site has to do. A few pages that introduce your business cost far less than an online shop with payments and stock. The biggest factors are the number of pages, online payments or bookings, content and photography, and connections to other tools. We give you a fixed written price after a short call, before any work starts.",
  },
  {
    q: "How long does it take to build a website?",
    a: "It depends on the size of the site and how quickly content and feedback come in. Your plan includes a timeline you approve before we start, and we keep you updated as we go.",
  },
  {
    q: "Will my website show up on Google?",
    a: "We build every site so Google can read and rank it: fast pages, clear titles and descriptions, structured data, a sitemap, and Search Console and Business Profile set up. Ranking for competitive searches also takes time, useful content and links, which we can help with after launch.",
  },
  {
    q: "Can you build an online shop?",
    a: "Yes. We set up product pages, a cart and checkout with the payment options your customers use, and can connect it to your stock or POS.",
  },
  {
    q: "Can visitors reach us on WhatsApp from the website?",
    a: "Yes. We add click-to-chat WhatsApp buttons with a pre-filled message, so enquiries arrive ready to answer.",
  },
  {
    q: "Do you host and maintain websites?",
    a: "Yes. We can host your site, keep it secure and up to date, and make changes as your business grows.",
  },
  {
    q: "Do you only work with businesses in Nairobi?",
    a: "No. We're based at The Piano in Westlands, Nairobi, and work with businesses across Kenya and in the UAE, mostly over calls and WhatsApp.",
  },
];

export default function WebsiteDesignNairobiPage() {
  return (
    <>
      <PageHero
        eyebrow="Website design · Nairobi"
        title="Website design in Nairobi that brings in enquiries"
        intro={
          <p>
            We design and build fast, mobile-first websites for Nairobi businesses,
            connected to WhatsApp, Google and your tools, so every visitor has a clear
            next step. One team in Westlands handles the design, the build and the
            marketing that sends people to it.
          </p>
        }
        wide
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/contact?interest=web-design" variant="accent">
            Get a quote
          </Button>
          <Button href={SITE.whatsapp} variant="ghost" external>
            Chat on WhatsApp
          </Button>
        </div>
        <p className="mt-4 text-[13.5px] text-ink-3">A fixed written price before we start.</p>
      </PageHero>

      <Section tone="white">
        <Eyebrow>What you get</Eyebrow>
        <h2 className="mt-3 max-w-[26ch] text-[clamp(26px,3.4vw,38px)] leading-tight">
          A website that works as hard as your best salesperson
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INCLUDED.map((i) => (
            <div key={i.name} className="lg flex flex-col gap-2 rounded-[24px] p-6">
              <h3 className="text-[17px] leading-snug">{i.name}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-2">{i.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="mist" className="pt-0">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-3 text-[28px] leading-tight">From first call to launch</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.step} className="lg flex flex-col gap-2 rounded-[24px] p-6">
              <span className="tnum text-[13px] font-semibold text-gold-deep">{s.step}</span>
              <h3 className="text-[18px] leading-snug">{s.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="lg grid gap-10 rounded-[32px] p-8 sm:p-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-3 text-[28px] leading-tight">What decides the price of a website</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
              No packages that make you pay for pages you don&apos;t need. Tell us
              what the site has to do and you get one fixed price in writing, before
              we start.
            </p>
            <div className="mt-6">
              <Button href="/contact?interest=web-design" variant="accent">
                Get a quote
              </Button>
            </div>
          </div>
          <ul className="grid content-start gap-3">
            {PRICE_FACTORS.map((f) => (
              <li key={f} className="flex gap-3 text-[15.5px] text-ink-2">
                <Check />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" className="pt-0">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="mt-3 text-[28px] leading-tight">Website design in Nairobi: what clients ask</h2>
        <FaqList items={FAQS} />
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/book" variant="accent">
            Book a call
          </Button>
          <Button href="/work" variant="ghost">
            See our work
          </Button>
        </div>
        <p className="mt-8 text-[15px] text-ink-2">
          Need customers as well as a website? See{" "}
          <Link href="/services/ads-growth" className="font-semibold text-accent-ink underline underline-offset-4">
            ads and growth
          </Link>{" "}
          and{" "}
          <Link href="/services/content-social" className="font-semibold text-accent-ink underline underline-offset-4">
            content and social
          </Link>
          .
        </p>
      </Section>

      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Website design in Nairobi", path: "/website-design-nairobi" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Website design and development",
            serviceType: "Website design",
            url: `${SITE.url}/website-design-nairobi`,
            provider: { "@id": `${SITE.url}/#organization` },
            areaServed: { "@type": "City", name: "Nairobi" },
          }),
        }}
      />
    </>
  );
}

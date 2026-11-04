import type { Metadata } from "next";
import Link from "next/link";
import { DUKA_TIERS, SITE, dukaTrialLink } from "@/lib/site";
import { Badge, Button, Check, Eyebrow, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";
import { BreadcrumbSchema, FaqList, type Faq } from "@/components/faq";

export const metadata: Metadata = {
  title: "POS System in Nairobi for Shops & Dukas",
  description:
    "Duka POS is a point of sale system for Nairobi shops: works offline, records cash and M-PESA in one sale and chases customer debts. From KES 2,999 a month.",
  alternates: { canonical: "/pos-system-nairobi" },
};

const PROBLEMS = [
  {
    title: "The network drops at the worst time",
    body: "The network goes down on a busy Saturday and the queue keeps growing. Duka POS keeps selling offline: sales are saved on the device and sync when you're back online.",
  },
  {
    title: "Half your customers pay by M-PESA",
    body: "Record cash, M-PESA or both in the same sale, so the end-of-day total matches what's in the till and on the Till statement.",
  },
  {
    title: "Madeni nobody follows up",
    body: "Duka POS keeps a list of who owes what and sends WhatsApp or SMS reminders, so the person at the counter doesn't have to chase regulars.",
  },
  {
    title: "You only know the numbers at month end",
    body: "Daily sales are ready when you lock up, with full sales and profit reports from Standard up. Check them on your phone, even on days you weren't in the shop.",
  },
  {
    title: "Staff you can't watch all day",
    body: "Each person signs in with their own account, so every sale and every shilling has a name next to it.",
  },
  {
    title: "A second branch on the way",
    body: "Run up to three shops from one account on Advanced, or more with a warehouse and stock transfers on Enterprise.",
  },
];

const SHOPS = [
  "Dukas and kiosks",
  "Mini-marts",
  "Boutiques and shoe shops",
  "Hardware shops",
  "Phone and electronics shops",
  "Cosmetics and beauty shops",
  "Agrovets",
  "Wholesalers",
];

const FAQS: Faq[] = [
  {
    q: "How much does a POS system cost in Nairobi?",
    a: "Duka POS starts at KES 2,999 a month for a single shop, with Standard at KES 5,999 and Advanced at KES 12,999. Every self-serve plan has a free trial. Because it runs on the phone, tablet or computer you already have, you don't have to buy a dedicated POS machine to get started.",
  },
  {
    q: "Does Duka POS work without internet?",
    a: "Yes. When the network drops, you keep selling. Sales are saved on the device and sync automatically once the connection is back.",
  },
  {
    q: "Can I record M-PESA payments?",
    a: "Yes. On Standard and above you can take cash, M-PESA or a mix of both in one sale, so your totals match the till at closing time.",
  },
  {
    q: "Do I need to buy special hardware?",
    a: "No. Duka POS runs in the browser on an Android phone, iPhone, tablet or computer. Open it, sign in and start selling.",
  },
  {
    q: "Can it track customers who owe me?",
    a: "Yes. It records each customer's balance and sends reminders on WhatsApp or SMS. Reminders are one tap on Starter and automatic from Standard up.",
  },
  {
    q: "Can I use it for more than one shop?",
    a: "Yes. Advanced covers up to three shops and 20 staff. Enterprise has unlimited shops and staff, a warehouse and stock transfers between branches.",
  },
  {
    q: "Who is behind Duka POS?",
    a: "Duka POS is built and supported by A&O Kreative, a technology and marketing team based at The Piano in Westlands, Nairobi.",
  },
];

export default function PosNairobiPage() {
  const tiers = DUKA_TIERS.filter((t) => t.price !== null);
  return (
    <>
      <PageHero
        eyebrow={<Badge tone="live">Duka POS · Nairobi</Badge>}
        title="A POS system for Nairobi shops that keeps selling offline"
        intro={
          <p>
            Duka POS runs on the phone, tablet or computer you already have. It
            records cash and M-PESA in the same sale, keeps selling when the network
            drops, and reminds customers who owe you. Built by A&amp;O Kreative in
            Westlands.
          </p>
        }
        wide
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={dukaTrialLink()} variant="accent" external>
            Start free trial
          </Button>
          <Button href={SITE.whatsapp} variant="ghost" external>
            Ask on WhatsApp
          </Button>
        </div>
        <p className="mt-4 text-[13.5px] text-ink-3">From KES 2,999 a month. Free trial on every self-serve plan.</p>
      </PageHero>

      <Section tone="white">
        <Eyebrow>Built for how Nairobi shops trade</Eyebrow>
        <h2 className="mt-3 max-w-[26ch] text-[clamp(26px,3.4vw,38px)] leading-tight">
          The problems we hear from shop owners, and what Duka POS does about them
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.title} className="lg flex flex-col gap-2 rounded-[24px] p-6">
              <h3 className="text-[18px] leading-snug">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" className="pt-0">
        <div className="lg grid gap-10 rounded-[32px] p-8 sm:p-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="mt-3 text-[28px] leading-tight">Any shop that sells over a counter</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
              Whether you run a kiosk in Kasarani, a boutique in the CBD or a hardware
              shop in Rongai, the basics are the same: sell fast, get paid, know your
              stock and know who owes you.
            </p>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {SHOPS.map((s) => (
              <li key={s} className="flex gap-3 text-[15.5px] text-ink-2">
                <Check />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" className="pt-0">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)] leading-tight">Priced in shillings, per month</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {tiers.map((t) => (
            <div key={t.name} className={`lg flex flex-col gap-2 rounded-[24px] p-6 ${t.featured ? "ring-2 ring-duka/60" : ""}`}>
              <p className="text-[13px] text-ink-3">{t.swahili}</p>
              <h3 className="text-[20px]">{t.name}</h3>
              <p className="tnum font-display text-[26px] leading-none text-ink">
                {t.priceLabel}
                <span className="font-body text-[13.5px] font-normal text-ink-3">/mo</span>
              </p>
              <p className="text-[14.5px] leading-snug text-ink-2">{t.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-ink-2">
          Running a chain or a warehouse?{" "}
          <Link href="/products/duka-pos" className="font-semibold text-accent-ink underline underline-offset-4">
            See Enterprise and every feature by plan
          </Link>
          .
        </p>
      </Section>

      <Section tone="mist" className="pt-0">
        <Eyebrow>Questions</Eyebrow>
        <h2 className="mt-3 text-[28px] leading-tight">POS systems in Nairobi: what shop owners ask</h2>
        <FaqList items={FAQS} />
      </Section>

      <Section tone="cream" className="pt-0">
        <Eyebrow>Further reading</Eyebrow>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["/blog/best-pos-system-for-shops-in-kenya", "Best POS system in Kenya: a shop owner's checklist"],
            ["/blog/mpesa-pos-for-your-shop", "M-PESA POS for Kenyan shops: Till vs Paybill"],
            ["/blog/how-to-track-customer-debts-madeni", "How to track customer debts (madeni) in your duka"],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="lg lg-lift rounded-[24px] p-6 text-[16px] font-semibold leading-snug text-ink">
              {label} <span className="text-accent-ink">→</span>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href={dukaTrialLink()} variant="accent" external>
            Start free trial
          </Button>
          <Button href="/contact?interest=duka-pos" variant="ghost">
            Talk to us first
          </Button>
        </div>
      </Section>

      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: "POS system in Nairobi", path: "/pos-system-nairobi" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Duka POS",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web, Android, iOS, Windows, macOS",
            url: `${SITE.url}/pos-system-nairobi`,
            publisher: { "@id": `${SITE.url}/#organization` },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "KES",
              lowPrice: 2999,
              highPrice: 12999,
              offerCount: 3,
            },
            areaServed: { "@type": "City", name: "Nairobi" },
          }),
        }}
      />
    </>
  );
}

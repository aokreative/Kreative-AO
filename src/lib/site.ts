export const SITE = {
  name: "A&O Kreative",
  tagline: "Crafting brands that command",
  /* The positioning line. Both halves of the business in one sentence. */
  promise: "We build the software, and we bring you the customers.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aokreative.vercel.app",
  email: "hello@aokreative.com",
} as const;

export type NavItem = { label: string; href: string; note?: string };

export const NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ---------------------------------------------------------------
   Products. Status drives every CTA — see spec §1.1.
   The CRM is deliberately absent: internal tool, not for sale.
--------------------------------------------------------------- */
export type ProductStatus = "live" | "building";

export type Product = {
  slug: string;
  name: string;
  status: ProductStatus;
  statusLabel: string;
  summary: string;
  audience: string;
  href: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "duka-pos",
    name: "Duka POS",
    status: "live",
    statusLabel: "Live now",
    summary:
      "Retail point of sale built for how shops here actually run — offline when the network drops, M-PESA when it doesn't, and debt reminders that go out on their own.",
    audience: "Kiosks, dukas, retail chains and wholesalers",
    href: "/products/duka-pos",
  },
  {
    slug: "ams",
    name: "Agency Management System",
    status: "building",
    statusLabel: "Launching 12 Nov",
    summary:
      "Policy administration, renewals and commission tracking for insurance agencies and brokerages, in one system instead of five spreadsheets.",
    audience: "Insurance agencies and brokerages",
    href: "/products/ams",
  },
];

/* ---------------------------------------------------------------
   Duka POS pricing — confirmed from the live app, 24 Aug 2026.
   Signup happens in the app, not on this site.
--------------------------------------------------------------- */
export type Tier = {
  name: string;
  swahili: string;
  price: number | null;
  priceLabel: string;
  blurb: string;
  features: string[];
  cta: { label: string; kind: "trial" | "sales" };
  featured?: boolean;
};

export const DUKA_TIERS: Tier[] = [
  {
    name: "Starter",
    swahili: "Duka Ndogo",
    price: 2999,
    priceLabel: "KES 2,999",
    blurb: "A single small kiosk or duka just getting started.",
    features: [
      "1 shop",
      "Up to 2 staff",
      "Up to 500 products",
      "Offline selling",
      "One-tap WhatsApp/SMS debt reminders",
      "Receipts & daily sales",
    ],
    cta: { label: "Start free trial", kind: "trial" },
  },
  {
    name: "Standard",
    swahili: "Duka",
    price: 5999,
    priceLabel: "KES 5,999",
    blurb: "A busy single shop that wants to get paid on time.",
    features: [
      "Everything in Starter",
      "Up to 6 staff",
      "Up to 3,000 products",
      "Automated debt reminders",
      "Full sales & profit reports",
      "M-PESA payments & split tender",
    ],
    cta: { label: "Start free trial", kind: "trial" },
    featured: true,
  },
  {
    name: "Advanced",
    swahili: "Duka Biashara",
    price: 12999,
    priceLabel: "KES 12,999",
    blurb: "A growing business with more than one branch.",
    features: [
      "Everything in Standard",
      "Up to 3 shops",
      "Up to 20 staff",
      "Up to 12,000 products",
      "Loyalty & customer points",
      "Priority support",
    ],
    cta: { label: "Start free trial", kind: "trial" },
  },
  {
    name: "Enterprise",
    swahili: "Duka Mtandao",
    price: null,
    priceLabel: "Custom pricing",
    blurb: "A chain or wholesaler running many shops and a warehouse.",
    features: [
      "Everything in Advanced",
      "Unlimited shops & staff",
      "Unlimited products",
      "Warehouse & stock transfers",
      "API access",
      "Dedicated account manager",
    ],
    cta: { label: "Contact sales", kind: "sales" },
  },
];

/* Signup lives in the app. UTMs attached so trial starts are attributable
   to this site — without them we cannot tell if the site produces customers. */
export const DUKA_APP_URL =
  process.env.NEXT_PUBLIC_DUKA_APP_URL ?? "https://dukapos.shop";

export function dukaTrialLink(tier?: string) {
  const u = new URL("/signup", DUKA_APP_URL);
  u.searchParams.set("utm_source", "aokreative");
  u.searchParams.set("utm_medium", "website");
  u.searchParams.set("utm_campaign", "duka_pos_trial");
  if (tier) u.searchParams.set("utm_content", tier.toLowerCase());
  return u.toString();
}

/* ---------------------------------------------------------------
   Cal.com booking.

   Five event types exist, but only three belong on a public page — a
   stranger should never be able to book "Client Onboarding". The other
   two are unlisted and shared directly with people who already work
   with us.
--------------------------------------------------------------- */
export const CAL_USERNAME =
  process.env.NEXT_PUBLIC_CAL_USERNAME ?? "aokreative";

export type CalEvent = {
  slug: string;
  name: string;
  minutes: number;
  purpose: string;
  who: string;
  featured?: boolean;
};

export const CAL_EVENTS_PUBLIC: CalEvent[] = [
  {
    slug: "discovery-call",
    name: "Discovery call",
    minutes: 30,
    purpose:
      "We learn what your business does, what's not working, and whether we're the right people to fix it.",
    who: "Start here if we haven't spoken before.",
    featured: true,
  },
  {
    slug: "marketing-strategy-session",
    name: "Marketing strategy session",
    minutes: 60,
    purpose:
      "A proper dig into your funnel — what you're spending, what it's returning, and where the leaks are.",
    who: "For businesses already marketing and unsure it's working.",
  },
  {
    slug: "ai-automation-consultation",
    name: "AI automation consultation",
    minutes: 45,
    purpose:
      "Where AI agents and automation genuinely save time in your business, and where they'd just add moving parts.",
    who: "For teams drowning in manual, repeatable work.",
  },
];

/* Existing clients only — deliberately not linked from the public site. */
export const CAL_EVENTS_PRIVATE: CalEvent[] = [
  {
    slug: "client-onboarding",
    name: "Client onboarding",
    minutes: 60,
    purpose: "Kick-off for new clients.",
    who: "Sent directly once an engagement is agreed.",
  },
  {
    slug: "follow-up-call",
    name: "Follow-up call",
    minutes: 30,
    purpose: "Continuing an existing conversation.",
    who: "Shared by your contact.",
  },
];

export function calLink(slug: string) {
  return `${CAL_USERNAME}/${slug}`;
}

/* ---------------------------------------------------------------
   Agency Management System launch.
   Stated publicly, so it is a commitment — not a marketing date.
--------------------------------------------------------------- */
export const AMS_LAUNCH = "2026-11-12T09:00:00+03:00";
export const AMS_LAUNCH_LABEL = "12 November 2026";

/* ---------------------------------------------------------------
   Services
--------------------------------------------------------------- */
export const SERVICES = [
  {
    slug: "marketing",
    name: "Digital marketing",
    href: "/services/marketing",
    summary:
      "Performance campaigns, social, content and SEO — measured against pipeline, not impressions.",
    points: [
      "Paid acquisition across Meta, Google and TikTok",
      "Content and SEO built to compound",
      "Social management with a real editorial line",
      "Reporting tied to leads and revenue",
    ],
  },
  {
    slug: "ai-automation",
    name: "AI automation",
    href: "/services/ai-automation",
    summary:
      "Agents and automations that take the repeatable work off your team — where it genuinely helps, and not where it doesn't.",
    points: [
      "Automating repetitive, rules-based work",
      "AI assistants that answer and qualify enquiries",
      "Connecting the tools you already pay for",
      "Honest scoping — including when not to automate",
    ],
  },
  {
    slug: "software",
    name: "Software development",
    href: "/services/software",
    summary:
      "Custom platforms, integrations and MVPs — from teams that ship and run their own products.",
    points: [
      "Web and mobile product builds",
      "Systems integration and API work",
      "MVPs taken from idea to live",
      "Ongoing maintenance and support",
    ],
  },
] as const;

export const INTERESTS = [
  { value: "marketing", label: "Digital marketing" },
  { value: "ai-automation", label: "AI automation" },
  { value: "software", label: "Custom software" },
  { value: "duka-pos", label: "Duka POS" },
  { value: "ams", label: "Agency Management System" },
  { value: "other", label: "Something else" },
] as const;

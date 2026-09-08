/**
 * Client case studies. Every number here came from A&O directly — nothing on
 * this page is illustrative. That is the whole point of the section: a case
 * study without real numbers reads as "we have nothing to show".
 */

export type Metric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  client: string;
  headline: string;
  category: string;
  tags: string;
  year: string;
  problem: string;
  work: string;
  metrics: Metric[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "adofresh-kenya",
    client: "AdoFresh Kenya",
    headline: "An export brand buyers overseas could take seriously",
    category: "Brand Strategy",
    tags: "Identity · Digital · B2B",
    year: "2024",
    problem:
      "A premium Kenyan produce exporter with a world-class product but a brand that looked local and generic — which made international buyers hesitate.",
    work:
      "Rebuilt the brand from the positioning up: an export-grade identity, a proper B2B website, and sales materials made to win the confidence of overseas distributors.",
    metrics: [
      { value: "3×", label: "More qualified export enquiries" },
      { value: "+212%", label: "Growth in B2B web traffic" },
      { value: "5", label: "New international markets" },
    ],
  },
  {
    slug: "hego-ventures",
    client: "Hego Ventures",
    headline: "A venture that looked investor-ready from day one",
    category: "Venture Brand",
    tags: "Identity · Strategy",
    year: "2024",
    problem:
      "A new investment venture entering a crowded market needed to look credible and ambitious from the very first impression.",
    work:
      "A full brand launch — name, identity, messaging and a digital flagship — that positioned Hego as a serious, future-facing player.",
    metrics: [
      { value: "6 wks", label: "From brief to full launch" },
      { value: "100%", label: "Investor-ready brand" },
      { value: "4×", label: "More inbound enquiries" },
    ],
  },
  {
    slug: "africaptions",
    client: "Africaptions",
    headline: "A content engine that outruns a bigger team",
    category: "Content & Social",
    tags: "Editorial · Social · Video",
    year: "2024",
    problem:
      "Great ideas, but no system — inconsistent posting, no clear voice, and engagement that had flatlined.",
    work:
      "Built a full content engine: a clear voice, a repeatable production process, and AI-assisted workflows that multiplied output while sharpening quality.",
    metrics: [
      { value: "10×", label: "Faster content production" },
      { value: "+340%", label: "Social engagement growth" },
      { value: "8", label: "Formats systematised" },
    ],
  },
  {
    slug: "techwizard-solutions",
    client: "TechWizard Solutions",
    headline: "One clear idea, instead of sounding like everyone else",
    category: "Market Entry",
    tags: "Strategy · Digital · B2B",
    year: "2024",
    problem:
      "A capable tech firm that sounded exactly like every competitor — all “innovative solutions,” nothing memorable.",
    work:
      "Sharp positioning built on one clear idea, a refreshed website, and a lead-gen system that turned that clarity into real pipeline.",
    metrics: [
      { value: "2.6×", label: "More qualified leads" },
      { value: "+180%", label: "More demo requests" },
      { value: "#1", label: "Ranking for core terms" },
    ],
  },
  {
    slug: "baple-gadgets",
    client: "Baple Gadgets",
    headline: "A storefront that sells, and an audience to send to it",
    category: "E-commerce",
    tags: "Web · Social · Retail",
    year: "2026",
    problem:
      "A premium Apple gadget and repair business that needed a storefront people could actually buy from, and an audience to send to it.",
    work:
      "Built the storefront the business could actually run — product pages, checkout and a repair booking flow — then put a consistent social presence behind it so there was traffic to send at it.",
    metrics: [
      { value: "5×", label: "Increase in sales" },
      { value: "+50%", label: "Traffic across all social platforms" },
    ],
  },
];

export function caseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Headline proof, used on the homepage. */
export const HEADLINE_STATS: Metric[] = [
  { value: "48+", label: "Brands helped grow across East Africa" },
  { value: "89%", label: "Of clients stay on after the first project" },
  { value: "3×", label: "Average lift in engagement delivered" },
];

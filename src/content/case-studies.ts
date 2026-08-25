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
    slug: "diamond-bay",
    client: "Diamond Bay Residences",
    headline: "Phase 1 sold out on a full-funnel campaign",
    category: "Real Estate",
    tags: "Campaign · Lead gen",
    year: "2024",
    problem:
      "A premium development needed to sell out Phase 1 quickly in a competitive coastal property market.",
    work:
      "A full-funnel campaign — aspirational creative, precise paid media, and a WhatsApp lead system that passed sales only warm, ready buyers.",
    metrics: [
      { value: "100%", label: "Phase 1 sold out" },
      { value: "3×", label: "Lead-to-viewing rate" },
      { value: "−38%", label: "Cost per qualified lead" },
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

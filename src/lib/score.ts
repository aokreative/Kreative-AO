/**
 * Lead scoring — deliberately simple and readable, no model.
 * Score >= 50 marks the internal alert as HOT.
 */

const FREE_MAIL = new Set([
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com",
  "icloud.com", "aol.com", "proton.me", "protonmail.com", "yandex.com",
]);

export type ScoreInput = {
  email: string;
  phone?: string | null;
  company?: string | null;
  budgetRange?: string | null;
  interest?: string | null;
  sourcePage?: string | null;
  fromChat?: boolean;
};

export function scoreLead(input: ScoreInput): number {
  let score = 0;

  const domain = input.email.split("@")[1]?.toLowerCase() ?? "";
  if (domain && !FREE_MAIL.has(domain)) score += 20;

  if (input.budgetRange) score += 20;
  if (input.phone) score += 10;
  if (input.company) score += 5;

  // The build-and-systems conversations carry the bigger tickets.
  const HIGH_TICKET = new Set([
    "ai-automation",
    "pos-erp",
    "web-design",
    "brand-strategy",
    "ams",
  ]);
  if (input.interest && HIGH_TICKET.has(input.interest)) score += 15;

  // Someone who read a case study before enquiring is further down the funnel.
  if (input.sourcePage?.startsWith("/work")) score += 10;

  if (input.fromChat) score += 15;

  return Math.min(score, 100);
}

export const HOT_THRESHOLD = 50;

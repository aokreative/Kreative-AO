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

  // Software, AI automation and the AMS are the higher-ticket conversations.
  if (
    input.interest === "software" ||
    input.interest === "ai-automation" ||
    input.interest === "ams"
  )
    score += 15;

  if (input.sourcePage?.includes("/work")) score += 10;
  if (input.fromChat) score += 15;

  return Math.min(score, 100);
}

export const HOT_THRESHOLD = 50;

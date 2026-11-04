import { createHmac, randomUUID } from "node:crypto";
import { INTERESTS } from "@/lib/site";

/**
 * Sends a website enquiry to the A&O CRM (aokreative-crm.vercel.app), where
 * it becomes a lead in New, or a note on the person's open lead, and admins
 * get a bell notification and a phone push.
 *
 * Signed with CRM_INTAKE_SECRET (the CRM holds the same value as
 * WEBSITE_INTAKE_SECRET): header  x-aok-signature: t=<unix>,v1=<hex>, where
 * v1 = HMAC-SHA256(secret, `${t}.${body}`). The CRM refuses anything unsigned
 * or more than five minutes old, and records each enquiry id once, so a retry
 * never creates a second lead.
 */
export type CrmEnquiry = {
  /** Stable id: a resend with the same id is recorded once. */
  id: string;
  kind: "contact" | "message" | "chat";
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  /** Interest value from the form (e.g. "duka-pos"); sent as its label. */
  interest?: string | null;
  budget?: string | null;
  message?: string | null;
  page?: string | null;
};

const interestLabel = (v?: string | null) =>
  v ? (INTERESTS.find((i) => i.value === v)?.label ?? v) : undefined;

export const hasCrm = () =>
  Boolean(process.env.CRM_INTAKE_URL && process.env.CRM_INTAKE_SECRET);

/** True once the CRM has the enquiry. Never throws. */
export async function sendToCrm(e: CrmEnquiry): Promise<boolean> {
  const url = process.env.CRM_INTAKE_URL;
  const secret = process.env.CRM_INTAKE_SECRET;
  if (!url || !secret) return false;

  const body = JSON.stringify({ ...e, id: e.id || randomUUID(), interest: interestLabel(e.interest) });

  // One retry for a network blip or a 5xx; the id makes the retry safe.
  for (let attempt = 1; attempt <= 2; attempt++) {
    const t = Math.floor(Date.now() / 1000);
    const v1 = createHmac("sha256", secret).update(`${t}.${body}`).digest("hex");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-aok-signature": `t=${t},v1=${v1}` },
        body,
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      });
      if (res.ok) return true;
      console.error(`[crm] intake returned ${res.status}`, (await res.text()).slice(0, 200));
      if (res.status < 500) return false;
    } catch (err) {
      console.error(`[crm] intake attempt ${attempt} failed`, err);
    }
  }
  return false;
}

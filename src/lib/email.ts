import { Resend } from "resend";
import { HOT_THRESHOLD } from "./score";

/**
 * Resend will not send from a domain it cannot verify. Until aokreative.com
 * exists and is verified, only the internal alert can be delivered (and only
 * to the account owner's address). Visitor-facing mail is gated behind this
 * flag — flip the env var on the day the domain is live and nothing else
 * needs to change.
 */
export const DOMAIN_VERIFIED =
  process.env.RESEND_DOMAIN_VERIFIED === "true";

const FROM = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
const NOTIFY = process.env.LEAD_NOTIFY_EMAIL;

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export type LeadEmail = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  interest?: string | null;
  budgetRange?: string | null;
  message?: string | null;
  sourcePage?: string | null;
  score: number;
};

/** Internal alert. Works with or without a verified domain. */
export async function sendInternalAlert(lead: LeadEmail) {
  const resend = client();
  if (!resend || !NOTIFY) return { skipped: true as const };

  const hot = lead.score >= HOT_THRESHOLD;
  const subject = `${hot ? "🔥 HOT " : ""}New lead · ${lead.name}${
    lead.company ? ` (${lead.company})` : ""
  } · ${lead.interest ?? "general"}`;

  const rows: [string, string | null | undefined][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Interested in", lead.interest],
    ["Budget", lead.budgetRange],
    ["From page", lead.sourcePage],
    ["Score", `${lead.score}/100`],
  ];

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#132F32;line-height:1.6">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6C8487">
        ${hot ? "High-value lead" : "New lead"}
      </p>
      <h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(lead.name)}</h2>
      <table cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#6C8487">${k}</td><td style="padding:4px 0"><b>${escapeHtml(
                String(v),
              )}</b></td></tr>`,
          )
          .join("")}
      </table>
      ${
        lead.message
          ? `<p style="margin:18px 0 6px;color:#6C8487;font-size:13px">Message</p>
             <p style="margin:0;padding:12px 14px;background:#F3EEE3;border-radius:8px;font-size:14px;white-space:pre-wrap">${escapeHtml(
               lead.message,
             )}</p>`
          : ""
      }
      <p style="margin:20px 0 0">
        <a href="mailto:${escapeHtml(lead.email)}?subject=Re:%20your%20enquiry"
           style="display:inline-block;background:#194044;color:#EFE4CF;padding:10px 18px;border-radius:7px;text-decoration:none;font-size:14px">
          Reply to ${escapeHtml(lead.name.split(" ")[0])}
        </a>
      </p>
    </div>`;

  return resend.emails.send({
    from: FROM,
    to: NOTIFY,
    replyTo: lead.email,
    subject,
    html,
  });
}

/** Visitor auto-reply. Requires a verified sending domain. */
export async function sendVisitorAutoReply(lead: LeadEmail) {
  if (!DOMAIN_VERIFIED) return { skipped: true as const, reason: "no-domain" };
  const resend = client();
  if (!resend) return { skipped: true as const, reason: "no-key" };

  const first = escapeHtml(lead.name.split(" ")[0]);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#132F32;line-height:1.65;max-width:520px">
      <h2 style="font-family:Georgia,serif;font-weight:500;font-size:24px;margin:0 0 14px">
        Thanks, ${first} — we've got it.
      </h2>
      <p style="margin:0 0 14px;font-size:15px">
        Your message about <b>${escapeHtml(
          labelFor(lead.interest),
        )}</b> has reached the team. Someone will reply within one business day.
      </p>
      <p style="margin:0 0 22px;font-size:15px">
        If it's easier to just talk, book a time that suits you:
      </p>
      <p style="margin:0 0 26px">
        <a href="${site}/book"
           style="display:inline-block;background:#B6571A;color:#FFF6EC;padding:12px 22px;border-radius:7px;text-decoration:none;font-size:14px;font-weight:600">
          Book a 15-minute call
        </a>
      </p>
      <p style="margin:0;font-size:13px;color:#6C8487">
        A&amp;O Kreative — crafting brands that command
      </p>
    </div>`;

  return resend.emails.send({
    from: FROM,
    to: lead.email,
    subject: "We've got your message — A&O Kreative",
    html,
  });
}

function labelFor(interest?: string | null) {
  switch (interest) {
    case "marketing": return "digital marketing";
    case "ai-automation": return "AI automation";
    case "software": return "custom software";
    case "duka-pos": return "Duka POS";
    case "ams": return "the Agency Management System";
    default: return "working with us";
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

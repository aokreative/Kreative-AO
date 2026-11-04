"use server";

import { z } from "zod";
import { hasSupabase, supabaseAdmin } from "@/lib/supabase";
import { scoreLead } from "@/lib/score";
import { sendInternalAlert, sendVisitorAutoReply } from "@/lib/email";
import { sendToCrm } from "@/lib/crm";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("That email doesn't look right."),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  interest: z
    .enum([
      "brand-strategy",
      "web-design",
      "content-social",
      "campaigns",
      "ads-growth",
      "ai-automation",
      "pos-erp",
      "duka-pos",
      "ams",
      "other",
    ])
    .optional(),
  budget_range: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more.").max(4000),
  source_page: z.string().max(300).optional().or(z.literal("")),
  // Honeypot: real people never fill this in.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  /** What the visitor typed, sent back on failure so the form keeps it. */
  values?: Record<string, string>;
};

const KEEP = ["name", "email", "phone", "company", "interest", "budget_range", "message"] as const;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = schema.safeParse(raw);
  const values = Object.fromEntries(
    KEEP.map((k) => [k, typeof raw[k] === "string" ? raw[k].slice(0, 4000) : ""]),
  );

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors, values };
  }

  const d = parsed.data;

  // Honeypot tripped — accept silently so bots don't learn anything.
  if (d.website) return { ok: true, message: "Thanks — we'll be in touch." };

  const score = scoreLead({
    email: d.email,
    phone: d.phone,
    company: d.company,
    budgetRange: d.budget_range,
    interest: d.interest,
    sourcePage: d.source_page,
  });

  // Save the lead to the database when it's set up. If it isn't, or the
  // save fails, the email alert still goes out, so no enquiry is lost.
  let id: string = crypto.randomUUID();
  let saved = false;
  if (hasSupabase()) {
    try {
      const { data, error } = await supabaseAdmin()
        .from("leads")
        .insert({
          name: d.name,
          email: d.email,
          phone: d.phone || null,
          company: d.company || null,
          interest: d.interest ?? "other",
          budget_range: d.budget_range || null,
          message: d.message,
          source_page: d.source_page || null,
          source: "form",
          score,
        })
        .select("id")
        .single();
      if (error) throw error;
      id = data.id as string;
      saved = true;
    } catch (err) {
      console.error("[contact] database save failed", err);
    }
  }

  const lead = {
    id,
    name: d.name,
    email: d.email,
    phone: d.phone,
    company: d.company,
    interest: d.interest,
    budgetRange: d.budget_range,
    message: d.message,
    sourcePage: d.source_page,
    score,
  };

  // The CRM is the record of every enquiry (lead + bell + phone push); the
  // email to the team is the backup if the CRM can't be reached.
  const [alert, , crm] = await Promise.allSettled([
    sendInternalAlert(lead),
    sendVisitorAutoReply(lead),
    sendToCrm({
      id,
      kind: d.source_page === "Ask us panel" ? "message" : "contact",
      name: d.name,
      email: d.email,
      phone: d.phone,
      company: d.company,
      interest: d.interest,
      budget: d.budget_range,
      message: d.message,
      page: d.source_page,
    }),
  ]);
  if (crm.status === "fulfilled" && crm.value) saved = true;
  const emailed =
    alert.status === "fulfilled" &&
    !("skipped" in alert.value) &&
    !("error" in alert.value && alert.value.error);
  if (alert.status === "rejected") console.error("[contact] alert email failed", alert.reason);
  else if (!emailed) console.error("[contact] alert email not sent", alert.value);

  if (!saved && !emailed) {
    return {
      ok: false,
      message:
        "Something went wrong on our side. Message us on WhatsApp (0182 297 245) or email info@aokreative.com.",
      values,
    };
  }
  return {
    ok: true,
    message: "Thanks — we've got it. We'll reply within one business day.",
  };
}

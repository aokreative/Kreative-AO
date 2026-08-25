"use server";

import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase";
import { scoreLead } from "@/lib/score";
import { sendInternalAlert, sendVisitorAutoReply } from "@/lib/email";

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
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, errors };
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

  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
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

    const lead = {
      id: data.id as string,
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

    // Fire both, but never let an email failure lose a captured lead.
    await Promise.allSettled([
      sendInternalAlert(lead),
      sendVisitorAutoReply(lead),
    ]);

    return {
      ok: true,
      message: "Thanks — we've got it. We'll reply within one business day.",
    };
  } catch (err) {
    console.error("[contact] submission failed", err);
    return {
      ok: false,
      message:
        "Something went wrong on our side. Email hello@aokreative.com and we'll pick it up there.",
    };
  }
}

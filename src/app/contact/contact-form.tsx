"use client";

import { useActionState, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { INTERESTS } from "@/lib/site";
import { submitContact, type ContactState } from "./actions";

const initial: ContactState = { ok: false };

const BUDGETS = [
  "Not sure yet",
  "Under KES 100k",
  "KES 100k – 500k",
  "KES 500k – 2M",
  "Over KES 2M",
];

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const params = useSearchParams();
  const pathname = usePathname();
  const [interest, setInterest] = useState("");

  useEffect(() => {
    const q = params.get("interest");
    if (q && INTERESTS.some((i) => i.value === q)) setInterest(q);
  }, [params]);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-8 shadow-e1"
      >
        <div aria-hidden className="signal h-1 w-12 rounded-full" />
        <h2 className="text-[24px] leading-tight">Message received</h2>
        <p className="text-[15.5px] text-ink-2">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="flex flex-col gap-5 rounded-lg border border-line bg-surface p-7 shadow-e1 sm:p-8"
      noValidate
    >
      <input type="hidden" name="source_page" value={pathname} />

      {/* Honeypot — visually hidden, never announced. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={state.errors?.name} required autoComplete="name" />
        <Field label="Email" name="email" type="email" error={state.errors?.email} required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" hint="Optional" autoComplete="tel" />
        <Field label="Company" name="company" hint="Optional" autoComplete="organization" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="interest" className="text-[13.5px] font-semibold text-ink-2">
            What&apos;s this about?
          </label>
          <select
            id="interest"
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="rounded-[7px] border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink"
          >
            <option value="">Choose one</option>
            {INTERESTS.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="budget_range" className="text-[13.5px] font-semibold text-ink-2">
            Budget <span className="font-normal text-ink-3">Optional</span>
          </label>
          <select
            id="budget_range"
            name="budget_range"
            className="rounded-[7px] border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink"
          >
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-[13.5px] font-semibold text-ink-2">
          What are you trying to do?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!state.errors?.message}
          className="rounded-[7px] border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink"
          placeholder="A sentence or two is plenty."
        />
        {state.errors?.message && <ErrorText>{state.errors.message}</ErrorText>}
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="text-[14px] text-accent-ink">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-[7px] bg-accent px-6 py-3 text-[14.5px] font-semibold text-on-accent transition-[filter] hover:brightness-95 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-[13px] text-ink-3">We reply within one business day.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  hint,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[13.5px] font-semibold text-ink-2">
        {label}{" "}
        {hint && <span className="font-normal text-ink-3">{hint}</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="rounded-[7px] border border-line bg-bg px-3.5 py-2.5 text-[15px] text-ink"
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p className="text-[13px] text-accent-ink">{children}</p>;
}

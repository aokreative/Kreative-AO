import type { Metadata } from "next";
import { AMS_LAUNCH, AMS_LAUNCH_LABEL } from "@/lib/site";
import { Countdown } from "@/components/countdown";
import { Badge, Button, Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Agency Management System",
  description:
    "Policy administration, renewals and commission tracking for insurance agencies and brokerages. Launching 12 November 2026 — join the waitlist for early access.",
};

const PROBLEMS = [
  "Policy records living in three spreadsheets and one person's memory",
  "Renewals missed because nothing chased them",
  "Commission reconciliation done by hand, monthly, badly",
  "No single view of which clients are actually profitable",
];

const PLANNED = [
  "Central policy and client register",
  "Automated renewal reminders to staff and clients",
  "Commission tracking and reconciliation",
  "Claims logging and status tracking",
  "Reporting for principals and underwriters",
  "Role-based access for agents and admin staff",
];

export default function AmsPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Badge tone="building">In development</Badge>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            One system for the agency, instead of five spreadsheets
          </h1>
          <p className="mt-6 max-w-[56ch] text-[17.5px] leading-relaxed text-ink-2">
            An Agency Management System for insurance agencies and brokerages —
            policies, renewals, claims and commissions in one place. It is being
            built now, and we are taking early access sign-ups from agencies who
            want to shape it.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <p className="label text-ink-3">
              Launching{" "}
              <time dateTime="2026-11-12" className="text-ink">
                {AMS_LAUNCH_LABEL}
              </time>
            </p>
            <Countdown target={AMS_LAUNCH} label={AMS_LAUNCH_LABEL} />
          </div>

          <div className="mt-8">
            <Button href="/contact?interest=ams" variant="accent">
              Join the waitlist
            </Button>
          </div>
          <p className="mt-4 text-[13.5px] text-ink-3">
            Not available to buy yet. No card, no commitment — waitlist members
            get access first on {AMS_LAUNCH_LABEL}.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-3 text-[28px] leading-tight">
              What we keep hearing from agencies
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex gap-3 text-[15.5px] text-ink-2">
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Planned for v1</Eyebrow>
            <h2 className="mt-3 text-[28px] leading-tight">
              What the first release covers
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {PLANNED.map((p) => (
                <li key={p} className="flex gap-3 text-[15.5px] text-ink-2">
                  <Check />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-ink-3">
              Scope is still moving. Agencies on the waitlist get asked what
              matters most before it&apos;s locked — which is the point of
              joining early rather than on launch day.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

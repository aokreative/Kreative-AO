import type { Metadata } from "next";
import { Check, Section } from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";
import { BookingOptions } from "@/components/booking";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a discovery call, a marketing strategy session, or an AI automation consultation with A&O Kreative.",
};

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a call"
        title="Pick the conversation you actually need"
        intro={
          <p>
            Three ways in, depending on how far along you are. If you&apos;re not
            sure, start with the discovery call. It&apos;s the shortest, and
            we&apos;ll point you at the right one from there.
          </p>
        }
      />

      <Section tone="white" className="pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <BookingOptions />

          <aside className="lg flex h-fit flex-col gap-7 rounded-[28px] p-7 sm:p-8">
            <div className="flex flex-col gap-3">
              <h2 className="label text-ink-3">What to expect</h2>
              <ul className="flex flex-col gap-2.5">
                {[
                  "No preparation needed — bring the problem, not a brief",
                  "We'll tell you if we're not the right fit",
                  "You get a written follow-up either way",
                  "Reschedule any time from the confirmation email",
                ].map((p) => (
                  <li key={p} className="flex gap-3 text-[14.5px] text-ink-2">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 border-t border-ink/10 pt-6">
              <h2 className="label text-ink-3">Already a client?</h2>
              <p className="text-[14.5px] text-ink-2">
                Onboarding and follow-up sessions are booked through the link
                your contact sent you, not from this page.
              </p>
            </div>

            <div className="flex flex-col gap-2 border-t border-ink/10 pt-6">
              <h2 className="label text-ink-3">Rather write first?</h2>
              <a
                href="/contact"
                className="w-fit text-[15.5px] text-accent-ink underline underline-offset-4"
              >
                Send a message instead
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Button, Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "AI automation",
  description:
    "AI agents and automation that take repeatable work off your team — scoped honestly, including where automation isn't the answer.",
};

/* DRAFT COPY — written from the service description, not yet confirmed by
   A&O. Review before launch; nothing here claims a specific client result. */

const WORK = [
  [
    "Repetitive work, automated",
    "The rules-based tasks that eat hours — data moving between systems, records being updated by hand, the same report rebuilt every week.",
  ],
  [
    "Assistants that answer and qualify",
    "An AI assistant that handles the questions your team answers twenty times a day, and passes on the ones worth a human.",
  ],
  [
    "Connecting what you already pay for",
    "Most businesses own the right tools and none of them talk. Integrations are usually cheaper than new software.",
  ],
  [
    "Knowing when not to automate",
    "Some processes are too varied, too high-stakes, or simply too rare to be worth automating. We will say so.",
  ],
];

export default function AiAutomationPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Eyebrow>Services · AI automation</Eyebrow>
          <h1 className="mt-4 max-w-[19ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            Automate the work nobody should be doing by hand
          </h1>
          <p className="mt-6 max-w-[56ch] text-[17.5px] leading-relaxed text-ink-2">
            AI is being sold as an answer to everything, which makes it hard to
            tell where it actually pays. We start from the work — what your team
            repeats, how often, and what it costs — and automate only the parts
            where the maths works.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/book" variant="accent">
              Book an automation consultation
            </Button>
            <Button href="/contact?interest=ai-automation" variant="ghost">
              Send a message
            </Button>
          </div>
          <p className="mt-4 text-[13.5px] text-ink-3">
            45 minutes. Bring the process that annoys your team most.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {WORK.map(([title, body]) => (
            <div key={title} className="flex flex-col gap-3">
              <h2 className="text-[21px] font-semibold">{title}</h2>
              <p className="text-[15.5px] leading-relaxed text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <div className="max-w-[62ch]">
          <Eyebrow>How we scope it</Eyebrow>
          <h2 className="mt-3 text-[28px] leading-tight">
            The cheapest automation is the one you didn&apos;t need to build
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              "We count the work first — how many times, how long, by whom.",
              "We look for the version that removes the step rather than automating it.",
              "Anything we build, we have to support, so we build the smallest thing that works.",
              "You get told plainly when a process isn't worth automating yet.",
            ].map((p) => (
              <li key={p} className="flex gap-3 text-[15.5px] text-ink-2">
                <Check />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-ink-2">
            We build our own tooling this way too — the assistant on this site
            was scoped the same way.
          </p>
        </div>
      </Section>
    </>
  );
}

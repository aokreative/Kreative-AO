import type { Metadata } from "next";
import { Button, Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Software development",
  description:
    "Custom platforms, integrations and MVPs from a team that ships and runs its own products.",
};

const WORK = [
  ["Product builds", "Web and mobile applications taken from scope to live, with the boring parts — auth, payments, permissions — done properly."],
  ["Integrations", "Getting the systems you already pay for to talk to each other, including M-PESA and third-party APIs."],
  ["MVPs", "A first version narrow enough to launch and honest enough to learn from."],
  ["Support", "Someone answers when it breaks at month six. We run our own products, so we know what that costs."],
];

export default function SoftwarePage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Container>
          <Eyebrow>Services · Software development</Eyebrow>
          <h1 className="mt-4 max-w-[19ch] text-[clamp(34px,5vw,58px)] leading-[1.04]">
            Built by a team that has to live with what it ships
          </h1>
          <p className="mt-6 max-w-[56ch] text-[17.5px] leading-relaxed text-ink-2">
            We run Duka POS in production for real shops, we&apos;re building an
            Agency Management System, and our own CRM is what the company runs
            on day to day. That changes how you write software.
          </p>
          <div className="mt-8">
            <Button href="/contact?interest=software" variant="accent">
              Scope a build with us
            </Button>
          </div>
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
          <Eyebrow>Proof</Eyebrow>
          <h2 className="mt-3 text-[28px] leading-tight">
            Three systems in production, one of them ours to support
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              "Duka POS — live, paying customers, offline-first retail in the field.",
              "Agency Management System — in active development for insurance agencies.",
              "Our internal CRM — not for sale, but it is what we run the business on.",
            ].map((p) => (
              <li key={p} className="flex gap-3 text-[15.5px] text-ink-2">
                <Check />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

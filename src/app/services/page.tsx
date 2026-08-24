import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/site";
import { Check, Container, Eyebrow, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital marketing, AI automation and custom software development from one accountable team.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-surface-2 py-16 sm:py-20">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
            Build it, automate it, then fill it
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] text-ink-2">
            Three service lines that most businesses buy from three different
            suppliers, from one team — which is why the handovers between them
            don&apos;t get dropped.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group flex flex-col gap-5 rounded-lg border border-line bg-surface p-8 shadow-e1 transition-colors hover:border-ink-3"
            >
              <h2 className="text-[24px] leading-tight">{s.name}</h2>
              <p className="text-[16px] text-ink-2">{s.summary}</p>
              <ul className="flex flex-col gap-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-ink-2">
                    <Check />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-2 text-[14px] font-semibold text-accent-ink group-hover:underline">
                More on {s.name} →
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

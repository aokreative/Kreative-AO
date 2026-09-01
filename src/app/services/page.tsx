import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand strategy, websites, content, campaigns, ads, AI automation and POS/ERP systems — from one Nairobi team.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Frame src="/brand/services/web-design.jpg" alt="Services" className="absolute inset-0 !h-full w-full z-0" priority />
        <div className="header-veil" />
        <Container className="relative z-10">
          <Eyebrow>What we do</Eyebrow>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
            Pick what you need most
          </h1>
          <p className="mt-6 max-w-[60ch] text-[17px] text-ink-2">
            No rigid packages. We scope each project around your goal and
            budget — whether that&apos;s one quick win or a long-term
            partnership. Here&apos;s the full range.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const isLarge = i === 0 || i === 3;
            const hasImage = isLarge;
            const imgSrc = `/brand/services/${s.slug}.jpg`;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-e1 transition-all hover:border-ink-3 hover:shadow-lg ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2 sm:flex-row items-stretch" :
                  i === 3 ? "sm:col-span-2 lg:col-span-2 sm:flex-row items-stretch" :
                  i === 6 ? "sm:col-span-2 lg:col-span-3 md:flex-row items-stretch" : ""
                } h-full`}
              >
                <div className={`shrink-0 border-b border-line ${
                  i === 0 || i === 3 ? "sm:w-[45%] sm:border-r sm:border-b-0" :
                  i === 6 ? "md:w-[45%] md:border-r md:border-b-0" : ""
                }`}>
                  <Frame src={`/brand/services/${s.slug}.jpg`} alt={s.name} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-3 p-8 flex-grow">
                  <h2 className={`${isLarge || i === 6 ? "text-[26px]" : "text-[22px]"} leading-tight`}>{s.name}</h2>
                  <p className="text-[13.5px] font-semibold text-accent-ink">
                    {s.kicker}
                  </p>
                  <p className={`text-[15px] leading-relaxed text-ink-2 ${isLarge ? "max-w-[42ch]" : ""}`}>
                    {s.summary}
                  </p>
                  <span className="mt-auto pt-3 text-[14px] font-semibold text-accent-ink group-hover:underline">
                    What&apos;s included →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="border-t border-line-soft bg-surface-2">
        <div className="mx-auto flex max-w-[54ch] flex-col items-center gap-6 text-center">
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.1]">
            Not sure where to start?
          </h2>
          <p className="text-[16.5px] text-ink-2">
            Tell us what&apos;s going on. We&apos;ll say honestly which one or
            two things would move the needle fastest — and which can wait.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/book" variant="accent">
              Book a discovery call
            </Button>
            <Button href="/contact" variant="ghost">
              Send a message
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

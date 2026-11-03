import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { Button, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Marketing, Branding & Automation Services",
  description:
    "Branding, websites, social media, ads, AI automation and POS systems from one Nairobi team, built to bring in customers for businesses in Kenya and the UAE.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Pick what you need most"
        intro={
          <p>
            No rigid packages. We scope each project around your goal and budget,
            whether that&apos;s one quick win or a long-term partnership. Here&apos;s
            the full range.
          </p>
        }
      />

      <Section tone="white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`lg lg-lift group flex h-full flex-col overflow-hidden rounded-[28px] ${
                  isLarge
                    ? "items-stretch sm:col-span-2 sm:flex-row lg:col-span-2"
                    : i === 6
                      ? "items-stretch sm:col-span-2 md:flex-row lg:col-span-3"
                      : ""
                }`}
              >
                <div
                  className={`m-2 shrink-0 overflow-hidden rounded-[22px] ${
                    isLarge ? "sm:w-[45%]" : i === 6 ? "md:w-[45%]" : ""
                  }`}
                >
                  <Frame src={`/brand/services/${s.slug}.jpg`} alt={s.name} className="h-full w-full" />
                </div>
                <div className="flex flex-grow flex-col gap-3 px-7 pb-8 pt-5 sm:pt-7">
                  <h2 className={`${isLarge || i === 6 ? "text-[26px]" : "text-[22px]"} leading-tight`}>
                    {s.name}
                  </h2>
                  <p className="text-[13.5px] font-semibold text-accent-ink">{s.kicker}</p>
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

      <Section tone="mist" className="pt-0">
        <div className="lg mx-auto flex max-w-[760px] flex-col items-center gap-6 rounded-[32px] px-6 py-12 text-center sm:px-12">
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.1]">Not sure where to start?</h2>
          <p className="max-w-[50ch] text-[16.5px] text-ink-2">
            Tell us what&apos;s going on. We&apos;ll say honestly which one or two
            things would move the needle fastest, and which can wait.
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

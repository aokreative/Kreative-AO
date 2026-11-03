import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";

type Tone = "white" | "cream" | "sand" | "mist";

/* Inner-page header: a liquid-glass panel floating over soft gold and
   navy light. Replaces the old full-bleed stock-photo headers. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  tone = "cream",
  wide = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  tone?: Tone;
  wide?: boolean;
}) {
  return (
    <section data-tone={tone} className="page-hero relative overflow-x-clip pb-6 pt-8 sm:pt-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[6%] top-[8%] h-[360px] w-[360px] rounded-full bg-gold/40 blur-[100px]" />
        <div className="absolute right-[4%] top-[28%] h-[400px] w-[400px] rounded-full bg-harbour/25 blur-[110px]" />
        <div className="absolute bottom-[-10%] left-[38%] h-[260px] w-[260px] rounded-full bg-gilt/45 blur-[90px]" />
      </div>
      <Container className="relative">
        <div className="lg rounded-[36px] px-6 py-12 sm:px-14 sm:py-16">
          {eyebrow && <div className="label text-ink-3">{eyebrow}</div>}
          <h1
            className={`mt-4 text-[clamp(34px,5vw,62px)] leading-[1.03] text-ink ${
              wide ? "max-w-[24ch]" : "max-w-[20ch]"
            }`}
          >
            {title}
          </h1>
          {intro && (
            <div className="mt-6 max-w-[58ch] text-[17.5px] leading-relaxed text-ink-2">{intro}</div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

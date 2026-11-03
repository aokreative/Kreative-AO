import Link from "next/link";
import { Button, Container } from "@/components/ui/primitives";
import { serviceBySlug } from "@/content/services";

const GROUPS = [
  {
    name: "Brand",
    line: "Get noticed and remembered.",
    slugs: ["brand-strategy", "content-social", "campaigns"],
  },
  {
    name: "Growth",
    line: "Bring the right people in.",
    slugs: ["ads-growth", "web-design"],
  },
  {
    name: "Systems",
    line: "Run the business once they arrive.",
    slugs: ["ai-automation", "pos-erp"],
  },
];

export function ServiceIndex() {
  return (
    <section className="relative pb-[var(--space-section)]">
      {/* Colour behind the glass panel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-x-clip">
        <div className="absolute left-[8%] top-[18%] h-[340px] w-[340px] rounded-full bg-gold/45 blur-[90px]" />
        <div className="absolute right-[10%] top-[30%] h-[380px] w-[380px] rounded-full bg-harbour/35 blur-[100px]" />
        <div className="absolute left-[42%] bottom-[0%] h-[260px] w-[260px] rounded-full bg-gilt/50 blur-[80px]" />
      </div>
      <Container className="relative">
        <div className="lg rounded-[32px] px-6 py-12 sm:px-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
            <div className="flex flex-col items-start gap-5">
              <h2 className="text-[clamp(30px,3.6vw,44px)] text-ink">What we do</h2>
              <p className="max-w-[34ch] text-[16.5px] leading-relaxed text-ink-3">
                Seven services in three groups. Most clients start with the one
                that hurts most, then add the rest as they grow.
              </p>
              <Button href="/services" variant="ghost" className="mt-2">
                All services
              </Button>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
              {GROUPS.map((g) => (
                <div key={g.name}>
                  <h3 className="text-[22px] text-ink">{g.name}</h3>
                  <p className="mt-1 text-[15px] text-ink-3">{g.line}</p>
                  <ul className="mt-6 flex flex-col">
                    {g.slugs.map((slug) => {
                      const s = serviceBySlug(slug);
                      if (!s) return null;
                      return (
                        <li key={slug} className="border-t border-ink/10">
                          <Link
                            href={`/services/${slug}`}
                            className="group flex flex-col gap-0.5 py-4"
                          >
                            <span className="text-[16.5px] font-semibold text-ink underline decoration-transparent decoration-1 underline-offset-4 transition-colors group-hover:decoration-gold">
                              {s.name}
                            </span>
                            <span className="text-[14.5px] text-ink-3">{s.kicker}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

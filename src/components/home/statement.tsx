import { Container } from "@/components/ui/primitives";

const FACTS = [
  {
    title: "Nairobi, one hour from Dubai",
    body: "A team in Westlands working with businesses across Kenya and the UAE, on your hours.",
  },
  {
    title: "Software we run ourselves",
    body: "Duka POS runs in real shops every day, so we build for the network drop and the busy Saturday.",
  },
  {
    title: "A plan and a price first",
    body: "Every project starts with a written plan, a timeline and a price you approve before we begin.",
  },
];

export function Statement() {
  return (
    <section className="py-[var(--space-section)]">
      <Container>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-[clamp(32px,4.6vw,58px)] text-ink">
            One team builds the system and runs the campaign.
          </h2>
          <p className="mx-auto mt-7 max-w-[58ch] text-[19px] leading-relaxed text-ink-2">
            Most businesses hire one company for their software and another for
            their marketing. The two never quite connect, and nobody owns the
            result. We do both, so what we build and how we sell it are planned
            together and judged by the same thing: customers who pay.
          </p>
        </div>

        <dl className="mx-auto mt-20 grid max-w-[1040px] gap-10 md:grid-cols-3 md:gap-12">
          {FACTS.map((f) => (
            <div key={f.title} className="border-t border-line pt-6">
              <dt className="text-[17px] font-semibold text-ink">{f.title}</dt>
              <dd className="mt-2 text-[15.5px] leading-relaxed text-ink-3">{f.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

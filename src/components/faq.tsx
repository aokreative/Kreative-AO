import { SITE } from "@/lib/site";

export type Faq = { q: string; a: string };

/* Question-and-answer list in glass cards, with matching FAQPage
   structured data so search engines can read the answers directly.
   Answers are plain text so the markup and the page say the same thing. */
export function FaqList({ items }: { items: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <dl className="mt-8 grid max-w-[80ch] gap-4">
        {items.map((f) => (
          <div key={f.q} className="lg rounded-[24px] p-6">
            <dt className="text-[17px] font-semibold text-ink">{f.q}</dt>
            <dd className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{f.a}</dd>
          </div>
        ))}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}

/* Breadcrumb structured data: Home › section › page. */
export function BreadcrumbSchema({ trail }: { trail: { name: string; path: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path === "/" ? "" : t.path}`,
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

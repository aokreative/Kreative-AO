import type { Metadata } from "next";
import { PRODUCTS, dukaTrialLink } from "@/lib/site";
import { Badge, Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software A&O Kreative builds and runs: Duka POS, live today, and an Agency Management System in development.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden border-b border-line-soft bg-surface-2 py-16 sm:py-24">
        <Frame src="/brand/products-duka.jpg" alt="Products" className="absolute inset-0 !h-full w-full z-0" priority />
        <div className="header-veil" />
        <Container className="relative z-10">
          <Eyebrow>Products</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
            Software we own, not just software we ship
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] text-ink-2">
            Two products in market. One you can buy today, one being built now —
            and we&apos;d rather say which is which than let you find out later.
          </p>
        </Container>
      </section>

      <Section>
        <div className="flex flex-col gap-6">
          {PRODUCTS.map((p) => {
            const imgSrc = p.slug === "duka-pos" ? "/brand/products-duka.jpg" : "/brand/products-ams.jpg";
            return (
              <div
                key={p.slug}
                className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-e1 md:flex-row"
              >
                <div className="md:w-[40%] shrink-0 border-b md:border-b-0 md:border-r border-line">
                  <Frame src={imgSrc} alt={p.name} className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-5 p-8 flex-grow">
                  <div className="flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <Badge tone={p.status === "live" ? "live" : "building"}>
                        {p.statusLabel}
                      </Badge>
                      <h2 className="mt-4 text-[27px] leading-tight">{p.name}</h2>
                      <p className="mt-3 text-[16px] text-ink-2">{p.summary}</p>
                      <p className="label mt-4 text-ink-3">{p.audience}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-2 flex flex-wrap gap-3">
                    {p.status === "live" ? (
                      <>
                        <Button href={dukaTrialLink()} variant="accent" external>
                          Start free trial
                        </Button>
                        <Button href={p.href} variant="ghost">
                          Pricing & features
                        </Button>
                      </>
                    ) : (
                      <Button href={p.href} variant="primary">
                        Join the waitlist
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-[62ch] text-[15px] text-ink-2">
          We also run our own CRM in production. It isn&apos;t for sale — it
          exists because we needed it — but it is a fair sample of what our{" "}
          <a className="text-accent-ink underline underline-offset-4" href="/services/software">
            software team
          </a>{" "}
          builds when the client is us.
        </p>
      </Section>
    </>
  );
}

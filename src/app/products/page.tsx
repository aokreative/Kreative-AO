import type { Metadata } from "next";
import { PRODUCTS, dukaTrialLink } from "@/lib/site";
import { Badge, Button, Container, Eyebrow, Section } from "@/components/ui/primitives";
import { Frame } from "@/components/frame";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Software A&O Kreative builds and runs: Duka POS, live today, and an Agency Management System in development.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden">
        {/* 1. BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 z-0">
          <Image src="/brand/products-duka.jpg" fill priority className="object-cover object-center" alt="Products" />
        </div>
        
        {/* 2. THE DARK VEIL LAYER (HARDCODED) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#06150F] via-[#06150F]/80 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#06150F]/90 via-[#06150F]/50 to-transparent"></div>

        {/* 3. THE TEXT CONTENT LAYER */}
        <div className="relative z-20 w-full container mx-auto px-6 grid lg:grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7 text-[#F3F0E6]">
            <Eyebrow>Products</Eyebrow>
            <h1 className="mt-4 max-w-[20ch] text-[clamp(34px,4.8vw,56px)] leading-[1.05]">
              Software we own, not just software we ship
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] text-[#F3F0E6]/90">
              Two products in market. One you can buy today, one being built now —
              and we&apos;d rather say which is which than let you find out later.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {PRODUCTS.map((p, i) => {
            const imgSrc = p.slug === "duka-pos" ? "/brand/products-duka.jpg" : "/brand/products-ams.jpg";
            const isFirst = i === 0;
            return (
              <div
                key={p.slug}
                className={`card glass flex flex-col overflow-hidden bg-surface ${
                  isFirst ? "md:col-span-12 md:flex-row" : "md:col-span-11 md:col-start-2 md:flex-row-reverse"
                }`}
              >
                <div className={`md:w-[45%] shrink-0 border-b md:border-b-0 ${isFirst ? "md:border-r" : "md:border-l"} border-line-soft`}>
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
          
          <div className="card glass md:col-span-8 md:col-start-3 flex flex-col md:flex-row overflow-hidden bg-surface">
            <div className="md:w-[45%] shrink-0 border-b md:border-b-0 md:border-r border-line-soft">
              <Frame src="/brand/skyline.jpg" alt="Internal software" className="w-full h-full" />
            </div>
            <div className="flex flex-col gap-5 p-8 flex-grow justify-center">
              <p className="text-[15px] text-ink-2">
                We also run our own CRM in production. It isn&apos;t for sale — it
                exists because we needed it — but it is a fair sample of what our{" "}
                <a className="text-accent-ink underline underline-offset-4" href="/services/software">
                  software team
                </a>{" "}
                builds when the client is us.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

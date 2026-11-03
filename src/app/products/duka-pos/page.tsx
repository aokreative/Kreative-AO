import type { Metadata } from "next";
import { DUKA_TIERS, dukaTrialLink } from "@/lib/site";
import {
  Badge,
  Button,
  Check,
  Eyebrow,
  Section,
} from "@/components/ui/primitives";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "POS System for Shops in Kenya — Duka POS",
  description:
    "Duka POS is a point of sale system for Kenyan shops: works offline, takes M-PESA and chases debts automatically. From KES 2,999/month with a free trial.",
};

export default function DukaPosPage() {
  return (
    <>
      <PageHero
        eyebrow={<Badge tone="live">Live now</Badge>}
        title="The shop keeps selling when the network doesn&apos;t"
        intro={
          <p>
            Duka POS is retail point of sale built for how shops here actually run.
            Offline when the connection drops, M-PESA when it doesn&apos;t, and debt
            reminders that chase customers so you don&apos;t have to.
          </p>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={dukaTrialLink()} variant="accent" external>
            Start free trial
          </Button>
          <Button href="/contact?interest=duka-pos" variant="ghost">
            Talk to us first
          </Button>
        </div>
        <p className="mt-4 text-[13.5px] text-ink-3">Free trial. Signup happens in the Duka POS app.</p>
      </PageHero>

      <Section tone="white">
        <div className="max-w-[62ch]">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="mt-3 text-[clamp(28px,3.4vw,40px)] leading-[1.1]">
            Four tiers, priced in shillings
          </h2>
          <p className="mt-4 text-[17px] text-ink-2">
            Per month. Start on the tier that matches your shop today — moving
            up takes a click.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DUKA_TIERS.map((t) => (
            <div
              key={t.name}
              className={`lg flex flex-col gap-4 rounded-[28px] p-6 ${
                t.featured ? "ring-2 ring-duka/60" : ""
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-[21px] font-semibold">{t.name}</h3>
                  {t.featured && (
                    <span className="label rounded-full bg-duka-tint px-2 py-0.5 text-duka-deep">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[13px] italic text-ink-3">
                  {t.swahili}
                </p>
              </div>

              <p className="tnum font-display text-[27px] leading-none text-ink">
                {t.priceLabel}
                {t.price !== null && (
                  <span className="font-body text-[13.5px] font-normal text-ink-3">
                    /mo
                  </span>
                )}
              </p>

              <p className="text-[14.5px] leading-snug text-ink-2">{t.blurb}</p>

              <ul className="flex flex-col gap-2">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[14px] text-ink-2">
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4">
                {t.cta.kind === "trial" ? (
                  <Button
                    href={dukaTrialLink(t.name)}
                    variant={t.featured ? "accent" : "ghost"}
                    external
                    className="w-full"
                  >
                    {t.cta.label}
                  </Button>
                ) : (
                  <Button
                    href="/contact?interest=duka-pos"
                    variant="primary"
                    className="w-full"
                  >
                    {t.cta.label}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[13.5px] text-ink-3">
          Prices in Kenyan shillings, per month. Enterprise is quoted per
          business — shops, warehouses and integrations all change the number.
        </p>
      </Section>

      <Section tone="mist" className="pt-0">
        <div className="lg mx-auto flex max-w-[760px] flex-col items-center gap-6 rounded-[32px] px-6 py-12 text-center sm:px-12">
          <h2 className="text-[clamp(26px,3.2vw,38px)] leading-[1.1]">
            Not sure which tier fits?
          </h2>
          <p className="text-[16.5px] text-ink-2">
            Tell us how many shops and staff you have and we&apos;ll tell you
            straight — including if the free trial on Starter is all you need
            for now.
          </p>
          <Button href="/contact?interest=duka-pos" variant="accent">
            Ask us
          </Button>
        </div>
      </Section>
    </>
  );
}

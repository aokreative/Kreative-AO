"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Badge, Button } from "@/components/ui/primitives";
import { dukaTrialLink } from "@/lib/site";

/* Halden-style product story: the phone stays put while the features
   scroll past, and the screen changes to match the one you're reading. */
const STEPS = [
  {
    title: "Keeps selling offline",
    body: "When the network drops, the counter keeps going. Sales are saved on the device and sync once you're back online.",
    screen: <SaleScreen />,
  },
  {
    title: "Cash and M‑PESA in one sale",
    body: "Split a payment however the customer pays. One sale, one receipt, and totals that match the till and the Till statement.",
    screen: <SplitScreen />,
  },
  {
    title: "Debts that chase themselves",
    body: "Duka POS records who owes what and reminds them on WhatsApp or SMS, so nobody at the counter has to ask.",
    screen: <DebtScreen />,
  },
  {
    title: "Know your day by closing time",
    body: "Sales, profit, cash against M-PESA and what to restock, ready when you lock up.",
    screen: <ReportScreen />,
  },
];

export function DukaStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="duka-title" className="bg-cloud py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
          {/* Left: the product, sticky on large screens */}
          <div className="lg:sticky lg:top-[calc(50vh-170px)] lg:h-fit">
            <Badge tone="live">Live in shops now</Badge>
            <h2 id="duka-title" className="mt-5 text-[clamp(36px,4.6vw,60px)] text-ink">
              Duka POS
            </h2>
            <p className="mt-4 max-w-[34ch] text-[19px] leading-relaxed text-ink-2">
              The point of sale we built for Kenyan shops. The shop keeps
              selling when the network doesn&apos;t.
            </p>
            <p className="mt-6 text-[15px] text-ink-3">
              From <span className="font-semibold text-ink">KES 2,999 a month</span>, with
              a free trial on every self-serve plan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={dukaTrialLink()} variant="accent" external>
                Start free trial
              </Button>
              <Button href="/products/duka-pos" variant="ghost" className="bg-white">
                See plans
              </Button>
            </div>
          </div>

          {/* Centre: the phone, sticky on large screens */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-300px)]">
              <Phone>
                {STEPS.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {s.screen}
                  </div>
                ))}
              </Phone>
            </div>
          </div>

          {/* Right: the features that drive the screen */}
          <div className="flex flex-col">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                data-step={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex flex-col justify-center py-8 lg:min-h-[78vh] lg:py-0"
              >
                <h3
                  className={`text-[24px] transition-colors duration-300 ${
                    i === active ? "text-ink" : "text-ink lg:text-haze"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-3 max-w-[38ch] text-[16.5px] leading-relaxed transition-colors duration-300 ${
                    i === active ? "text-ink-3" : "text-ink-3 lg:text-haze"
                  }`}
                >
                  {s.body}
                </p>
                <div className="mt-8 flex justify-center lg:hidden">
                  <Phone small>{s.screen}</Phone>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Device and screens (illustrative, not live data) ---------- */

function Phone({ children, small = false }: { children: ReactNode; small?: boolean }) {
  return (
    <div
      className={`relative rounded-[48px] bg-midnight p-[9px] shadow-[0_40px_80px_-40px_rgba(19,35,58,0.55)] ${
        small ? "h-[540px] w-[262px]" : "h-[600px] w-[292px]"
      }`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[40px] bg-white">
        <div className="absolute left-1/2 top-2.5 z-10 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-midnight" />
        <div className="flex h-11 items-end justify-between px-7 pb-1 text-[12px] font-semibold text-ink">
          <span className="tnum">9:41</span>
          <span className="flex items-center gap-1" aria-hidden>
            <span className="h-2 w-3.5 rounded-[2px] border border-ink" />
          </span>
        </div>
        <div className="relative h-[calc(100%-44px)]">{children}</div>
      </div>
    </div>
  );
}

function AppBar({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-2">
      <div>
        <p className="text-[11px] text-ink-3">Baraka Mini Mart</p>
        <p className="text-[17px] font-semibold text-ink">{title}</p>
      </div>
      {right}
    </div>
  );
}

function Row({ name, detail, amount }: { name: string; detail?: string; amount: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line-soft py-2.5">
      <div>
        <p className="text-[13px] font-medium text-ink">{name}</p>
        {detail && <p className="text-[11px] text-ink-3">{detail}</p>}
      </div>
      <p className="tnum text-[13px] text-ink">{amount}</p>
    </div>
  );
}

function SaleScreen() {
  return (
    <div className="flex h-full flex-col">
      <AppBar
        title="New sale"
        right={
          <span className="rounded-full bg-[#FFF4DB] px-2.5 py-1 text-[11px] font-semibold text-[#7F6119]">
            Offline
          </span>
        }
      />
      <div className="mx-5 rounded-xl bg-cloud px-3 py-2.5 text-[11.5px] leading-snug text-ink-2">
        No network. Sales are saved on this phone and will sync automatically.
      </div>
      <div className="mt-2 px-5">
        <Row name="Unga 2kg" detail="2 × KES 230" amount="460" />
        <Row name="Sugar 1kg" detail="1 × KES 170" amount="170" />
        <Row name="Cooking oil 1L" detail="1 × KES 340" amount="340" />
        <Row name="Bread 400g" detail="1 × KES 65" amount="65" />
      </div>
      <div className="mt-auto px-5 pb-6">
        <div className="flex items-baseline justify-between">
          <span className="text-[13px] text-ink-3">Total</span>
          <span className="tnum text-[26px] font-semibold text-ink">KES 1,035</span>
        </div>
        <div className="mt-3 flex h-11 items-center justify-center rounded-2xl bg-duka text-[14px] font-semibold text-white">
          Charge KES 1,035
        </div>
      </div>
    </div>
  );
}

function SplitScreen() {
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Payment" />
      <div className="px-5">
        <p className="text-[12px] text-ink-3">Amount due</p>
        <p className="tnum text-[32px] font-semibold text-ink">KES 4,200</p>
      </div>
      <div className="mt-5 flex flex-col gap-2.5 px-5">
        <div className="rounded-2xl border border-line-soft px-4 py-3">
          <div className="flex justify-between text-[13px]">
            <span className="font-semibold text-ink">Cash</span>
            <span className="tnum text-ink">1,800</span>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-duka px-4 py-3">
          <div className="flex justify-between text-[13px]">
            <span className="font-semibold text-ink">M-PESA</span>
            <span className="tnum text-ink">2,400</span>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-duka-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-duka" />
            Confirmed, code QJK7H2M1XP
          </p>
        </div>
        <div className="flex justify-between px-1 pt-1 text-[12px] text-ink-3">
          <span>Remaining</span>
          <span className="tnum">0</span>
        </div>
      </div>
      <div className="mt-auto px-5 pb-6">
        <div className="flex h-11 items-center justify-center rounded-2xl bg-duka text-[14px] font-semibold text-white">
          Complete sale
        </div>
      </div>
    </div>
  );
}

function DebtScreen() {
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Customers who owe" />
      <div className="px-5">
        <Row name="Mama Achieng" detail="Due today" amount="650" />
        <Row name="John Kamau" detail="Due Friday" amount="1,200" />
        <Row name="Faith Njeri" detail="Due 30 Nov" amount="480" />
      </div>
      <div className="mx-5 mt-5 rounded-2xl bg-[#E9F7EE] p-3">
        <p className="text-[11px] font-semibold text-duka-deep">WhatsApp reminder sent 9:00</p>
        <div className="mt-2 rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12px] leading-snug text-ink shadow-sm">
          Habari Mama Achieng, a reminder that your balance of KES 650 at
          Baraka Mini Mart is due today. Asante!
        </div>
      </div>
      <div className="mt-auto px-5 pb-6 text-center text-[12px] text-ink-3">
        Total owed to the shop <span className="tnum font-semibold text-ink">KES 2,330</span>
      </div>
    </div>
  );
}

function ReportScreen() {
  return (
    <div className="flex h-full flex-col">
      <AppBar title="Today" />
      <div className="grid grid-cols-2 gap-2.5 px-5">
        {[
          ["Sales", "38,450"],
          ["Profit", "9,120"],
          ["Cash", "14,200"],
          ["M-PESA", "24,250"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-cloud px-3 py-3">
            <p className="text-[11px] text-ink-3">{k}</p>
            <p className="tnum text-[17px] font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 px-5">
        <p className="text-[12px] font-semibold text-ink">Running low</p>
        <Row name="Unga 2kg" detail="6 left" amount="Reorder" />
        <Row name="Milk 500ml" detail="4 left" amount="Reorder" />
      </div>
      <div className="mt-auto px-5 pb-6 text-center text-[12px] text-ink-3">
        Cash and M-PESA match the till
      </div>
    </div>
  );
}

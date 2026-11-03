"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { Badge, Button } from "@/components/ui/primitives";
import { dukaTrialLink } from "@/lib/site";

/* Product story. As the page scrolls, the app inside the phone scrolls
   with it: one long Duka POS screen moving under a glass nav bar and tab
   bar, landing on each feature as its copy reaches the middle. */
const STEPS = [
  {
    tab: "Sell",
    title: "Keeps selling offline",
    body: "When the network drops, the counter keeps going. Sales are saved on the device and sync once you're back online.",
    screen: "New sale",
  },
  {
    tab: "Pay",
    title: "Cash and M‑PESA in one sale",
    body: "Split a payment however the customer pays. One sale, one receipt, and totals that match the till and the Till statement.",
    screen: "Payment",
  },
  {
    tab: "Owed",
    title: "Debts that chase themselves",
    body: "Duka POS records who owes what and reminds them on WhatsApp or SMS, so nobody at the counter has to ask.",
    screen: "Customers",
  },
  {
    tab: "Today",
    title: "Know your day by closing time",
    body: "Sales, profit, cash against M-PESA and what to restock, ready when you lock up.",
    screen: "Today",
  },
];

const TOASTS = [
  { app: "Duka POS", title: "Offline mode", body: "14 sales saved on this phone. They sync when the network is back." },
  { app: "M-PESA", title: "Payment received", body: "KES 2,400 confirmed. Code QJK7H2M1XP." },
  { app: "WhatsApp", title: "Reminder delivered", body: "Mama Achieng has read your reminder for KES 650." },
  { app: "Duka POS", title: "Day closed", body: "KES 38,450 in sales. Cash and M-PESA match the till." },
];

const LAST = STEPS.length - 1;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function DukaStory() {
  const [active, setActive] = useState(0);
  // Fractional position through the steps, 0 → 3. Drives the phone.
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 220, damping: 34, mass: 0.6 });

  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let last = -1;

    const measure = () => {
      raf = 0;
      const vh = window.innerHeight;
      let f = 0;
      if (wide.matches) {
        // Desktop: follow the copy. Each block's centre crossing the
        // middle of the screen lands the phone on that feature.
        const c = stepRefs.current.map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return r.top + r.height / 2 - vh / 2;
        });
        if (c[0] > 0) f = 0;
        else if (c[LAST] <= 0) f = LAST;
        else {
          for (let i = 0; i < LAST; i++) {
            if (c[i] <= 0 && c[i + 1] > 0) {
              f = i + -c[i] / (c[i + 1] - c[i]);
              break;
            }
          }
        }
      } else if (trackRef.current) {
        // Phones: a pinned stage; progress through the track scrolls the app.
        // The stage pins at 76px and is (vh - 88px) tall.
        const r = trackRef.current.getBoundingClientRect();
        const run = r.height - (vh - 88);
        f = clamp((76 - r.top) / Math.max(run, 1), 0, 1) * LAST;
      }
      progress.set(f);
      const a = Math.round(f);
      if (a !== last) {
        last = a;
        setActive(a);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    wide.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      wide.removeEventListener("change", onScroll);
    };
  }, [progress]);

  const intro = (
    <div>
      <Badge tone="live">Live in shops now</Badge>
      <h2 id="duka-title" className="mt-5 text-[clamp(36px,4.6vw,60px)] text-ink">
        Duka POS
      </h2>
      <p className="mt-4 max-w-[34ch] text-[19px] leading-relaxed text-ink-2">
        The point of sale we built for Kenyan shops. The shop keeps selling
        when the network doesn&apos;t.
      </p>
      <p className="mt-6 text-[15px] text-ink-3">
        From <span className="font-semibold text-ink">KES 2,999 a month</span>, with a free
        trial on every self-serve plan.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button href={dukaTrialLink()} variant="accent" external>
          Start free trial
        </Button>
        <Button href="/products/duka-pos" variant="ghost">
          See plans
        </Button>
      </div>
    </div>
  );

  return (
    <section data-tone="white" aria-labelledby="duka-title" className="relative py-[var(--space-section)]">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-14">
          {/* Copy: left column on desktop, first on phones */}
          <div className="lg:sticky lg:top-[calc(50vh-170px)] lg:h-fit">{intro}</div>

          {/* Desktop: phone in the centre, features on the right */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-300px)]">
              <div aria-hidden className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 blur-[90px]" />
              <ScrollPhone progress={smooth} active={active} className="h-[600px] w-[292px]" />
            </div>
          </div>

          <div className="hidden flex-col lg:flex">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="flex min-h-[78vh] flex-col justify-center"
              >
                <p className={`tnum text-[13px] font-semibold transition-colors duration-300 ${i === active ? "text-gold-deep" : "text-haze"}`}>
                  0{i + 1}
                </p>
                <h3 className={`mt-2 text-[24px] transition-colors duration-300 ${i === active ? "text-ink" : "text-haze"}`}>
                  {s.title}
                </h3>
                <p className={`mt-3 max-w-[38ch] text-[16.5px] leading-relaxed transition-colors duration-300 ${i === active ? "text-ink-3" : "text-haze"}`}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Phones: the phone pins while the app inside it scrolls */}
          <div ref={trackRef} className="relative mt-12 h-[380svh] lg:hidden">
            <div className="sticky top-[76px] flex h-[calc(100svh-88px)] flex-col items-center justify-center gap-4">
              <div className="relative">
                <div aria-hidden className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[70px]" />
                <ScrollPhone
                  progress={smooth}
                  active={active}
                  className="aspect-[292/600] h-[clamp(380px,calc(100svh-330px),500px)]"
                />
              </div>
              <div className="flex gap-1.5" aria-hidden>
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-midnight" : "w-1.5 bg-haze"}`}
                  />
                ))}
              </div>
              <div className="relative h-[120px] w-full max-w-[360px]">
                {STEPS.map((s, i) => (
                  <div
                    key={s.title}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 text-center transition-all duration-500 ${
                      i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
                    }`}
                  >
                    <h3 className="text-[21px] text-ink">{s.title}</h3>
                    <p className="mx-auto mt-2 max-w-[36ch] text-[15px] leading-relaxed text-ink-3">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Device (illustrative screens, not live data) ---------- */

const NAV_H = 96; // status bar + glass title bar
const TAB_H = 64; // glass tab bar

function ScrollPhone({
  progress,
  active,
  className,
}: {
  progress: MotionValue<number>;
  active: number;
  className: string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screen = screenRef.current;
    const feed = feedRef.current;
    if (!screen || !feed) return;
    let tops: number[] = [];
    let max = 0;

    const apply = (v: number) => {
      if (!tops.length) return;
      const i = clamp(Math.floor(v), 0, tops.length - 1);
      const t = v - i;
      const a = tops[i];
      const b = tops[Math.min(i + 1, tops.length - 1)];
      const y = clamp(a + (b - a) * t, 0, max);
      feed.style.transform = `translate3d(0, ${-y}px, 0)`;
    };
    const measure = () => {
      if (!screen.clientHeight) return;
      const segs = Array.from(feed.children) as HTMLElement[];
      tops = segs.map((s) => s.offsetTop - NAV_H);
      max = Math.max(0, feed.offsetHeight - screen.clientHeight);
      apply(progress.get());
    };
    const ro = new ResizeObserver(measure);
    ro.observe(screen);
    ro.observe(feed);
    const off = progress.on("change", apply);
    measure();
    return () => {
      ro.disconnect();
      off();
    };
  }, [progress]);

  return (
    <div className={`relative rounded-[48px] bg-midnight p-[9px] shadow-[0_40px_80px_-40px_rgba(19,35,58,0.55)] ${className}`}>
      <div
        ref={screenRef}
        className="relative h-full w-full overflow-hidden rounded-[40px] bg-[#F2F3F6] [container-type:size]"
      >
        {/* The app, one long screen */}
        <div ref={feedRef} className="absolute inset-x-0 top-0 will-change-transform" style={{ paddingTop: NAV_H, paddingBottom: TAB_H }}>
          <Segment label="Sale 1043 · saved on this phone">
            <SaleFeed />
          </Segment>
          <Segment label="Checkout">
            <PayFeed />
          </Segment>
          <Segment label="Customers who owe">
            <OwedFeed />
          </Segment>
          <Segment label="Today, Tuesday">
            <TodayFeed />
          </Segment>
        </div>

        {/* Glass title bar with the status bar inside it */}
        <div className="absolute inset-x-0 top-0 z-10 border-b border-white/70 bg-white/55 backdrop-blur-xl backdrop-saturate-[1.8]" style={{ height: NAV_H }}>
          <div className="absolute left-1/2 top-2.5 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-midnight" />
          <div className="flex h-11 items-end justify-between px-7 pb-1 text-[12px] font-semibold text-ink">
            <span className="tnum">9:41</span>
            <span className="h-2 w-3.5 rounded-[2px] border border-ink" aria-hidden />
          </div>
          <div className="relative px-5 pt-1">
            <p className="text-[10.5px] text-ink-3">Baraka Mini Mart</p>
            <div className="relative h-6">
              {STEPS.map((s, i) => (
                <p
                  key={s.screen}
                  className={`absolute inset-0 text-[18px] font-semibold leading-6 text-ink transition-all duration-300 ${
                    i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-2 opacity-0" : "translate-y-2 opacity-0"
                  }`}
                >
                  {s.screen}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Glass tab bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-start justify-around border-t border-white/70 bg-white/55 px-3 pt-2 backdrop-blur-xl backdrop-saturate-[1.8]" style={{ height: TAB_H }}>
          {STEPS.map((s, i) => (
            <span key={s.tab} className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors duration-300 ${i === active ? "text-duka" : "text-ink-3"}`}>
              <TabIcon i={i} />
              {s.tab}
            </span>
          ))}
        </div>
      </div>
      <Toast key={active} {...TOASTS[active]} />
    </div>
  );
}

/* iOS-style notification on frosted glass. Drops in, then slides away. */
function Toast({ app, title, body }: { app: string; title: string; body: string }) {
  return (
    <div className="lg toast-life absolute left-1/2 top-[50px] z-20 w-[calc(100%+16px)] -translate-x-1/2 rounded-[22px] px-4 py-3 text-left">
      <p className="flex items-center gap-2 text-[11px] font-semibold text-ink-3">
        <span className="h-3.5 w-3.5 rounded-[4px] bg-duka" aria-hidden />
        {app}
        <span className="ml-auto font-normal">now</span>
      </p>
      <p className="mt-1 text-[13px] font-semibold text-ink">{title}</p>
      <p className="text-[12.5px] leading-snug text-ink-2">{body}</p>
    </div>
  );
}

function TabIcon({ i }: { i: number }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" aria-hidden>
      {i === 0 && (
        <>
          <path {...p} d="M3 4h2l2.2 10.5a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
          <circle {...p} cx="9.5" cy="19.5" r="1.2" />
          <circle {...p} cx="17" cy="19.5" r="1.2" />
        </>
      )}
      {i === 1 && (
        <>
          <rect {...p} x="3" y="6" width="18" height="12" rx="2.5" />
          <path {...p} d="M3 10h18M7 14.5h3" />
        </>
      )}
      {i === 2 && (
        <>
          <circle {...p} cx="9" cy="8.5" r="3.2" />
          <path {...p} d="M3.5 19c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6M15.5 5.6a3 3 0 0 1 0 5.8M17.5 14.7c1.5.6 2.6 2 3 4.3" />
        </>
      )}
      {i === 3 && <path {...p} d="M4 20V10M10 20V4M16 20v-7M22 20H2" />}
    </svg>
  );
}

/* Each part of the long screen is at least one visible screen tall, so
   the phone can land on it exactly. */
function Segment({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="px-3.5 pt-3" style={{ minHeight: `calc(100cqh - ${NAV_H + TAB_H}px)` }}>
      <p className="px-1.5 pb-2 text-[11px] font-medium text-ink-3">{label}</p>
      {children}
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white px-3.5 py-1 shadow-[0_1px_2px_rgba(19,35,58,0.05)] ${className}`}>{children}</div>;
}

function Row({ name, detail, amount, last = false }: { name: string; detail?: string; amount: string; last?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between py-2.5 ${last ? "" : "border-b border-line-soft"}`}>
      <div>
        <p className="text-[13px] font-medium text-ink">{name}</p>
        {detail && <p className="text-[11px] text-ink-3">{detail}</p>}
      </div>
      <p className="tnum text-[13px] text-ink">{amount}</p>
    </div>
  );
}

function GreenButton({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 flex h-11 items-center justify-center rounded-2xl bg-duka text-[14px] font-semibold text-white">
      {children}
    </div>
  );
}

function SaleFeed() {
  return (
    <>
      <div className="mb-2.5 flex items-center gap-2 rounded-2xl bg-[#FFF4DB] px-3.5 py-2.5 text-[11.5px] leading-snug text-[#7F6119]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#D49B1F]" />
        Offline. Sales are saved here and sync automatically.
      </div>
      <Card>
        <Row name="Unga 2kg" detail="2 × KES 230" amount="460" />
        <Row name="Sugar 1kg" detail="1 × KES 170" amount="170" />
        <Row name="Cooking oil 1L" detail="1 × KES 340" amount="340" />
        <Row name="Bread 400g" detail="1 × KES 65" amount="65" last />
      </Card>
      <div className="mt-3 flex items-baseline justify-between px-1.5">
        <span className="text-[13px] text-ink-3">Total</span>
        <span className="tnum text-[24px] font-semibold text-ink">KES 1,035</span>
      </div>
      <GreenButton>Charge KES 1,035</GreenButton>
    </>
  );
}

function PayFeed() {
  return (
    <>
      <Card className="py-3">
        <p className="text-[11.5px] text-ink-3">Amount due</p>
        <p className="tnum text-[28px] font-semibold text-ink">KES 4,200</p>
      </Card>
      <div className="mt-2.5 flex flex-col gap-2.5">
        <div className="flex justify-between rounded-2xl bg-white px-3.5 py-3 text-[13px]">
          <span className="font-semibold text-ink">Cash</span>
          <span className="tnum text-ink">1,800</span>
        </div>
        <div className="rounded-2xl border-2 border-duka bg-white px-3.5 py-3">
          <div className="flex justify-between text-[13px]">
            <span className="font-semibold text-ink">M-PESA</span>
            <span className="tnum text-ink">2,400</span>
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-duka-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-duka" />
            Confirmed, code QJK7H2M1XP
          </p>
        </div>
        <div className="flex justify-between px-1.5 text-[12px] text-ink-3">
          <span>Remaining</span>
          <span className="tnum">0</span>
        </div>
      </div>
      <GreenButton>Complete sale</GreenButton>
    </>
  );
}

function OwedFeed() {
  return (
    <>
      <Card>
        <Row name="Mama Achieng" detail="Due today" amount="650" />
        <Row name="John Kamau" detail="Due Friday" amount="1,200" />
        <Row name="Faith Njeri" detail="Due 30 Nov" amount="480" last />
      </Card>
      <div className="mt-2.5 rounded-2xl bg-[#E4F4EA] p-3">
        <p className="text-[11px] font-semibold text-duka-deep">WhatsApp reminder sent 9:00</p>
        <div className="mt-2 rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[12px] leading-snug text-ink shadow-sm">
          Habari Mama Achieng, a reminder that your balance of KES 650 at Baraka Mini Mart is due
          today. Asante!
        </div>
      </div>
      <p className="mt-3 px-1.5 text-[12px] text-ink-3">
        Total owed to the shop <span className="tnum font-semibold text-ink">KES 2,330</span>
      </p>
    </>
  );
}

function TodayFeed() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          ["Sales", "38,450"],
          ["Profit", "9,120"],
          ["Cash", "14,200"],
          ["M-PESA", "24,250"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-white px-3 py-3">
            <p className="text-[11px] text-ink-3">{k}</p>
            <p className="tnum text-[17px] font-semibold text-ink">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 px-1.5 pb-2 text-[11px] font-medium text-ink-3">Running low</p>
      <Card>
        <Row name="Unga 2kg" detail="6 left" amount="Reorder" />
        <Row name="Milk 500ml" detail="4 left" amount="Reorder" last />
      </Card>
      <p className="mt-3 px-1.5 text-[12px] text-ink-3">Cash and M-PESA match the till.</p>
    </>
  );
}

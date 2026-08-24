"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { CAL_EVENTS_PUBLIC, calLink } from "@/lib/site";

/**
 * Cal.com popup embed. Each card opens the scheduler for its own event type
 * rather than loading an inline calendar for all three — one iframe on page
 * load would cost far more than the booking flow is worth to a visitor who
 * is still deciding which conversation they want.
 */
export function BookingOptions() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "auto",
        cssVarsPerTheme: {
          light: { "cal-brand": "#194044" },
          dark: { "cal-brand": "#E3A46B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })().catch(() => {
      /* If Cal fails to load, the fallback link below still works. */
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {CAL_EVENTS_PUBLIC.map((e) => (
        <div
          key={e.slug}
          className={`flex flex-col gap-3 rounded-lg border bg-surface p-6 ${
            e.featured ? "border-accent/40 shadow-e1" : "border-line"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-[21px] font-semibold">{e.name}</h2>
            <span className="label tnum text-ink-3">{e.minutes} min</span>
          </div>
          <p className="text-[15px] leading-relaxed text-ink-2">{e.purpose}</p>
          <p className="text-[13.5px] text-ink-3">{e.who}</p>
          <div className="pt-1">
            <button
              type="button"
              data-cal-link={calLink(e.slug)}
              data-cal-config='{"layout":"month_view"}'
              className={`inline-flex items-center justify-center rounded-[7px] px-5 py-2.5 text-[14.5px] font-semibold transition-[filter,background-color] ${
                e.featured
                  ? "bg-accent text-on-accent hover:brightness-95"
                  : "border border-line bg-transparent text-ink hover:bg-surface-2"
              }`}
            >
              Choose a time
            </button>
          </div>
        </div>
      ))}

      <p className="text-[13px] text-ink-3">
        Scheduler not loading?{" "}
        <a
          href={`https://cal.com/${calLink("discovery-call")}`}
          className="text-accent-ink underline underline-offset-4"
          rel="noopener"
        >
          Open it in a new tab
        </a>{" "}
        or <a href="/contact" className="text-accent-ink underline underline-offset-4">send a message</a>.
      </p>
    </div>
  );
}

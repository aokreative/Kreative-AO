"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number): Parts | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/**
 * Renders nothing until mounted: the server has no idea what "now" is on the
 * visitor's clock, so rendering a time on the server guarantees a hydration
 * mismatch. The static launch date is always visible above this, so nothing
 * important depends on JavaScript.
 */
export function Countdown({
  target,
  label,
}: {
  target: string;
  label: string;
}) {
  const ts = new Date(target).getTime();
  const [parts, setParts] = useState<Parts | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(partsUntil(ts));
    const id = setInterval(() => setParts(partsUntil(ts)), 1000);
    return () => clearInterval(id);
  }, [ts]);

  if (!mounted) {
    return <div aria-hidden className="h-[104px]" />;
  }

  if (!parts) {
    return (
      <p className="text-[17px] font-semibold text-ink">
        It&apos;s live — {label}.
      </p>
    );
  }

  const cells: [number, string][] = [
    [parts.days, parts.days === 1 ? "day" : "days"],
    [parts.hours, "hrs"],
    [parts.minutes, "min"],
    [parts.seconds, "sec"],
  ];

  return (
    <div>
      <div
        className="flex flex-wrap gap-3"
        role="timer"
        aria-live="off"
        aria-label={`Time remaining until launch on ${label}`}
      >
        {cells.map(([value, unit]) => (
          <div
            key={unit}
            className="flex min-w-[74px] flex-col items-center gap-1 rounded-md border border-line bg-surface px-4 py-3"
          >
            <span className="tnum font-display text-[30px] leading-none text-ink">
              {String(value).padStart(2, "0")}
            </span>
            <span className="label text-ink-3">{unit}</span>
          </div>
        ))}
      </div>
      <div aria-hidden className="signal mt-3 h-px w-full max-w-[340px]" />
    </div>
  );
}

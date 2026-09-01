"use client";

import { HEADLINE_STATS } from "@/content/case-studies";
import { Ridges } from "@/components/graphics/ridges";
import { useInView } from "motion/react";
import { useRef } from "react";

export function ResultsStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <dl ref={ref} className="mt-8 grid w-full grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
      {HEADLINE_STATS.map((s) => (
        <div key={s.label} className="relative z-10 flex flex-col justify-center">
          <div className="absolute inset-0 flex items-center justify-center -z-10 text-orange-lift opacity-20 scale-[0.4]">
            <Ridges size={300} draw={isInView} />
          </div>
          <dt className="tnum font-display text-[34px] leading-none">
            {s.value}
          </dt>
          <dd className="mt-2 text-[13.5px] leading-snug text-ink-2">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

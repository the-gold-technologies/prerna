"use client";

import React from "react";
import type { Panchang } from "@/lib/sky";

export const LIMBS = (p: Panchang) => [
  {
    sa: "Vara",
    en: "Weekday",
    value: p.vara,
    sub: "Ruled by the day's planet",
  },
  {
    sa: "Tithi",
    en: "Lunar day",
    value: p.tithi.name,
    sub: `${p.tithi.paksha} paksha · ${p.tithi.index > 15 ? p.tithi.index - 15 : p.tithi.index} of 15`,
    progress: p.tithi.progress,
  },
  {
    sa: "Nakshatra",
    en: "Moon's mansion",
    value: p.nakshatra.name,
    sub: `Pada ${p.nakshatra.pada} · lord ${p.nakshatra.lord}`,
    progress: p.nakshatra.progress,
  },
  {
    sa: "Yoga",
    en: "Sun–Moon union",
    value: p.yoga,
    sub: "One of 27 yogas",
  },
  {
    sa: "Karana",
    en: "Half lunar day",
    value: p.karana,
    sub: "One of 11 karanas",
  },
];

export function SkyLimbs({ p }: { p: Panchang | null }) {
  return (
    <section className="border-b border-line bg-card">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="pt-14 text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
          Pañcāṅga · the five limbs of the day
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
          {(p ? LIMBS(p) : []).map((l, i) => (
            <div
              key={l.sa}
              className={`bg-card px-4 py-10 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <dt>
                <span className="block font-display text-sm uppercase tracking-[0.25em] text-gold-deep">
                  {l.sa}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  {l.en}
                </span>
              </dt>
              <dd className="mt-5 font-display text-3xl leading-tight text-ink sm:text-[2.1rem]">
                {l.value}
              </dd>
              <dd className="mt-2 text-sm text-ink-3">{l.sub}</dd>
              {l.progress !== undefined && (
                <dd className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-sand">
                  <span
                    className="block h-full rounded-full bg-gold"
                    style={{ width: `${l.progress * 100}%` }}
                  />
                </dd>
              )}
            </div>
          ))}
          {!p &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse bg-card" />
            ))}
        </dl>
      </div>
    </section>
  );
}

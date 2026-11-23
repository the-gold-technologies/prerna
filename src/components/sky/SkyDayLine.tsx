"use client";

import React from "react";
import { timeIn, type Panchang } from "@/lib/sky";

export function DayLine({ p }: { p: Panchang }) {
  // place events on a 24h line in the city's local time
  const minutes = (d: Date) => {
    const [h, m] = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: p.city.tz,
    })
      .format(d)
      .split(":")
      .map(Number);
    return h * 60 + m;
  };
  const pct = (d: Date) => (minutes(d) / 1440) * 100;
  const rise = pct(p.sunrise);
  const set = pct(p.sunset);
  const rS = pct(p.rahuKaal.start);
  const rE = pct(p.rahuKaal.end);
  const now = pct(p.date);

  return (
    <div>
      <div className="relative h-24">
        {/* night / day band */}
        <div className="absolute inset-x-0 top-9 h-6 overflow-hidden rounded-full bg-ink">
          <div
            className="absolute inset-y-0 bg-gradient-to-r from-[#e2a77a] via-dawn to-[#e2a77a]"
            style={{ left: `${rise}%`, width: `${set - rise}%` }}
          />
          <div
            className="absolute inset-y-0 bg-[#7a2a45]/80"
            style={{ left: `${rS}%`, width: `${rE - rS}%` }}
          />
        </div>
        {/* labels */}
        {[
          { at: rise, t: "Sunrise", v: timeIn(p.sunrise, p.city.tz), up: true },
          { at: set, t: "Sunset", v: timeIn(p.sunset, p.city.tz), up: true },
          {
            at: (rS + rE) / 2,
            t: "Rahu Kaal",
            v: `${timeIn(p.rahuKaal.start, p.city.tz)} – ${timeIn(p.rahuKaal.end, p.city.tz)}`,
            up: false,
          },
        ].map((l) => (
          <div
            key={l.t}
            className={`absolute -translate-x-1/2 text-center ${l.up ? "top-0" : "top-[3.9rem]"}`}
            style={{ left: `${l.at}%` }}
          >
            <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-3">
              {l.t}
            </p>
            <p className="whitespace-nowrap font-display text-lg leading-tight text-ink">
              {l.v}
            </p>
          </div>
        ))}
        {/* now */}
        <div
          className="absolute top-7 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${now}%` }}
        >
          <span className="h-10 w-0.5 rounded-full bg-gold-deep" />
          <span className="mt-0.5 rounded-full bg-gold-deep px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-paper">
            Now
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-between text-[10px] uppercase tracking-[0.2em] text-ink-3">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
}

export function SkyDayLine({ p }: { p: Panchang | null }) {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-4xl font-light sm:text-5xl">
            The shape of <em className="text-astro">the day.</em>
          </h2>
          <p className="max-w-md text-ink-2">
            Rahu Kaal is traditionally avoided for new beginnings. Times are for{" "}
            {p?.city.name ?? "your city"}.
          </p>
        </div>
        <div className="mt-12">{p && <DayLine p={p} />}</div>
      </div>
    </section>
  );
}

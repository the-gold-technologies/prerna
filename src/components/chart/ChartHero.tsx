"use client";

import React, { useEffect, useState } from "react";
import { castChart, type BirthChart } from "@/lib/chart";
import { NAKSHATRA_LORDS } from "@/lib/sky";
import { ChartForm } from "./ChartForm";
import { LiveWheel } from "./LiveWheel";
import type { Form } from "./types";

// deterministic star field
const STARS = Array.from({ length: 70 }, (_, i) => ({
  left: Math.round(((i * 37.3) % 100) * 10) / 10,
  top: Math.round(((i * 53.7) % 100) * 10) / 10,
  size: i % 5 === 0 ? 2.5 : 1.5,
  delay: (i % 9) * 0.55,
}));

/* "The observatory": the birth form beside a live, animated chart wheel. */
export function ChartHero({
  chart,
  who,
  f,
  error,
  onUpdate,
  onPlace,
  onSubmit,
  onReset,
}: {
  chart: BirthChart | null;
  who: { name: string; line: string } | null;
  f: Form;
  error: string;
  onUpdate: (patch: Partial<Form>) => void;
  onPlace: (place: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  onLoadExample?: () => void;
}) {
  // today's sky, refreshed every ten minutes (client only, so SSR stays stable)
  const [today, setToday] = useState<BirthChart | null>(null);
  useEffect(() => {
    const tick = () => setToday(castChart(new Date(), 0, 0));
    const first = setTimeout(tick, 0);
    const every = setInterval(tick, 10 * 60_000);
    return () => {
      clearTimeout(first);
      clearInterval(every);
    };
  }, []);

  const nakLord = (lon: number) =>
    NAKSHATRA_LORDS[Math.floor(lon / (360 / 27)) % 9];
  const moon = (chart ?? today)?.planets[1];

  const bigThree = chart
    ? [
        ["Lagna", chart.lagna.sa, chart.lagna.en],
        [
          "Moon",
          chart.moonSign.sa,
          `${chart.planets[1].nakshatra} · pada ${chart.planets[1].pada}`,
        ],
        ["Sun", chart.sunSign.sa, chart.sunSign.en],
      ]
    : today && moon
      ? [
          ["Moon today", today.moonSign.sa, moon.nakshatra],
          ["Sun today", today.sunSign.sa, today.sunSign.en],
          ["Star lord", nakLord(moon.lon), "of today's Moon"],
        ]
      : null;

  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-paper sm:pt-32 lg:pb-20 print:bg-transparent print:pb-4 print:pt-4 print:text-ink">
      {/* sky */}
      <div className="pointer-events-none absolute inset-0 print:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_40%,rgba(59,52,136,0.85),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_100%,rgba(100,69,143,0.45),transparent_55%)]" />
        {STARS.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-paper"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
        <span className="shooting-star absolute right-[8%] top-[18%] rotate-[-28deg]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* intro + form */}
        <div className="lg:col-span-5">
          <p className="rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright print:text-gold-deep">
            <span className="h-px w-8 bg-gold-bright/70" />
            The PRERNA observatory
          </p>
          <h1 className="rise mt-5 font-display text-[2.6rem] font-light leading-[1.04] tracking-tight sm:text-[3.2rem]">
            {chart && who ? (
              <>
                {who.name}
                <span className="mt-2 block font-sans text-base font-normal tracking-normal text-paper/60 print:text-ink-2">
                  {who.line}
                </span>
              </>
            ) : (
              <>
                Watch your birth sky{" "}
                <em className="text-gold-bright">take shape.</em>
              </>
            )}
          </h1>
          {!chart && (
            <p
              className="rise mt-4 max-w-md text-paper/65"
              style={{ animationDelay: "80ms" }}
            >
              Enter your birth details and every graha travels from today&apos;s
              sky to where it stood when you were born.
            </p>
          )}

          <div className="rise mt-8" style={{ animationDelay: "140ms" }}>
            <ChartForm
              f={f}
              error={error}
              onUpdate={onUpdate}
              onPlace={onPlace}
              onSubmit={onSubmit}
              onReset={onReset}
            />
          </div>
        </div>

        {/* live wheel */}
        <div className="flex flex-col items-center lg:sticky lg:top-24 lg:col-span-7 lg:self-start">
          <p className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/60 print:hidden">
            {chart ? (
              <>Your birth chart · sidereal · whole-sign houses</>
            ) : (
              <>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-bright" />
                </span>
                Live · the sky right now
              </>
            )}
          </p>
          <div
            id="live-wheel"
            className="mt-4 aspect-square w-full max-w-[600px] scroll-mt-28"
          >
            <LiveWheel chart={chart} today={today} />
          </div>

          {/* big three */}
          <div className="mt-6 grid min-h-[92px] w-full max-w-[600px] grid-cols-3 divide-x divide-paper/15 rounded-2xl border border-paper/15 bg-paper/[0.04] backdrop-blur print:border-line">
            {bigThree?.map(([k, v, s], i) => (
              <div
                key={`${chart ? "c" : "t"}-${k}`}
                className="rise px-3 py-4 text-center sm:px-5"
                style={{
                  animationDelay: chart ? `${2.4 + i * 0.15}s` : `${i * 0.1}s`,
                }}
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gold-bright">
                  {k}
                </p>
                <p className="mt-1.5 font-display text-2xl leading-none sm:text-3xl">
                  {v}
                </p>
                <p className="mt-1.5 truncate text-xs text-paper/55 print:text-ink-3">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

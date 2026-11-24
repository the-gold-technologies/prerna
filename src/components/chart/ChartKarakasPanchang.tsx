"use client";

import React from "react";
import {
  GRAHA_COLOR,
  charaKarakas,
  type BirthChart,
  type GrahaName,
} from "@/lib/chart";
import type { Panchang } from "@/lib/sky";
import { ChapterHead } from "./ChartChapter";
import Reveal from "../home/Reveal";

/* The Moon as it looked on the birth day: lit fraction and waxing/waning. */
function MoonPhase({ lit, waxing }: { lit: number; waxing: boolean }) {
  const R = 60;
  // the terminator is an ellipse whose x-radius runs from R (new/full) to 0 (half)
  const rx = Math.round(Math.abs(1 - 2 * lit) * R * 100) / 100;
  const litSide = waxing ? 1 : 0; // sweep flag for the lit limb (right when waxing)
  const bulge = lit > 0.5 ? litSide : 1 - litSide;
  const d = `M70 10 A${R} ${R} 0 0 ${litSide} 70 130 A${rx} ${R} 0 0 ${bulge} 70 10Z`;
  return (
    <svg
      viewBox="0 0 140 140"
      className="h-32 w-32"
      role="img"
      aria-label={`Moon ${Math.round(lit * 100)}% lit, ${waxing ? "waxing" : "waning"}`}
    >
      <circle cx="70" cy="70" r={R} fill="#1c1844" />
      <path
        d={d}
        fill="#f3e3b9"
        className="rise"
        style={{ animationDelay: "0.3s" }}
      />
      <circle
        cx="70"
        cy="70"
        r={R}
        fill="none"
        stroke="#d6ac52"
        strokeOpacity="0.6"
      />
    </svg>
  );
}

/* Chapter 04: Jaimini chara karakas and the panchang of the day you were born. */
export function ChartKarakasPanchang({
  chart,
  birthDay,
}: {
  chart: BirthChart;
  birthDay: Panchang | null;
}) {
  return (
    <section id="ch-karakas" className="scroll-mt-36 bg-card py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="04"
          kicker="Jaimini & panchang"
          title={
            <>
              Karakas & <em className="text-gold-deep">your birth day.</em>
            </>
          }
          intro="The eight significators ranked by degree, and the five limbs of the day of birth."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="grid content-start grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-7">
            {charaKarakas(chart).map(({ k, p }, i) => (
              <Reveal key={k[0]} delay={i * 60}>
                <div className="group rounded-[22px] border border-line bg-paper p-5 transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
                  <p className="font-display text-sm text-gold-deep">{k[0]}</p>
                  <p
                    className="mt-3 font-display text-2xl"
                    style={{
                      color: p ? GRAHA_COLOR[p.name as GrahaName] : undefined,
                    }}
                  >
                    {p?.name ?? "—"}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-ink">{k[1]}</p>
                  <p className="text-xs text-ink-3">{k[2]}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {birthDay && (
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-paper sm:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(59,52,136,0.85),transparent_60%)]" />
                <div className="relative flex items-center gap-6">
                  <MoonPhase
                    lit={birthDay.illumination}
                    waxing={birthDay.waxing}
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-bright">
                      The birth-day Moon
                    </p>
                    <p className="mt-2 font-display text-3xl">
                      {Math.round(birthDay.illumination * 100)}% lit
                    </p>
                    <p className="text-paper/60">
                      {birthDay.waxing ? "Waxing" : "Waning"} ·{" "}
                      {birthDay.tithi.paksha}
                    </p>
                  </div>
                </div>
                <dl className="relative mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-paper/10">
                  {[
                    ["Vara", birthDay.vara],
                    ["Tithi", birthDay.tithi.name],
                    ["Nakshatra", birthDay.nakshatra.name],
                    ["Yoga", birthDay.yoga],
                    ["Karana", birthDay.karana],
                    ["Paksha", birthDay.tithi.paksha],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-ink/80 px-4 py-3">
                      <dt className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gold-bright/80">
                        {k}
                      </dt>
                      <dd className="mt-0.5 font-display text-lg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

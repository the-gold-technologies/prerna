"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

/* What the report covers, numbered like chapters. */
const CHAPTERS = [
  "Birth & astrological data",
  "Planetary & zodiac insights",
  "Relationship analysis",
  "Major life areas",
  "Career & growth",
  "Money, family & education",
  "Personal recommendations",
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

/* The nine grahas, in weekday order. */
const GRAHAS = ["Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "Ra", "Ke"];

/*
 * South Indian chart: signs sit fixed around a 4×4 grid, centre left open.
 * [glyph, row, col, grahas]. Placements are illustrative only.
 * ︎ forces the text (not emoji) form of each zodiac glyph.
 */
const HOUSES: [string, number, number, string[]][] = [
  ["♓︎", 1, 1, []],
  ["♈︎", 1, 2, ["Su"]],
  ["♉︎", 1, 3, ["Mo"]],
  ["♊︎", 1, 4, []],
  ["♋︎", 2, 4, ["Ju"]],
  ["♌︎", 3, 4, ["Asc"]],
  ["♍︎", 4, 4, ["Ra"]],
  ["♎︎", 4, 3, []],
  ["♏︎", 4, 2, ["Ma", "Sa"]],
  ["♐︎", 4, 1, []],
  ["♑︎", 3, 1, ["Ke"]],
  ["♒︎", 2, 1, ["Me", "Ve"]],
];

const META = [
  ["Date", "DD · MM · YYYY"],
  ["Time", "HH : MM"],
  ["Place", "Your birthplace"],
];

export default function Report() {
  const { openBooking } = useBooking();

  return (
    <section id="report" className="overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        {/* Report card (left on desktop, below the copy on mobile) */}
        <Reveal className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[26rem] pb-4 pt-6">
            {/* Pages stacked behind */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-0 top-10 rotate-[-4deg] rounded-[26px] border border-line bg-sand"
            />
            <div
              aria-hidden
              className="absolute inset-x-3 bottom-2 top-8 rotate-[2.5deg] rounded-[26px] border border-line bg-astro-soft"
            />

            <button
              onClick={() => openBooking()}
              aria-label="Your life map: opens with your birth details"
              className="group relative block w-full rounded-[26px] border border-line bg-paper p-3 text-left shadow-[0_40px_80px_-40px_rgba(29,26,56,0.45)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_50px_90px_-40px_rgba(29,26,56,0.55)]"
            >
              {/* Inner gold frame, like a printed page */}
              <div className="rounded-[18px] border border-gold/35 px-5 pb-5 pt-6 sm:px-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                      PRERNA · Personal report
                    </p>
                    <p className="mt-1.5 font-display text-[2rem] leading-none text-ink">
                      Your Life Map
                    </p>
                  </div>
                  <span className="mt-1 rounded-full border border-line bg-card px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    Rāśi · D1
                  </span>
                </div>

                {/* Birth details */}
                <dl className="mt-5 grid grid-cols-3 border-y border-line">
                  {META.map(([k, v], i) => (
                    <div
                      key={k}
                      className={`py-2.5 ${i > 0 ? "border-l border-line pl-3" : ""}`}
                    >
                      <dt className="text-[9px] uppercase tracking-[0.22em] text-ink-3">
                        {k}
                      </dt>
                      <dd className="mt-0.5 truncate text-[12px] text-ink-2">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* South Indian chart: gap-px over a gold base draws single hairlines */}
                <div
                  aria-hidden
                  className="mt-5 grid aspect-square grid-cols-4 grid-rows-4 gap-px overflow-hidden rounded-xl border border-gold/45 bg-gold/45"
                >
                  {HOUSES.map(([glyph, r, c, gs]) => (
                    <div
                      key={glyph}
                      style={{ gridRow: r, gridColumn: c }}
                      className="relative bg-card"
                    >
                      <span className="absolute left-1.5 top-1 text-[11px] leading-none text-gold/70">
                        {glyph}
                      </span>
                      <div className="flex h-full flex-wrap content-center items-center justify-center gap-x-1.5 pt-2">
                        {gs.map((g) =>
                          g === "Asc" ? (
                            <span
                              key={g}
                              className="font-display text-[15px] italic text-gold-deep"
                            >
                              Asc
                            </span>
                          ) : (
                            <span
                              key={g}
                              className="font-display text-[17px] font-medium text-astro"
                            >
                              {g}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Open centre */}
                  <div
                    style={{ gridRow: "2 / 4", gridColumn: "2 / 4" }}
                    className="relative flex flex-col items-center justify-center bg-paper text-center"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-gold/30 transition-transform duration-[2000ms] group-hover:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.6"
                    >
                      <circle cx="50" cy="50" r="46" />
                      <circle cx="50" cy="50" r="34" strokeDasharray="1 3" />
                      {Array.from({ length: 12 }).map((_, i) => {
                        const a = (i * Math.PI) / 6;
                        return (
                          <line
                            key={i}
                            x1={50 + Math.cos(a) * 34}
                            y1={50 + Math.sin(a) * 34}
                            x2={50 + Math.cos(a) * 46}
                            y2={50 + Math.sin(a) * 46}
                          />
                        );
                      })}
                    </svg>
                    <span className="relative font-display text-lg italic text-ink">
                      Janma
                    </span>
                    <span className="relative mt-0.5 text-[9px] uppercase tracking-[0.3em] text-ink-3">
                      Kundali
                    </span>
                  </div>
                </div>

                {/* Graha strip */}
                <div className="mt-5 flex justify-between">
                  {GRAHAS.map((g) => (
                    <span
                      key={g}
                      className="grid h-7 w-7 place-items-center rounded-full border border-line bg-card font-display text-[12px] text-ink-2 transition group-hover:border-gold/50"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Footer bar */}
                <div className="mt-5 flex items-center justify-between rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-sm text-paper">
                  Opens with your birth details
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-ink transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </button>

            {/* Seal */}
            <div
              aria-hidden
              className="float absolute -right-3 top-0 grid h-[84px] w-[84px] place-items-center rounded-full bg-ink text-center ring-4 ring-card sm:-right-7"
            >
              <span className="absolute inset-1.5 rounded-full border border-dashed border-gold/50" />
              <span className="font-display text-[13px] leading-tight text-gold-bright">
                1-1 call
                <br />
                <span className="text-[10px] uppercase tracking-[0.18em] text-paper/70">
                  included
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy (right on desktop) */}
        <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
            Personal report <span className="text-gold">·</span> your life map
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            Did you know your birth chart holds a map of{" "}
            <em className="text-astro">your whole life?</em>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            The sky at the moment you were born sets your houses, your planets
            and the periods your life moves through. PRERNA reads that chart
            precisely, adds a psychological lens, and walks you through it on a
            private 1-1 call.
          </p>

          <ol className="mt-10 grid max-w-2xl border-t border-line sm:grid-cols-2 sm:gap-x-10">
            {CHAPTERS.map((t, i) => (
              <li
                key={t}
                className="flex items-baseline gap-4 border-b border-line py-3.5"
              >
                <span className="w-7 shrink-0 font-display text-sm text-gold-deep">
                  {ROMAN[i]}
                </span>
                <span className="text-[15px] text-ink">{t}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Get my report
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <p className="text-sm text-ink-3">Explained to you, one to one.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

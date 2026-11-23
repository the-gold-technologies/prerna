"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { eyebrow } from "./types";

export function ChartFaq() {
  return (
    <section className="border-t border-line bg-card py-20 print:hidden">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-3 lg:gap-16">
        <div>
          <p className={eyebrow}>What you get</p>
          <h2 className="mt-3 font-display text-3xl font-light">
            A Vedic chart, in full
          </h2>
          <ul className="mt-5 space-y-2.5 text-ink-2">
            {[
              "Lagna and the nine grahas with nakshatra, pada, dignity and motion",
              "North, South and wheel styles, with D1, D2, D3, D7, D9, D10 and D12",
              "Vimshottari dashas with every antardasha",
              "Strength ranking, element balance and Jaimini karakas",
              "Today's transits from your lagna and Moon",
              "The panchang of the day you were born",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="text-gold">✦</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={eyebrow}>How to find your chart</p>
          <h2 className="mt-3 font-display text-3xl font-light">Three steps</h2>
          <ol className="mt-5 space-y-4">
            {[
              "Enter your name, date and time of birth, and how sure you are of the time.",
              "Choose your place of birth from the list, or enter its coordinates.",
              "Compute the chart, then move between styles, divisional charts and the readings below.",
            ].map((t, i) => (
              <li key={t} className="flex gap-4 text-ink-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-display text-gold-bright">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className={eyebrow}>Questions</p>
          <h2 className="mt-3 font-display text-3xl font-light">
            Good to know
          </h2>
          <div className="mt-4 border-t border-line">
            {[
              [
                "How accurate is it?",
                "Calculated in your browser with standard astronomical formulas, typically within a degree. Planets right at the edge of a sign or nakshatra should be confirmed in your full report.",
              ],
              [
                "Which zodiac is used?",
                "The sidereal zodiac with the Lahiri ayanamsha by default, mean nodes and whole-sign houses. You can change these in Calculation settings.",
              ],
              [
                "Do I need my exact birth time?",
                "For the lagna, houses and divisional charts, yes: the lagna moves about one sign every two hours. Planets and the Moon sign are reliable even without it.",
              ],
              [
                "Are my details stored?",
                "No. Everything is calculated in your browser and nothing is stored by PRERNA.",
              ],
            ].map(([q, a]) => (
              <details key={q} className="group border-b border-line py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-ink [&::-webkit-details-marker]:hidden">
                  {q}
                  <ChevronDown className="h-4 w-4 text-ink-3 transition group-open:rotate-180" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { Sparkle } from "../home/VedicChakra";

const QA = [
  [
    "How accurate is it?",
    "Calculated in your browser with standard astronomical formulas, typically within a degree. Planets right at the edge of a sign or nakshatra should be confirmed in your full report.",
  ],
  [
    "Which zodiac is used?",
    "The sidereal zodiac with the Lahiri ayanamsha by default, mean nodes and whole-sign houses. You can change these under Calculation settings in the form.",
  ],
  [
    "Do I need my exact birth time?",
    "For the lagna, houses and divisional charts, yes: the lagna moves about one sign every two hours. Planets and the Moon sign are reliable even without it.",
  ],
  [
    "Are my details stored?",
    "No. Everything is calculated in your browser. A share link carries the birth details in the address itself; PRERNA stores nothing.",
  ],
  [
    "What are D9, D10 and the other charts?",
    "Divisional charts (vargas) split each sign into finer parts to look at one area of life: D9 for marriage and inner strength, D10 for career, and so on.",
  ],
];

/* Closing: an invitation to a reading, beside the common questions. */
export function ChartFaq({ hasChart }: { hasChart: boolean }) {
  const { openBooking } = useBooking();
  return (
    <section className="bg-card py-20 lg:py-24 print:hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-[28px] bg-ink p-8 text-paper sm:p-10 lg:sticky lg:top-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(59,52,136,0.9),transparent_60%)]" />
            <Sparkle className="twinkle absolute right-8 top-8 h-6 w-6 text-gold-bright" />
            <p className="relative text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-bright">
              {hasChart ? "Your map is drawn" : "Beyond the calculator"}
            </p>
            <h2 className="relative mt-4 font-display text-4xl font-light leading-tight">
              A chart is a map.{" "}
              <em className="text-gold-bright">Let us read it with you.</em>
            </h2>
            <p className="relative mt-4 text-paper/65">
              A personalised report explains every chapter of your chart, with
              all divisional charts and a private 1-1 call.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBooking()}
                className="group flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-semibold text-ink ring-1 ring-inset ring-gold/60 transition hover:bg-dawn"
              >
                Book a reading
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <Link
                href="/report"
                className="rounded-full border border-paper/30 px-6 py-3.5 font-semibold transition hover:border-paper"
              >
                See the report
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Questions
          </p>
          <h2 className="mt-3 font-display text-4xl font-light">
            Good to know
          </h2>
          <div className="mt-6 border-t border-line">
            {QA.map(([q, a]) => (
              <details key={q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-ink [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:border-ink group-open:bg-ink group-open:text-paper">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "../shared/SmartLink";
import { ArrowRight } from "lucide-react";

type Tool = { t: string; d: string; href?: string; soon?: boolean };

const GROUPS: { k: string; note: string; tools: Tool[] }[] = [
  {
    k: "Most popular",
    note: "Start here",
    tools: [
      {
        t: "Numerology calculator",
        d: "Life path, destiny and soul urge by the Pythagorean method.",
        href: "#free-insight",
      },
      {
        t: "Which element guides you?",
        d: "A seven-question quiz on the Vedic elements.",
        href: "/quiz",
      },
      {
        t: "Today's panchang",
        d: "Tithi, nakshatra, yoga, karana and Rahu Kaal for your city.",
        href: "/today",
      },
    ],
  },
  {
    k: "Vedic chart",
    note: "From your birth details",
    tools: [
      {
        t: "Birth chart (Kundli)",
        d: "Rāśi chart with planets, houses and ascendant, North or South style.",
        href: "/chart",
      },
      {
        t: "Moon sign & nakshatra",
        d: "Your Moon sign, birth star and pada.",
        href: "/chart",
      },
      {
        t: "Dasha periods",
        d: "Your Vimshottari periods and what each season brings.",
        href: "/chart",
      },
    ],
  },
  {
    k: "Compatibility",
    note: "Two charts together",
    tools: [
      {
        t: "Kundli matching",
        d: "Guna Milan between two charts, explained simply.",
        soon: true,
      },
      {
        t: "Relationship patterns",
        d: "A short reflection on how you love and connect.",
        soon: true,
      },
    ],
  },
  {
    k: "Self-assessment",
    note: "Psychology",
    tools: [
      {
        t: "Personality profile",
        d: "A short questionnaire mapping strengths and patterns.",
        soon: true,
      },
      {
        t: "Emotional wellbeing check-in",
        d: "A gentle check on stress, mood and balance.",
        soon: true,
      },
    ],
  },
];

const ROMAN = ["I", "II", "III", "IV"];

export function ToolsCatalogue() {
  const [g, setG] = useState(0);
  return (
    <section id="tools" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[20rem_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            All instruments
          </p>
          <h2 className="mt-4 font-display text-4xl font-light">
            Built for <em className="text-astro">clarity.</em>
          </h2>
          <ol role="tablist" className="mt-10 border-t border-line">
            {GROUPS.map((x, i) => (
              <li key={x.k}>
                <button
                  role="tab"
                  aria-selected={g === i}
                  onClick={() => setG(i)}
                  className={`flex w-full items-baseline gap-4 border-b border-line py-4 text-left transition ${g === i ? "text-ink" : "text-ink-3 hover:text-ink"}`}
                >
                  <span className="w-8 font-display text-gold-deep">
                    {ROMAN[i]}
                  </span>
                  <span className="flex-1 font-display text-2xl">{x.k}</span>
                  <span
                    className={`h-2 w-2 rounded-full transition ${g === i ? "bg-gold" : "bg-transparent"}`}
                  />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div key={g} className="rise">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink-3">
            {ROMAN[g]} · {GROUPS[g].note}
          </p>
          <ol className="mt-6 border-t border-ink/80">
            {GROUPS[g].tools.map((t, i) => {
              const row = (
                <>
                  <span className="w-10 shrink-0 font-display text-xl text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-3xl leading-tight text-ink sm:text-4xl">
                      {t.t}
                    </span>
                    <span className="mt-1 block text-ink-2">{t.d}</span>
                  </span>
                  {t.soon ? (
                    <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-3">
                      Soon
                    </span>
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-paper transition group-hover:bg-gold group-hover:text-ink">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </>
              );
              const cls =
                "group flex items-center gap-6 border-b border-line py-8 transition";
              return (
                <li key={t.t}>
                  {t.href ? (
                    <Link href={t.href} className={`${cls} hover:pl-3`}>
                      {row}
                    </Link>
                  ) : (
                    <div className={`${cls} opacity-75`}>{row}</div>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-6 text-sm text-ink-3">
            Your details are used only to calculate your result and are never
            shared.
          </p>
        </div>
      </div>
    </section>
  );
}

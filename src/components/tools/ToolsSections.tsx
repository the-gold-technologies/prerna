"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { NakshatraScale, useSky } from "../sky/SkyParts";
import { Yantra } from "../quiz/ElementQuiz";

/* =====================================================================
 * 1. Hero with the live nakshatra scale (Lakshatras homepage)
 * ===================================================================== */
export function ToolsHero() {
  const p = useSky(0);
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-dawn/45 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="rise">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              Free self-assessment & tools
            </p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
              The instruments
              <br />
              of <em className="text-gold-deep">self-knowledge.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Enter a few details and unlock insights instantly. Free, private
              and without sign-up.
            </p>
          </div>
          <Link
            href="/today"
            className="rise group block border-l-2 border-gold pl-6"
            style={{ animationDelay: "120ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-3">
              Right now
            </p>
            <p className="mt-2 font-display text-3xl leading-tight text-ink">
              {p ? (
                <>
                  Moon in <em className="text-gold-deep">{p.nakshatra.name}</em>
                  , {p.moonSign.en}
                </>
              ) : (
                "Reading the sky…"
              )}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-2 transition group-hover:text-ink">
              {p ? `${p.tithi.paksha} ${p.tithi.name} · ` : ""}See today&apos;s
              panchang
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>

        <div className="rise mt-16" style={{ animationDelay: "200ms" }}>
          <NakshatraScale p={p} />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * 2. Quiz feature band
 * ===================================================================== */
export function QuizBand() {
  const els = ["fire", "earth", "air", "water"] as const;
  const tones = [
    "text-[#c8643a]",
    "text-gold-deep",
    "text-psych",
    "text-[#3f7fae]",
  ];
  return (
    <section className="px-3 sm:px-5">
      <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] border border-gold/30 bg-sand/70 px-6 py-16 text-ink sm:rounded-[48px] sm:px-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(241,220,178,0.9),transparent_60%)]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              New · self-discovery quiz
            </p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
              Which element <em className="text-gold-deep">guides you?</em>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-2">
              Seven questions reveal whether Agni, Prithvi, Vayu or Jala shapes
              how you think, feel and act, with a practice to bring you back
              into balance.
            </p>
            <Link
              href="/quiz"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Take the quiz
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {els.map((el, i) => (
              <div key={el} className="text-center">
                <Yantra
                  el={el}
                  className={`float mx-auto h-24 w-24 sm:h-32 sm:w-32 ${tones[i]}`}
                />
                <p className="mt-3 font-display text-2xl">
                  {["Agni", "Prithvi", "Vayu", "Jala"][i]}
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-ink-3">
                  {["Fire", "Earth", "Air", "Water"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =====================================================================
 * 3. Catalogue: sticky tabs + typographic rows (Lakshatras calculators)
 * ===================================================================== */
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
        soon: true,
      },
      {
        t: "Moon sign & nakshatra",
        d: "Your Moon sign, birth star and pada.",
        soon: true,
      },
      {
        t: "Dasha periods",
        d: "Your Vimshottari periods and what each season brings.",
        soon: true,
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

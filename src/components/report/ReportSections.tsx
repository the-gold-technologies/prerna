"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import { ZodiacWheel } from "../home/art";
import { Sparkle } from "../home/VedicChakra";

const CHAPTERS = [
  {
    v: "Compute",
    t: "Your birth data",
    d: "Date, time and place turned into your exact rāśi chart, ascendant, houses and the nakshatra of your Moon.",
  },
  {
    v: "Map",
    t: "Planets & signs",
    d: "Where each of the nine grahas sits, how strong it is and what it brings to your personality.",
  },
  {
    v: "Relate",
    t: "Relationships",
    d: "How you love, what you need to feel safe, and the patterns that repeat with partners and family.",
  },
  {
    v: "Weigh",
    t: "Major life areas",
    d: "Career, marriage, health, education, family, money, property and travel abroad, one by one.",
  },
  {
    v: "Build",
    t: "Career & growth",
    d: "Your natural vocation, the periods that favour change, and where effort pays off most.",
  },
  {
    v: "Secure",
    t: "Money, family & more",
    d: "Wealth tendencies, home and family life, studies and property, with timing to watch.",
  },
  {
    v: "Guide",
    t: "Recommendations",
    d: "Clear, practical suggestions shaped by your chart and your psychological profile.",
  },
  {
    v: "Balance",
    t: "Healing techniques",
    d: "Mantras, breath, sound and simple practices to steady the planets that challenge you.",
  },
  {
    v: "Follow",
    t: "Ongoing insights",
    d: "A weekly horoscope based on your own Moon, so guidance continues after the call.",
  },
];
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/* =====================================================================
 * 1. Hero: an open report, like a book on a desk
 * ===================================================================== */
export function ReportHero() {
  const { openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-dawn/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="rise text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
          Personalised report & journey
        </p>
        <h1
          className="rise mx-auto mt-5 max-w-4xl font-display text-5xl font-light leading-[1.02] sm:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Your life, written <em className="text-gold-deep">in the stars</em>{" "}
          and read with care.
        </h1>
        <p
          className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2"
          style={{ animationDelay: "160ms" }}
        >
          A premium analysis of your chart and every major area of your life,
          explained to you on a private 1-1 call.
        </p>
        <div
          className="rise mt-9 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <button
            onClick={() => openBooking()}
            className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
          >
            Get my report
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <a
            href="#chapters"
            className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
          >
            Look inside
          </a>
        </div>

        {/* open book */}
        <div
          className="rise relative mx-auto mt-20 max-w-4xl [perspective:1800px]"
          style={{ animationDelay: "320ms" }}
        >
          <div className="relative grid grid-cols-2 [transform:rotateX(18deg)] [transform-style:preserve-3d]">
            {/* left page */}
            <div className="relative origin-right rounded-l-[18px] border border-line bg-card p-6 text-left shadow-[0_50px_80px_-40px_rgba(28,24,68,0.5)] [transform:rotateY(10deg)] sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                PRERNA · Personal report
              </p>
              <p className="mt-2 font-display text-3xl text-ink sm:text-5xl">
                Your Life Map
              </p>
              <div className="mt-2 h-px w-16 bg-gold" />
              <ZodiacWheel className="mx-auto mt-6 h-32 w-32 text-astro sm:h-52 sm:w-52" />
              <dl className="mt-6 hidden grid-cols-3 gap-3 border-t border-line pt-4 text-[10px] uppercase tracking-[0.2em] text-ink-3 sm:grid">
                <div>
                  Lagna
                  <dd className="mt-1 font-display text-base normal-case tracking-normal text-ink">
                    Simha
                  </dd>
                </div>
                <div>
                  Moon
                  <dd className="mt-1 font-display text-base normal-case tracking-normal text-ink">
                    Rohini
                  </dd>
                </div>
                <div>
                  Dasha
                  <dd className="mt-1 font-display text-base normal-case tracking-normal text-ink">
                    Jupiter
                  </dd>
                </div>
              </dl>
            </div>
            {/* right page */}
            <div className="relative origin-left rounded-r-[18px] border border-line bg-paper p-6 text-left shadow-[0_50px_80px_-40px_rgba(28,24,68,0.5)] [transform:rotateY(-10deg)] sm:p-10">
              <span className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink/10 to-transparent" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-3">
                Contents
              </p>
              <ol className="mt-4 space-y-2 sm:space-y-2.5">
                {CHAPTERS.map((c, i) => (
                  <li
                    key={c.t}
                    className="flex items-baseline gap-3 border-b border-dotted border-line pb-1.5 text-[11px] sm:text-sm"
                  >
                    <span className="w-7 font-display text-gold-deep">
                      {ROMAN[i]}
                    </span>
                    <span className="flex-1 text-ink">{c.t}</span>
                    <span className="text-ink-3">{(i + 1) * 4}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mx-auto mt-2 h-6 w-[90%] rounded-[50%] bg-ink/20 blur-xl" />
          <Sparkle className="twinkle absolute -left-4 top-8 h-6 w-6 text-gold" />
          <Sparkle className="twinkle absolute -right-6 top-24 h-4 w-4 text-gold-deep [animation-delay:1.2s]" />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * 3. How it's made: the PRERNA pipeline (from the technical approach)
 * ===================================================================== */
const PIPE = [
  { t: "You", d: "Share birth details" },
  { t: "PRERNA system", d: "Secure, private layer", hi: true },
  { t: "Calculation", d: "Trusted astrology & numerology engines" },
  { t: "Interpretation", d: "PRERNA's guides add meaning" },
  { t: "Your call", d: "Walked through 1-1", gold: true },
];

export function ReportPipeline() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,52,136,0.7),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
            How your report is made
          </p>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
            Precise calculation.{" "}
            <em className="text-gold-bright">Human meaning.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <ol className="mt-16 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
            {PIPE.map((p, i) => (
              <React.Fragment key={p.t}>
                <li
                  className={`flex-1 rounded-2xl px-6 py-6 text-center ${p.gold ? "bg-gold text-ink" : p.hi ? "bg-paper text-ink" : "border border-paper/20"}`}
                >
                  <p className="font-display text-2xl">{p.t}</p>
                  <p
                    className={`mt-1 text-sm ${p.gold || p.hi ? "text-ink/70" : "text-paper/60"}`}
                  >
                    {p.d}
                  </p>
                </li>
                {i < PIPE.length - 1 && (
                  <li
                    aria-hidden
                    className="flex justify-center text-gold-bright lg:px-3"
                  >
                    <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-paper/60">
            Your details never go straight to an outside service. PRERNA&apos;s
            own system keeps them secure, checks every calculation and adds our
            interpretation before anything reaches you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

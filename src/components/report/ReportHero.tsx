"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { ZodiacWheel } from "../home/art";
import VedicChakra, { Sparkle } from "../home/VedicChakra";

export const CHAPTERS = [
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

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

export function ReportHero() {
  const { openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[700px] w-[900px] rounded-full bg-dawn/55 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-astro-soft/70 blur-3xl" />
      <VedicChakra className="pointer-events-none absolute -right-48 top-10 hidden h-[760px] w-[760px] text-gold opacity-25 lg:block" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-8 bg-gold" aria-hidden />
            Personalised report & journey
          </p>
          <h1
            className="rise mt-6 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]"
            style={{ animationDelay: "80ms" }}
          >
            Your life, written <em className="text-gold-deep">in the stars</em>{" "}
            and read with care.
          </h1>
          <p
            className="rise mt-6 max-w-md text-lg leading-relaxed text-ink-2"
            style={{ animationDelay: "160ms" }}
          >
            A premium analysis of your chart and every major area of your life,
            explained to you on a private 1-1 call.
          </p>
          <div
            className="rise mt-9 flex flex-wrap gap-3"
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
              href="#journey"
              className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
            >
              See the journey
            </a>
          </div>
          <dl
            className="rise mt-12 grid max-w-md grid-cols-3 border-t border-line pt-6"
            style={{ animationDelay: "320ms" }}
          >
            {[
              ["IX", "chapters"],
              ["1-1", "explained"],
              ["Weekly", "insights"],
            ].map(([v, k], i) => (
              <div key={k} className={i ? "border-l border-line pl-5" : ""}>
                <dt className="font-display text-3xl text-ink">{v}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-3">
                  {k}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* open book */}
        <div
          className="rise relative mx-auto w-full max-w-[760px] [perspective:1800px] lg:col-span-7"
          style={{ animationDelay: "320ms" }}
        >
          <div className="relative grid grid-cols-2 [transform:rotateX(16deg)_rotateY(-12deg)_rotateZ(1deg)] [transform-style:preserve-3d]">
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
          <div className="float absolute -left-3 -top-6 rounded-full border border-gold/40 bg-paper/95 px-4 py-2 text-sm text-ink shadow-lg backdrop-blur sm:-left-8">
            <span className="font-display text-lg text-gold-deep">IX</span>{" "}
            chapters
          </div>
          <div className="float absolute -bottom-2 right-2 rounded-full bg-ink px-4 py-2 text-sm text-paper shadow-xl [animation-delay:2s] sm:-right-4">
            ✦ 1-1 call included
          </div>
          <Sparkle className="twinkle absolute -left-4 top-8 h-6 w-6 text-gold" />
          <Sparkle className="twinkle absolute -right-6 top-24 h-4 w-4 text-gold-deep [animation-delay:1.2s]" />
        </div>
      </div>
    </section>
  );
}

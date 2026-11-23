"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { LifeMapBook } from "./LifeMapBook";
import VedicChakra, { Sparkle } from "../home/VedicChakra";

export { CHAPTERS, ROMAN } from "./chapters";

export function ReportHero() {
  const { openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-36 lg:pb-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-[700px] w-[900px] rounded-full bg-dawn/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-astro-soft/70 blur-3xl" />
      <VedicChakra className="spin-slow pointer-events-none absolute -right-56 top-0 hidden h-[820px] w-[820px] text-gold opacity-[0.18] lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="rise flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep sm:text-xs sm:tracking-[0.3em]">
            <span className="h-px w-8 bg-gold" aria-hidden />
            Personalised report & journey
          </p>
          <h1
            className="rise mt-6 text-balance font-display text-[2.6rem] font-light leading-[1.06] tracking-tight sm:text-6xl lg:text-[clamp(2.6rem,3.9vw,3.6rem)]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="lg:whitespace-nowrap">
              Your life, written{" "}
              <em className="text-gold-deep">in the stars</em>
            </span>{" "}
            <span className="lg:whitespace-nowrap">and read with care.</span>
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
              className="group flex items-center gap-2 rounded-full bg-ink px-5 py-3.5 font-semibold sm:px-7 sm:py-4 text-paper shadow-[0_14px_30px_-12px_rgba(28,24,68,0.6)] ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Get my report
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a
              href="#journey"
              className="rounded-full border border-ink/20 bg-card/60 px-5 py-3.5 sm:px-7 sm:py-4 font-semibold backdrop-blur transition hover:border-ink"
            >
              See the journey
            </a>
          </div>
          <dl
            className="rise mt-12 grid max-w-md grid-cols-3 rounded-2xl border border-line bg-card/70 py-4 backdrop-blur"
            style={{ animationDelay: "320ms" }}
          >
            {[
              ["IX", "chapters"],
              ["1-1", "explained"],
              ["Weekly", "insights"],
            ].map(([v, k], i) => (
              <div
                key={k}
                className={`px-5 ${i ? "border-l border-line" : ""}`}
              >
                <dt className="font-display text-2xl text-ink sm:text-3xl">
                  {v}
                </dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink-3 sm:text-[11px]">
                  {k}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="rise relative lg:col-span-6"
          style={{ animationDelay: "320ms" }}
        >
          <LifeMapBook onBook={() => openBooking()} />
          <Sparkle className="twinkle absolute -left-2 top-1/3 hidden h-6 w-6 text-gold sm:block" />
          <Sparkle className="twinkle absolute -right-2 top-6 h-4 w-4 text-gold-deep [animation-delay:1.2s]" />
        </div>
      </div>
    </section>
  );
}

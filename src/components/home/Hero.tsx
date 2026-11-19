"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CelestialScene } from "./art";
import { useBooking } from "./BookingProvider";

const THEMES = ["Personality", "Relationships", "Life direction", "Emotional patterns", "Personal growth"];

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* soft background wash */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-dawn/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-astro-soft blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-24 lg:pt-16">
        <div className="text-center lg:text-left">
          <p className="rise text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
            Astrology · Psychology · Spirituality
          </p>
          <h1
            className="rise mt-6 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.4rem]"
            style={{ animationDelay: "80ms" }}
          >
            Know yourself.
            <br />
            Find your <em className="font-normal text-psych">peace.</em>
          </h1>
          <p
            className="rise mx-auto mt-7 max-w-md text-lg leading-relaxed text-ink-2 lg:mx-0"
            style={{ animationDelay: "160ms" }}
          >
            Personal guidance for purpose, peace and inner inspiration.
          </p>
          <div
            className="rise mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#free-insight"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition hover:bg-astro sm:w-auto"
            >
              Get your free insight
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => openBooking()}
              className="w-full rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink hover:bg-card sm:w-auto"
            >
              Book a 1-1 session
            </button>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="arch rise relative aspect-[4/5.2] w-full shadow-[0_40px_80px_-30px_rgba(29,26,56,0.45)]" style={{ animationDelay: "120ms" }}>
            <CelestialScene className="absolute inset-0 h-full w-full" />
          </div>
          {/* outline arch echo */}
          <div className="arch pointer-events-none absolute -right-4 -top-4 -z-10 h-full w-full border border-gold/40 sm:-right-6 sm:-top-6" />

          {/* floating chips */}
          <div className="float absolute -left-3 top-[38%] rounded-2xl bg-card/95 px-4 py-3 shadow-xl backdrop-blur sm:-left-10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-3">Life path</p>
            <p className="font-display text-3xl leading-none text-astro">7</p>
          </div>
          <div
            className="float absolute -right-2 bottom-[14%] flex items-center gap-2.5 rounded-full bg-card/95 py-2 pl-2 pr-4 shadow-xl backdrop-blur sm:-right-8"
            style={{ animationDelay: "2.5s" }}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-spirit-soft text-spirit">✦</span>
            <span className="text-sm font-medium">1-1 guidance</span>
          </div>
        </div>
      </div>

      {/* theme marquee */}
      <div className="relative border-y border-line/80 bg-card/50 py-5" aria-label="What PRERNA helps you understand">
        <div className="flex overflow-hidden">
          <div className="marquee flex shrink-0 items-center gap-10 pr-10">
            {[...THEMES, ...THEMES, ...THEMES, ...THEMES].map((t, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic text-ink-2 sm:text-3xl" aria-hidden={i >= THEMES.length}>
                {t}
                <span className="text-base not-italic text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

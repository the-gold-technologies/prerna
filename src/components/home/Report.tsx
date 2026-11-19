"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { ZodiacWheel } from "./art";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const INCLUDES = ["Birth chart & planetary insights", "Relationships, career & money", "Healing & balancing practices", "Weekly horoscope"];

const BARS = [
  { k: "Career", v: 82, c: "bg-astro" },
  { k: "Relationship", v: 64, c: "bg-psych" },
  { k: "Health", v: 74, c: "bg-spirit" },
  { k: "Money", v: 58, c: "bg-gold" },
];

export default function Report() {
  const { openBooking } = useBooking();

  return (
    <section id="report" className="overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        {/* Visual: stacked report */}
        <Reveal className="relative mx-auto w-full max-w-md py-8">
          <div className="absolute inset-x-4 inset-y-10 rotate-[-6deg] rounded-[28px] bg-psych-soft" />
          <div className="absolute inset-x-2 inset-y-12 rotate-[5deg] rounded-[28px] bg-astro-soft" />
          <div className="relative rounded-[28px] border border-line bg-paper p-7 shadow-[0_40px_80px_-40px_rgba(29,26,56,0.45)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-ink-3">Personal report</p>
                <p className="mt-1 font-display text-3xl">Your Life Map</p>
              </div>
              <ZodiacWheel className="h-20 w-20 text-astro" />
            </div>
            <div className="mt-7 space-y-4">
              {BARS.map((b) => (
                <div key={b.k}>
                  <div className="flex justify-between text-sm">
                    <span>{b.k}</span>
                    <span className="text-ink-3">{b.v}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-sand">
                    <div className={`h-full rounded-full ${b.c}`} style={{ width: `${b.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 rounded-2xl bg-sand p-4">
              <p className="font-display text-lg italic leading-snug text-ink-2">
                &ldquo;A season for patience. Let slow progress compound.&rdquo;
              </p>
            </div>
          </div>
          <div className="float absolute -right-2 -top-1 rounded-full bg-ink px-4 py-2 text-sm text-paper shadow-xl sm:-right-6">
            ✦ Weekly insights
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Personalised report</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            Your life, <em className="text-astro">mapped.</em>
          </h2>
          <ul className="mt-9 space-y-4">
            {INCLUDES.map((t) => (
              <li key={t} className="flex items-center gap-3 text-lg">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-spirit-soft text-spirit">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-ink-2">Explained with you on a 1-1 call.</p>
          <button
            onClick={() => openBooking()}
            className="group mt-9 flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition hover:bg-astro"
          >
            Get my report
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

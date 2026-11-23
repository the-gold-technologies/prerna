"use client";

import React from "react";
import Reveal from "../home/Reveal";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export const DELIVERY = [
  {
    when: "Day 1",
    t: "You order",
    d: "Share your birth details and the questions most on your mind.",
  },
  {
    when: "Days 2–4",
    t: "We prepare",
    d: "Your chart is calculated and our guides write your report.",
  },
  {
    when: "Day 5",
    t: "Your 1-1 call",
    d: "We walk you through every chapter and answer your questions.",
  },
  {
    when: "Every week",
    t: "You continue",
    d: "Short insights for your Moon sign keep the guidance alive.",
  },
];

export function ReportDelivery() {
  return (
    <section className="relative overflow-hidden bg-sand/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className={eyebrow}>From order to insight</p>
            <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
              Five days to <em className="text-gold-deep">a clearer view.</em>
            </h2>
          </div>
          <p className="max-w-sm text-ink-2">
            Timings are typical. If you need your report sooner, tell us when
            you order.
          </p>
        </Reveal>

        <div className="relative mt-20">
          {/* the line, with a travelling light */}
          <div className="absolute left-0 right-0 top-[4.6rem] hidden h-px bg-gold/50 md:block">
            <span className="travel absolute -top-[3px] h-[7px] w-24 rounded-full bg-gradient-to-r from-transparent via-gold-bright to-transparent" />
          </div>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {DELIVERY.map((s, n) => (
              <Reveal as="li" key={s.t} delay={n * 110} className="relative">
                <p className="font-display text-4xl text-gold-deep sm:text-5xl">
                  {s.when}
                </p>
                <span
                  className={`relative z-10 mt-5 grid h-6 w-6 place-items-center rounded-full ring-[6px] ring-sand ${n === 3 ? "bg-ink" : "bg-gold"}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                </span>
                <h3 className="mt-6 font-display text-3xl">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

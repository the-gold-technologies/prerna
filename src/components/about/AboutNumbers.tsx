"use client";

import React from "react";
import Reveal from "../home/Reveal";

const NUMBERS = [
  { v: "3", k: "Systems", s: "Astrology · Psychology · Spirituality" },
  { v: "10", k: "Life areas", s: "From career to life success" },
  { v: "6", k: "Journey stages", s: "Know yourself to purpose & peace" },
  { v: "1-1", k: "Every session", s: "Private, never a group call" },
];

export function AboutNumbers() {
  return (
    <section className="border-y border-line bg-card py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <Reveal
            key={n.k}
            delay={i * 80}
            className={`px-2 text-center ${i % 2 === 1 ? "border-l border-line" : ""} lg:border-l lg:first:border-l-0`}
          >
            <p className="font-display text-6xl font-light text-gold-deep sm:text-7xl">
              {n.v}
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              {n.k}
            </p>
            <p className="mx-auto mt-1 max-w-[14rem] text-sm text-ink-3">
              {n.s}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default AboutNumbers;

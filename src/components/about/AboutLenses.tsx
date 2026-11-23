"use client";

import React from "react";
import Reveal from "../home/Reveal";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep";

const LENSES = [
  {
    n: "01",
    title: "Astrology",
    text: "Birth chart, planetary insight, compatibility and personalised horoscope.",
    tone: "bg-astro",
    line: "bg-astro",
  },
  {
    n: "02",
    title: "Psychology",
    text: "Self-assessment, personality, emotional and relationship patterns.",
    tone: "bg-psych",
    line: "bg-psych",
  },
  {
    n: "03",
    title: "Spirituality",
    text: "Healing, elemental insight, sound, mindfulness and inner balance.",
    tone: "bg-spirit",
    line: "bg-spirit",
  },
];

const UNDERSTAND = [
  "Personality",
  "Relationships",
  "Life direction",
  "Emotional patterns",
  "Personal growth",
];

export function AboutLenses() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>What PRERNA offers</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            Three systems, <em className="text-spirit">one picture of you.</em>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            Each lens answers a different part of the same question. Together
            they give you something none of them can alone.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {LENSES.map((l, i) => (
            <Reveal key={l.title} delay={i * 100}>
              <div className="h-full rounded-[24px] border border-line bg-card p-8">
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-full font-display text-sm text-paper ${l.tone}`}
                  >
                    {l.n}
                  </span>
                  <h3 className="font-display text-3xl">{l.title}</h3>
                </div>
                <span className={`mt-6 block h-px w-16 ${l.line}`} />
                <p className="mt-6 leading-relaxed text-ink-2">{l.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-5 rounded-[24px] bg-ink px-8 py-8 text-paper sm:px-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              What PRERNA helps you understand
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
              {UNDERSTAND.map((u) => (
                <li key={u} className="font-display text-2xl text-paper/90">
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutLenses;

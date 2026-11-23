"use client";

import React from "react";
import Reveal from "../home/Reveal";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

const FLOW = [
  {
    t: "Before",
    h: "You share your details",
    d: "Birth date, time and place, and the question on your mind. Nothing more is needed.",
  },
  {
    t: "Minutes 0–5",
    h: "We listen first",
    d: "Your guide asks what brought you here and what you hope to leave with.",
  },
  {
    t: "Minutes 5–35",
    h: "The reading",
    d: "Your chart, your patterns, or both, explained in plain language and connected to your real situation.",
  },
  {
    t: "Minutes 35–45",
    h: "Next steps",
    d: "Practical choices, timing to watch and a simple practice to take with you.",
  },
  {
    t: "After",
    h: "A short summary",
    d: "Key points from your session, sent to you so nothing is forgotten.",
  },
];

export function SessionFlow() {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className={eyebrow}>Inside a session</p>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
            Forty-five minutes, <em className="text-astro">all about you.</em>
          </h2>
        </Reveal>

        <ol className="relative mt-16">
          <span
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0 md:left-1/2"
          />
          {FLOW.map((f, i) => (
            <Reveal
              as="li"
              key={f.t}
              delay={i * 80}
              className={`relative mb-12 pl-12 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}
            >
              <span
                className={`absolute left-[9px] top-2 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-card ${i % 2 ? "md:-left-[7px]" : "md:left-auto md:-right-[7px]"}`}
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
                {f.t}
              </p>
              <h3 className="mt-2 font-display text-3xl">{f.h}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{f.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const QUESTIONS = [
  "Why do the same relationship patterns keep repeating?",
  "Am I on the right path — or living someone else's dream?",
  "Why do I feel empty when everything looks fine?",
  "Is this the right time to move, invest or begin again?",
  "Why do I react the way I do?",
];

export default function Questions() {
  const { openBooking } = useBooking();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUESTIONS.length), 4800);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden bg-sand py-24 lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* giant quote mark */}
      <span aria-hidden className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 select-none font-display text-[22rem] leading-none text-gold/15">
        &ldquo;
      </span>

      <Reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Questions we hear</p>
        <div className="relative mt-8 grid min-h-[9.5rem] place-items-center sm:min-h-[11rem]" aria-live="polite">
          <p key={i} className="rise font-display text-4xl font-light italic leading-[1.15] sm:text-5xl lg:text-6xl">
            {QUESTIONS[i]}
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Choose question">
          {QUESTIONS.map((q, n) => (
            <button
              key={q}
              role="tab"
              aria-selected={n === i}
              aria-label={`Question ${n + 1}`}
              onClick={() => setI(n)}
              className="grid h-6 place-items-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-8 bg-ink" : "w-1.5 bg-ink/25"}`} />
            </button>
          ))}
        </div>

        <button
          onClick={() => openBooking()}
          className="group mx-auto mt-10 flex items-center gap-2 font-semibold underline decoration-gold decoration-2 underline-offset-8 transition hover:text-psych"
        >
          Talk it through with us
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </Reveal>
    </section>
  );
}

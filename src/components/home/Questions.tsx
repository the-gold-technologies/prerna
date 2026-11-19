"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const QUESTIONS = [
  {
    q: "Why do relationship patterns keep repeating in your life?",
    img: "/images/connection.jpg",
    alt: "Two hands reaching towards each other",
    a: "Repeating patterns in love and partnership are rarely bad luck. Your birth chart maps karmic lessons your soul seeks to explore, while counselling unpacks attachment conditioning. Bringing awareness to both heals subconscious relationship scripts and permanently breaks the cycle.",
  },
  {
    q: "Am I on the right path — or living someone's dream?",
    img: "/images/mountains.jpg",
    alt: "A person sitting on a rock looking out over a mountain range",
    a: "External success often masks inner restlessness when you carry family expectations rather than your authentic vocational calling. We analyze the 10th House of Karma and current planetary periods alongside coaching, giving you clear direction on whether to pivot, expand, or build something.",
  },
  {
    q: "Why do I feel empty even when everything looks fine?",
    img: "/images/meditation.jpg",
    alt: "A person meditating quietly at sunrise",
    a: "Pivotal inner voids often arise during major planetary transitions when the soul demands depth that material accomplishments cannot satisfy. Instead of dreading emptiness, we treat it as an invitation to turn inward, transforming quiet dread into sacred presence, clarity, and enduring peace.",
  },
  {
    q: "Is this the right time to relocate, invest, or begin?",
    img: "/images/night-sky.jpg",
    alt: "A starry night sky over the mountains",
    a: "Major life shifts require harmonious cosmic timing. Acting during discordant cycles demands tenfold effort, while aligned timing creates natural momentum. We calculate your personalized Muhurta and transit windows across finances, property, and career, giving you clarity on when to take decisive action.",
  },
  {
    q: "Why do I react this way when emotions suddenly take over?",
    img: "/images/journaling.jpg",
    alt: "A pen writing reflective notes in a journal",
    a: "Sudden emotional flare-ups and anxiety loops are protective mechanisms rooted in constitutional planetary imbalances and nervous system conditioning. By examining your Moon sign and temperament, we uncover what is triggered, equipping you with daily grounding tools for emotional sovereignty and calm clarity.",
  },
];

export default function Questions() {
  const { openBooking } = useBooking();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % QUESTIONS.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="questions"
      className="relative overflow-hidden bg-sand py-24 lg:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="arch relative aspect-[4/5] w-full bg-sand shadow-[0_40px_80px_-40px_rgba(29,26,56,0.5)]">
            {QUESTIONS.map((item, n) => (
              <Image
                key={item.img}
                src={item.img}
                alt={n === i ? item.alt : ""}
                aria-hidden={n !== i}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className={`object-cover transition-all duration-[1200ms] ease-out ${
                  n === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-6 select-none font-display text-[16rem] leading-none text-gold/25"
          >
            &rdquo;
          </span>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
            Real-life questions we hear
          </p>
          <div
            className="mt-6 min-h-[19rem] sm:min-h-[17rem] lg:min-h-[18rem]"
            aria-live="polite"
          >
            <div key={i} className="rise">
              <p className="max-w-xl font-display text-4xl font-light italic leading-[1.15] sm:text-5xl">
                {QUESTIONS[i].q}
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
                {QUESTIONS[i].a}
              </p>
            </div>
          </div>

          <div
            className="mt-6 flex items-center gap-2"
            role="tablist"
            aria-label="Choose question"
          >
            {QUESTIONS.map((q, n) => (
              <button
                key={q.q}
                role="tab"
                aria-selected={n === i}
                aria-label={`Question ${n + 1}`}
                onClick={() => setI(n)}
                className="grid h-6 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-8 bg-ink" : "w-1.5 bg-ink/25"}`}
                />
              </button>
            ))}
            <span className="ml-3 text-sm text-ink-3">
              {i + 1} / {QUESTIONS.length}
            </span>
          </div>

          <button
            onClick={() => openBooking()}
            className="group mt-10 flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition ring-1 ring-inset ring-gold/45 hover:bg-astro"
          >
            Talk it through with us
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const QUESTIONS = [
  {
    q: "Why do the same relationship patterns keep repeating?",
    img: "/images/connection.jpg",
    alt: "Two hands reaching towards each other",
    a: "Repeating patterns are rarely bad luck. Your chart shows the lessons you are drawn to, and counselling uncovers the early experiences that shaped how you love. Seeing both is often what finally breaks the cycle.",
  },
  {
    q: "Am I on the right path — or living someone else's dream?",
    img: "/images/mountains.jpg",
    alt: "A person sitting on a rock looking out over a mountain range",
    a: "We look at your natural strengths and the timing of your current planetary period, then talk through the fears and expectations that keep you where you are — so the next step feels clear, not risky.",
  },
  {
    q: "Why do I feel empty when everything looks fine?",
    img: "/images/meditation.jpg",
    alt: "A person meditating quietly at sunrise",
    a: "Sometimes life asks us to turn inward. Gentle spiritual practices, mindfulness and supportive conversation help you understand that feeling and reconnect with what genuinely matters to you.",
  },
  {
    q: "Is this the right time to move, invest or begin again?",
    img: "/images/night-sky.jpg",
    alt: "A starry night sky over the mountains",
    a: "Timing matters. We study the planetary windows that support change in each area of life, so you can plan big decisions — relocation, property, a new venture — with more confidence.",
  },
  {
    q: "Why do I react the way I do?",
    img: "/images/journaling.jpg",
    alt: "A pen writing reflective notes in a journal",
    a: "Strong reactions usually have deep roots. Self-assessment and counselling help you trace your emotional triggers and learn calmer, kinder ways to respond — to others and to yourself.",
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
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
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
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Real-life questions we hear</p>
          <div className="mt-6 min-h-[20rem] sm:min-h-[18rem]" aria-live="polite">
            <div key={i} className="rise">
              <p className="font-display text-4xl font-light italic leading-[1.15] sm:text-5xl">{QUESTIONS[i].q}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">{QUESTIONS[i].a}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2" role="tablist" aria-label="Choose question">
            {QUESTIONS.map((q, n) => (
              <button
                key={q.q}
                role="tab"
                aria-selected={n === i}
                aria-label={`Question ${n + 1}`}
                onClick={() => setI(n)}
                className="grid h-6 place-items-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-8 bg-ink" : "w-1.5 bg-ink/25"}`} />
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

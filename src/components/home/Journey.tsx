"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const STAGES = [
  {
    title: "Know Yourself",
    text: "Map your birth chart and core personality to see your natural blueprint.",
    img: "/images/lake-calm.jpg",
    alt: "A person sitting quietly at the end of a pier on a still mountain lake",
  },
  {
    title: "Your Patterns",
    text: "Understand why certain emotions, choices and situations keep repeating.",
    img: "/images/journaling.jpg",
    alt: "A pen writing reflective notes in a journal",
  },
  {
    title: "Relationships",
    text: "Explore how you connect with partners, family and the people around you.",
    img: "/images/connection.jpg",
    alt: "Two hands reaching towards each other",
  },
  {
    title: "Strengths",
    text: "Bring hidden talents and natural advantages into the light.",
    img: "/images/sunrise-water.jpg",
    alt: "A person standing with open arms on reflective water at sunrise",
  },
  {
    title: "Life Direction",
    text: "Align your goals with the right timing for career and big decisions.",
    img: "/images/mountains.jpg",
    alt: "A person looking out over a mountain range",
  },
  {
    title: "Purpose & Peace",
    text: "Anchor lasting calm with daily practices and ongoing 1-1 support.",
    img: "/images/meditation.jpg",
    alt: "A person meditating at sunrise on a wooden deck",
  },
];

/* y-positions of each node along the wave (viewBox 1200 x 200) */
const NODE_Y = [140, 60, 130, 50, 120, 44];
const INDIGO = "#3b3488";
const INK = "#1c1844";
const IVORY = "#faf6ee";
const GOLD = "#b8892f";
const GOLD_SOFT = "#e8d3a2";

/* Timing */
const DRAW = 2.4; // seconds for the path to draw in
const STEP_MS = 4500; // time on each stage
const nodeDelay = (i: number) => 0.3 + (i / 5) * (DRAW - 0.3);

export default function Journey() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // move through the stages; the photo above follows
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((n) => (n + 1) % STAGES.length), STEP_MS);
    return () => clearInterval(t);
  }, [paused]);

  const pick = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const xs = STAGES.map((_, i) => 100 + i * 200);
  const d =
    xs.reduce((acc, x, i) => {
      if (i === 0) return `M0 160 C 40 160, 60 ${NODE_Y[0]}, ${x} ${NODE_Y[0]}`;
      const px = xs[i - 1];
      const py = NODE_Y[i - 1];
      return `${acc} C ${px + 100} ${py}, ${x - 100} ${NODE_Y[i]}, ${x} ${NODE_Y[i]}`;
    }, "") + ` C 1160 ${NODE_Y[5]}, 1180 30, 1200 30`;

  return (
    <section id="journey" className="px-3 py-24 sm:px-5 lg:py-32">
      <div
        className="mx-auto max-w-[1400px] rounded-[36px] border border-gold/25 bg-card p-2.5 shadow-[0_40px_90px_-50px_rgba(28,24,68,0.35)] sm:rounded-[48px] sm:p-3.5"
        onMouseLeave={() => setPaused(false)}
      >
        {/* Photo — changes with the active stage */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-sand sm:aspect-[21/9] sm:rounded-[38px]">
          {STAGES.map((s, i) => (
            <Image
              key={s.img}
              src={s.img}
              alt={i === active ? s.alt : ""}
              aria-hidden={i !== active}
              fill
              sizes="(min-width: 1400px) 1400px, 100vw"
              className={`object-cover transition-all duration-[1400ms] ease-out ${
                i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent sm:bg-gradient-to-r sm:from-ink/75 sm:via-ink/30 sm:to-transparent" />

          <Reveal className="on-dark absolute inset-x-0 bottom-0 p-7 text-paper sm:inset-y-0 sm:flex sm:flex-col sm:justify-end sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">The self-discovery journey</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.05] sm:text-7xl">
              Six steps <em>inward.</em>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/85">
              A guided, personal 1-1 journey that moves from understanding yourself to living with purpose and peace —
              at your own pace, with an expert beside you.
            </p>
          </Reveal>

          {/* current stage label + progress */}
          <div className="absolute right-4 top-4 w-56 rounded-2xl bg-card/90 p-4 shadow-xl backdrop-blur sm:bottom-8 sm:right-8 sm:top-auto sm:w-64">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
              Stage {active + 1} of {STAGES.length}
            </p>
            <p key={active} className="rise mt-1 font-display text-2xl leading-tight text-ink">
              {STAGES[active].title}
            </p>
            <div className="mt-3 flex gap-1">
              {STAGES.map((_, i) => (
                <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  {i < active && <span className="block h-full w-full bg-gold" />}
                  {i === active && (
                    <span
                      key={`${active}-${paused}`}
                      className={`block h-full bg-gold ${paused ? "w-full" : "stage-progress"}`}
                      style={{ animationDuration: `${STEP_MS}ms` }}
                    />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-8 lg:pb-14">
          {/* Desktop: animated path */}
          <Reveal className="hidden pt-6 lg:block">
            <svg viewBox="0 0 1200 200" className="h-auto w-full overflow-visible" aria-hidden="true">
              <defs>
                <radialGradient id="journey-glow" cx=".5" cy=".5" r=".5">
                  <stop offset="0" stopColor="#d6ac52" stopOpacity=".85" />
                  <stop offset="1" stopColor="#d6ac52" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d={d} fill="none" stroke="#e9dcc3" strokeWidth="2" />
              <path d={d} fill="none" stroke={GOLD} strokeWidth="2" pathLength={1} className="draw-path" />

              {/* travelling light */}
              <g className="travel-dot" opacity="0">
                <circle r="16" fill="url(#journey-glow)" />
                <circle r="4" fill={GOLD} />
                <animateMotion dur="10s" repeatCount="indefinite" begin={`${DRAW}s`} path={d} />
                <animate attributeName="opacity" from="0" to="1" begin={`${DRAW}s`} dur="0.6s" fill="freeze" />
              </g>

              {xs.map((x, i) => {
                const on = active === i;
                return (
                  <g
                    key={i}
                    className="stage-pop cursor-pointer"
                    style={{ animationDelay: `${nodeDelay(i)}s` }}
                    onMouseEnter={() => pick(i)}
                    onClick={() => pick(i)}
                  >
                    <circle
                      cx={x}
                      cy={NODE_Y[i]}
                      r="47"
                      fill="none"
                      stroke={GOLD}
                      strokeOpacity={on ? 0.55 : 0}
                      strokeDasharray="3 5"
                      style={{ transition: "stroke-opacity .8s" }}
                    />
                    <circle
                      cx={x}
                      cy={NODE_Y[i]}
                      r="34"
                      fill={on ? INK : IVORY}
                      stroke={on ? INK : INDIGO}
                      strokeWidth="1.5"
                      style={{ transition: "fill .8s, stroke .8s" }}
                    />
                    <text
                      x={x}
                      y={NODE_Y[i] + 9}
                      textAnchor="middle"
                      fontSize="26"
                      fill={on ? GOLD_SOFT : INDIGO}
                      style={{ fontFamily: "var(--font-display)", fontVariantNumeric: "lining-nums", transition: "fill .8s" }}
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
            <ol className="mt-6 grid grid-cols-6 gap-6">
              {STAGES.map((s, i) => (
                <li
                  key={s.title}
                  className="stage-fade cursor-pointer text-center"
                  style={{ animationDelay: `${nodeDelay(i) + 0.25}s` }}
                  onMouseEnter={() => pick(i)}
                >
                  <h3
                    className={`font-display text-2xl leading-tight transition-colors duration-700 ${
                      active === i ? "text-gold-deep" : "text-ink"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Mobile / tablet: vertical path */}
          <ol className="relative mx-auto max-w-md pt-6 lg:hidden">
            <span className="absolute bottom-10 left-[27px] top-12 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-gold/60" aria-hidden />
            {STAGES.map((s, i) => {
              const on = active === i;
              return (
                <Reveal as="li" key={s.title} delay={i * 90} className="relative">
                  <button type="button" onClick={() => pick(i)} className="flex w-full gap-5 py-4 text-left">
                    <span
                      className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-[1.5px] font-display text-2xl transition-colors duration-700 ${
                        on ? "border-ink bg-ink text-gold-soft" : "border-astro bg-paper text-astro"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="pt-2">
                      <span className={`block font-display text-2xl transition-colors ${on ? "text-gold-deep" : "text-ink"}`}>{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-2">{s.text}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ol>

          <Reveal className="mt-10 flex justify-center lg:mt-12">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Begin your journey
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

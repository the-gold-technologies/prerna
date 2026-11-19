"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const STAGES = [
  { title: "Know Yourself", color: "#3a3a8c" },
  { title: "Your Patterns", color: "#3a3a8c" },
  { title: "Relationships", color: "#a24e33" },
  { title: "Strengths", color: "#a24e33" },
  { title: "Life Direction", color: "#44705a" },
  { title: "Purpose & Peace", color: "#1d1a38", filled: true },
];

/* y-positions of each node along the wave (viewBox 1200 x 260) */
const NODE_Y = [180, 90, 170, 80, 160, 70];

export default function Journey() {
  const { openBooking } = useBooking();
  const xs = STAGES.map((_, i) => 100 + i * 200);
  const d = xs.reduce((acc, x, i) => {
    if (i === 0) return `M0 200 C 40 200, 60 ${NODE_Y[0]}, ${x} ${NODE_Y[0]}`;
    const px = xs[i - 1];
    const py = NODE_Y[i - 1];
    return `${acc} C ${px + 100} ${py}, ${x - 100} ${NODE_Y[i]}, ${x} ${NODE_Y[i]}`;
  }, "") + ` C 1160 ${NODE_Y[5]}, 1180 60, 1200 60`;

  return (
    <section id="journey" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">The self-discovery journey</p>
        <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
          Six steps <em className="text-spirit">inward.</em>
        </h2>
      </Reveal>

      {/* Desktop: wave path */}
      <Reveal className="relative mt-16 hidden lg:block">
        <svg viewBox="0 0 1200 260" className="h-auto w-full overflow-visible" aria-hidden="true">
          <path d={d} fill="none" stroke="#e3d8c4" strokeWidth="2" />
          <path d={d} fill="none" stroke="#b8862f" strokeWidth="2" pathLength={1} className="draw-path" />
          {xs.map((x, i) => {
            const s = STAGES[i];
            return (
              <g key={i}>
                <circle cx={x} cy={NODE_Y[i]} r="38" fill={s.filled ? s.color : "#fffcf6"} stroke={s.color} strokeWidth="1.5" />
                <text
                  x={x}
                  y={NODE_Y[i] + 10}
                  textAnchor="middle"
                  fontSize="28"
                  fill={s.filled ? "#ead6a8" : s.color}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        <ol className="absolute inset-0">
          {xs.map((x, i) => (
            <li
              key={i}
              className="absolute w-40 -translate-x-1/2 text-center font-display text-2xl leading-tight"
              style={{ left: `${(x / 1200) * 100}%`, top: `${((NODE_Y[i] + 52) / 260) * 100}%` }}
            >
              {STAGES[i].title}
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Mobile / tablet: vertical */}
      <ol className="relative mx-auto mt-14 max-w-sm lg:hidden">
        <span className="absolute bottom-6 left-[27px] top-6 w-px bg-line" aria-hidden />
        {STAGES.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 60} className="relative flex items-center gap-5 py-3">
            <span
              className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border-[1.5px] font-display text-2xl"
              style={{ borderColor: s.color, color: s.filled ? "#ead6a8" : s.color, background: s.filled ? s.color : "#fffcf6" }}
            >
              {i + 1}
            </span>
            <span className="font-display text-2xl">{s.title}</span>
          </Reveal>
        ))}
      </ol>

      <Reveal className="mt-14 flex justify-center lg:mt-20">
        <button
          onClick={() => openBooking()}
          className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition hover:bg-astro"
        >
          Begin your journey
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </Reveal>
    </section>
  );
}

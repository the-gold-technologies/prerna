"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../home/Reveal";

const r2 = (n: number) => Math.round(n * 100) / 100;
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  pathLength: 1,
  className: "draw-path",
} as const;

const STEPS = [
  {
    t: "The sidereal zodiac",
    d: "Signs are measured against the fixed stars, not the seasons. The Lahiri ayanamsha, about 24° today, sets the starting point.",
    art: (
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <circle cx="60" cy="60" r="44" {...line} />
        <circle cx="60" cy="60" r="30" {...line} strokeOpacity="0.5" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={r2(60 + 30 * Math.cos(a))}
              y1={r2(60 + 30 * Math.sin(a))}
              x2={r2(60 + 44 * Math.cos(a))}
              y2={r2(60 + 44 * Math.sin(a))}
              {...line}
            />
          );
        })}
        <path d="M60 60 L104 60" {...line} className="draw-path text-gold" />
        <path d="M60 60 L100 42" {...line} className="draw-path text-gold" />
        <path
          d="M92 60 A32 32 0 0 0 89 47"
          {...line}
          className="draw-path text-gold"
        />
      </svg>
    ),
  },
  {
    t: "The rising sign",
    d: "Your lagna is the sign on the eastern horizon at the minute of birth. It moves a sign about every two hours, so the time matters.",
    art: (
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <path d="M10 80 H110" {...line} />
        <path
          d="M30 80 A30 30 0 0 1 90 80"
          {...line}
          className="draw-path text-gold"
        />
        {[0, 1, 2, 3, 4].map((i) => {
          const a = Math.PI + (i * Math.PI) / 8 + Math.PI / 8;
          return (
            <path
              key={i}
              d={`M${r2(60 + 38 * Math.cos(a))} ${r2(80 + 38 * Math.sin(a))} L${r2(60 + 48 * Math.cos(a))} ${r2(80 + 48 * Math.sin(a))}`}
              {...line}
            />
          );
        })}
        <path d="M20 96 H100 M35 106 H85" {...line} strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    t: "Whole-sign houses",
    d: "The lagna's sign becomes the first house, the next sign the second, and so on around the chart. Simple, and the classical way.",
    art: (
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <rect x="14" y="14" width="92" height="92" {...line} />
        <path d="M14 14 L106 106 M106 14 L14 106" {...line} />
        <path
          d="M60 14 L106 60 L60 106 L14 60 Z"
          {...line}
          className="draw-path text-gold"
        />
      </svg>
    ),
  },
  {
    t: "Dashas from the Moon",
    d: "The Moon's nakshatra at birth decides which planet's season you begin in, and how much of it was already over.",
    art: (
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <path d="M10 64 H110" {...line} />
        {[10, 26, 50, 62, 80, 96, 110].map((x) => (
          <path key={x} d={`M${x} 56 V72`} {...line} />
        ))}
        <circle
          cx="34"
          cy="36"
          r="12"
          {...line}
          className="draw-path text-gold"
        />
        <path d="M34 48 V60" {...line} className="draw-path text-gold" />
        <path
          d="M26 86 H62"
          {...line}
          className="draw-path text-gold"
          strokeWidth={3}
        />
      </svg>
    ),
  },
];

const LINKS = [
  ["Today's sky & panchang", "/today"],
  ["Which element guides you?", "/quiz"],
  ["Your personalised report", "/report"],
  ["Articles on astrology", "/blog"],
];

/* How the chart is calculated, with line drawings that draw in on scroll. */
export function ChartExplainer() {
  return (
    <section className="border-t border-line py-20 lg:py-24 print:hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              Behind the wheel
            </p>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
              How your chart <em className="text-gold-deep">is drawn.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-2">
            Standard astronomical formulas, run in your browser. Nothing you
            enter leaves this page.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 120}>
              <div className="group h-full rounded-[26px] border border-line bg-card p-6 transition hover:border-gold/50 hover:shadow-[0_30px_60px_-40px_rgba(28,24,68,0.5)]">
                <div className="flex items-start justify-between">
                  <div className="h-24 w-24 text-ink/70 transition group-hover:text-ink">
                    {s.art}
                  </div>
                  <span className="font-display text-3xl text-gold/60">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-5 font-display text-2xl text-ink">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-2">
          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-1.5 rounded-full border border-line bg-card px-4 py-2 text-sm text-ink-2 transition hover:border-ink hover:text-ink"
            >
              {label}
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import { LIFE_AREAS } from "@/data/prernaData";

const C = 200;
const R_OUT = 190;
const R_IN = 92;
const pt = (deg: number, r: number) => {
  const t = ((deg - 90) * Math.PI) / 180;
  return [
    Math.round((C + r * Math.cos(t)) * 100) / 100,
    Math.round((C + r * Math.sin(t)) * 100) / 100,
  ];
};
const slice = (i: number) => {
  const a1 = i * 36 + 1;
  const a2 = (i + 1) * 36 - 1;
  const [x1, y1] = pt(a1, R_OUT);
  const [x2, y2] = pt(a2, R_OUT);
  const [x3, y3] = pt(a2, R_IN);
  const [x4, y4] = pt(a1, R_IN);
  return `M${x1} ${y1} A${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
};

export function LifeWheel() {
  const [active, setActive] = useState(0);
  const { openBooking } = useBooking();
  const a = LIFE_AREAS[active];

  return (
    <section
      id="areas"
      className="relative scroll-mt-16 overflow-hidden bg-ink py-24 text-paper lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(59,52,136,0.6),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
            Ten areas of life
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            Where is your question{" "}
            <em className="text-gold-bright">coming from?</em>
          </h2>
          <p className="mt-4 text-paper/65">
            Turn the wheel. Each area is read through Vedic astrology and
            psychology together.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* wheel */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <svg
              viewBox="0 0 400 400"
              className="w-full"
              role="tablist"
              aria-label="Life areas"
            >
              <circle
                cx={C}
                cy={C}
                r={R_OUT + 6}
                fill="none"
                stroke="#d6ac52"
                strokeOpacity="0.35"
              />
              <circle
                cx={C}
                cy={C}
                r={R_OUT + 12}
                fill="none"
                stroke="#d6ac52"
                strokeOpacity="0.15"
                strokeDasharray="1 5"
              />
              {LIFE_AREAS.map((area, i) => {
                const on = i === active;
                const [lx, ly] = pt(i * 36 + 18, (R_OUT + R_IN) / 2);
                const rot = i * 36 + 18;
                const flip = rot > 90 && rot < 270;
                return (
                  <g
                    key={area.id}
                    role="tab"
                    aria-selected={on}
                    tabIndex={0}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActive(i);
                    }}
                    className="cursor-pointer outline-none"
                  >
                    <path
                      d={slice(i)}
                      fill={on ? "#d6ac52" : "#ffffff"}
                      fillOpacity={on ? 1 : 0.04}
                      stroke="#d6ac52"
                      strokeOpacity={on ? 1 : 0.4}
                      className="transition-all duration-300 hover:fill-opacity-[0.12]"
                    />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${flip ? rot + 180 : rot} ${lx} ${ly})`}
                      className="pointer-events-none select-none font-display"
                      fontSize={area.title.length > 12 ? 10.5 : 13}
                      fill={on ? "#1c1844" : "#fffdf8"}
                      fillOpacity={on ? 1 : 0.85}
                    >
                      {area.title.replace("Life Success & Growth", "Success")}
                    </text>
                  </g>
                );
              })}
              <circle
                cx={C}
                cy={C}
                r={R_IN - 8}
                fill="#1c1844"
                stroke="#d6ac52"
                strokeOpacity="0.5"
              />
              <text
                x={C}
                y={C - 8}
                textAnchor="middle"
                className="font-display"
                fontSize="44"
                fill="#f1dcb2"
              >
                {a.number}
              </text>
              <text
                x={C}
                y={C + 22}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="3"
                fill="#fffdf8"
                fillOpacity="0.55"
              >
                OF TEN
              </text>
            </svg>
          </div>

          {/* detail */}
          <div key={a.id} className="rise">
            <p className="text-xs uppercase tracking-[0.3em] text-paper/50">
              {a.number} · {a.tagline}
            </p>
            <h3 className="mt-3 font-display text-5xl sm:text-6xl">
              {a.title}
            </h3>
            <p className="mt-6 border-l-2 border-gold-bright pl-5 font-display text-2xl italic leading-snug text-gold-bright sm:text-[1.7rem]">
              &ldquo;{a.keyTriggerQuestion}&rdquo;
            </p>

            <div className="mt-9 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a99be0]">
                  Vedic lens
                </p>
                <p className="mt-2 text-sm text-paper/60">
                  {a.vedicInsight.focus}
                </p>
                <ul className="mt-3 space-y-1.5 text-paper/85">
                  {a.vedicInsight.planetaryFactors.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold-bright">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a8e8]">
                  Psychology lens
                </p>
                <p className="mt-2 text-sm text-paper/60">
                  {a.psychologyInsight.focus}
                </p>
                <ul className="mt-3 space-y-1.5 text-paper/85">
                  {a.psychologyInsight.therapeuticApproach.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold-bright">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 leading-relaxed text-paper/70">
              <span className="font-semibold text-paper">You leave with: </span>
              {a.sampleGuidanceOutcome}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBooking(a.title)}
                className="group flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-semibold text-ink transition hover:bg-dawn"
              >
                Book a {a.title.toLowerCase()} session
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setActive((active + 9) % 10)}
                  aria-label="Previous life area"
                  className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition hover:border-paper"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((active + 1) % 10)}
                  aria-label="Next life area"
                  className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition hover:border-paper"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

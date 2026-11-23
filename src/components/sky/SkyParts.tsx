"use client";

import React, { useEffect, useState } from "react";
import { CITIES, NAKSHATRAS, panchang, type Panchang } from "@/lib/sky";

/* Computes the panchang on the client (so server and browser never disagree)
 * and refreshes it every minute. Returns null until mounted. */
export function useSky(cityIndex = 0) {
  const [p, setP] = useState<Panchang | null>(null);
  useEffect(() => {
    const run = () => setP(panchang(new Date(), CITIES[cityIndex]));
    run();
    const id = setInterval(run, 60_000);
    return () => clearInterval(id);
  }, [cityIndex]);
  return p;
}

/* ---------------- Moon phase drawing ---------------- */
export function MoonPhase({
  elongation,
  className = "",
}: {
  elongation: number;
  className?: string;
}) {
  const r = 46;
  const phase = (elongation * Math.PI) / 180;
  const k = Math.cos(phase); // 1 = new, -1 = full
  const waxing = elongation < 180;
  const rx = Math.abs(k) * r;
  // lit limb is on the right while waxing, left while waning
  const limbSweep = waxing ? 1 : 0;
  const termSweep = k > 0 ? (waxing ? 0 : 1) : waxing ? 1 : 0;
  const d = `M50 ${50 - r} A${r} ${r} 0 0 ${limbSweep} 50 ${50 + r} A${rx.toFixed(2)} ${r} 0 0 ${termSweep} 50 ${50 - r}Z`;

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="mp-lit" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#fff8e6" />
          <stop offset="70%" stopColor="#f1dcb2" />
          <stop offset="100%" stopColor="#d6ac52" />
        </radialGradient>
        <radialGradient id="mp-halo" cx="50%" cy="50%" r="50%">
          <stop offset="55%" stopColor="#f1dcb2" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f1dcb2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#mp-halo)" />
      <circle cx="50" cy="50" r={r} fill="#2a2656" />
      <path d={d} fill="url(#mp-lit)" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="#d6ac52"
        strokeOpacity="0.5"
        strokeWidth="0.6"
      />
    </svg>
  );
}

/* ---------------- 27-nakshatra scale (Lakshatras style) ---------------- */
export function NakshatraScale({
  p,
  dark = false,
}: {
  p: Panchang | null;
  dark?: boolean;
}) {
  const moonPct = p ? (p.moon / 360) * 100 : null;
  const sunPct = p ? (p.sun / 360) * 100 : null;
  const active = p?.nakshatra.index ?? -1;
  const line = dark ? "border-paper/15" : "border-line";
  const label = dark ? "text-paper/55" : "text-ink-3";

  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
      <div className="relative min-w-[900px] pt-12">
        {/* markers */}
        {[
          {
            pct: moonPct,
            name: "Moon",
            c: "bg-paper ring-gold",
            t: "text-gold-deep",
          },
          {
            pct: sunPct,
            name: "Sun",
            c: "bg-gold ring-gold-bright",
            t: "text-gold-deep",
          },
        ].map(
          (m) =>
            m.pct !== null && (
              <div
                key={m.name}
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center transition-[left] duration-700"
                style={{ left: `${m.pct}%` }}
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-gold-bright" : m.t}`}
                >
                  {m.name}
                </span>
                <span
                  className={`mt-1 h-3.5 w-3.5 rounded-full ring-2 ${m.c} shadow-[0_0_14px_rgba(214,172,82,0.8)]`}
                />
                <span
                  className={`h-[9.2rem] w-px ${dark ? "bg-gold-bright/60" : "bg-gold/70"}`}
                />
              </div>
            )
        )}

        <ol
          className={`grid grid-cols-[repeat(27,minmax(0,1fr))] border-y ${line}`}
        >
          {NAKSHATRAS.map((n, i) => (
            <li
              key={n}
              className={`relative flex h-32 items-end justify-center border-l pb-2 first:border-l-0 ${line} ${
                i === active
                  ? dark
                    ? "bg-gold/25"
                    : "bg-[#7a2a45]/12"
                  : i % 2
                    ? dark
                      ? "bg-paper/[0.03]"
                      : "bg-sand/50"
                    : ""
              }`}
              title={`${i + 1}. ${n}`}
            >
              <span
                className={`rotate-180 whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-[0.12em] [writing-mode:vertical-rl] ${
                  i === active
                    ? dark
                      ? "text-gold-bright"
                      : "text-[#7a2a45]"
                    : label
                }`}
              >
                {n}
              </span>
            </li>
          ))}
        </ol>
        {/* sign scale */}
        <ol className="grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <li
              key={i}
              className={`border-l py-1.5 text-center text-[10px] uppercase tracking-[0.18em] first:border-l-0 ${line} ${label}`}
            >
              {
                [
                  "Ar",
                  "Ta",
                  "Ge",
                  "Cn",
                  "Le",
                  "Vi",
                  "Li",
                  "Sc",
                  "Sg",
                  "Cp",
                  "Aq",
                  "Pi",
                ][i]
              }
            </li>
          ))}
        </ol>
        <span className="sr-only">
          {p
            ? `The Moon is in ${p.nakshatra.name}, pada ${p.nakshatra.pada}. The Sun is in ${p.sunSign.en}.`
            : "Calculating the sky"}
        </span>
      </div>
    </div>
  );
}

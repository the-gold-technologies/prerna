"use client";

import React, { useEffect, useState } from "react";
import { ABBR, type BirthChart, type Placement } from "@/lib/chart";
import { NAKSHATRAS, RASHI, SIGNS } from "@/lib/sky";

/*
 * The live chart wheel, drawn for a dark background.
 *
 * Everything zodiacal lives in a "frame" measured in sidereal longitude
 * (0° Mesha on the right, counter-clockwise). The frame is rotated so the
 * lagna sits on the left, and each planet is rotated to its longitude inside
 * it. Both rotations are CSS transitions, so when the chart changes the wheel
 * turns and every planet sweeps to its new place.
 */

const C = 250;
const R = {
  out: 236,
  sign: 202,
  nak: 182,
  planet: 154,
  house: 96,
  core: 62,
  transit: 262,
};
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export const LIGHT_TONE: Record<string, string> = {
  Sun: "#f3a65f",
  Moon: "#e6ecf7",
  Mars: "#f07c6e",
  Mercury: "#86d6a6",
  Jupiter: "#f2d37e",
  Venus: "#f4a9d0",
  Saturn: "#aab3dc",
  Rahu: "#9eabff",
  Ketu: "#dcab7c",
  Asc: "#d6ac52",
};

const r2 = (n: number) => Math.round(n * 100) / 100;
const pt = (r: number, deg: number) => {
  const t = (deg * Math.PI) / 180;
  return [r2(C + r * Math.cos(t)), r2(C - r * Math.sin(t))] as const;
};
/* An annular sector from a1 to a2 (degrees, counter-clockwise). */
const sector = (r1: number, r2_: number, a1: number, a2: number) => {
  const [x1, y1] = pt(r2_, a1);
  const [x2, y2] = pt(r2_, a2);
  const [x3, y3] = pt(r1, a2);
  const [x4, y4] = pt(r1, a1);
  return `M${x1} ${y1} A${r2_} ${r2_} 0 0 0 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 0 1 ${x4} ${y4}Z`;
};

/* Push neighbours that sit within 10° of each other onto inner rings. */
function ringsFor(list: Placement[]) {
  const out: Record<string, number> = {};
  let prev: { lon: number; ring: number } | null = null;
  [...list]
    .sort((a, b) => a.lon - b.lon)
    .forEach((p) => {
      const ring = prev && p.lon - prev.lon < 10 ? (prev.ring + 1) % 3 : 0;
      out[p.name] = ring;
      prev = { lon: p.lon, ring };
    });
  return out;
}

const retroMark = (p: Placement) =>
  p.retro && p.name !== "Rahu" && p.name !== "Ketu" ? "ᴿ" : "";

export function LiveWheel({
  chart,
  today,
  transit,
  className = "",
}: {
  chart: BirthChart | null;
  today: BirthChart | null;
  transit?: BirthChart | null;
  className?: string;
}) {
  const shown = chart ?? today;
  const planets = shown?.planets ?? [];
  const rings = ringsFor(planets);
  const tRings = transit ? ringsFor(transit.planets) : {};

  /* Frame angle (CSS degrees). Idle: drifts slowly. With a chart: turns so the lagna is on the left. */
  const [frame, setFrame] = useState(-90);
  const ascLon = chart?.asc.lon;

  useEffect(() => {
    if (ascLon === undefined) {
      const id = setInterval(() => setFrame((a) => a - 2), 2500);
      return () => clearInterval(id);
    }
    // keep turning the same way, at least half a turn, then settle on the lagna
    const base = ascLon - 180;
    const id = setTimeout(() =>
      setFrame((a) => base - 360 * Math.ceil((base - (a - 180)) / 360))
    );
    return () => clearTimeout(id);
  }, [ascLon]);

  const turning = chart ? `transform 2.6s ${EASE}` : "transform 2.5s linear";
  const sweep = `transform 2.6s ${EASE}`;

  return (
    <svg
      viewBox="-40 -40 580 580"
      className={`h-full w-full overflow-visible ${className}`}
      role="img"
      aria-label={
        chart
          ? `Birth chart wheel: lagna in ${SIGNS[chart.ascSign]}, Moon in ${chart.moonSign.en}, Sun in ${chart.sunSign.en}`
          : "Today's sky on a slowly turning sidereal zodiac wheel"
      }
    >
      <defs>
        <radialGradient id="lw-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b3488" />
          <stop offset="100%" stopColor="#1c1844" />
        </radialGradient>
        <radialGradient id="lw-halo" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#d6ac52" stopOpacity="0" />
          <stop offset="85%" stopColor="#d6ac52" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#d6ac52" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lw-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d6ac52" stopOpacity="0" />
          <stop offset="100%" stopColor="#d6ac52" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r={R.out + 34} fill="url(#lw-halo)" />

      {/* idle sweep */}
      {!chart && (
        <g className="lw-sweep">
          <path
            d={sector(R.core, R.nak, 0, 38)}
            fill="url(#lw-beam)"
            opacity="0.55"
          />
        </g>
      )}

      {/* ---------- rotating frame ---------- */}
      <g
        style={{
          transform: `rotate(${frame}deg)`,
          transformOrigin: `${C}px ${C}px`,
          transition: turning,
        }}
      >
        {/* sign sectors */}
        {RASHI.map((name, i) => (
          <path
            key={name}
            d={sector(R.sign, R.out, i * 30, i * 30 + 30)}
            fill={chart && i === chart.ascSign ? "#d6ac52" : "#ffffff"}
            fillOpacity={
              chart && i === chart.ascSign ? 0.22 : i % 2 ? 0.05 : 0.02
            }
            style={{ transition: "fill-opacity 1s ease 1.6s" }}
          />
        ))}
        {/* sign boundaries + house spokes */}
        {RASHI.map((name, i) => {
          const [x1, y1] = pt(R.out, i * 30);
          const [x2, y2] = pt(R.core, i * 30);
          return (
            <line
              key={name}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d6ac52"
              strokeOpacity="0.35"
              pathLength={1}
              className="lw-draw"
              style={{ animationDelay: `${0.4 + i * 0.05}s` }}
            />
          );
        })}
        {/* nakshatra ticks */}
        {NAKSHATRAS.map((n, i) => {
          const [x1, y1] = pt(R.sign, (i * 360) / 27);
          const [x2, y2] = pt(R.nak, (i * 360) / 27);
          return (
            <line
              key={n}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#d6ac52"
              strokeOpacity="0.3"
            />
          );
        })}
        {/* rashi names */}
        {RASHI.map((name, i) => {
          const [x, y] = pt((R.out + R.sign) / 2, i * 30 + 15);
          return (
            <text
              key={name}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${r2(90 - (i * 30 + 15))} ${x} ${y})`}
              className="font-sans"
              fontSize="10"
              fontWeight={600}
              letterSpacing="2"
              fill={chart && i === chart.ascSign ? "#f3e3b9" : "#e8d3a2"}
              fillOpacity={chart && i === chart.ascSign ? 1 : 0.75}
            >
              {name.toUpperCase()}
            </text>
          );
        })}
        {/* house numbers (whole sign), kept upright */}
        {chart &&
          Array.from({ length: 12 }, (_, h) => {
            const sign = (chart.ascSign + h) % 12;
            const [x, y] = pt(R.house + 14, sign * 30 + 15);
            return (
              <text
                key={h}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="rise font-display"
                fontSize="13"
                fill="#faf6ee"
                fillOpacity="0.45"
                style={{
                  transform: `rotate(${-frame}deg)`,
                  transformOrigin: `${x}px ${y}px`,
                  transition: turning,
                  animationDelay: "2.2s",
                }}
              >
                {h + 1}
              </text>
            );
          })}

        {/* planets */}
        {planets.map((p) => {
          const r = R.planet - (rings[p.name] ?? 0) * 25;
          const tone = LIGHT_TONE[p.name];
          return (
            <g
              key={p.name}
              style={{
                transform: `rotate(${r2(-p.lon)}deg)`,
                transformOrigin: `${C}px ${C}px`,
                transition: sweep,
              }}
            >
              <line
                x1={C + R.nak}
                y1={C}
                x2={C + r + 10}
                y2={C}
                stroke={tone}
                strokeOpacity="0.5"
              />
              <circle cx={C + R.nak} cy={C} r="2.5" fill={tone} />
              <g
                style={{
                  transform: `rotate(${r2(p.lon - frame)}deg)`,
                  transformOrigin: `${C + r}px ${C}px`,
                  transition: turning,
                }}
              >
                <title>{`${p.name} · ${RASHI[p.sign]} ${Math.floor(p.deg)}° · ${p.nakshatra}`}</title>
                <circle
                  cx={C + r}
                  cy={C}
                  r="11"
                  fill="#1c1844"
                  stroke={tone}
                  strokeWidth="1.2"
                />
                <text
                  x={C + r}
                  y={C + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-display"
                  fontSize="11"
                  fontWeight={600}
                  fill={tone}
                >
                  {ABBR[p.name]}
                  {retroMark(p)}
                </text>
              </g>
            </g>
          );
        })}

        {/* today's planets on an outer ring (bi-wheel) */}
        {transit?.planets.map((p) => {
          const tr = R.transit + (tRings[p.name] ?? 0) * 21;
          return (
            <g
              key={`t-${p.name}`}
              style={{
                transform: `rotate(${r2(-p.lon)}deg)`,
                transformOrigin: `${C}px ${C}px`,
                transition: sweep,
              }}
            >
              <line
                x1={C + R.out}
                y1={C}
                x2={C + tr - 9}
                y2={C}
                stroke="#d6ac52"
                strokeOpacity="0.5"
                strokeDasharray="2 3"
              />
              <g
                style={{
                  transform: `rotate(${r2(p.lon - frame)}deg)`,
                  transformOrigin: `${C + tr}px ${C}px`,
                  transition: sweep,
                }}
              >
                <title>{`Today: ${p.name} in ${RASHI[p.sign]} ${Math.floor(p.deg)}°`}</title>
                <circle cx={C + tr} cy={C} r="9" fill="#d6ac52" />
                <text
                  x={C + tr}
                  y={C + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-display"
                  fontSize="9.5"
                  fontWeight={700}
                  fill="#1c1844"
                >
                  {ABBR[p.name]}
                </text>
              </g>
            </g>
          );
        })}
      </g>

      {/* ---------- fixed rings (drawn in) ---------- */}
      <g fill="none" stroke="#d6ac52">
        <circle
          cx={C}
          cy={C}
          r={R.out}
          strokeWidth="1.4"
          pathLength={1}
          className="lw-draw"
        />
        <circle
          cx={C}
          cy={C}
          r={R.sign}
          strokeOpacity="0.7"
          pathLength={1}
          className="lw-draw"
          style={{ animationDelay: "0.15s" }}
        />
        <circle
          cx={C}
          cy={C}
          r={R.nak}
          strokeOpacity="0.5"
          pathLength={1}
          className="lw-draw"
          style={{ animationDelay: "0.3s" }}
        />
        <circle
          cx={C}
          cy={C}
          r={R.house}
          strokeOpacity="0.25"
          strokeDasharray="2 5"
        />
      </g>
      <circle
        cx={C}
        cy={C}
        r={R.core}
        fill="url(#lw-core)"
        stroke="#d6ac52"
        strokeOpacity="0.6"
      />

      {/* lagna marker on the left */}
      {chart && (
        <g className="rise" style={{ animationDelay: "2.3s" }}>
          <line
            x1={C - R.core}
            y1={C}
            x2={C - R.out - 6}
            y2={C}
            stroke="#f3e3b9"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          <rect
            x={C - R.out - 50}
            y={C - 11}
            width="44"
            height="22"
            rx="11"
            fill="#d6ac52"
          />
          <text
            x={C - R.out - 28}
            y={C + 0.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fontWeight={700}
            letterSpacing="1.5"
            fill="#1c1844"
          >
            ASC
          </text>
        </g>
      )}

      {/* core */}
      <text
        x={C}
        y={C - 6}
        textAnchor="middle"
        className="font-display"
        fontSize={chart ? 22 : 17}
        fill="#faf6ee"
      >
        {chart ? chart.lagna.sa : "Today"}
      </text>
      <text
        x={C}
        y={C + 16}
        textAnchor="middle"
        fontSize="8.5"
        letterSpacing="2.5"
        fill="#d6ac52"
      >
        {chart ? "LAGNA" : "LIVE SKY"}
      </text>
    </svg>
  );
}

/* Animated Vedic astrology wheel (rashi chakra) for the hero background.
   Decorative only. Rings rotate at different speeds via the spin classes in
   globals.css, which are disabled under prefers-reduced-motion. */

import React from "react";

const C = 300;

// 12 rashis (Vedic zodiac signs) in Devanagari, with their Western glyphs
const RASHIS: [string, string][] = [
  ["मेष", "♈"],
  ["वृषभ", "♉"],
  ["मिथुन", "♊"],
  ["कर्क", "♋"],
  ["सिंह", "♌"],
  ["कन्या", "♍"],
  ["तुला", "♎"],
  ["वृश्चिक", "♏"],
  ["धनु", "♐"],
  ["मकर", "♑"],
  ["कुम्भ", "♒"],
  ["मीन", "♓"],
];

// A few of the navagraha, each on its own orbit and speed
const GRAHAS = [
  { r: 214, size: 7, dur: "48s", start: 20, fill: "#d6ac52" }, // Surya
  { r: 214, size: 4.5, dur: "48s", start: 200, fill: "#3b3488" }, // Chandra
  { r: 300, size: 5, dur: "90s", start: 120, fill: "#64458f" }, // Shukra
  { r: 300, size: 4, dur: "90s", start: 300, fill: "#b8892f" }, // Guru
];

const pt = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [
    (C + Math.cos(a) * r).toFixed(2),
    (C + Math.sin(a) * r).toFixed(2),
  ] as const;
};

export default function VedicChakra({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="-20 -20 640 640"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* degree ring: 360° in 5° ticks */}
      <g
        className="spin-slow"
        style={{ transformOrigin: "300px 300px" }}
        stroke="currentColor"
      >
        <circle cx={C} cy={C} r="292" strokeOpacity=".5" />
        <circle cx={C} cy={C} r="280" strokeOpacity=".3" />
        {Array.from({ length: 72 }, (_, i) => {
          const long = i % 6 === 0;
          const [x1, y1] = pt(280, i * 5);
          const [x2, y2] = pt(long ? 296 : 288, i * 5);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              strokeOpacity={long ? 0.7 : 0.35}
            />
          );
        })}
      </g>

      {/* rashi band: 12 houses with Sanskrit names and glyphs */}
      <g
        className="spin-rev"
        style={{ transformOrigin: "300px 300px", animationDuration: "160s" }}
      >
        <circle
          cx={C}
          cy={C}
          r="268"
          stroke="currentColor"
          strokeOpacity=".45"
        />
        <circle
          cx={C}
          cy={C}
          r="226"
          stroke="currentColor"
          strokeOpacity=".45"
        />
        {RASHIS.map(([name, glyph], i) => {
          const [x1, y1] = pt(226, i * 30);
          const [x2, y2] = pt(268, i * 30);
          const mid = i * 30 + 15;
          const [nx, ny] = pt(247, mid);
          const [gx, gy] = pt(206, mid);
          return (
            <g key={name}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeOpacity=".5"
              />
              <text
                x={nx}
                y={ny}
                transform={`rotate(${mid} ${nx} ${ny})`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                fillOpacity=".85"
                fontSize="15"
                fontWeight="500"
              >
                {name}
              </text>
              <text
                x={gx}
                y={gy}
                transform={`rotate(${mid} ${gx} ${gy})`}
                textAnchor="middle"
                dominantBaseline="central"
                fill="currentColor"
                fillOpacity=".7"
                fontSize="15"
                fontFamily="Georgia, serif"
              >
                {glyph + "︎"}
              </text>
            </g>
          );
        })}
      </g>

      {/* 27 nakshatras */}
      <g
        className="spin-slow"
        style={{ transformOrigin: "300px 300px", animationDuration: "220s" }}
      >
        <circle
          cx={C}
          cy={C}
          r="186"
          stroke="currentColor"
          strokeOpacity=".3"
          strokeDasharray="2 6"
        />
        {Array.from({ length: 27 }, (_, i) => {
          const [x, y] = pt(186, (i * 360) / 27);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 9 === 0 ? 3 : 1.8}
              fill="currentColor"
              fillOpacity=".75"
            />
          );
        })}
      </g>

      {/* graha orbits */}
      <circle
        cx={C}
        cy={C}
        r="214"
        stroke="currentColor"
        strokeOpacity=".22"
        strokeDasharray="1 5"
      />
      <circle
        cx={C}
        cy={C}
        r="312"
        stroke="currentColor"
        strokeOpacity=".22"
        strokeDasharray="1 7"
      />
      {GRAHAS.map((g, i) => {
        const [x, y] = pt(g.r, g.start);
        return (
          <g
            key={i}
            className="spin-mid"
            style={{ transformOrigin: "300px 300px", animationDuration: g.dur }}
          >
            <circle
              cx={x}
              cy={y}
              r={g.size * 2.4}
              fill={g.fill}
              fillOpacity=".14"
            />
            <circle cx={x} cy={y} r={g.size} fill={g.fill} />
          </g>
        );
      })}

      {/* North-Indian kundli at the centre */}
      <g
        className="spin-rev"
        style={{ transformOrigin: "300px 300px", animationDuration: "120s" }}
        stroke="currentColor"
      >
        <rect x="230" y="230" width="140" height="140" strokeOpacity=".55" />
        <path d="M300 230 L370 300 L300 370 L230 300 Z" strokeOpacity=".55" />
        <path d="M230 230 L370 370 M370 230 L230 370" strokeOpacity=".35" />
      </g>
    </svg>
  );
}

/* Small four-point sparkle used for twinkling stars */
export function Sparkle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const STARS = [
  { x: "2%", y: "8%", s: 12, d: "0s", c: "text-gold" },
  { x: "31%", y: "9%", s: 9, d: "1.2s", c: "text-astro/60" },
  { x: "48%", y: "10%", s: 12, d: "2.4s", c: "text-gold" },
  { x: "52%", y: "70%", s: 10, d: "0.6s", c: "text-psych/60" },
  { x: "3%", y: "62%", s: 8, d: "3s", c: "text-gold" },
  { x: "93%", y: "18%", s: 13, d: "1.8s", c: "text-gold" },
  { x: "96%", y: "64%", s: 9, d: "2.8s", c: "text-astro/60" },
  { x: "40%", y: "84%", s: 11, d: "3.6s", c: "text-gold" },
  { x: "62%", y: "6%", s: 8, d: "0.9s", c: "text-psych/60" },
];

/* Twinkling stars + two shooting stars, positioned over the parent section */
export function SkyDecor() {
  return (
    <>
      {STARS.map((st, i) => (
        <Sparkle
          key={i}
          className={`twinkle pointer-events-none absolute ${st.c}`}
          style={{
            left: st.x,
            top: st.y,
            width: st.s,
            height: st.s,
            animationDelay: st.d,
          }}
        />
      ))}
      <div
        className="pointer-events-none absolute left-[38%] top-[90px] rotate-[150deg]"
        aria-hidden="true"
      >
        <span className="shooting-star" />
      </div>
      <div
        className="pointer-events-none absolute left-[88%] top-[40px] rotate-[155deg]"
        aria-hidden="true"
      >
        <span className="shooting-star" style={{ animationDelay: "5.5s" }} />
      </div>
    </>
  );
}

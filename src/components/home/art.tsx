/* Hand-built SVG illustrations for the PRERNA landing page.
   All are decorative (aria-hidden) and animate via CSS classes in globals.css. */

import React, { useId } from "react";

/* Deterministic pseudo-random so server + client render the same stars */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeOpacity=".35" />
      <path d="M24 5 L41 34 H7 Z" stroke="currentColor" strokeOpacity=".45" />
      <circle cx="24" cy="19" r="8" stroke="currentColor" />
      <circle cx="19.5" cy="27" r="8" stroke="currentColor" />
      <circle cx="28.5" cy="27" r="8" stroke="currentColor" />
      <circle cx="24" cy="24.5" r="2.2" fill="currentColor" />
    </svg>
  );
}

/* Hero: dusk sky, setting sun with orbit rings, layered hills over still water */
export function CelestialScene({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const rand = seeded(7);
  const stars = Array.from({ length: 46 }, () => ({
    x: rand() * 400,
    y: rand() * 250,
    r: rand() * 1.3 + 0.4,
    d: rand() * 4,
  }));

  return (
    <svg viewBox="0 0 400 520" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id("sky")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1a38" />
          <stop offset=".42" stopColor="#4a3a6e" />
          <stop offset=".68" stopColor="#b9707a" />
          <stop offset=".84" stopColor="#eba882" />
          <stop offset="1" stopColor="#f6d6b2" />
        </linearGradient>
        <radialGradient id={id("sunGlow")} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffe9c2" stopOpacity=".9" />
          <stop offset=".45" stopColor="#ffd59a" stopOpacity=".35" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("water")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2550" />
          <stop offset="1" stopColor="#1d1a38" />
        </linearGradient>
      </defs>

      <rect width="400" height="520" fill={`url(#${id("sky")})`} />

      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x.toFixed(1)}
          cy={s.y.toFixed(1)}
          r={s.r.toFixed(2)}
          fill="#fff6e0"
          className="twinkle"
          style={{ animationDelay: `${s.d.toFixed(2)}s` }}
        />
      ))}

      {/* crescent moon */}
      <g transform="translate(318 78)">
        <circle r="13" fill="#fbecc8" />
        <circle r="13" cx="6" cy="-4" fill="#2a2452" />
      </g>

      {/* sun + glow */}
      <circle cx="200" cy="318" r="150" fill={`url(#${id("sunGlow")})`} />
      <circle cx="200" cy="318" r="58" fill="#fde3b6" />

      {/* orbits */}
      <g className="spin-slow" style={{ transformOrigin: "200px 318px" }}>
        <circle cx="200" cy="318" r="104" fill="none" stroke="#fff3da" strokeOpacity=".45" strokeDasharray="2 6" />
        <circle cx="304" cy="318" r="5" fill="#fff3da" />
        <circle cx="200" cy="214" r="3" fill="#fff3da" fillOpacity=".8" />
      </g>
      <g className="spin-rev" style={{ transformOrigin: "200px 318px" }}>
        <circle cx="200" cy="318" r="156" fill="none" stroke="#fff3da" strokeOpacity=".28" />
        <circle cx="90" cy="208" r="4" fill="#e8d3a2" />
        <circle cx="356" cy="318" r="2.5" fill="#fff3da" />
      </g>
      <g className="spin-mid" style={{ transformOrigin: "200px 318px" }}>
        <circle cx="200" cy="318" r="214" fill="none" stroke="#fff3da" strokeOpacity=".16" strokeDasharray="1 9" />
        <circle cx="200" cy="104" r="3.5" fill="#fff3da" fillOpacity=".7" />
      </g>

      {/* hills */}
      <path
        d="M0 352 L48 322 L92 340 L150 296 L204 338 L258 302 L318 334 L360 314 L400 330 V520 H0 Z"
        fill="#7d4f6c"
      />
      <path d="M0 392 Q70 352 140 380 T280 372 T400 378 V520 H0 Z" fill="#a24e33" />
      <path d="M0 412 Q120 392 220 408 T400 404 V520 H0 Z" fill="#44705a" fillOpacity=".95" />

      {/* water */}
      <rect y="430" width="400" height="90" fill={`url(#${id("water")})`} />
      <g stroke="#f6d6b2" strokeLinecap="round">
        <line x1="160" y1="446" x2="240" y2="446" strokeOpacity=".7" strokeWidth="2" />
        <line x1="176" y1="458" x2="226" y2="458" strokeOpacity=".5" strokeWidth="1.5" />
        <line x1="186" y1="470" x2="214" y2="470" strokeOpacity=".35" strokeWidth="1.5" />
        <line x1="60" y1="478" x2="96" y2="478" strokeOpacity=".2" />
        <line x1="300" y1="488" x2="344" y2="488" strokeOpacity=".2" />
      </g>
    </svg>
  );
}

/* Astrology: zodiac wheel */
export function ZodiacWheel({ className = "" }: { className?: string }) {
  const c = 120;
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" fill="none">
      <g className="spin-slow" style={{ transformOrigin: "120px 120px" }} stroke="currentColor">
        <circle cx={c} cy={c} r="110" strokeOpacity=".35" />
        <circle cx={c} cy={c} r="92" />
        <circle cx={c} cy={c} r="60" strokeOpacity=".5" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          const a2 = a + Math.PI / 12;
          return (
            <g key={i}>
              <line
                x1={(c + Math.cos(a) * 60).toFixed(2)}
                y1={(c + Math.sin(a) * 60).toFixed(2)}
                x2={(c + Math.cos(a) * 110).toFixed(2)}
                y2={(c + Math.sin(a) * 110).toFixed(2)}
                strokeOpacity=".45"
              />
              <circle
                cx={(c + Math.cos(a2) * 101).toFixed(2)}
                cy={(c + Math.sin(a2) * 101).toFixed(2)}
                r={i % 3 === 0 ? 3 : 1.6}
                fill="currentColor"
                stroke="none"
              />
            </g>
          );
        })}
      </g>
      <g className="spin-rev" style={{ transformOrigin: "120px 120px" }} stroke="currentColor">
        <path d="M120 64 L168 148 H72 Z" strokeOpacity=".7" />
        <path d="M120 176 L72 92 H168 Z" strokeOpacity=".7" />
      </g>
      <circle cx={c} cy={c} r="9" fill="currentColor" />
    </svg>
  );
}

/* Psychology: empathetic resonance, thought ripples & emotional balance */
export function MindRipples({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" fill="none">
      {/* Outer calming horizon */}
      <circle cx="120" cy="120" r="110" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="3 4" />
      <circle cx="120" cy="120" r="88" stroke="currentColor" strokeOpacity="0.3" />

      {/* Two empathetic intersecting circles of dialogue & holding space */}
      <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="96" cy="120" r="64" strokeOpacity="0.75" />
        <circle cx="144" cy="120" r="64" strokeOpacity="0.75" />
      </g>

      {/* Gentle spinning subtle resonance ring */}
      <g className="spin-slow" style={{ transformOrigin: "120px 120px" }}>
        <circle cx="120" cy="120" r="44" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="4 6" />
        <circle cx="120" cy="76" r="3.5" fill="currentColor" />
        <circle cx="120" cy="164" r="3.5" fill="currentColor" />
      </g>

      {/* Harmonic wave of emotional balance and untangling thoughts */}
      <path
        d="M36 120 C64 88, 92 88, 120 120 C148 152, 176 152, 204 120"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeOpacity="0.9"
        strokeLinecap="round"
      />
      <path
        d="M36 120 C64 152, 92 152, 120 120 C148 88, 176 88, 204 120"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />

      {/* Inner seed of mindfulness & insight */}
      <circle cx="120" cy="120" r="8" fill="currentColor" />
      <circle cx="120" cy="120" r="18" stroke="currentColor" strokeOpacity="0.45" strokeDasharray="2 3" />

      {/* Nodes of awareness across the therapeutic connection */}
      <circle cx="96" cy="85" r="4" fill="currentColor" />
      <circle cx="144" cy="85" r="4" fill="currentColor" />
      <circle cx="96" cy="155" r="4" fill="currentColor" />
      <circle cx="144" cy="155" r="4" fill="currentColor" />
    </svg>
  );
}

/* Spirituality: lotus on still water */
export function Lotus({ className = "" }: { className?: string }) {
  const petal = "M0 0 C -18 -34, -16 -70, 0 -98 C 16 -70, 18 -34, 0 0 Z";
  const outer = [-72, -48, -24, 0, 24, 48, 72];
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" fill="none">
      <circle cx="120" cy="96" r="44" fill="currentColor" fillOpacity=".08" className="float" />
      <g transform="translate(120 170)" stroke="currentColor" strokeLinejoin="round">
        {outer.map((a) => (
          <path
            key={a}
            d={petal}
            transform={`rotate(${a}) scale(${a === 0 ? 1 : Math.abs(a) > 50 ? 0.72 : 0.88})`}
            fill="currentColor"
            fillOpacity={a === 0 ? 0.22 : 0.08}
          />
        ))}
      </g>
      <g stroke="currentColor" strokeLinecap="round">
        <line x1="40" y1="186" x2="200" y2="186" />
        <line x1="66" y1="200" x2="174" y2="200" strokeOpacity=".6" />
        <line x1="92" y1="214" x2="148" y2="214" strokeOpacity=".35" />
      </g>
    </svg>
  );
}

/* Numerology: celestial dial — tick ring, nine-point star, glowing orb, numbers 1–9 */
export function NumberRing({ active, className = "" }: { active?: number; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const c = 180;
  const R = 128; // number ring radius
  const reduced = active && active > 9 ? ((active - 1) % 9) + 1 : active;
  const pt = (i: number, r: number) => {
    const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r] as const;
  };
  const star = Array.from({ length: 9 }, (_, k) => pt((k * 4) % 9, 100))
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
  const activePt = reduced ? pt(reduced - 1, R) : null;

  return (
    <svg viewBox="0 0 360 360" className={className} aria-hidden="true" fill="none">
      <defs>
        <radialGradient id={`orb-${uid}`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#e8d3a2" stopOpacity=".38" />
          <stop offset=".55" stopColor="#b8892f" stopOpacity=".12" />
          <stop offset="1" stopColor="#b8892f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* outer tick dial */}
      <g className="spin-slow" style={{ transformOrigin: `${c}px ${c}px` }}>
        <circle cx={c} cy={c} r="168" stroke="#e8d3a2" strokeOpacity=".18" />
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * Math.PI * 2;
          const long = i % 8 === 0;
          const r1 = 168;
          const r2 = long ? 156 : 162;
          return (
            <line
              key={i}
              x1={(c + Math.cos(a) * r1).toFixed(2)}
              y1={(c + Math.sin(a) * r1).toFixed(2)}
              x2={(c + Math.cos(a) * r2).toFixed(2)}
              y2={(c + Math.sin(a) * r2).toFixed(2)}
              stroke="#e8d3a2"
              strokeOpacity={long ? 0.55 : 0.22}
            />
          );
        })}
      </g>

      {/* number ring */}
      <circle cx={c} cy={c} r={R} stroke="#e8d3a2" strokeOpacity=".28" />

      {/* nine-point star */}
      <g className="spin-rev" style={{ transformOrigin: `${c}px ${c}px` }}>
        <polygon points={star} stroke="#e8d3a2" strokeOpacity=".16" strokeLinejoin="round" />
        <circle cx={c} cy={c} r="100" stroke="#e8d3a2" strokeOpacity=".1" strokeDasharray="2 5" />
      </g>

      {/* glowing orb */}
      <circle cx={c} cy={c} r="96" fill={`url(#orb-${uid})`} className="orb-pulse" style={{ transformOrigin: `${c}px ${c}px` }} />
      <circle cx={c} cy={c} r="62" stroke="#e8d3a2" strokeOpacity=".35" />
      <circle cx={c} cy={c} r="56" fill="#1c1844" fillOpacity=".55" />

      {/* line to the active number */}
      {activePt && (
        <line
          x1={c}
          y1={c}
          x2={activePt[0].toFixed(2)}
          y2={activePt[1].toFixed(2)}
          stroke="#e8d3a2"
          strokeOpacity=".5"
          strokeDasharray="3 4"
        />
      )}

      {/* numbers */}
      {Array.from({ length: 9 }, (_, i) => {
        const n = i + 1;
        const [x, y] = pt(i, R);
        const on = reduced === n;
        return (
          <g key={n} style={{ transition: "opacity .5s" }} opacity={reduced && !on ? 0.55 : 1}>
            {on && <circle cx={x.toFixed(2)} cy={y.toFixed(2)} r="24" stroke="#e8d3a2" strokeOpacity=".45" className="orb-pulse" style={{ transformOrigin: `${x.toFixed(2)}px ${y.toFixed(2)}px` }} />}
            <circle
              cx={x.toFixed(2)}
              cy={y.toFixed(2)}
              r={on ? 17 : 14}
              fill={on ? "#e8d3a2" : "#1c1844"}
              stroke="#e8d3a2"
              strokeOpacity={on ? 1 : 0.45}
            />
            <text
              x={x.toFixed(2)}
              y={(y + 4.5).toFixed(2)}
              textAnchor="middle"
              fontSize={on ? 14 : 12}
              fill={on ? "#1c1844" : "#e8d3a2"}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontVariantNumeric: "lining-nums tabular-nums" }}
            >
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

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
        <circle cx="90" cy="208" r="4" fill="#ead6a8" />
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

/* Psychology: thought ripples & connected nodes */
export function MindRipples({ className = "" }: { className?: string }) {
  const nodes: [number, number][] = [
    [62, 70], [176, 58], [196, 150], [120, 196], [44, 160], [120, 112],
  ];
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true" fill="none">
      <g stroke="currentColor">
        {[24, 44, 66, 90, 114].map((r, i) => (
          <circle key={r} cx="120" cy="112" r={r} strokeOpacity={0.8 - i * 0.14} />
        ))}
      </g>
      <g className="spin-rev" style={{ transformOrigin: "120px 112px" }}>
        <g stroke="currentColor" strokeOpacity=".55" strokeDasharray="3 4">
          {nodes.slice(0, 5).map(([x, y], i) => (
            <line key={i} x1="120" y1="112" x2={x} y2={y} />
          ))}
          <path d="M62 70 Q120 30 176 58" />
          <path d="M196 150 Q170 210 120 196" />
        </g>
        {nodes.slice(0, 5).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 4 : 6} fill="currentColor" />
        ))}
      </g>
      <circle cx="120" cy="112" r="10" fill="currentColor" />
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

/* Numerology: ring of 1–9 with the active number lit */
export function NumberRing({ active, className = "" }: { active?: number; className?: string }) {
  const c = 160;
  const reduced = active && active > 9 ? ((active - 1) % 9) + 1 : active;
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true" fill="none">
      <g className="spin-slow" style={{ transformOrigin: "160px 160px" }} stroke="#ead6a8">
        <circle cx={c} cy={c} r="150" strokeOpacity=".2" strokeDasharray="2 8" />
        <circle cx={c} cy={c} r="96" strokeOpacity=".25" />
      </g>
      <circle cx={c} cy={c} r="124" stroke="#ead6a8" strokeOpacity=".4" />
      {Array.from({ length: 9 }, (_, i) => {
        const n = i + 1;
        const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
        const x = c + Math.cos(a) * 124;
        const y = c + Math.sin(a) * 124;
        const on = reduced === n;
        return (
          <g key={n}>
            <circle cx={x.toFixed(2)} cy={y.toFixed(2)} r={on ? 20 : 15} fill={on ? "#ead6a8" : "#1d1a38"} stroke="#ead6a8" strokeOpacity={on ? 1 : 0.5} style={{ transition: "all .5s" }} />
            <text
              x={x.toFixed(2)}
              y={(y + 5).toFixed(2)}
              textAnchor="middle"
              fontSize={on ? 16 : 13}
              fill={on ? "#1d1a38" : "#ead6a8"}
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

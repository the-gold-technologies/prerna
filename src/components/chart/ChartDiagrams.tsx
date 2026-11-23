import React from "react";
import {
  ABBR,
  GRAHA_COLOR,
  type BirthChart,
  type GrahaName,
  type Placement,
} from "@/lib/chart";
import { NAKSHATRAS, SIGNS } from "@/lib/sky";

const r2 = (n: number) => Math.round(n * 100) / 100;
const SIGN_ABBR = [
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
];

function Glyphs({
  list,
  x,
  y,
  size = 15,
  per = 3,
}: {
  list: Placement[];
  x: number;
  y: number;
  size?: number;
  per?: number;
}) {
  const rows: Placement[][] = [];
  list.forEach((p, i) => {
    (rows[Math.floor(i / per)] ??= []).push(p);
  });
  const lh = size * 1.25;
  return (
    <>
      {rows.map((row, ri) => (
        <text
          key={ri}
          x={x}
          y={r2(y + (ri - (rows.length - 1) / 2) * lh)}
          textAnchor="middle"
          dominantBaseline="central"
          className="font-display"
          fontSize={size}
          fontWeight={600}
        >
          {row.map((p, i) => (
            <tspan
              key={p.name}
              dx={i ? 5 : 0}
              fill={
                p.name === "Asc" ? "#7a2a45" : GRAHA_COLOR[p.name as GrahaName]
              }
              fontStyle={p.name === "Asc" ? "italic" : undefined}
            >
              {ABBR[p.name]}
              {p.retro && p.name !== "Rahu" && p.name !== "Ketu" ? "ᴿ" : ""}
            </tspan>
          ))}
        </text>
      ))}
    </>
  );
}

const bySign = (c: BirthChart) => {
  const m: Placement[][] = Array.from({ length: 12 }, () => []);
  [c.asc, ...c.planets].forEach((p) => m[p.sign].push(p));
  return m;
};

/* ---------------- North Indian (houses fixed, signs move) ---------------- */
const NORTH: number[][][] = [
  [
    [200, 0],
    [300, 100],
    [200, 200],
    [100, 100],
  ], // 1
  [
    [0, 0],
    [200, 0],
    [100, 100],
  ],
  [
    [0, 0],
    [100, 100],
    [0, 200],
  ],
  [
    [0, 200],
    [100, 100],
    [200, 200],
    [100, 300],
  ], // 4
  [
    [0, 200],
    [100, 300],
    [0, 400],
  ],
  [
    [0, 400],
    [100, 300],
    [200, 400],
  ],
  [
    [100, 300],
    [200, 200],
    [300, 300],
    [200, 400],
  ], // 7
  [
    [200, 400],
    [300, 300],
    [400, 400],
  ],
  [
    [400, 400],
    [300, 300],
    [400, 200],
  ],
  [
    [400, 200],
    [300, 100],
    [200, 200],
    [300, 300],
  ], // 10
  [
    [400, 200],
    [300, 100],
    [400, 0],
  ],
  [
    [400, 0],
    [300, 100],
    [200, 0],
  ],
];
const centroid = (pts: number[][]) => [
  pts.reduce((s, p) => s + p[0], 0) / pts.length,
  pts.reduce((s, p) => s + p[1], 0) / pts.length,
];

export function NorthChart({ c }: { c: BirthChart }) {
  const signs = bySign(c);
  return (
    <svg
      viewBox="-6 -6 412 412"
      className="w-full"
      role="img"
      aria-label="North Indian birth chart"
    >
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="#fffdf8"
        stroke="#b8892f"
        strokeWidth="1.6"
      />
      {NORTH.map((poly, h) => {
        const sign = (c.ascSign + h) % 12;
        const [cx, cy] = centroid(poly);
        // sign number sits toward this house's own inner corner
        const inner = poly.reduce((best, p) =>
          Math.hypot(p[0] - 200, p[1] - 200) <
          Math.hypot(best[0] - 200, best[1] - 200)
            ? p
            : best
        );
        const nx = cx + (inner[0] - cx) * 0.45;
        const ny = cy + (inner[1] - cy) * 0.45;
        return (
          <g key={h}>
            <polygon
              points={poly.map((p) => p.join(",")).join(" ")}
              fill={h === 0 ? "#f1dcb2" : "transparent"}
              fillOpacity={h === 0 ? 0.35 : 1}
              stroke="#b8892f"
              strokeOpacity="0.75"
            />
            <text
              x={r2(nx)}
              y={r2(ny)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="11"
              fill="#8c6418"
            >
              {sign + 1}
            </text>
            <Glyphs
              list={signs[sign]}
              x={r2(cx)}
              y={r2(cy + (h % 3 === 0 ? -12 : 0))}
              size={h % 3 === 0 ? 16 : 13}
              per={h % 3 === 0 ? 3 : 2}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- South Indian (signs fixed) ---------------- */
const SOUTH_CELL: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 3],
  [3, 2],
  [3, 1],
  [3, 0],
  [2, 0],
  [1, 0],
  [0, 0],
]; // [row, col] for Aries..Pisces

export function SouthChart({ c, title }: { c: BirthChart; title?: string }) {
  const signs = bySign(c);
  const S = 100;
  return (
    <svg
      viewBox="-4 -4 408 408"
      className="w-full"
      role="img"
      aria-label="South Indian birth chart"
    >
      <rect
        x="0"
        y="0"
        width="400"
        height="400"
        fill="#fffdf8"
        stroke="#b8892f"
        strokeWidth="1.6"
      />
      {SOUTH_CELL.map(([r, col], sign) => {
        const x = col * S;
        const y = r * S;
        const isAsc = sign === c.ascSign;
        return (
          <g key={sign}>
            <rect
              x={x}
              y={y}
              width={S}
              height={S}
              fill={isAsc ? "#f1dcb2" : "transparent"}
              fillOpacity={isAsc ? 0.35 : 1}
              stroke="#b8892f"
              strokeOpacity="0.75"
            />
            {isAsc && (
              <line
                x1={x}
                y1={y + 18}
                x2={x + 18}
                y2={y}
                stroke="#7a2a45"
                strokeWidth="1.4"
              />
            )}
            <text
              x={x + 92}
              y={y + 13}
              textAnchor="end"
              fontSize="10"
              fill="#8c6418"
              letterSpacing="1"
            >
              {SIGN_ABBR[sign].toUpperCase()}
            </text>
            <Glyphs
              list={signs[sign]}
              x={x + 50}
              y={y + 56}
              size={15}
              per={2}
            />
          </g>
        );
      })}
      <text
        x="200"
        y="188"
        textAnchor="middle"
        className="font-display"
        fontSize="30"
        fill="#1c1844"
      >
        Rāśi
      </text>
      <text
        x="200"
        y="218"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="3"
        fill="#8c6418"
      >
        {(title ?? "BIRTH CHART").toUpperCase()}
      </text>
    </svg>
  );
}

/* ---------------- Wheel (ascendant at the left, zodiac anticlockwise) ---------------- */
export function WheelChart({ c }: { c: BirthChart }) {
  const C = 250;
  const R = { out: 244, sign: 200, nak: 170, planet: 138, core: 70 };
  const ang = (lon: number) => 180 + (lon - c.asc.lon); // asc on the left
  const pt = (lon: number, r: number) => {
    const t = (ang(lon) * Math.PI) / 180;
    return [r2(C + r * Math.cos(t)), r2(C - r * Math.sin(t))] as const;
  };
  const tangent = (lon: number) => {
    const a = ((ang(lon) % 360) + 360) % 360;
    return a > 180 && a < 360 ? 270 - a : 90 - a;
  };
  // spread planets that sit close together
  const sorted = [...c.planets].sort((a, b) => a.lon - b.lon);
  const shown: { p: Placement; lon: number; ring: number }[] = [];
  sorted.forEach((p) => {
    const prev = shown[shown.length - 1];
    const close = prev && Math.abs(p.lon - prev.lon) < 9;
    shown.push({ p, lon: p.lon, ring: close ? (prev.ring === 0 ? 1 : 0) : 0 });
  });

  return (
    <svg
      viewBox="-26 -26 552 552"
      className="w-full"
      role="img"
      aria-label="Sidereal birth chart wheel"
    >
      <circle
        cx={C}
        cy={C}
        r={R.out}
        fill="#fffdf8"
        stroke="#b8892f"
        strokeWidth="1.6"
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const [x1, y1] = pt(i * 30, R.out);
        const [x2, y2] = pt(i * 30, R.nak);
        const [tx, ty] = pt(i * 30 + 15, (R.out + R.sign) / 2);
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#b8892f"
              strokeOpacity="0.6"
            />
            <text
              transform={`translate(${tx} ${ty}) rotate(${r2(tangent(i * 30 + 15))})`}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display"
              fontSize="15"
              fill={i === c.ascSign ? "#7a2a45" : "#1c1844"}
            >
              {SIGNS[i]}
            </text>
          </g>
        );
      })}
      <circle
        cx={C}
        cy={C}
        r={R.sign}
        fill="none"
        stroke="#b8892f"
        strokeOpacity="0.6"
      />
      {NAKSHATRAS.map((n, i) => {
        const [x1, y1] = pt((i * 360) / 27, R.sign);
        const [x2, y2] = pt((i * 360) / 27, R.nak);
        return (
          <line
            key={n}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#b8892f"
            strokeOpacity="0.3"
          />
        );
      })}
      <circle
        cx={C}
        cy={C}
        r={R.nak}
        fill="none"
        stroke="#b8892f"
        strokeOpacity="0.5"
      />
      <circle
        cx={C}
        cy={C}
        r={R.core}
        fill="#f3ebdc"
        stroke="#b8892f"
        strokeOpacity="0.5"
      />
      <text
        x={C}
        y={C - 4}
        textAnchor="middle"
        className="font-display"
        fontSize="24"
        fill="#1c1844"
      >
        {c.lagna.sa}
      </text>
      <text
        x={C}
        y={C + 18}
        textAnchor="middle"
        fontSize="9"
        letterSpacing="2.5"
        fill="#8c6418"
      >
        LAGNA
      </text>

      {/* ascendant */}
      {(() => {
        const [x1, y1] = pt(c.asc.lon, R.core);
        const [x2, y2] = pt(c.asc.lon, R.out + 4);
        return (
          <g>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#7a2a45"
              strokeWidth="2"
              strokeDasharray="3 4"
            />
            <rect
              x={x2 - 22}
              y={y2 - 11}
              width="44"
              height="22"
              rx="11"
              fill="#7a2a45"
            />
            <text
              x={x2}
              y={y2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              fontWeight="700"
              letterSpacing="1"
              fill="#fffdf8"
            >
              ASC
            </text>
          </g>
        );
      })()}

      {shown.map(({ p, lon, ring }) => {
        const r = R.planet - ring * 34;
        const [x, y] = pt(lon, r);
        const [lx, ly] = pt(lon, r - 20);
        const col = GRAHA_COLOR[p.name as GrahaName];
        return (
          <g key={p.name}>
            <title>{`${p.name} · ${SIGNS[p.sign]} ${Math.floor(p.deg)}° · ${p.nakshatra}`}</title>
            <circle cx={x} cy={y} r="11" fill={col} fillOpacity="0.15" />
            <circle
              cx={x}
              cy={y}
              r="5"
              fill={col}
              stroke="#fffdf8"
              strokeWidth="2"
            />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="central"
              className="font-display"
              fontSize="13"
              fontWeight={600}
              fill={col}
            >
              {ABBR[p.name]}
              {p.retro && p.name !== "Rahu" && p.name !== "Ketu" ? "ᴿ" : ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

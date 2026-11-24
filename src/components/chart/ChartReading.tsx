"use client";

import React, { useState } from "react";
import {
  AYANAMSHAS,
  GRAHA_COLOR,
  VARGAS,
  dignity,
  fmtDeg,
  type BirthChart,
  type GrahaName,
} from "@/lib/chart";
import { NAKSHATRA_LORDS, RASHI, SIGNS } from "@/lib/sky";
import { Sparkle } from "../home/VedicChakra";
import { NorthChart, SouthChart, WheelChart } from "./ChartDiagrams";
import { ChapterHead } from "./ChartChapter";

type Style = "north" | "south" | "wheel";

const nakLord = (lon: number) =>
  NAKSHATRA_LORDS[Math.floor(lon / (360 / 27)) % 9];
const ASC_COLOR = "#7a2a45";

const HOUSE_THEME = [
  "Self, body and outlook",
  "Wealth, speech and family",
  "Courage, siblings and effort",
  "Home, mother and inner peace",
  "Children, study and creativity",
  "Health, service and obstacles",
  "Partnership and marriage",
  "Change, longevity and the hidden",
  "Fortune, dharma and teachers",
  "Career and public life",
  "Gains, friends and hopes",
  "Release, rest and foreign lands",
];

/* Chapter 01: the diagram (drawn in on every change) beside a placements explorer. */
export function ChartReading({
  chart,
  shown,
  style,
  varga,
  accuracy,
  ayan,
  node,
  onStyleChange,
  onVargaChange,
}: {
  chart: BirthChart;
  shown: BirthChart;
  style: Style;
  varga: number;
  accuracy: string;
  ayan: string;
  node: string;
  onStyleChange: (s: Style) => void;
  onVargaChange: (v: number) => void;
}) {
  const [pick, setPick] = useState<string>("Asc");
  const vInfo = VARGAS.find((v) => v.n === varga)!;
  const points = [shown.asc, ...shown.planets];
  const sel = points.find((p) => p.name === pick) ?? points[0];
  const orig =
    sel.name === "Asc"
      ? chart.asc
      : chart.planets.find((x) => x.name === sel.name)!;
  const dg = dignity(sel);
  const good = dg === "Exalted" || dg === "Moolatrikona" || dg === "Own sign";
  const bad = dg === "Debilitated" || dg === "Enemy's sign";
  const color =
    sel.name === "Asc" ? ASC_COLOR : GRAHA_COLOR[sel.name as GrahaName];

  return (
    <section id="ch-chart" className="scroll-mt-36 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="01"
          kicker={`${vInfo.name} · ${vInfo.id}`}
          title={
            <>
              The chart, <em className="text-gold-deep">drawn for you.</em>
            </>
          }
          intro="Switch the style or open a divisional chart, then tap any planet to read its placement."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* diagram */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div className="flex rounded-full border border-gold/40 bg-card p-1">
                {(["north", "south", "wheel"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => onStyleChange(s)}
                    aria-pressed={style === s}
                    className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition sm:px-5 ${style === s ? "bg-ink text-gold-bright" : "text-ink-2 hover:text-ink"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {VARGAS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onVargaChange(v.n)}
                    aria-pressed={varga === v.n}
                    title={`${v.name}: ${v.about}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${varga === v.n ? "bg-gold text-ink" : "text-ink-3 hover:bg-sand hover:text-ink"}`}
                  >
                    {v.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-5 rounded-[28px] border border-line bg-card p-5 sm:p-8">
              <Sparkle className="twinkle absolute -right-2 -top-2 h-5 w-5 text-gold print:hidden" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-2xl text-ink">
                  {vInfo.name}{" "}
                  <span className="text-base text-ink-3">· {vInfo.id}</span>
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-ink-3">
                  {vInfo.about}
                </p>
              </div>
              <div
                key={`${style}-${varga}`}
                className="chart-draw mx-auto mt-5 max-w-[520px]"
              >
                {style === "north" && <NorthChart c={shown} />}
                {style === "south" && <SouthChart c={shown} title={vInfo.id} />}
                {style === "wheel" && <WheelChart c={shown} />}
              </div>
              {accuracy === "Unknown" && (
                <p className="mt-4 rounded-xl bg-[#7a2a45]/10 px-4 py-2 text-sm text-[#7a2a45]">
                  Birth time unknown: the lagna and houses may not be reliable.
                  The Moon and planets are still useful.
                </p>
              )}
            </div>
          </div>

          {/* placements explorer */}
          <div className="lg:col-span-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-3">
              Placements · tap to read
            </p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {points.map((p) => {
                const on = p.name === sel.name;
                const c =
                  p.name === "Asc"
                    ? ASC_COLOR
                    : GRAHA_COLOR[p.name as GrahaName];
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPick(p.name)}
                    aria-pressed={on}
                    className={`group rounded-2xl border px-1 py-3 text-center transition ${on ? "border-ink bg-ink text-paper shadow-lg" : "border-line bg-card hover:-translate-y-0.5 hover:border-gold/60"}`}
                  >
                    <span
                      className="mx-auto block h-2 w-2 rounded-full transition group-hover:scale-125"
                      style={{ background: on ? "#d6ac52" : c }}
                    />
                    <span className="mt-1.5 block font-display text-base leading-none">
                      {p.name === "Asc" ? "Lagna" : p.name}
                    </span>
                    <span
                      className={`mt-1 block text-[10px] ${on ? "text-paper/60" : "text-ink-3"}`}
                    >
                      {RASHI[p.sign]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* detail card */}
            <div
              key={`${sel.name}-${varga}`}
              className="rise mt-5 overflow-hidden rounded-[24px] border border-line bg-card"
            >
              <div className="relative px-6 pb-5 pt-6">
                <span
                  className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-15 blur-2xl"
                  style={{ background: color }}
                />
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color }}
                >
                  {sel.name === "Asc" ? "Lagna · the rising sign" : sel.name}
                  {sel.retro && sel.name !== "Rahu" && sel.name !== "Ketu"
                    ? " · retrograde"
                    : ""}
                </p>
                <p className="relative mt-2 font-display text-4xl text-ink">
                  {RASHI[sel.sign]}{" "}
                  <span className="text-2xl text-ink-3">{fmtDeg(sel.deg)}</span>
                </p>
                <p className="text-sm text-ink-2">
                  {SIGNS[sel.sign]} · house {sel.house}:{" "}
                  {HOUSE_THEME[sel.house - 1].toLowerCase()}
                </p>
              </div>
              <dl className="grid grid-cols-2 border-t border-line text-sm">
                {[
                  ["Nakshatra", `${orig.nakshatra} · pada ${orig.pada}`],
                  ["Star lord", nakLord(orig.lon)],
                  ["Dignity", dg === "—" ? "—" : dg],
                  [
                    "Motion",
                    sel.name === "Asc"
                      ? "—"
                      : sel.retro
                        ? "Retrograde"
                        : "Direct",
                  ],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    className={`px-6 py-4 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line" : ""}`}
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-3">
                      {k}
                    </dt>
                    <dd
                      className={`mt-1 font-display text-lg ${k === "Dignity" && good ? "text-spirit" : k === "Dignity" && bad ? "text-[#7a2a45]" : "text-ink"}`}
                    >
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-3">
              Sidereal, {AYANAMSHAS.find((a) => a.id === ayan)?.label}{" "}
              ayanamsha, whole-sign houses, {node} nodes. Nakshatra and star
              lord are always from the birth chart (D1).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

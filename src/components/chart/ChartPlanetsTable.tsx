"use client";

import React from "react";
import {
  AYANAMSHAS,
  GRAHA_COLOR,
  dignity,
  fmtDeg,
  type BirthChart,
  type GrahaName,
} from "@/lib/chart";
import { NAKSHATRA_LORDS, RASHI, SIGNS } from "@/lib/sky";
import { eyebrow } from "./types";

export function ChartPlanetsTable({
  chart,
  shown,
  vInfo,
  ayan,
  node,
}: {
  chart: BirthChart;
  shown: BirthChart;
  vInfo: { id: string; name: string; about: string };
  ayan: string;
  node: string;
}) {
  const nakLord = (lon: number) =>
    NAKSHATRA_LORDS[Math.floor(lon / (360 / 27)) % 9];

  return (
    <section className="bg-card py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className={eyebrow}>Planets · {vInfo.id}</p>
        <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
          Where your planets <em className="text-astro">stood.</em>
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b-2 border-ink text-[10px] uppercase tracking-[0.2em] text-ink-3">
                {[
                  "Graha",
                  "Sign",
                  "Degree",
                  "Nakshatra · Pada",
                  "Lord",
                  "House",
                  "Dignity",
                  "Motion",
                ].map((h) => (
                  <th key={h} className="py-3 pr-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[shown.asc, ...shown.planets].map((p) => {
                const dg = dignity(p);
                const orig =
                  p.name === "Asc"
                    ? chart.asc
                    : chart.planets.find((x) => x.name === p.name)!;
                const good =
                  dg === "Exalted" ||
                  dg === "Moolatrikona" ||
                  dg === "Own sign";
                const bad = dg === "Debilitated" || dg === "Enemy's sign";
                return (
                  <tr key={p.name} className="border-b border-line">
                    <td className="py-3 pr-4">
                      <span className="flex items-center gap-2.5">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            background:
                              p.name === "Asc"
                                ? "#7a2a45"
                                : GRAHA_COLOR[p.name as GrahaName],
                          }}
                        />
                        <span className="font-display text-lg text-ink">
                          {p.name === "Asc" ? "Lagna" : p.name}
                        </span>
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-ink-2">
                      {SIGNS[p.sign]}{" "}
                      <span className="text-ink-3">· {RASHI[p.sign]}</span>
                    </td>
                    <td className="py-3 pr-4 font-display text-base text-ink">
                      {fmtDeg(p.deg)}
                    </td>
                    <td className="py-3 pr-4 text-ink-2">
                      {orig.nakshatra} · {orig.pada}
                    </td>
                    <td className="py-3 pr-4 text-ink-2">
                      {nakLord(orig.lon)}
                    </td>
                    <td className="py-3 pr-4 font-display text-base text-ink">
                      {p.house}
                    </td>
                    <td className="py-3 pr-4">
                      {dg !== "—" && (
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs ${good ? "bg-spirit-soft text-spirit" : bad ? "bg-[#7a2a45]/10 text-[#7a2a45]" : "bg-sand text-ink-2"}`}
                        >
                          {dg}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-ink-2">
                      {p.name === "Asc"
                        ? "—"
                        : p.retro
                          ? "Retrograde"
                          : "Direct"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-ink-3">
          Sidereal, {AYANAMSHAS.find((a) => a.id === ayan)?.label} ayanamsha,
          whole-sign houses, {node} nodes. Nakshatra and lord are from the birth
          chart.
        </p>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fmtDeg, type BirthChart } from "@/lib/chart";
import { SIGNS } from "@/lib/sky";

export function ChartTransits({
  chart,
  transit,
}: {
  chart: BirthChart;
  transit: BirthChart;
}) {
  return (
    <section className="bg-ink py-20 text-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
          Gochara
        </p>
        <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
          Today&apos;s sky <em className="text-gold-bright">in your chart.</em>
        </h2>
        <p className="mt-3 max-w-2xl text-paper/65">
          Where the planets are today, counted in houses from your lagna and
          from your Moon.
        </p>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-paper/30 text-[10px] uppercase tracking-[0.2em] text-paper/50">
                {[
                  "Graha",
                  "Today in",
                  "Nakshatra",
                  "From lagna",
                  "From Moon",
                ].map((h) => (
                  <th key={h} className="py-3 pr-4 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transit.planets.map((p) => (
                <tr key={p.name} className="border-b border-paper/10">
                  <td className="py-3 pr-4 font-display text-lg">
                    {p.name}
                    {p.retro && p.name !== "Rahu" && p.name !== "Ketu"
                      ? " ℞"
                      : ""}
                  </td>
                  <td className="py-3 pr-4 text-paper/75">
                    {SIGNS[p.sign]} {fmtDeg(p.deg)}
                  </td>
                  <td className="py-3 pr-4 text-paper/75">{p.nakshatra}</td>
                  <td className="py-3 pr-4 font-display text-lg text-gold-bright">
                    {((p.sign - chart.ascSign + 12) % 12) + 1}
                  </td>
                  <td className="py-3 font-display text-lg text-gold-bright">
                    {((p.sign - chart.planets[1].sign + 12) % 12) + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          href="/today"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright"
        >
          Today&apos;s full panchang <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

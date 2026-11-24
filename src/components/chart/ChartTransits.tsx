"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fmtDeg, type BirthChart } from "@/lib/chart";
import { RASHI } from "@/lib/sky";
import { ChapterHead } from "./ChartChapter";
import { LIGHT_TONE, LiveWheel } from "./LiveWheel";

/* Chapter 05: Gochara, today's planets circling the birth chart. */
export function ChartTransits({
  chart,
  transit,
}: {
  chart: BirthChart;
  transit: BirthChart;
}) {
  const moonSign = chart.planets[1].sign;
  return (
    <section
      id="ch-transits"
      className="relative scroll-mt-36 overflow-hidden bg-ink py-20 text-paper lg:py-24 print:bg-transparent print:text-ink"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_45%,rgba(59,52,136,0.8),transparent_60%)] print:hidden" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="05"
          dark
          kicker="Gochara"
          title={
            <>
              Today&apos;s sky{" "}
              <em className="text-gold-bright">around your chart.</em>
            </>
          }
          intro="Gold markers on the outer ring are where the planets are today; inside is your birth chart."
        />

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="mx-auto aspect-square w-full max-w-[540px] lg:col-span-6 print:hidden">
            <LiveWheel chart={chart} today={null} transit={transit} />
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[460px] text-left text-sm">
                <thead>
                  <tr className="border-b border-paper/25 text-[10px] uppercase tracking-[0.2em] text-paper/50">
                    {["Graha", "Today in", "From lagna", "From Moon"].map(
                      (h) => (
                        <th key={h} className="py-3 pr-4 font-semibold">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {transit.planets.map((p) => (
                    <tr key={p.name} className="border-b border-paper/10">
                      <td className="py-3 pr-4">
                        <span className="flex items-center gap-2.5 font-display text-lg">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: LIGHT_TONE[p.name] }}
                          />
                          {p.name}
                          {p.retro && p.name !== "Rahu" && p.name !== "Ketu"
                            ? " ℞"
                            : ""}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-paper/75">
                        {RASHI[p.sign]}{" "}
                        <span className="text-paper/45">{fmtDeg(p.deg)}</span>
                      </td>
                      <td className="py-3 pr-4 font-display text-xl text-gold-bright">
                        {((p.sign - chart.ascSign + 12) % 12) + 1}
                      </td>
                      <td className="py-3 font-display text-xl text-paper/80">
                        {((p.sign - moonSign + 12) % 12) + 1}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              href="/today"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright print:hidden"
            >
              Today&apos;s full panchang
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

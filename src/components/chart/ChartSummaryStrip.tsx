"use client";

import React from "react";
import type { BirthChart, Dasha } from "@/lib/chart";
import { NAKSHATRA_LORDS } from "@/lib/sky";

export function ChartSummaryStrip({
  chart,
  who,
  running,
}: {
  chart: BirthChart;
  who: { name: string; line: string };
  running?: Dasha;
}) {
  const nakLord = (lon: number) =>
    NAKSHATRA_LORDS[Math.floor(lon / (360 / 27)) % 9];

  return (
    <section className="relative overflow-hidden bg-ink py-14 text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(59,52,136,0.7),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
          {who.name}
        </p>
        <p className="mt-2 text-paper/60">{who.line}</p>
        <dl className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {[
            ["Lagna", chart.lagna.sa, chart.lagna.en],
            ["Moon sign", chart.moonSign.sa, chart.moonSign.en],
            [
              "Birth nakshatra",
              chart.planets[1].nakshatra,
              `Pada ${chart.planets[1].pada} · lord ${nakLord(chart.planets[1].lon)}`,
            ],
            ["Sun sign", chart.sunSign.sa, chart.sunSign.en],
            [
              "Running period",
              running?.lord ?? "—",
              running ? `Mahadasha until ${running.end.getUTCFullYear()}` : "",
            ],
          ].map(([k, v, s], i) => (
            <div key={k} className={i ? "border-l border-paper/15 pl-6" : ""}>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-paper/50">
                {k}
              </dt>
              <dd className="mt-2 font-display text-3xl sm:text-4xl">{v}</dd>
              <dd className="mt-1 text-sm text-paper/55">{s}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

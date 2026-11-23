"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { antardashas, type BirthChart, type Dasha } from "@/lib/chart";
import { eyebrow, fmtDate } from "./types";

export function DashaBar({
  list,
  running,
  now,
}: {
  list: Dasha[];
  running?: Dasha;
  now: number;
}) {
  const t0 = list[0].start.getTime();
  const t1 = list[list.length - 1].end.getTime();
  const total = list.reduce((s, x) => s + x.years, 0);
  const nowPct = Math.max(0, Math.min(100, ((now - t0) / (t1 - t0)) * 100));
  return (
    <div className="mt-12 overflow-x-auto pb-2">
      <div className="relative min-w-[760px] pt-6">
        <div className="flex h-14 overflow-hidden rounded-2xl ring-1 ring-line">
          {list.map((d, i) => (
            <div
              key={d.lord + i}
              className={`flex items-center justify-center border-r border-paper/60 text-xs font-semibold uppercase tracking-[0.12em] last:border-r-0 ${d === running ? "bg-gold text-ink" : i % 2 ? "bg-sand text-ink-2" : "bg-card text-ink-2"}`}
              style={{ width: `${(d.years / total) * 100}%` }}
              title={`${d.lord}: ${d.start.getUTCFullYear()}–${d.end.getUTCFullYear()}`}
            >
              {d.years >= 7 ? d.lord : d.lord.slice(0, 2)}
            </div>
          ))}
        </div>
        <div
          className="absolute bottom-[-0.5rem] top-3 w-0.5 bg-[#7a2a45]"
          style={{ left: `${nowPct}%` }}
        >
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#7a2a45] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-paper">
            Now
          </span>
        </div>
      </div>
    </div>
  );
}

export function ChartDashaTimeline({
  chart,
  running,
  now,
}: {
  chart: BirthChart;
  running?: Dasha;
  now: number;
}) {
  const [openMd, setOpenMd] = useState<number | null>(null);
  const birthMs = chart.at.getTime();
  const age = (d: Date) =>
    Math.max(0, Math.floor((d.getTime() - birthMs) / (365.25 * 86400_000)));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className={eyebrow}>Vimshottari dasha</p>
            <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
              The major seasons{" "}
              <em className="text-gold-deep">of your life.</em>
            </h2>
          </div>
          <p className="max-w-md text-ink-2">
            Every period from birth, with your age. Open a period to see its
            sub-periods (antardashas).
          </p>
        </div>

        <DashaBar list={chart.dashas.slice(0, 9)} running={running} now={now} />

        <ol className="mt-10 border-t border-ink/80">
          {chart.dashas.slice(0, 9).map((d, i) => {
            const on = d === running;
            const isOpen = openMd === i;
            return (
              <li key={d.lord + i} className="border-b border-line">
                <button
                  onClick={() => setOpenMd(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 py-5 text-left"
                >
                  <span className="w-7 font-display text-gold-deep">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-display text-2xl text-ink">
                    {d.lord}
                    {on && (
                      <span className="ml-3 rounded-full bg-gold px-2 py-0.5 align-middle text-[9px] font-semibold uppercase tracking-[0.15em] text-ink">
                        Now
                      </span>
                    )}
                  </span>
                  <span className="hidden text-sm text-ink-3 sm:block">
                    {fmtDate(d.start)} – {fmtDate(d.end)}
                  </span>
                  <span className="w-24 text-right text-sm text-ink-2">
                    age {age(d.start)}–{age(d.end)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-ink-3 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <ul className="rise grid gap-x-8 pb-6 pl-12 sm:grid-cols-2 lg:grid-cols-3">
                    {antardashas(d).map((a) => {
                      const aOn =
                        a.start.getTime() <= now && a.end.getTime() > now;
                      return (
                        <li
                          key={a.lord}
                          className={`flex justify-between border-b border-dotted border-line py-2 text-sm ${aOn ? "font-semibold text-ink" : "text-ink-2"}`}
                        >
                          <span>
                            {d.lord}–{a.lord}
                            {aOn && " · now"}
                          </span>
                          <span className="text-ink-3">
                            {fmtDate(a.start)} – {fmtDate(a.end)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-xs text-ink-3">
          The first period is shown from its notional start; you were born
          part-way through it.
        </p>
      </div>
    </section>
  );
}

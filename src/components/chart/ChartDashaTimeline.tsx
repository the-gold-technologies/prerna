"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  GRAHA_COLOR,
  antardashas,
  type BirthChart,
  type Dasha,
  type GrahaName,
} from "@/lib/chart";
import { fmtDate } from "./types";
import { ChapterHead, useInView } from "./ChartChapter";

const tone = (lord: string) => GRAHA_COLOR[lord as GrahaName] ?? "#1c1844";
const pct = (now: number, d: Dasha) =>
  Math.max(
    0,
    Math.min(
      100,
      ((now - d.start.getTime()) / (d.end.getTime() - d.start.getTime())) * 100
    )
  );

/* Chapter 02: Vimshottari dasha as seasons of life. */
export function ChartDashaTimeline({
  chart,
  running,
  now,
}: {
  chart: BirthChart;
  running?: Dasha;
  now: number;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [barRef, barIn] = useInView<HTMLDivElement>(0.3);
  const list = chart.dashas.slice(0, 9);
  const t0 = list[0].start.getTime();
  const t1 = list[list.length - 1].end.getTime();
  const nowPct = Math.max(0, Math.min(100, ((now - t0) / (t1 - t0)) * 100));
  const birthPct = Math.max(
    0,
    Math.min(100, ((chart.at.getTime() - t0) / (t1 - t0)) * 100)
  );
  const age = (d: Date) =>
    Math.max(
      0,
      Math.floor((d.getTime() - chart.at.getTime()) / (365.25 * 86400_000))
    );
  const sub = running
    ? antardashas(running).find(
        (a) => a.start.getTime() <= now && a.end.getTime() > now
      )
    : undefined;

  return (
    <section id="ch-seasons" className="scroll-mt-36 bg-card py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="02"
          kicker="Vimshottari dasha"
          title={
            <>
              The seasons <em className="text-gold-deep">of your life.</em>
            </>
          }
          intro="A 120-year cycle that starts from the Moon's nakshatra at birth. Each planet rules a season, and seasons hold smaller sub-periods."
        />

        {/* you are here */}
        {running && (
          <div
            ref={barRef}
            className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-paper sm:p-9">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_0%,rgba(59,52,136,0.8),transparent_60%)]" />
              <p className="relative text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-bright">
                You are here
              </p>
              <p className="relative mt-3 font-display text-4xl sm:text-5xl">
                {running.lord} <em className="text-gold-bright">mahadasha</em>
              </p>
              <p className="relative mt-2 text-paper/65">
                {fmtDate(running.start)} – {fmtDate(running.end)} · age{" "}
                {age(running.start)} to {age(running.end)}
              </p>
              <div className="relative mt-7">
                <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  <span>Season</span>
                  <span>{Math.round(pct(now, running))}% through</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper/10">
                  <div
                    className={`grow-x h-full rounded-full bg-gold-bright ${barIn ? "in" : ""}`}
                    style={{ width: `${pct(now, running)}%` }}
                  />
                </div>
              </div>
              {sub && (
                <div className="relative mt-5">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-paper/50">
                    <span>
                      Sub-period · {running.lord}–{sub.lord}
                    </span>
                    <span>until {fmtDate(sub.end)}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper/10">
                    <div
                      className={`grow-x h-full rounded-full bg-paper/70 ${barIn ? "in" : ""}`}
                      style={{
                        width: `${pct(now, sub)}%`,
                        transitionDelay: "0.3s",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* next seasons */}
            <ol className="grid gap-3">
              {list
                .filter((d) => d.start.getTime() > now)
                .slice(0, 3)
                .map((d, i) => (
                  <li
                    key={d.lord + i}
                    className={`rise flex items-center gap-5 rounded-[22px] border border-line bg-paper px-6 py-5`}
                    style={{ animationDelay: `${0.15 * i}s` }}
                  >
                    <span
                      className="h-10 w-1.5 rounded-full"
                      style={{ background: tone(d.lord) }}
                    />
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-3">
                        {i === 0 ? "Next season" : "Then"}
                      </p>
                      <p className="font-display text-2xl text-ink">{d.lord}</p>
                    </div>
                    <p className="text-right text-sm text-ink-2">
                      from {d.start.getUTCFullYear()}
                      <span className="block text-xs text-ink-3">
                        age {age(d.start)}
                      </span>
                    </p>
                  </li>
                ))}
            </ol>
          </div>
        )}

        {/* timeline */}
        <div className="mt-12 overflow-x-auto px-4 pb-4 pt-6">
          <div className="relative min-w-[760px] pb-2 pt-9">
            <div className="flex h-12 gap-[3px]">
              {list.map((d, i) => (
                <button
                  key={d.lord + i}
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className={`grow-x flex cursor-pointer items-center justify-center rounded-lg text-[11px] font-semibold uppercase tracking-[0.12em] text-paper transition hover:brightness-110 ${barIn ? "in" : ""} ${d === running ? "ring-2 ring-gold ring-offset-2 ring-offset-card" : ""}`}
                  style={{
                    flex: `${d.years} 1 0`,
                    background: tone(d.lord),
                    opacity: d.end.getTime() < now ? 0.45 : 1,
                    transitionDelay: `${i * 0.08}s`,
                  }}
                  title={`${d.lord}: ${d.start.getUTCFullYear()}–${d.end.getUTCFullYear()}`}
                >
                  {d.years >= 7 ? d.lord : d.lord.slice(0, 2)}
                </button>
              ))}
            </div>
            {[
              ["Birth", birthPct, "#1c1844"],
              ["Now", nowPct, "#7a2a45"],
            ].map(([label, left, c]) => {
              const pct = Number(left);
              return (
                <div
                  key={label as string}
                  className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5"
                  style={{ left: `${pct}%`, background: c as string }}
                >
                  <span
                    className={`absolute top-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-paper shadow-sm ${
                      pct < 6
                        ? "left-0"
                        : pct > 94
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                    }`}
                    style={{ background: c as string }}
                  >
                    {label as string}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* all seasons */}
        <ol className="mt-10 grid gap-x-10 md:grid-cols-2">
          {list.map((d, i) => {
            const on = d === running;
            const isOpen = open === i;
            return (
              <li key={d.lord + i} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: tone(d.lord) }}
                  />
                  <span className="flex-1 font-display text-xl text-ink">
                    {d.lord}
                    {on && (
                      <span className="ml-2 rounded-full bg-gold px-2 py-0.5 align-middle font-sans text-[9px] font-semibold uppercase tracking-[0.15em] text-ink">
                        Now
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-ink-3">
                    {d.start.getUTCFullYear()}–{d.end.getUTCFullYear()}
                  </span>
                  <span className="w-20 text-right text-sm text-ink-2">
                    age {age(d.start)}–{age(d.end)}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-ink-3 transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <ul className="rise grid gap-x-6 pb-5 pl-7 sm:grid-cols-2">
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
                          <span className="text-ink-3">{fmtDate(a.start)}</span>
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
          The first season is shown from its notional start; you were born
          part-way through it.
        </p>
      </div>
    </section>
  );
}

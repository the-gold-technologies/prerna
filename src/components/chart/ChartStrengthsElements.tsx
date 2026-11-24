"use client";

import React from "react";
import Link from "next/link";
import {
  GRAHA_COLOR,
  elementBalance,
  strengthRanking,
  type BirthChart,
  type GrahaName,
} from "@/lib/chart";
import { ChapterHead, useInView } from "./ChartChapter";

const ELEMENTS = {
  Fire: { sa: "Agni", tone: "#c8643a", note: "drive and courage" },
  Earth: { sa: "Prithvi", tone: "#8c6418", note: "steadiness and care" },
  Air: { sa: "Vayu", tone: "#64458f", note: "ideas and movement" },
  Water: { sa: "Jala", tone: "#3f7fae", note: "feeling and intuition" },
} as const;

/* A round "vessel" that fills like liquid when it scrolls into view. */
function Orb({
  value,
  tone,
  on,
  delay,
}: {
  value: number;
  tone: string;
  on: boolean;
  delay: number;
}) {
  const level = (value / 10) * 100;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[120px] overflow-hidden rounded-full border border-line bg-paper">
      <div
        className="absolute inset-x-0 bottom-0 transition-[height] duration-[1600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        style={{
          height: on ? `${level}%` : "0%",
          background: tone,
          opacity: 0.85,
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* wave crest */}
        <svg
          viewBox="0 0 200 20"
          preserveAspectRatio="none"
          className="absolute -top-[9px] left-0 h-[10px] w-[200%] motion-safe:animate-[marquee_4s_linear_infinite]"
          aria-hidden
        >
          <path
            d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10 V20 H0Z"
            fill={tone}
          />
        </svg>
      </div>
      <span className="absolute inset-0 grid place-items-center font-display text-4xl text-ink mix-blend-multiply">
        {value}
      </span>
    </div>
  );
}

/* Chapter 03: planet strength ranking and the balance of the four elements. */
export function ChartStrengthsElements({ chart }: { chart: BirthChart }) {
  const [ref, on] = useInView<HTMLDivElement>(0.2);
  const ranking = strengthRanking(chart);
  const balance = elementBalance(chart);
  const top = (Object.keys(balance) as (keyof typeof balance)[]).sort(
    (a, b) => balance[b] - balance[a]
  )[0];

  return (
    <section id="ch-strength" className="scroll-mt-36 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ChapterHead
          n="03"
          kicker="Bala & tattva"
          title={
            <>
              Where your strength <em className="text-gold-deep">gathers.</em>
            </>
          }
          intro="A quick ranking from dignity, directional strength and motion, and the elements your lagna and grahas fall in."
        />

        <div ref={ref} className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* strength */}
          <div className="rounded-[28px] border border-line bg-card p-7 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-3">
              Strongest to weakest
            </p>
            <ol className="mt-6 space-y-4">
              {ranking.map(({ p, d, score }, i) => (
                <li
                  key={p.name}
                  className="grid grid-cols-[1.5rem_5.5rem_1fr_6.5rem] items-center gap-3"
                >
                  <span className="font-display text-gold-deep">{i + 1}</span>
                  <span className="font-display text-lg text-ink">
                    {p.name}
                  </span>
                  <span className="h-2.5 overflow-hidden rounded-full bg-sand">
                    <span
                      className={`grow-x block h-full rounded-full ${on ? "in" : ""}`}
                      style={{
                        width: `${(score / 6) * 100}%`,
                        background: GRAHA_COLOR[p.name as GrahaName],
                        transitionDelay: `${i * 90}ms`,
                      }}
                    />
                  </span>
                  <span className="text-right text-xs text-ink-3">{d}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs text-ink-3">
              Not full Shadbala; that comes with your personalised report.
            </p>
          </div>

          {/* elements */}
          <div className="rounded-[28px] border border-line bg-card p-7 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-3">
              The four elements
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {(Object.keys(ELEMENTS) as (keyof typeof ELEMENTS)[]).map(
                (k, i) => (
                  <div key={k} className="text-center">
                    <Orb
                      value={balance[k]}
                      tone={ELEMENTS[k].tone}
                      on={on}
                      delay={i * 150}
                    />
                    <p className="mt-3 font-display text-xl text-ink">
                      {ELEMENTS[k].sa}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-ink-3">
                      {k}
                    </p>
                  </div>
                )
              )}
            </div>
            <p className="mt-7 rounded-2xl bg-sand/60 px-5 py-4 text-sm leading-relaxed text-ink-2">
              <span className="font-display text-lg text-ink">
                {ELEMENTS[top].sa}
              </span>{" "}
              leads your chart, a lean towards {ELEMENTS[top].note}.{" "}
              <Link
                href="/quiz"
                className="font-semibold text-ink underline underline-offset-4"
              >
                Take the element quiz
              </Link>{" "}
              to compare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

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
import { eyebrow } from "./types";

export function ElementBars({ c }: { c: BirthChart }) {
  const b = elementBalance(c);
  const tones = {
    Fire: "#c8643a",
    Earth: "#8c6418",
    Air: "#64458f",
    Water: "#3f7fae",
  };
  const sa = { Fire: "Agni", Earth: "Prithvi", Air: "Vayu", Water: "Jala" };
  return (
    <div className="mt-8 grid grid-cols-4 gap-4">
      {(Object.keys(b) as (keyof typeof b)[]).map((k) => (
        <div key={k} className="text-center">
          <div className="relative mx-auto h-40 w-14 overflow-hidden rounded-full bg-sand">
            <span
              className="absolute inset-x-0 bottom-0 rounded-full"
              style={{ height: `${(b[k] / 10) * 100}%`, background: tones[k] }}
            />
          </div>
          <p className="mt-3 font-display text-2xl text-ink">{b[k]}</p>
          <p className="text-sm text-ink-2">{sa[k]}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-ink-3">
            {k}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ChartStrengthsElements({ chart }: { chart: BirthChart }) {
  return (
    <section className="bg-card py-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className={eyebrow}>Strongest to weakest</p>
          <h2 className="mt-3 font-display text-4xl font-light">
            Your strongest and <em className="text-astro">weakest planets.</em>
          </h2>
          <ol className="mt-8 space-y-3">
            {strengthRanking(chart).map(({ p, d, score }, i) => (
              <li key={p.name} className="flex items-center gap-4">
                <span className="w-5 font-display text-gold-deep">{i + 1}</span>
                <span className="w-20 font-display text-lg text-ink">
                  {p.name}
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${(score / 6) * 100}%`,
                      background: GRAHA_COLOR[p.name as GrahaName],
                    }}
                  />
                </span>
                <span className="w-28 text-right text-xs text-ink-3">{d}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-ink-3">
            A simple ranking from dignity, directional strength and motion. Full
            Shadbala comes with your report.
          </p>
        </div>
        <div>
          <p className={eyebrow}>Elements</p>
          <h2 className="mt-3 font-display text-4xl font-light">
            The balance of <em className="text-gold-deep">your elements.</em>
          </h2>
          <ElementBars c={chart} />
          <p className="mt-6 text-xs text-ink-3">
            Counted from the signs of your lagna and nine grahas.{" "}
            <Link href="/quiz" className="underline underline-offset-4">
              Take the element quiz
            </Link>{" "}
            to compare.
          </p>
        </div>
      </div>
    </section>
  );
}

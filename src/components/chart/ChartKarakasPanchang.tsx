"use client";

import React from "react";
import {
  GRAHA_COLOR,
  charaKarakas,
  type BirthChart,
  type GrahaName,
} from "@/lib/chart";
import type { Panchang } from "@/lib/sky";
import { eyebrow } from "./types";

export function ChartKarakasPanchang({
  chart,
  birthDay,
}: {
  chart: BirthChart;
  birthDay: Panchang | null;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className={eyebrow}>Jaimini</p>
          <h2 className="mt-3 font-display text-4xl font-light">Karakas</h2>
          <p className="mt-2 text-ink-2">
            Your eight karakas, each with its planet.
          </p>
          <table className="mt-6 w-full text-sm">
            <tbody>
              {charaKarakas(chart).map(({ k, p }) => (
                <tr key={k[0]} className="border-b border-line">
                  <td className="w-14 py-3 font-display text-base text-gold-deep">
                    {k[0]}
                  </td>
                  <td className="py-3 text-ink">{k[1]}</td>
                  <td className="py-3 text-ink-3">{k[2]}</td>
                  <td
                    className="py-3 text-right font-display text-lg"
                    style={{
                      color: p ? GRAHA_COLOR[p.name as GrahaName] : undefined,
                    }}
                  >
                    {p?.name ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {birthDay && (
          <div>
            <p className={eyebrow}>Pañcāṅga of the birth day</p>
            <h2 className="mt-3 font-display text-4xl font-light">
              The day <em className="text-psych">you arrived.</em>
            </h2>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                ["Vara", birthDay.vara],
                ["Tithi", `${birthDay.tithi.paksha} ${birthDay.tithi.name}`],
                ["Nakshatra", birthDay.nakshatra.name],
                ["Yoga", birthDay.yoga],
                ["Karana", birthDay.karana],
                [
                  "Moon",
                  `${Math.round(birthDay.illumination * 100)}% lit · ${birthDay.waxing ? "waxing" : "waning"}`,
                ],
              ].map(([k, v]) => (
                <div key={k} className="bg-card px-5 py-4">
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
                    {k}
                  </dt>
                  <dd className="mt-1 font-display text-xl text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}

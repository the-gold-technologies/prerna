"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { Sparkle } from "../home/VedicChakra";
import { Moon3D } from "./Moon3D";
import { CITIES, dateIn, type Panchang } from "@/lib/sky";

export function SkyHero({
  p,
  city,
  onCityChange,
}: {
  p: Panchang | null;
  city: number;
  onCityChange: (idx: number) => void;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-32 text-paper sm:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(59,52,136,0.65),transparent_60%)]" />
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="twinkle absolute h-[2px] w-[2px] rounded-full bg-paper"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 7) * 0.6}s`,
            opacity: 0.6,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-bright" />
            </span>
            Today&apos;s sky · live
          </p>
          <h1 className="mt-6 font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">
            {p ? (
              <>
                The Moon is in{" "}
                <em className="text-gold-bright">{p.nakshatra.name}</em>
              </>
            ) : (
              "Reading the sky…"
            )}
          </h1>
          <p className="mt-6 text-lg text-paper/70">
            {p
              ? `${dateIn(p.date, p.city.tz)} · ${p.tithi.paksha} ${p.tithi.name} · Moon in ${p.moonSign.en} (${p.moonSign.sa})`
              : " "}
          </p>

          <label className="mt-9 inline-flex items-center gap-3 rounded-full border border-paper/20 bg-paper/5 py-2 pl-4 pr-2 text-sm backdrop-blur">
            <MapPin className="h-4 w-4 text-gold-bright" />
            <span className="text-paper/60">Panchang for</span>
            <select
              value={city}
              onChange={(e) => onCityChange(Number(e.target.value))}
              className="cursor-pointer rounded-full bg-paper px-3 py-1.5 font-semibold text-ink outline-none"
            >
              {CITIES.map((c, i) => (
                <option key={c.name} value={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="relative mx-auto w-full max-w-[340px]">
          {p ? (
            <Moon3D elongation={p.elongation} className="w-full" />
          ) : (
            <div className="aspect-square w-full rounded-full bg-paper/5" />
          )}
          <Sparkle className="twinkle absolute -right-4 top-6 h-5 w-5 text-gold-bright" />
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { Sparkle } from "../home/VedicChakra";
import { MoonPhase, NakshatraScale, useSky } from "./SkyParts";
import { CITIES, dateIn, timeIn, type Panchang } from "@/lib/sky";

/* One short line of guidance for each Moon sign. */
const MOON_NOTES = [
  "Energy is quick and bold. A good day to begin something, as long as you pace your words.",
  "The mind wants comfort and steadiness. Slow meals, simple pleasures and patient decisions suit today.",
  "Curiosity is high and the mind is busy. Talk things through, write lists, and leave room to rest your thoughts.",
  "Feelings run close to the surface. Home, family and gentle care for yourself are well supported.",
  "Confidence and warmth rise. Let yourself be seen, and be generous with praise for others.",
  "A clear, practical mind. Tidy, plan and attend to health. Go easy on self-criticism.",
  "The mind looks for balance and harmony. Good for agreements, partnerships and kind conversations.",
  "Emotions go deep today. Honest reflection and quiet strength serve you better than force.",
  "Optimism and faith are strong. Study, travel or a meaningful talk with a teacher feel right.",
  "A serious, steady mood. Work towards long-term goals and keep promises to yourself.",
  "The mind thinks in big pictures and new ideas. Connect with friends and community.",
  "Sensitivity and intuition are heightened. Rest, meditate and listen to what you feel.",
];

const LIMBS = (p: Panchang) => [
  {
    sa: "Vara",
    en: "Weekday",
    value: p.vara,
    sub: "Ruled by the day's planet",
  },
  {
    sa: "Tithi",
    en: "Lunar day",
    value: p.tithi.name,
    sub: `${p.tithi.paksha} paksha · ${p.tithi.index > 15 ? p.tithi.index - 15 : p.tithi.index} of 15`,
    progress: p.tithi.progress,
  },
  {
    sa: "Nakshatra",
    en: "Moon's mansion",
    value: p.nakshatra.name,
    sub: `Pada ${p.nakshatra.pada} · lord ${p.nakshatra.lord}`,
    progress: p.nakshatra.progress,
  },
  {
    sa: "Yoga",
    en: "Sun–Moon union",
    value: p.yoga,
    sub: "One of 27 yogas",
  },
  {
    sa: "Karana",
    en: "Half lunar day",
    value: p.karana,
    sub: "One of 11 karanas",
  },
];

function DayLine({ p }: { p: Panchang }) {
  // place events on a 24h line in the city's local time
  const minutes = (d: Date) => {
    const [h, m] = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: p.city.tz,
    })
      .format(d)
      .split(":")
      .map(Number);
    return h * 60 + m;
  };
  const pct = (d: Date) => (minutes(d) / 1440) * 100;
  const rise = pct(p.sunrise);
  const set = pct(p.sunset);
  const rS = pct(p.rahuKaal.start);
  const rE = pct(p.rahuKaal.end);
  const now = pct(p.date);

  return (
    <div>
      <div className="relative h-24">
        {/* night / day band */}
        <div className="absolute inset-x-0 top-9 h-6 overflow-hidden rounded-full bg-ink">
          <div
            className="absolute inset-y-0 bg-gradient-to-r from-[#e2a77a] via-dawn to-[#e2a77a]"
            style={{ left: `${rise}%`, width: `${set - rise}%` }}
          />
          <div
            className="absolute inset-y-0 bg-[#7a2a45]/80"
            style={{ left: `${rS}%`, width: `${rE - rS}%` }}
          />
        </div>
        {/* labels */}
        {[
          { at: rise, t: "Sunrise", v: timeIn(p.sunrise, p.city.tz), up: true },
          { at: set, t: "Sunset", v: timeIn(p.sunset, p.city.tz), up: true },
          {
            at: (rS + rE) / 2,
            t: "Rahu Kaal",
            v: `${timeIn(p.rahuKaal.start, p.city.tz)} – ${timeIn(p.rahuKaal.end, p.city.tz)}`,
            up: false,
          },
        ].map((l) => (
          <div
            key={l.t}
            className={`absolute -translate-x-1/2 text-center ${l.up ? "top-0" : "top-[3.9rem]"}`}
            style={{ left: `${l.at}%` }}
          >
            <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-3">
              {l.t}
            </p>
            <p className="whitespace-nowrap font-display text-lg leading-tight text-ink">
              {l.v}
            </p>
          </div>
        ))}
        {/* now */}
        <div
          className="absolute top-7 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${now}%` }}
        >
          <span className="h-10 w-0.5 rounded-full bg-gold-deep" />
          <span className="mt-0.5 rounded-full bg-gold-deep px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-paper">
            Now
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-between text-[10px] uppercase tracking-[0.2em] text-ink-3">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </div>
    </div>
  );
}

export default function TodaySky() {
  const [city, setCity] = useState(0);
  const p = useSky(city);
  const { openBooking } = useBooking();

  return (
    <>
      {/* ---------- Night header ---------- */}
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
                onChange={(e) => setCity(Number(e.target.value))}
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
            <div className="pointer-events-none absolute -inset-10 rounded-full border border-gold/20" />
            <div className="pointer-events-none absolute -inset-20 rounded-full border border-dashed border-gold/10" />
            {p ? (
              <MoonPhase elongation={p.elongation} className="w-full" />
            ) : (
              <div className="aspect-square w-full rounded-full bg-paper/5" />
            )}
            <p className="mt-6 text-center font-display text-2xl">
              {p
                ? `${Math.round(p.illumination * 100)}% lit · ${p.waxing ? "waxing" : "waning"}`
                : " "}
            </p>
            <Sparkle className="twinkle absolute -right-4 top-6 h-5 w-5 text-gold-bright" />
          </div>
        </div>
      </section>

      {/* ---------- Five limbs ---------- */}
      <section className="border-b border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="pt-14 text-center text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            Pañcāṅga · the five limbs of the day
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            {(p ? LIMBS(p) : []).map((l, i) => (
              <div
                key={l.sa}
                className={`bg-card px-4 py-10 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <dt>
                  <span className="block font-display text-sm uppercase tracking-[0.25em] text-gold-deep">
                    {l.sa}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.2em] text-ink-3">
                    {l.en}
                  </span>
                </dt>
                <dd className="mt-5 font-display text-3xl leading-tight text-ink sm:text-[2.1rem]">
                  {l.value}
                </dd>
                <dd className="mt-2 text-sm text-ink-3">{l.sub}</dd>
                {l.progress !== undefined && (
                  <dd className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-sand">
                    <span
                      className="block h-full rounded-full bg-gold"
                      style={{ width: `${l.progress * 100}%` }}
                    />
                  </dd>
                )}
              </div>
            ))}
            {!p &&
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse bg-card" />
              ))}
          </dl>
        </div>
      </section>

      {/* ---------- Day line ---------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="font-display text-4xl font-light sm:text-5xl">
              The shape of <em className="text-astro">the day.</em>
            </h2>
            <p className="max-w-md text-ink-2">
              Rahu Kaal is traditionally avoided for new beginnings. Times are
              for {p?.city.name ?? "your city"}.
            </p>
          </div>
          <div className="mt-12">{p && <DayLine p={p} />}</div>
        </div>
      </section>

      {/* ---------- Nakshatra scale ---------- */}
      <section className="bg-ink py-20 text-paper lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
                The live nakshatra scale
              </p>
              <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
                27 mansions, <em className="text-gold-bright">one sky.</em>
              </h2>
            </div>
            <p className="max-w-md text-paper/65">
              The Moon moves through one nakshatra roughly every day. Your birth
              nakshatra is the one it stood in when you were born.
            </p>
          </div>
          <div className="mt-12">
            <NakshatraScale p={p} dark />
          </div>
        </div>
      </section>

      {/* ---------- Guidance ---------- */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              The day&apos;s mood
            </p>
            <p className="mt-6 font-display text-[5.5rem] font-light leading-none text-gold-deep/90 sm:text-[7.5rem]">
              {p?.moonSign.sa ?? " "}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-ink-3">
              Moon in {p?.moonSign.en ?? "…"}
            </p>
          </div>
          <div>
            <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
              {p ? MOON_NOTES[p.moonSign.index] : " "}
            </p>
            <p className="mt-8 leading-relaxed text-ink-2">
              This is the general mood of the sky for everyone. How it touches
              you depends on your own chart: your Moon, your ascendant and the
              period you are running. That is what a personal reading explains.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => openBooking()}
                className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
              >
                Read my own chart
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <Link
                href="/free-tools"
                className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
              >
                Free tools
              </Link>
            </div>
            <p className="mt-8 text-xs text-ink-3">
              Calculated in your browser with the Lahiri ayanamsha. Accurate to
              within a few minutes of time; exact transition times will come
              from PRERNA&apos;s calculation engine.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

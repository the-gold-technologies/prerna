"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, RotateCcw } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";
import { BIRTH_CITIES } from "@/lib/chart";
import PlaceInput from "../shared/PlaceInput";

const field =
  "w-full border-b border-line bg-transparent py-2 text-ink outline-none transition placeholder:text-ink-3 focus:border-gold";
const lbl = "text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-3";

/* The nine grahas, in weekday order. */
const GRAHAS = ["Su", "Mo", "Ma", "Me", "Ju", "Ve", "Sa", "Ra", "Ke"];

/*
 * South Indian chart: signs sit fixed around a 4×4 grid, centre left open.
 * [glyph, row, col, grahas]. Placements are illustrative only.
 * ︎ forces the text (not emoji) form of each zodiac glyph.
 */
const HOUSES: [string, number, number, string[]][] = [
  ["♓︎", 1, 1, []],
  ["♈︎", 1, 2, ["Su"]],
  ["♉︎", 1, 3, ["Mo"]],
  ["♊︎", 1, 4, []],
  ["♋︎", 2, 4, ["Ju"]],
  ["♌︎", 3, 4, ["Asc"]],
  ["♍︎", 4, 4, ["Ra"]],
  ["♎︎", 4, 3, []],
  ["♏︎", 4, 2, ["Ma", "Sa"]],
  ["♐︎", 4, 1, []],
  ["♑︎", 3, 1, ["Ke"]],
  ["♒︎", 2, 1, ["Me", "Ve"]],
];

const META = [
  ["Date", "DD · MM · YYYY"],
  ["Time", "HH : MM"],
  ["Place", "Your birthplace"],
];

/*
 * Homepage chart section: the Life Map card beside a short birth-details
 * form. Submitting opens /chart with the chart already cast.
 */
export default function Report() {
  const { openBooking } = useBooking();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", date: "", time: "", place: "" });
  const [error, setError] = useState("");

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.time)
      return setError("Please enter your date and time of birth.");
    const city = BIRTH_CITIES.find(
      (c) => c.name.toLowerCase() === form.place.trim().toLowerCase()
    );
    if (!city)
      return setError("Please choose your place of birth from the list.");
    const q = new URLSearchParams({ d: form.date, t: form.time, p: city.name });
    if (form.name.trim()) q.set("n", form.name.trim());
    router.push(`/chart?${q.toString()}`);
  };

  return (
    <section id="report" className="overflow-hidden bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        {/* Report card (left on desktop, below the copy on mobile) */}
        <Reveal className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[26rem] pb-4 pt-6">
            {/* Pages stacked behind */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-0 top-10 rotate-[-4deg] rounded-[26px] border border-line bg-sand"
            />
            <div
              aria-hidden
              className="absolute inset-x-3 bottom-2 top-8 rotate-[2.5deg] rounded-[26px] border border-line bg-astro-soft"
            />

            <button
              onClick={() => router.push("/chart")}
              aria-label="Your life map: open the birth chart calculator"
              className="group relative block w-full rounded-[26px] border border-line bg-paper p-3 text-left shadow-[0_40px_80px_-40px_rgba(29,26,56,0.45)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_50px_90px_-40px_rgba(29,26,56,0.55)]"
            >
              {/* Inner gold frame, like a printed page */}
              <div className="rounded-[18px] border border-gold/35 px-5 pb-5 pt-6 sm:px-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
                      PRERNA · Your birth chart
                    </p>
                    <p className="mt-1.5 font-display text-[2rem] leading-none text-ink">
                      Your Life Map
                    </p>
                  </div>
                  <span className="mt-1 rounded-full border border-line bg-card px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink-3">
                    Rāśi · D1
                  </span>
                </div>

                {/* Birth details */}
                <dl className="mt-5 grid grid-cols-3 border-y border-line">
                  {META.map(([k, v], i) => (
                    <div
                      key={k}
                      className={`py-2.5 ${i > 0 ? "border-l border-line pl-3" : ""}`}
                    >
                      <dt className="text-[9px] uppercase tracking-[0.22em] text-ink-3">
                        {k}
                      </dt>
                      <dd className="mt-0.5 truncate text-[12px] text-ink-2">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* South Indian chart: gap-px over a gold base draws single hairlines */}
                <div
                  aria-hidden
                  className="mt-5 grid aspect-square grid-cols-4 grid-rows-4 gap-px overflow-hidden rounded-xl border border-gold/45 bg-gold/45"
                >
                  {HOUSES.map(([glyph, r, c, gs]) => (
                    <div
                      key={glyph}
                      style={{ gridRow: r, gridColumn: c }}
                      className="relative bg-card"
                    >
                      <span className="absolute left-1.5 top-1 text-[11px] leading-none text-gold/70">
                        {glyph}
                      </span>
                      <div className="flex h-full flex-wrap content-center items-center justify-center gap-x-1.5 pt-2">
                        {gs.map((g) =>
                          g === "Asc" ? (
                            <span
                              key={g}
                              className="font-display text-[15px] italic text-gold-deep"
                            >
                              Asc
                            </span>
                          ) : (
                            <span
                              key={g}
                              className="font-display text-[17px] font-medium text-astro"
                            >
                              {g}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Open centre */}
                  <div
                    style={{ gridRow: "2 / 4", gridColumn: "2 / 4" }}
                    className="relative flex flex-col items-center justify-center bg-paper text-center"
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] text-gold/30 transition-transform duration-[2000ms] group-hover:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.6"
                    >
                      <circle cx="50" cy="50" r="46" />
                      <circle cx="50" cy="50" r="34" strokeDasharray="1 3" />
                      {Array.from({ length: 12 }).map((_, i) => {
                        const a = (i * Math.PI) / 6;
                        return (
                          <line
                            key={i}
                            x1={Math.round((50 + Math.cos(a) * 34) * 100) / 100}
                            y1={Math.round((50 + Math.sin(a) * 34) * 100) / 100}
                            x2={Math.round((50 + Math.cos(a) * 46) * 100) / 100}
                            y2={Math.round((50 + Math.sin(a) * 46) * 100) / 100}
                          />
                        );
                      })}
                    </svg>
                    <span className="relative font-display text-lg italic text-ink">
                      Janma
                    </span>
                    <span className="relative mt-0.5 text-[9px] uppercase tracking-[0.3em] text-ink-3">
                      Kundali
                    </span>
                  </div>
                </div>

                {/* Graha strip */}
                <div className="mt-5 flex justify-between">
                  {GRAHAS.map((g) => (
                    <span
                      key={g}
                      className="grid h-7 w-7 place-items-center rounded-full border border-line bg-card font-display text-[12px] text-ink-2 transition group-hover:border-gold/50"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Footer bar */}
                <div className="mt-5 flex items-center justify-between rounded-full bg-ink py-2.5 pl-5 pr-2.5 text-sm text-paper">
                  Opens with your birth details
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-ink transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </button>

            {/* Seal */}
            <div
              aria-hidden
              className="float absolute -right-3 top-0 grid h-[84px] w-[84px] place-items-center rounded-full bg-ink text-center ring-4 ring-card sm:-right-7"
            >
              <span className="absolute inset-1.5 rounded-full border border-dashed border-gold/50" />
              <span className="font-display text-[13px] leading-tight text-gold-bright">
                Free
                <br />
                <span className="text-[10px] uppercase tracking-[0.18em] text-paper/70">
                  instant
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Copy + birth details (right on desktop) */}
        <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
            Your birth chart <span className="text-gold">·</span> Janma Kundali
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            Did you know your birth chart holds a map of{" "}
            <em className="text-astro">your whole life?</em>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            Enter your birth details to see your lagna, planets, nakshatra and
            dasha periods, free and in seconds.
          </p>

          <form
            onSubmit={go}
            className="mt-8 max-w-2xl rounded-[24px] border border-gold/30 bg-paper p-6 shadow-[0_30px_60px_-45px_rgba(28,24,68,0.45)] sm:p-7"
          >
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className={lbl}>Name</span>
                <input
                  className={field}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Optional"
                  autoComplete="name"
                />
              </label>
              <label>
                <span className={lbl}>Date of birth</span>
                <input
                  type="date"
                  required
                  min="1900-01-01"
                  max="2049-12-31"
                  className={field}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </label>
              <label>
                <span className={lbl}>Time of birth</span>
                <input
                  type="time"
                  required
                  className={field}
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />
              </label>
              <div className="sm:col-span-2">
                <span className={lbl}>Place of birth</span>
                <PlaceInput
                  className={field}
                  value={form.place}
                  onChange={(place) => setForm({ ...form, place })}
                />
              </div>
            </div>
            {error && <p className="mt-4 text-sm text-[#7a2a45]">{error}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
              >
                See my chart
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setForm({ name: "", date: "", time: "", place: "" });
                  setError("");
                }}
                className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-4 text-sm font-semibold transition hover:border-ink"
              >
                <RotateCcw className="h-4 w-4" /> Clear
              </button>
              <Link
                href="/chart"
                className="text-sm font-semibold text-ink-2 underline-offset-4 hover:text-ink hover:underline"
              >
                Full calculator
              </Link>
            </div>
          </form>

          <p className="mt-5 text-sm text-ink-3">
            Want it explained?{" "}
            <button
              onClick={() => openBooking()}
              className="font-semibold text-ink underline underline-offset-4"
            >
              Get your personalised report
            </button>{" "}
            with a 1-1 call.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

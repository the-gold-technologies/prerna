"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ArrowRight, RotateCcw } from "lucide-react";
import { calculatePythagoreanNumerology } from "@/data/prernaData";
import { NumberRing } from "./art";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

type Result = ReturnType<typeof calculatePythagoreanNumerology>;

const field =
  "w-full border-0 border-b border-paper/25 bg-transparent px-0 pb-3 pt-2 text-[15px] text-paper placeholder:text-paper/45 outline-none transition focus:border-gold-soft [color-scheme:dark]";

export default function FreeInsight() {
  const { openBooking } = useBooking();
  const [form, setForm] = useState({ name: "", dob: "", time: "", place: "", email: "" });
  const [result, setResult] = useState<Result | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send details to PRERNA backend for the full chart / email follow-up
    setResult(calculatePythagoreanNumerology(form.name, form.dob));
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ["#ead6a8", "#b8862f", "#fffcf6"] });
    } catch {}
  };

  return (
    <section id="free-insight" className="px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-ink text-paper sm:rounded-[44px]">
        {/* star dust */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, #fff6e0 50%, transparent 51%), radial-gradient(1px 1px at 70% 15%, #fff6e0 50%, transparent 51%), radial-gradient(1.5px 1.5px at 85% 60%, #ead6a8 50%, transparent 51%), radial-gradient(1px 1px at 40% 80%, #fff6e0 50%, transparent 51%), radial-gradient(1px 1px at 10% 70%, #ead6a8 50%, transparent 51%)",
            backgroundSize: "340px 340px",
          }}
        />
        <div className="pointer-events-none absolute -left-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-astro/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:py-28">
          {/* Visual */}
          <Reveal className="relative mx-auto w-full max-w-[420px]">
            <NumberRing active={result?.lifePathNumber} className="h-auto w-full" />
            <div className="absolute inset-0 grid place-items-center text-center">
              {result ? (
                <div key={result.lifePathNumber} className="rise">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-gold-soft/80">Life path</p>
                  <p className="font-display text-8xl leading-none text-gold-soft sm:text-9xl">{result.lifePathNumber}</p>
                </div>
              ) : (
                <p className="font-display text-7xl italic text-gold-soft/90 sm:text-8xl">?</p>
              )}
            </div>
          </Reveal>

          {/* Form / Result */}
          <Reveal delay={120}>
            {!result ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">Free · 1 minute</p>
                <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
                  What do your <em>numbers</em> say?
                </h2>
                <form onSubmit={submit} className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  <input required className={`${field} sm:col-span-2`} placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" aria-label="Full name" />
                  <label className="grid text-xs uppercase tracking-[0.15em] text-paper/55">
                    Date of birth
                    <input required type="date" className={field} value={form.dob} onChange={set("dob")} />
                  </label>
                  <label className="grid text-xs uppercase tracking-[0.15em] text-paper/55">
                    Birth time
                    <input type="time" className={field} value={form.time} onChange={set("time")} />
                  </label>
                  <input className={field} placeholder="Birth place" value={form.place} onChange={set("place")} aria-label="Birth place" />
                  <input required type="email" className={field} placeholder="Email" value={form.email} onChange={set("email")} autoComplete="email" aria-label="Email" />
                  <button
                    type="submit"
                    className="group mt-4 flex items-center justify-center gap-2 rounded-full bg-gold-soft px-7 py-4 font-semibold text-ink transition hover:bg-paper sm:col-span-2 sm:justify-self-start"
                  >
                    Reveal my number
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </form>
                <p className="mt-5 text-xs text-paper/45">Pythagorean numerology · Your details stay private.</p>
              </>
            ) : (
              <div className="rise">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-soft">
                  {form.name.split(" ")[0]}, you are
                </p>
                <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
                  {result.archetype.title.replace(/\s*\(.*\)$/, "")}
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/75">{result.archetype.essence}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {result.archetype.strengths.map((s) => (
                    <span key={s} className="rounded-full border border-paper/20 px-4 py-1.5 text-sm text-paper/85">
                      {s}
                    </span>
                  ))}
                </div>
                <dl className="mt-8 grid max-w-sm grid-cols-3 gap-4 border-t border-paper/15 pt-6">
                  {[
                    ["Destiny", result.destinyNumber],
                    ["Soul urge", result.soulUrgeNumber],
                    ["Planet", result.archetype.rulingPlanet.split(" ")[0]],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-paper/50">{k}</dt>
                      <dd className="mt-1 font-display text-3xl text-gold-soft">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openBooking()}
                    className="group flex items-center gap-2 rounded-full bg-gold-soft px-7 py-4 font-semibold text-ink transition hover:bg-paper"
                  >
                    Go deeper in a 1-1 session
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => setResult(null)}
                    className="flex items-center gap-2 rounded-full px-5 py-4 text-sm text-paper/70 transition hover:text-paper"
                  >
                    <RotateCcw className="h-4 w-4" /> Try another
                  </button>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

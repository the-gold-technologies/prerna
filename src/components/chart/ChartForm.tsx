"use client";

import React from "react";
import { ArrowRight, ChevronDown, RotateCcw } from "lucide-react";
import { AYANAMSHAS, YEAR_OPTIONS } from "@/lib/chart";
import PlaceInput from "../shared/PlaceInput";
import { field, lbl, offsetFor, pill, type Form } from "./types";

export function ChartForm({
  f,
  error,
  onUpdate,
  onPlace,
  onSubmit,
  onReset,
}: {
  f: Form;
  error: string;
  onUpdate: (patch: Partial<Form>) => void;
  onPlace: (place: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  onLoadExample?: () => void;
}) {
  return (
    <form
      id="chart-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="scroll-mt-24 rounded-[28px] border border-gold/40 bg-paper p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-7 print:hidden"
    >
      <p className="font-display text-2xl text-ink sm:text-3xl">
        Birth details
      </p>
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
        <label className="col-span-2 sm:col-span-1">
          <span className={lbl}>Name</span>
          <input
            className={field}
            value={f.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Optional"
            autoComplete="name"
          />
        </label>
        <label className="col-span-2 sm:col-span-1">
          <span className={lbl}>Gender</span>
          <select
            className={`${field} cursor-pointer`}
            value={f.gender}
            onChange={(e) => onUpdate({ gender: e.target.value })}
          >
            <option value="">Select</option>
            {["Female", "Male", "Non-binary", "Prefer not to say", "Other"].map(
              (g) => (
                <option key={g}>{g}</option>
              )
            )}
          </select>
        </label>
        <label>
          <span className={lbl}>Date of birth</span>
          <input
            type="date"
            required
            className={field}
            value={f.date}
            min="1900-01-01"
            max="2049-12-31"
            onChange={(e) =>
              onUpdate({
                date: e.target.value,
                ...(f.tz
                  ? { offset: offsetFor(e.target.value, f.time, f.tz) }
                  : {}),
              })
            }
          />
        </label>
        <label>
          <span className={lbl}>Time of birth</span>
          <input
            type="time"
            required
            className={field}
            value={f.time}
            onChange={(e) =>
              onUpdate({
                time: e.target.value,
                ...(f.tz
                  ? { offset: offsetFor(f.date, e.target.value, f.tz) }
                  : {}),
              })
            }
          />
        </label>
        <div className="col-span-2">
          <span className={lbl}>Accuracy of birth time</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Approx", "Exact", "Rectified", "Unknown"].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => onUpdate({ accuracy: a })}
                aria-pressed={f.accuracy === a}
                className={pill(f.accuracy === a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <span className={lbl}>Place of birth</span>
          <PlaceInput className={field} value={f.place} onChange={onPlace} />
        </div>
      </div>

      <details className="group mt-5 rounded-2xl bg-sand/50 px-4 py-3">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink-2 [&::-webkit-details-marker]:hidden">
          Coordinates and time zone
          <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
        </summary>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <label>
            <span className={lbl}>Lat, N +</span>
            <input
              className={field}
              inputMode="decimal"
              value={f.lat}
              onChange={(e) => onUpdate({ lat: e.target.value, tz: null })}
              placeholder="28.61"
            />
          </label>
          <label>
            <span className={lbl}>Lon, E +</span>
            <input
              className={field}
              inputMode="decimal"
              value={f.lon}
              onChange={(e) => onUpdate({ lon: e.target.value, tz: null })}
              placeholder="77.21"
            />
          </label>
          <label>
            <span className={lbl}>UTC, hours</span>
            <input
              className={field}
              inputMode="decimal"
              value={f.offset}
              onChange={(e) => onUpdate({ offset: e.target.value, tz: null })}
              placeholder="5.5"
            />
          </label>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">
          Filled in from the place and date, including summer time. Enter them
          yourself if your place is not listed.
        </p>
      </details>

      <details className="group mt-3 rounded-2xl bg-sand/50 px-4 py-3">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink-2 [&::-webkit-details-marker]:hidden">
          Calculation settings
          <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
        </summary>
        <div className="mt-3 grid gap-4">
          <label>
            <span className={lbl}>Ayanamsha</span>
            <select
              className={`${field} cursor-pointer`}
              value={f.ayan}
              onChange={(e) => onUpdate({ ayan: e.target.value })}
            >
              {AYANAMSHAS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <div>
            <span className={lbl}>Rahu and Ketu</span>
            <div className="mt-2 flex gap-1.5">
              {(["mean", "true"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onUpdate({ node: n })}
                  aria-pressed={f.node === n}
                  className={pill(f.node === n)}
                >
                  {n === "mean" ? "Mean nodes" : "True nodes"}
                </button>
              ))}
            </div>
          </div>
          <label>
            <span className={lbl}>Dasha year</span>
            <select
              className={`${field} cursor-pointer`}
              value={f.year}
              onChange={(e) => onUpdate({ year: e.target.value })}
            >
              {YEAR_OPTIONS.map((y) => (
                <option key={y.id} value={y.id}>
                  {y.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs text-ink-3">
            Lahiri is the default and is used across PRERNA.
          </p>
        </div>
      </details>

      {error && <p className="mt-4 text-sm text-[#7a2a45]">{error}</p>}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="group flex cursor-pointer items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
        >
          Compute chart
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-ink/20 px-5 py-4 text-sm font-semibold transition hover:border-ink"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>
    </form>
  );
}

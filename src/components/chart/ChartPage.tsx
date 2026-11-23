"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Link2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { Sparkle } from "../home/VedicChakra";
import { NorthChart, SouthChart, WheelChart } from "./ChartDiagrams";
import {
  AYANAMSHAS,
  BIRTH_CITIES,
  GRAHA_COLOR,
  VARGAS,
  YEAR_OPTIONS,
  antardashas,
  castChart,
  charaKarakas,
  dignity,
  elementBalance,
  fmtDeg,
  localToUtc,
  strengthRanking,
  vargaChart,
  type BirthChart,
  type Dasha,
  type GrahaName,
} from "@/lib/chart";
import {
  NAKSHATRA_LORDS,
  RASHI,
  SIGNS,
  panchang,
  type Panchang,
} from "@/lib/sky";

/* ------------------------------------------------------------------ */
type Form = {
  name: string;
  gender: string;
  date: string;
  time: string;
  accuracy: string;
  place: string;
  lat: string;
  lon: string;
  offset: string;
  tz: string | null; // IANA zone when a listed city is chosen
  ayan: string;
  node: "mean" | "true";
  year: string;
};

const EMPTY: Form = {
  name: "",
  gender: "",
  date: "",
  time: "",
  accuracy: "Exact",
  place: "",
  lat: "",
  lon: "",
  offset: "",
  tz: null,
  ayan: "lahiri",
  node: "mean",
  year: "365.25",
};
const EXAMPLE: Form = {
  ...EMPTY,
  name: "Example chart",
  date: "1990-05-15",
  time: "10:30",
  place: "New Delhi",
  lat: "28.6139",
  lon: "77.209",
  offset: "5.5",
  tz: "Asia/Kolkata",
};

const field =
  "w-full border-b border-line bg-transparent py-2 text-ink outline-none transition placeholder:text-ink-3 focus:border-gold";
const lbl = "text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-3";
const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

const offsetFor = (date: string, time: string, tz: string) => {
  if (!date) return "";
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = (time || "12:00").split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, h, mi);
  return String(
    (wall - localToUtc(date, time || "12:00", tz).getTime()) / 3600_000
  );
};

const toQuery = (f: Form) => {
  const q = new URLSearchParams({ d: f.date, t: f.time });
  if (f.name.trim()) q.set("n", f.name.trim());
  if (f.place) q.set("p", f.place);
  if (!f.tz) {
    q.set("lat", f.lat);
    q.set("lon", f.lon);
    q.set("o", f.offset);
  }
  if (f.ayan !== "lahiri") q.set("a", f.ayan);
  if (f.node === "true") q.set("nd", "true");
  if (f.year !== "365.25") q.set("y", f.year);
  if (f.accuracy !== "Exact") q.set("acc", f.accuracy);
  return q;
};

const fromQuery = (q: URLSearchParams): Form | null => {
  const d = q.get("d");
  const t = q.get("t");
  if (!d || !t) return null;
  const place = q.get("p") ?? q.get("c") ?? "";
  const city = BIRTH_CITIES.find((c) => c.name === place);
  return {
    ...EMPTY,
    name: q.get("n") ?? "",
    date: d,
    time: t,
    place,
    accuracy: q.get("acc") ?? "Exact",
    lat: city ? String(city.lat) : (q.get("lat") ?? ""),
    lon: city ? String(city.lon) : (q.get("lon") ?? ""),
    tz: city ? city.tz : null,
    offset: city ? offsetFor(d, t, city.tz) : (q.get("o") ?? ""),
    ayan: q.get("a") ?? "lahiri",
    node: q.get("nd") === "true" ? "true" : "mean",
    year: q.get("y") ?? "365.25",
  };
};

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const pill = (on: boolean) =>
  `rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${on ? "bg-ink text-paper" : "border border-line text-ink-2 hover:border-ink/40"}`;
const action =
  "flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold transition hover:border-ink disabled:opacity-40";

/* ------------------------------------------------------------------ */
export default function ChartPage() {
  const { openBooking } = useBooking();
  const [f, setF] = useState<Form>(EMPTY);
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [transit, setTransit] = useState<BirthChart | null>(null);
  const [birthDay, setBirthDay] = useState<Panchang | null>(null);
  const [who, setWho] = useState<{ name: string; line: string } | null>(null);
  const [now, setNow] = useState(0);
  const [style, setStyle] = useState<"north" | "south" | "wheel">("north");
  const [varga, setVarga] = useState(1);
  const [openMd, setOpenMd] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const results = useRef<HTMLDivElement>(null);

  const flash = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 2400);
  };
  const update = (patch: Partial<Form>) => setF((x) => ({ ...x, ...patch }));

  const onPlace = (place: string) => {
    const city = BIRTH_CITIES.find(
      (c) => c.name.toLowerCase() === place.trim().toLowerCase()
    );
    if (city)
      update({
        place: city.name,
        lat: String(city.lat),
        lon: String(city.lon),
        tz: city.tz,
        offset: offsetFor(f.date, f.time, city.tz),
      });
    else update({ place });
  };

  const cast = (form: Form, scroll = true) => {
    setError("");
    if (!form.date || !form.time)
      return setError("Please enter the date and time of birth.");
    const year = Number(form.date.slice(0, 4));
    if (year < 1900 || year > 2049)
      return setError("Please choose a birth year between 1900 and 2049.");
    const lat = Number(form.lat);
    const lon = Number(form.lon);
    if (
      !form.lat ||
      !form.lon ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 66 ||
      Math.abs(lon) > 180
    )
      return setError(
        "Choose a place from the list, or enter latitude (−66 to 66) and longitude (−180 to 180)."
      );
    const offset = Number(form.offset || 0);
    if (!form.tz && !Number.isFinite(offset))
      return setError("Please enter the UTC offset in hours, for example 5.5.");

    const at = localToUtc(form.date, form.time, form.tz, offset);
    const opts = {
      ayanamsha: form.ayan,
      trueNode: form.node === "true",
      yearDays: YEAR_OPTIONS.find((y) => y.id === form.year)?.days,
    };
    const c = castChart(at, lat, lon, opts);
    const t = Date.now();
    setNow(t);
    setChart(c);
    setTransit(castChart(new Date(t), lat, lon, opts));
    setBirthDay(
      panchang(at, {
        name: form.place || "Birthplace",
        lat,
        lon,
        tz: form.tz ?? "UTC",
      })
    );
    setOpenMd(null);
    const d = new Date(form.date + "T00:00:00Z").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    setWho({
      name: form.name.trim() || "Your chart",
      line: `${d} · ${form.time} · ${form.place || `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`}`,
    });
    window.history.replaceState(null, "", `?${toQuery(form).toString()}`);
    if (scroll)
      requestAnimationFrame(() =>
        results.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
  };

  const reset = () => {
    setF(EMPTY);
    setChart(null);
    setTransit(null);
    setBirthDay(null);
    setWho(null);
    setVarga(1);
    setError("");
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // open a shared or homepage link: /chart?d=YYYY-MM-DD&t=HH:MM&p=<place>&n=<name>
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const form = fromQuery(q);
    if (!form) return;
    const sty = q.get("s");
    const id = setTimeout(() => {
      if (sty === "south" || sty === "wheel") setStyle(sty);
      setF(form);
      cast(form, false);
    });
    return () => clearTimeout(id);
  }, []);

  /* ---------- actions ---------- */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash(
        "Link copied. It carries the birth details; nothing is stored by PRERNA."
      );
    } catch {
      flash("Copy the address from your browser bar to share this chart.");
    }
  };

  const running = chart?.dashas.find(
    (d) => d.start.getTime() <= now && d.end.getTime() > now
  );
  const shown = chart ? vargaChart(chart, varga) : null;
  const vInfo = VARGAS.find((v) => v.n === varga)!;
  const birthMs = chart?.at.getTime() ?? 0;
  const age = (d: Date) =>
    Math.max(0, Math.floor((d.getTime() - birthMs) / (365.25 * 86400_000)));
  const nakLord = (lon: number) =>
    NAKSHATRA_LORDS[Math.floor(lon / (360 / 27)) % 9];

  /* ---------- render ---------- */
  return (
    <>
      {/* ================= Header ================= */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 print:pt-4">
        <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-dawn/50 blur-3xl print:hidden" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-ink-3 print:hidden"
          >
            <Link href="/" className="hover:text-ink">
              PRERNA
            </Link>
            <span className="mx-1.5">/</span>Your Chart
          </nav>
          <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className={eyebrow}>Vedic astrology calculator</p>
              <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Your chart, <em className="text-gold-deep">in every detail.</em>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 print:hidden">
                Enter the date, time and place of birth. Your chart is computed
                in your browser and your details are never sent to us.
              </p>
            </div>

            {/* action row */}
            <div className="relative flex flex-wrap items-center gap-2 print:hidden">
              <button
                onClick={() => chart && window.print()}
                disabled={!chart}
                className={action}
              >
                <Download className="h-4 w-4" /> Download
              </button>
              <button onClick={copyLink} disabled={!chart} className={action}>
                <Link2 className="h-4 w-4" /> Share link
              </button>
            </div>
          </div>
          {toast && (
            <p
              role="status"
              className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-sm text-paper"
            >
              {toast}
            </p>
          )}
        </div>
      </section>

      {/* ================= Form + chart ================= */}
      <section className="pb-20 pt-10 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          {/* form */}
          <form
            id="chart-form"
            onSubmit={(e) => {
              e.preventDefault();
              cast(f);
            }}
            className="rounded-[28px] border border-gold/30 bg-paper p-7 shadow-[0_30px_70px_-45px_rgba(28,24,68,0.45)] sm:p-8 lg:col-span-5 lg:self-start print:hidden"
          >
            <p className="font-display text-3xl text-ink">Birth details</p>
            <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-5">
              <label className="col-span-2 sm:col-span-1">
                <span className={lbl}>Name</span>
                <input
                  className={field}
                  value={f.name}
                  onChange={(e) => update({ name: e.target.value })}
                  placeholder="Optional"
                  autoComplete="name"
                />
              </label>
              <label className="col-span-2 sm:col-span-1">
                <span className={lbl}>Gender</span>
                <select
                  className={`${field} cursor-pointer`}
                  value={f.gender}
                  onChange={(e) => update({ gender: e.target.value })}
                >
                  <option value="">Select</option>
                  {[
                    "Female",
                    "Male",
                    "Non-binary",
                    "Prefer not to say",
                    "Other",
                  ].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
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
                    update({
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
                    update({
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
                      onClick={() => update({ accuracy: a })}
                      aria-pressed={f.accuracy === a}
                      className={pill(f.accuracy === a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <label className="col-span-2">
                <span className={lbl}>Place of birth</span>
                <input
                  className={field}
                  list="birth-cities"
                  value={f.place}
                  placeholder="Start typing a city"
                  onChange={(e) => onPlace(e.target.value)}
                  autoComplete="off"
                />
                <datalist id="birth-cities">
                  {BIRTH_CITIES.map((c) => (
                    <option key={c.name} value={c.name} />
                  ))}
                </datalist>
              </label>
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
                    onChange={(e) => update({ lat: e.target.value, tz: null })}
                    placeholder="28.61"
                  />
                </label>
                <label>
                  <span className={lbl}>Lon, E +</span>
                  <input
                    className={field}
                    inputMode="decimal"
                    value={f.lon}
                    onChange={(e) => update({ lon: e.target.value, tz: null })}
                    placeholder="77.21"
                  />
                </label>
                <label>
                  <span className={lbl}>UTC, hours</span>
                  <input
                    className={field}
                    inputMode="decimal"
                    value={f.offset}
                    onChange={(e) =>
                      update({ offset: e.target.value, tz: null })
                    }
                    placeholder="5.5"
                  />
                </label>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink-3">
                Filled in from the place and date, including summer time. Enter
                them yourself if your place is not listed.
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
                    onChange={(e) => update({ ayan: e.target.value })}
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
                        onClick={() => update({ node: n })}
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
                    onChange={(e) => update({ year: e.target.value })}
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
                className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
              >
                Compute chart
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex items-center gap-2 rounded-full border border-ink/20 px-5 py-4 text-sm font-semibold transition hover:border-ink"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setF(EXAMPLE);
                  cast(EXAMPLE);
                }}
                className="flex items-center gap-1.5 text-sm font-semibold text-ink-2 hover:text-ink"
              >
                <Sparkles className="h-4 w-4 text-gold" /> Example
              </button>
            </div>
          </form>

          {/* chart canvas */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div className="flex rounded-full border border-gold/40 bg-paper p-1">
                {(["north", "south", "wheel"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    aria-pressed={style === s}
                    className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${style === s ? "bg-ink text-gold-bright" : "text-ink-2 hover:text-ink"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1">
                {VARGAS.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVarga(v.n)}
                    aria-pressed={varga === v.n}
                    title={`${v.name}: ${v.about}`}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${varga === v.n ? "bg-gold text-ink" : "text-ink-3 hover:text-ink"}`}
                  >
                    {v.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-6 rounded-[28px] border border-line bg-card p-6 sm:p-8">
              <Sparkle className="twinkle absolute -right-2 -top-2 h-5 w-5 text-gold print:hidden" />
              {shown ? (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-display text-2xl text-ink">
                      {vInfo.name}{" "}
                      <span className="text-base text-ink-3">· {vInfo.id}</span>
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-ink-3">
                      {vInfo.about}
                    </p>
                  </div>
                  <div
                    key={`${style}-${varga}`}
                    className="rise mx-auto mt-5 max-w-[520px]"
                  >
                    {style === "north" && <NorthChart c={shown} />}
                    {style === "south" && (
                      <SouthChart c={shown} title={vInfo.id} />
                    )}
                    {style === "wheel" && <WheelChart c={shown} />}
                  </div>
                  {f.accuracy === "Unknown" && (
                    <p className="mt-4 rounded-xl bg-[#7a2a45]/10 px-4 py-2 text-sm text-[#7a2a45]">
                      Birth time unknown: the lagna and houses may not be
                      reliable. The Moon and planets are still useful.
                    </p>
                  )}
                </>
              ) : (
                <div className="relative mx-auto max-w-[520px]">
                  <svg
                    viewBox="0 0 400 400"
                    className="w-full opacity-70"
                    aria-hidden
                  >
                    <rect
                      x="1"
                      y="1"
                      width="398"
                      height="398"
                      fill="none"
                      stroke="#e9dcc3"
                      strokeWidth="2"
                    />
                    <path
                      d="M0 0 L400 400 M400 0 L0 400 M200 0 L400 200 L200 400 L0 200 Z"
                      fill="none"
                      stroke="#e9dcc3"
                      strokeWidth="2"
                    />
                  </svg>
                  <p className="absolute inset-0 grid place-items-center px-10 text-center font-display text-2xl italic text-ink-3">
                    Enter the birth details, and the chart is drawn here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Results ================= */}
      {chart && who && shown && (
        <div ref={results} className="scroll-mt-16">
          {/* summary */}
          <section className="relative overflow-hidden bg-ink py-14 text-paper">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(59,52,136,0.7),transparent_60%)]" />
            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
                {who.name}
              </p>
              <p className="mt-2 text-paper/60">{who.line}</p>
              <dl className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {[
                  ["Lagna", chart.lagna.sa, chart.lagna.en],
                  ["Moon sign", chart.moonSign.sa, chart.moonSign.en],
                  [
                    "Birth nakshatra",
                    chart.planets[1].nakshatra,
                    `Pada ${chart.planets[1].pada} · lord ${nakLord(chart.planets[1].lon)}`,
                  ],
                  ["Sun sign", chart.sunSign.sa, chart.sunSign.en],
                  [
                    "Running period",
                    running?.lord ?? "—",
                    running
                      ? `Mahadasha until ${running.end.getUTCFullYear()}`
                      : "",
                  ],
                ].map(([k, v, s], i) => (
                  <div
                    key={k}
                    className={i ? "border-l border-paper/15 pl-6" : ""}
                  >
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.25em] text-paper/50">
                      {k}
                    </dt>
                    <dd className="mt-2 font-display text-3xl sm:text-4xl">
                      {v}
                    </dd>
                    <dd className="mt-1 text-sm text-paper/55">{s}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* planets */}
          <section className="bg-card py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <p className={eyebrow}>Planets · {vInfo.id}</p>
              <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
                Where your planets <em className="text-astro">stood.</em>
              </h2>
              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[820px] text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink text-[10px] uppercase tracking-[0.2em] text-ink-3">
                      {[
                        "Graha",
                        "Sign",
                        "Degree",
                        "Nakshatra · Pada",
                        "Lord",
                        "House",
                        "Dignity",
                        "Motion",
                      ].map((h) => (
                        <th key={h} className="py-3 pr-4 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[shown.asc, ...shown.planets].map((p) => {
                      const dg = dignity(p);
                      const orig =
                        p.name === "Asc"
                          ? chart.asc
                          : chart.planets.find((x) => x.name === p.name)!;
                      const good =
                        dg === "Exalted" ||
                        dg === "Moolatrikona" ||
                        dg === "Own sign";
                      const bad = dg === "Debilitated" || dg === "Enemy's sign";
                      return (
                        <tr key={p.name} className="border-b border-line">
                          <td className="py-3 pr-4">
                            <span className="flex items-center gap-2.5">
                              <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{
                                  background:
                                    p.name === "Asc"
                                      ? "#7a2a45"
                                      : GRAHA_COLOR[p.name as GrahaName],
                                }}
                              />
                              <span className="font-display text-lg text-ink">
                                {p.name === "Asc" ? "Lagna" : p.name}
                              </span>
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-ink-2">
                            {SIGNS[p.sign]}{" "}
                            <span className="text-ink-3">
                              · {RASHI[p.sign]}
                            </span>
                          </td>
                          <td className="py-3 pr-4 font-display text-base text-ink">
                            {fmtDeg(p.deg)}
                          </td>
                          <td className="py-3 pr-4 text-ink-2">
                            {orig.nakshatra} · {orig.pada}
                          </td>
                          <td className="py-3 pr-4 text-ink-2">
                            {nakLord(orig.lon)}
                          </td>
                          <td className="py-3 pr-4 font-display text-base text-ink">
                            {p.house}
                          </td>
                          <td className="py-3 pr-4">
                            {dg !== "—" && (
                              <span
                                className={`rounded-full px-2.5 py-1 text-xs ${good ? "bg-spirit-soft text-spirit" : bad ? "bg-[#7a2a45]/10 text-[#7a2a45]" : "bg-sand text-ink-2"}`}
                              >
                                {dg}
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-ink-2">
                            {p.name === "Asc"
                              ? "—"
                              : p.retro
                                ? "Retrograde"
                                : "Direct"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-ink-3">
                Sidereal, {AYANAMSHAS.find((a) => a.id === f.ayan)?.label}{" "}
                ayanamsha, whole-sign houses, {f.node} nodes. Nakshatra and lord
                are from the birth chart.
              </p>
            </div>
          </section>

          {/* dashas */}
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
                  Every period from birth, with your age. Open a period to see
                  its sub-periods (antardashas).
                </p>
              </div>

              <DashaBar
                list={chart.dashas.slice(0, 9)}
                running={running}
                now={now}
              />

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

          {/* strength + elements */}
          <section className="bg-card py-20">
            <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className={eyebrow}>Strongest to weakest</p>
                <h2 className="mt-3 font-display text-4xl font-light">
                  Your strongest and{" "}
                  <em className="text-astro">weakest planets.</em>
                </h2>
                <ol className="mt-8 space-y-3">
                  {strengthRanking(chart).map(({ p, d, score }, i) => (
                    <li key={p.name} className="flex items-center gap-4">
                      <span className="w-5 font-display text-gold-deep">
                        {i + 1}
                      </span>
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
                      <span className="w-28 text-right text-xs text-ink-3">
                        {d}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs text-ink-3">
                  A simple ranking from dignity, directional strength and
                  motion. Full Shadbala comes with your report.
                </p>
              </div>
              <div>
                <p className={eyebrow}>Elements</p>
                <h2 className="mt-3 font-display text-4xl font-light">
                  The balance of{" "}
                  <em className="text-gold-deep">your elements.</em>
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

          {/* karakas + birth-day panchang */}
          <section className="py-20">
            <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
              <div>
                <p className={eyebrow}>Jaimini</p>
                <h2 className="mt-3 font-display text-4xl font-light">
                  Karakas
                </h2>
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
                            color: p
                              ? GRAHA_COLOR[p.name as GrahaName]
                              : undefined,
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
                      [
                        "Tithi",
                        `${birthDay.tithi.paksha} ${birthDay.tithi.name}`,
                      ],
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
                        <dd className="mt-1 font-display text-xl text-ink">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </section>

          {/* gochara */}
          {transit && (
            <section className="bg-ink py-20 text-paper">
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
                  Gochara
                </p>
                <h2 className="mt-3 font-display text-4xl font-light sm:text-5xl">
                  Today&apos;s sky{" "}
                  <em className="text-gold-bright">in your chart.</em>
                </h2>
                <p className="mt-3 max-w-2xl text-paper/65">
                  Where the planets are today, counted in houses from your lagna
                  and from your Moon.
                </p>
                <div className="mt-10 overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-paper/30 text-[10px] uppercase tracking-[0.2em] text-paper/50">
                        {[
                          "Graha",
                          "Today in",
                          "Nakshatra",
                          "From lagna",
                          "From Moon",
                        ].map((h) => (
                          <th key={h} className="py-3 pr-4 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {transit.planets.map((p) => (
                        <tr key={p.name} className="border-b border-paper/10">
                          <td className="py-3 pr-4 font-display text-lg">
                            {p.name}
                            {p.retro && p.name !== "Rahu" && p.name !== "Ketu"
                              ? " ℞"
                              : ""}
                          </td>
                          <td className="py-3 pr-4 text-paper/75">
                            {SIGNS[p.sign]} {fmtDeg(p.deg)}
                          </td>
                          <td className="py-3 pr-4 text-paper/75">
                            {p.nakshatra}
                          </td>
                          <td className="py-3 pr-4 font-display text-lg text-gold-bright">
                            {((p.sign - chart.ascSign + 12) % 12) + 1}
                          </td>
                          <td className="py-3 font-display text-lg text-gold-bright">
                            {((p.sign - chart.planets[1].sign + 12) % 12) + 1}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link
                  href="/today"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright"
                >
                  Today&apos;s full panchang <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          )}

          {/* next step */}
          <section className="py-20 print:hidden">
            <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
              <p className={eyebrow}>The next step</p>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">
                This is your map.{" "}
                <em className="text-gold-deep">Let us read it with you.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-ink-2">
                A personalised report explains every chapter of your chart with
                exact calculations, all divisional charts and a private 1-1
                call.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => openBooking()}
                  className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
                >
                  Get my full report{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
                <Link
                  href="/report"
                  className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
                >
                  What&apos;s in the report
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ================= About the calculator ================= */}
      <section className="border-t border-line bg-card py-20 print:hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-3 lg:gap-16">
          <div>
            <p className={eyebrow}>What you get</p>
            <h2 className="mt-3 font-display text-3xl font-light">
              A Vedic chart, in full
            </h2>
            <ul className="mt-5 space-y-2.5 text-ink-2">
              {[
                "Lagna and the nine grahas with nakshatra, pada, dignity and motion",
                "North, South and wheel styles, with D1, D2, D3, D7, D9, D10 and D12",
                "Vimshottari dashas with every antardasha",
                "Strength ranking, element balance and Jaimini karakas",
                "Today's transits from your lagna and Moon",
                "The panchang of the day you were born",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-gold">✦</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={eyebrow}>How to find your chart</p>
            <h2 className="mt-3 font-display text-3xl font-light">
              Three steps
            </h2>
            <ol className="mt-5 space-y-4">
              {[
                "Enter your name, date and time of birth, and how sure you are of the time.",
                "Choose your place of birth from the list, or enter its coordinates.",
                "Compute the chart, then move between styles, divisional charts and the readings below.",
              ].map((t, i) => (
                <li key={t} className="flex gap-4 text-ink-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-display text-gold-bright">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className={eyebrow}>Questions</p>
            <h2 className="mt-3 font-display text-3xl font-light">
              Good to know
            </h2>
            <div className="mt-4 border-t border-line">
              {[
                [
                  "How accurate is it?",
                  "Calculated in your browser with standard astronomical formulas, typically within a degree. Planets right at the edge of a sign or nakshatra should be confirmed in your full report.",
                ],
                [
                  "Which zodiac is used?",
                  "The sidereal zodiac with the Lahiri ayanamsha by default, mean nodes and whole-sign houses. You can change these in Calculation settings.",
                ],
                [
                  "Do I need my exact birth time?",
                  "For the lagna, houses and divisional charts, yes: the lagna moves about one sign every two hours. Planets and the Moon sign are reliable even without it.",
                ],
                [
                  "Are my details stored?",
                  "No. Everything is calculated in your browser and nothing is stored by PRERNA.",
                ],
              ].map(([q, a]) => (
                <details key={q} className="group border-b border-line py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg text-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown className="h-4 w-4 text-ink-3 transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- element bars ---------------- */
function ElementBars({ c }: { c: BirthChart }) {
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

/* ---------------- dasha bar ---------------- */
function DashaBar({
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

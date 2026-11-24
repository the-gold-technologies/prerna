"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { timeIn, type Panchang } from "@/lib/sky";
import {
  dayTimings,
  upcomingFestivals,
  type FestivalDay,
} from "@/lib/festivals";

const PER_PAGE = 6;
const AHEAD = 18;

const TONE = {
  keep: { dot: "bg-spirit", label: "Keep" },
  avoid: { dot: "bg-[#7a2a45]", label: "Avoid" },
  sun: { dot: "bg-gold", label: "Sun" },
} as const;

/* Whole local days between two instants in a time zone. */
function daysBetween(a: Date, b: Date, tz: string) {
  const key = (d: Date) => {
    const s = new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(d);
    const [y, m, day] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, day);
  };
  return Math.round((key(b) - key(a)) / 86400_000);
}

const when = (n: number) =>
  n === 0 ? "Today" : n === 1 ? "Tomorrow" : `In ${n} days`;

function span(ms: number) {
  const m = Math.max(0, Math.round(ms / 60_000));
  const h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}

/* A small brass diya with a flickering flame. */
function Diya({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="diya-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1cf7a" />
          <stop offset="100%" stopColor="#a77a22" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="18"
        r="14"
        fill="url(#diya-glow)"
        className="flicker"
      />
      <path
        d="M24 6 C28 12 28 17 24 21 C20 17 20 12 24 6Z"
        fill="#ffcf5a"
        className="flicker"
      />
      <path
        d="M24 11 C26 14 26 17 24 19 C22 17 22 14 24 11Z"
        fill="#fff4d6"
        className="flicker"
      />
      <path
        d="M7 26 H41 C39 34 32 38 24 38 C16 38 9 34 7 26Z"
        fill="url(#diya-brass)"
      />
      <ellipse cx="24" cy="26" rx="17" ry="3" fill="#f6e2a8" />
      <path d="M18 40 H30 L28 43 H20Z" fill="#a77a22" />
    </svg>
  );
}

/* Festivals and important timings: a paged grid of the days ahead, today's hours below. */
export function SkyFestivals({ p }: { p: Panchang | null }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [full, setFull] = useState(false);
  const [calFilter, setCalFilter] = useState<"all" | "festival" | "vrat">(
    "all"
  );
  const touch = useRef<number | null>(null);

  const tz = p?.city.tz ?? "Asia/Kolkata";
  const dayKey = p
    ? new Intl.DateTimeFormat("en-CA", { timeZone: tz }).format(p.date)
    : "";
  const city = p?.city;

  // recomputed once per day and city, not every minute
  const festivals = useMemo(
    () =>
      city && dayKey
        ? upcomingFestivals(new Date(`${dayKey}T12:00:00Z`), city, 200)
        : [],
    [city, dayKey]
  );
  const ahead = festivals.slice(0, AHEAD);
  const pages = Math.max(1, Math.ceil(ahead.length / PER_PAGE));
  const safePage = Math.min(page, pages - 1);
  const cards = ahead.slice(
    safePage * PER_PAGE,
    safePage * PER_PAGE + PER_PAGE
  );

  const go = (to: number) => {
    if (to < 0 || to >= pages || to === safePage) return;
    setDir(to > safePage ? "next" : "prev");
    setPage(to);
  };

  // close the calendar with Escape and keep the page from scrolling behind it
  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [full]);

  const fmt = (d: Date, o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-GB", { ...o, timeZone: tz }).format(d);
  const dateLine = (d: Date) =>
    fmt(d, { weekday: "short", day: "numeric", month: "long" });
  const timeLine = (f: FestivalDay) => {
    const t = f.timing;
    if (!t) return f.note;
    const at = t.withDate
      ? `${fmt(t.at, { weekday: "short", day: "numeric", month: "short" })}, ${timeIn(t.at, tz)}`
      : timeIn(t.at, tz);
    return `${t.label} ${at}${t.to ? ` – ${timeIn(t.to, tz)}` : ""}`;
  };

  /* ---------- today's hours ---------- */
  const timings = p ? dayTimings(p.sunrise, p.sunset, tz) : [];
  const now = p?.date.getTime() ?? 0;
  const current = timings.find(
    (t) => t.end > t.start && now >= t.start.getTime() && now < t.end.getTime()
  );
  const next = timings.find((t) => t.start.getTime() > now);
  const clear = (() => {
    if (!p) return null;
    const avoid = timings
      .filter((t) => ["rahu", "yama", "gulika"].includes(t.key))
      .sort((a, b) => a.start.getTime() - b.start.getTime());
    let from = p.sunrise.getTime();
    let best = { start: from, end: from };
    for (const t of [...avoid, { start: p.sunset, end: p.sunset }]) {
      const to = t.start.getTime();
      if (to - from > best.end - best.start) best = { start: from, end: to };
      from = Math.max(from, t.end.getTime());
    }
    return best;
  })();

  const round =
    "grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-ink transition hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-35";

  /* calendar grouped by month */
  const calendar = festivals
    .filter((f) => calFilter === "all" || f.kind === calFilter)
    .reduce<Record<string, FestivalDay[]>>((acc, f) => {
      const k = fmt(f.date, { month: "long", year: "numeric" });
      (acc[k] ??= []).push(f);
      return acc;
    }, {});

  return (
    <section className="relative overflow-hidden border-b border-line bg-card py-20 lg:py-24">
      {/* faint jaali, fading out from the top-left */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_0%_0%,black,transparent_55%)]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'><g fill='none' stroke='%23b8892f' stroke-opacity='0.22' stroke-width='0.8'><path d='M28 4 L34 22 L52 28 L34 34 L28 52 L22 34 L4 28 L22 22 Z'/><rect x='18' y='18' width='20' height='20' transform='rotate(45 28 28)'/><circle cx='28' cy='28' r='5'/></g></svg>\")",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7a2a45]">
              The days ahead
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              Festivals and important timings
            </h2>
          </div>
          <p className="text-ink-2">
            For{" "}
            <span className="border-b border-ink/60 pb-0.5 font-semibold text-ink">
              {p?.city.name ?? "your city"}
            </span>
            , in local time.
          </p>
        </div>

        {/* ---------- paged grid ---------- */}
        <div
          className="mt-10 outline-none"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Festivals ahead, page ${safePage + 1} of ${pages}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(safePage + 1);
            if (e.key === "ArrowLeft") go(safePage - 1);
          }}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go(safePage + (dx < 0 ? 1 : -1));
            touch.current = null;
          }}
        >
          <ol
            key={`${safePage}-${dayKey}`}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {cards.length === 0 &&
              Array.from({ length: PER_PAGE }, (_, i) => (
                <li
                  key={i}
                  className="h-[184px] animate-pulse rounded-[22px] bg-sand/60"
                />
              ))}
            {cards.map((f, i) => {
              const n = daysBetween(p!.date, f.date, tz);
              const lead = safePage === 0 && i === 0;
              return (
                <li
                  key={`${f.name}-${f.date.getTime()}`}
                  className={dir === "next" ? "fest-in-next" : "fest-in-prev"}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <article
                    className={`group relative h-full overflow-hidden rounded-[22px] border p-7 transition duration-500 hover:-translate-y-1.5 ${
                      lead
                        ? "border-gold/50 bg-[linear-gradient(135deg,#4f1d44_0%,#2a1236_55%,#1c1844_100%)] text-paper shadow-[0_30px_60px_-30px_rgba(79,29,68,0.75)]"
                        : "border-gold/40 bg-paper hover:border-gold hover:shadow-[0_30px_60px_-35px_rgba(28,24,68,0.45)]"
                    }`}
                  >
                    {lead && (
                      <>
                        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-bright/20 blur-3xl" />
                        <Diya className="absolute right-5 top-4 h-11 w-11" />
                      </>
                    )}
                    <p
                      className={`relative text-xs font-semibold uppercase tracking-[0.22em] ${lead ? "text-gold-bright" : "text-[#7a2a45]"}`}
                    >
                      {when(n)}
                    </p>
                    <h3
                      className={`relative mt-2 pr-10 font-display text-[1.7rem] font-medium leading-tight ${lead ? "" : "text-ink"}`}
                    >
                      {f.name}
                    </h3>
                    <p
                      className={`relative mt-1.5 ${lead ? "text-paper/75" : "text-ink-2"}`}
                    >
                      {dateLine(f.date)}
                    </p>
                    <p
                      className={`relative mt-5 font-semibold ${lead ? "text-gold-soft" : "text-gold-deep"}`}
                    >
                      {timeLine(f)}
                    </p>
                    {/* gold underline that draws in on hover */}
                    <span
                      className={`absolute bottom-0 left-7 right-7 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${lead ? "bg-gold-bright" : "bg-gold"}`}
                    />
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ---------- pager ---------- */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => go(safePage - 1)}
              disabled={safePage === 0}
              className={round}
              aria-label="Previous festivals"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Pages"
            >
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === safePage}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => go(i)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${i === safePage ? "w-10 bg-gold" : "w-2.5 bg-gold/30 hover:bg-gold/60"}`}
                />
              ))}
            </div>
            <p className="text-ink-2" aria-live="polite">
              {ahead.length
                ? `${safePage * PER_PAGE + 1} to ${safePage * PER_PAGE + cards.length} of the next ${ahead.length}`
                : " "}
            </p>
            <button
              type="button"
              onClick={() => go(safePage + 1)}
              disabled={safePage >= pages - 1}
              className={round}
              aria-label="Next festivals"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setFull(true)}
            className="group flex items-center gap-3 rounded-full border border-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-ink hover:text-paper"
          >
            The full calendar
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>

        {/* ---------- today's hours ---------- */}
        <div className="mt-20 border-t border-line pt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7a2a45]">
                Today
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
                Hours to keep, hours to let pass
              </h3>
            </div>
            <div className="flex gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-3">
              {(["keep", "avoid", "sun"] as const).map((k) => (
                <span key={k} className="flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${TONE[k].dot}`} />
                  {TONE[k].label}
                </span>
              ))}
            </div>
          </div>

          <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {timings.length === 0 &&
              Array.from({ length: 7 }, (_, i) => (
                <li
                  key={i}
                  className="h-36 animate-pulse rounded-2xl bg-sand/60"
                />
              ))}
            {timings.map((t) => {
              const instant = t.start.getTime() === t.end.getTime();
              const past =
                (instant ? t.start.getTime() : t.end.getTime()) <= now;
              const isNow = current?.key === t.key;
              const isNext = next?.key === t.key;
              return (
                <li
                  key={t.key}
                  className={`flex flex-col rounded-2xl border p-4 transition ${isNow ? "border-ink bg-ink text-paper" : "border-gold/30 bg-paper"} ${past && !isNow ? "opacity-50" : ""}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      {isNow && (
                        <span
                          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${TONE[t.tone].dot}`}
                        />
                      )}
                      <span
                        className={`relative h-2 w-2 rounded-full ${TONE[t.tone].dot}`}
                      />
                    </span>
                    <span
                      className={`text-[9px] font-semibold uppercase tracking-[0.2em] ${isNow ? "text-gold-bright" : "text-ink-3"}`}
                    >
                      {isNow
                        ? `Now · ${span(t.end.getTime() - now)} left`
                        : isNext
                          ? `In ${span(t.start.getTime() - now)}`
                          : past
                            ? "Passed"
                            : TONE[t.tone].label}
                    </span>
                  </span>
                  <p
                    className={`mt-3 font-display text-lg leading-tight ${isNow ? "" : "text-ink"}`}
                  >
                    {t.name}
                  </p>
                  <p
                    className={`mt-1 text-sm font-semibold ${isNow ? "text-gold-soft" : "text-gold-deep"}`}
                  >
                    {timeIn(t.start, tz)}
                    {!instant && (
                      <span className="block font-normal opacity-80">
                        to {timeIn(t.end, tz)}
                      </span>
                    )}
                  </p>
                  <p
                    className={`mt-auto pt-3 text-[11px] leading-snug ${isNow ? "text-paper/60" : "text-ink-3"}`}
                  >
                    {t.note}
                  </p>
                </li>
              );
            })}
          </ol>

          {clear && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-spirit-soft/70 px-6 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-spirit">
                Clearest window today
              </p>
              <p className="font-display text-2xl text-ink">
                {timeIn(new Date(clear.start), tz)} –{" "}
                {timeIn(new Date(clear.end), tz)}
              </p>
              <p className="text-sm text-ink-2">
                {span(clear.end - clear.start)} of daylight free of Rahu Kaal,
                Yamaganda and Gulika.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ---------- full calendar ---------- */}
      {full && (
        <div
          className="fixed inset-0 z-[60] flex justify-end bg-ink/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="The full calendar"
          onClick={() => setFull(false)}
        >
          <div
            className="rise flex h-full w-full max-w-xl flex-col bg-paper shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-7 py-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#7a2a45]">
                  The full calendar
                </p>
                <p className="mt-2 font-display text-3xl text-ink">
                  The next six months
                </p>
                <p className="mt-1 text-sm text-ink-3">
                  For {p?.city.name}, in local time.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFull(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:border-ink"
                aria-label="Close the calendar"
                autoFocus
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-1 border-b border-line px-7 py-3">
              {(
                [
                  ["all", "All"],
                  ["festival", "Festivals"],
                  ["vrat", "Vrat days"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setCalFilter(k)}
                  aria-pressed={calFilter === k}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${calFilter === k ? "bg-ink text-paper" : "text-ink-2 hover:bg-sand"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto px-7 py-6">
              {Object.entries(calendar).map(([month, items]) => (
                <div key={month} className="mb-8">
                  <p className="sticky top-0 bg-paper py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                    {month}
                  </p>
                  <ol className="divide-y divide-line">
                    {items.map((f) => (
                      <li
                        key={`${f.name}-${f.date.getTime()}`}
                        className="flex gap-4 py-3.5"
                      >
                        <div
                          className={`w-12 shrink-0 rounded-xl py-1 text-center ${f.kind === "festival" ? "bg-ink text-paper" : "bg-sand text-ink"}`}
                        >
                          <p className="font-display text-xl leading-tight">
                            {fmt(f.date, { day: "numeric" })}
                          </p>
                          <p className="text-[9px] uppercase tracking-[0.12em] opacity-70">
                            {fmt(f.date, { weekday: "short" })}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-lg text-ink">
                            {f.name}
                          </p>
                          <p className="text-sm font-semibold text-gold-deep">
                            {timeLine(f)}
                          </p>
                          <p className="text-xs text-ink-3">
                            {f.month} · {f.tithi}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

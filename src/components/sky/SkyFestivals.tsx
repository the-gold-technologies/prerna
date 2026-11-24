"use client";

import React, { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { timeIn, type Panchang } from "@/lib/sky";
import { upcomingFestivals, type FestivalDay } from "@/lib/festivals";

const PER_PAGE = 6;
const AHEAD = 18;

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

/* Festivals and important timings: a paged grid of the days ahead. */
export function SkyFestivals({ p }: { p: Panchang | null }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
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

  const round =
    "grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-ink transition hover:border-ink hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-35";

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
                  className="h-[150px] animate-pulse rounded-[20px] bg-sand/60"
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
                    className={`group relative h-full overflow-hidden rounded-[20px] border p-5 transition duration-500 hover:-translate-y-1 sm:p-6 ${
                      lead
                        ? "border-gold/50 bg-[linear-gradient(135deg,#4f1d44_0%,#2a1236_55%,#1c1844_100%)] text-paper shadow-[0_30px_60px_-30px_rgba(79,29,68,0.75)]"
                        : "border-gold/40 bg-paper hover:border-gold hover:shadow-[0_20px_40px_-25px_rgba(28,24,68,0.35)]"
                    }`}
                  >
                    {lead && (
                      <>
                        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold-bright/20 blur-3xl" />
                        <Diya className="absolute right-4 top-4 h-9 w-9" />
                      </>
                    )}
                    <p
                      className={`relative text-[11px] font-semibold uppercase tracking-[0.22em] ${lead ? "text-gold-bright" : "text-[#7a2a45]"}`}
                    >
                      {when(n)}
                    </p>
                    <h3
                      className={`relative mt-1.5 pr-8 font-display text-xl font-medium leading-snug sm:text-[1.35rem] ${lead ? "" : "text-ink"}`}
                    >
                      {f.name}
                    </h3>
                    <p
                      className={`relative mt-1 text-sm ${lead ? "text-paper/75" : "text-ink-2"}`}
                    >
                      {dateLine(f.date)}
                    </p>
                    <p
                      className={`relative mt-3.5 text-sm font-semibold ${lead ? "text-gold-soft" : "text-gold-deep"}`}
                    >
                      {timeLine(f)}
                    </p>
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
              className={`${round} cursor-pointer`}
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
                  className={`h-2.5 cursor-pointer rounded-full transition-all duration-500 ${i === safePage ? "w-10 bg-gold" : "w-2.5 bg-gold/30 hover:bg-gold/60"}`}
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
              className={`${round} cursor-pointer`}
              aria-label="Next festivals"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import VedicChakra, { Sparkle } from "../home/VedicChakra";
import { Yantra } from "./Yantra";
import { ELEMENTS, ORDER, type El } from "./quizData";

const CONFETTI: Record<El, string[]> = {
  fire: ["#e8875a", "#f4b38a", "#d6ac52"],
  earth: ["#d6ac52", "#e8d3a2", "#b8892f"],
  air: ["#a99be0", "#d8d0f5", "#d6ac52"],
  water: ["#7fb2d6", "#c4def0", "#d6ac52"],
};

/* Brief ritual pause while the elements "align" before the result shows */
export function QuizRevealing() {
  return (
    <div className="rise text-center" role="status" aria-live="polite">
      <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
        <VedicChakra className="absolute inset-0 text-gold-bright opacity-60" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid grid-cols-2 gap-3">
            {ORDER.map((el, i) => (
              <Yantra
                key={el}
                el={el}
                className={`twinkle h-12 w-12 ${ELEMENTS[el].color}`}
                style={{
                  animationDelay: `${i * 0.35}s`,
                  animationDuration: "1.4s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-10 font-display text-3xl italic text-paper sm:text-4xl">
        The elements are aligning…
      </p>
      <p className="mt-3 text-sm uppercase tracking-[0.3em] text-paper/45">
        Reading your answers
      </p>
    </div>
  );
}

const RING_R = 48;
const RING_C = 2 * Math.PI * RING_R;

/* Donut of the four elements, segments grow in once mounted */
function ElementDonut({
  scores,
  total,
  top,
  filled,
}: {
  scores: { el: El; n: number }[];
  total: number;
  top: El;
  filled: boolean;
}) {
  const topPct = Math.round(
    ((scores.find((s) => s.el === top)?.n ?? 0) / total) * 100
  );
  // where each segment starts along the ring
  const starts = scores.map((_, i) =>
    scores.slice(0, i).reduce((sum, s) => sum + (s.n / total) * RING_C, 0)
  );
  return (
    <div className="relative mx-auto h-48 w-48">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={RING_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-paper/[0.07]"
        />
        {scores.map((s, i) => {
          const len = (s.n / total) * RING_C;
          const seg = Math.max(len - 3, 0); // small gap between segments
          const start = starts[i];
          if (!s.n) return null;
          return (
            <circle
              key={s.el}
              cx="60"
              cy="60"
              r={RING_R}
              fill="none"
              stroke="currentColor"
              strokeWidth={s.el === top ? 12 : 9}
              strokeLinecap="round"
              strokeDasharray={`${filled ? seg : 0} ${RING_C}`}
              strokeDashoffset={-start}
              className={`${ELEMENTS[s.el].color} transition-[stroke-dasharray] duration-1000 ease-out`}
              style={{ transitionDelay: `${i * 150}ms` }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-4xl leading-none text-paper">
            {topPct}%
          </p>
          <p className="mx-auto mt-1.5 max-w-[6.5rem] text-[9px] font-semibold uppercase leading-snug tracking-[0.18em] text-paper/50">
            Primary Resonance
          </p>
        </div>
      </div>
    </div>
  );
}

/* The result's centrepiece: the guiding yantra draws itself, the other
   three elements orbit around it */
function ResultMandala({ top }: { top: El }) {
  const result = ELEMENTS[top];
  const others = ORDER.filter((el) => el !== top);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px]">
      <VedicChakra className="absolute inset-0 h-full w-full text-gold-bright opacity-25" />
      <div
        className="orb-pulse absolute inset-[14%] rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${result.glow}, transparent 70%)`,
        }}
      />

      {/* outer orbit with the three other elements */}
      <div className="spin-slow absolute inset-[8%] rounded-full border border-dashed border-paper/15">
        {others.map((el, i) => {
          const a = ((i * 120 + 60) * Math.PI) / 180;
          return (
            <div
              key={el}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${(50 + 50 * Math.sin(a)).toFixed(3)}%`,
                top: `${(50 - 50 * Math.cos(a)).toFixed(3)}%`,
              }}
            >
              <div className="orbit-upright grid h-11 w-11 place-items-center rounded-full bg-ink/90 ring-1 ring-paper/15 sm:h-14 sm:w-14">
                <Yantra
                  el={el}
                  className={`h-8 w-8 opacity-60 sm:h-10 sm:w-10 ${ELEMENTS[el].color}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* inner ring with a travelling light */}
      <div className="spin-mid absolute inset-[19%] rounded-full border border-gold/30">
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-bright shadow-[0_0_14px_rgba(214,172,82,0.9)]" />
      </div>

      {/* the guiding yantra */}
      <div className="absolute inset-[24%]">
        <Yantra
          el={top}
          className={`yantra-draw h-full w-full ${result.color} drop-shadow-[0_0_30px_currentColor]`}
        />
      </div>

      <Sparkle className="twinkle absolute right-[8%] top-[6%] h-5 w-5 text-gold-bright" />
      <Sparkle
        className="twinkle absolute bottom-[8%] left-[6%] h-3.5 w-3.5 text-paper/70"
        style={{ animationDelay: "1.4s" }}
      />
    </div>
  );
}

const card =
  "rounded-[28px] border border-paper/12 bg-paper/[0.035] p-6 backdrop-blur-md shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] sm:p-7";
const label =
  "text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-bright";

export function QuizResult({
  top,
  scores,
  total,
  onReset,
}: {
  top: El;
  scores: { el: El; n: number }[];
  total: number;
  onReset: () => void;
}) {
  const { openBooking } = useBooking();
  const result = ELEMENTS[top];
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 600);
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduce) {
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          startVelocity: 35,
          origin: { y: 0.5 },
          shapes: ["star"],
          colors: CONFETTI[top],
        });
      } catch {}
    }
    return () => clearTimeout(t);
  }, [top]);

  // Clean shadow text without repetitive prefixes
  const shadowText = result.shadow.replace(/^When out of balance,\s*/i, "");

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Revelation: mandala + identity */}
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="rise">
          <ResultMandala top={top} />
        </div>

        <div
          className="rise text-center lg:text-left"
          style={{ animationDelay: "200ms" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-gold-bright" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright">
              Your Guiding Element
            </span>
          </div>

          <p className="mt-5 font-display text-7xl font-light leading-none text-paper sm:text-8xl">
            {result.sa}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.3em] lg:justify-start">
            <span className={`font-semibold ${result.color}`}>
              {result.en} Element
            </span>
            <span className="text-paper/25">✦</span>
            <span className="text-paper/50">{result.signs}</span>
          </div>

          <div className="gold-rule mx-auto mt-8 max-w-md lg:mx-0" />

          <h1 className="mt-8 font-display text-3xl font-light leading-[1.15] text-paper sm:text-5xl">
            {result.essence}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg lg:mx-0">
            {result.about}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={() => openBooking()}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-paper px-8 py-4 font-semibold text-ink shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:bg-dawn hover:shadow-[0_0_40px_rgba(214,172,82,0.4)]"
            >
              Explore it in a personal reading
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <Link
              href="/free-tools"
              className="cursor-pointer rounded-full border border-paper/25 px-6 py-4 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper/5"
            >
              More free tools
            </Link>
          </div>
        </div>
      </div>

      {/* Reading cards */}
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-6">
        {/* Constitution donut */}
        <div
          className={`rise ${card} lg:col-span-4`}
          style={{ animationDelay: "350ms" }}
        >
          <p className={label}>Elemental Constitution</p>
          <div className="mt-6">
            <ElementDonut
              scores={scores}
              total={total}
              top={top}
              filled={filled}
            />
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-2">
            {scores.map((s) => (
              <li
                key={s.el}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs ${
                  s.el === top ? "bg-paper/[0.07]" : ""
                }`}
              >
                <Yantra
                  el={s.el}
                  className={`h-4 w-4 shrink-0 ${ELEMENTS[s.el].color}`}
                />
                <span
                  className={
                    s.el === top ? "font-semibold text-paper" : "text-paper/60"
                  }
                >
                  {ELEMENTS[s.el].sa}
                </span>
                <span className="ml-auto font-mono text-paper/45">
                  {Math.round((s.n / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Strengths */}
        <div
          className={`rise ${card} lg:col-span-4`}
          style={{ animationDelay: "450ms" }}
        >
          <p className={label}>Your Strengths</p>
          <ol className="mt-6 space-y-3">
            {result.strengths.map((s, i) => (
              <li
                key={s}
                className="group flex items-center gap-4 rounded-2xl border border-paper/10 bg-paper/[0.03] p-4 transition hover:border-gold/40 hover:bg-paper/[0.06]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-lg text-gold-bright transition group-hover:bg-gold group-hover:text-ink">
                  {i + 1}
                </span>
                <span className="font-display text-xl leading-snug text-paper/90">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Balance: shadow vs practice */}
        <div
          className="rise flex flex-col overflow-hidden rounded-[28px] border border-paper/12 backdrop-blur-md shadow-[0_20px_60px_-25px_rgba(0,0,0,0.6)] md:col-span-2 lg:col-span-4"
          style={{ animationDelay: "550ms" }}
        >
          <div className="flex-1 bg-paper/[0.035] p-6 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-dawn" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-dawn">
                When in Excess (Shadow Pattern)
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-paper/80 sm:text-base">
              {shadowText.charAt(0).toUpperCase() + shadowText.slice(1)}
            </p>
          </div>

          {/* divider with a balance mark */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent">
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/50 bg-ink">
              <Yantra el={top} className={`h-6 w-6 ${result.color}`} />
            </span>
          </div>

          <div className="flex-1 bg-gradient-to-br from-gold/20 via-gold/[0.07] to-transparent p-6 sm:p-7">
            <div className="flex items-center gap-2 text-gold-bright">
              <Sparkles className="h-4 w-4" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em]">
                Sacred Daily Practice
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-paper sm:text-base">
              {result.practice}
            </p>
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="rise mt-10 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-6 sm:flex-row">
        <button
          onClick={onReset}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-paper/15 px-5 py-3 text-sm text-paper/70 transition hover:border-paper/40 hover:text-paper"
        >
          <RotateCcw className="h-4 w-4" /> Retake quiz
        </button>
        <p className="text-center text-xs text-paper/40 sm:text-right">
          A reflective Vedic archetypal profile.
          <br className="hidden sm:inline" /> Your full birth chart maps your
          exact planetary balance.
        </p>
      </div>
    </div>
  );
}

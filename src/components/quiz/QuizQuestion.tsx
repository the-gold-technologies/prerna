"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Sparkle } from "../home/VedicChakra";
import type { El } from "./quizData";
import { QUESTIONS } from "./quizData";

/* The seven classical grahas: one presides over each question.
   U+FE0E forces text (not emoji) presentation of the glyphs. */
const GRAHAS: { sa: string; en: string; glyph: string }[] = [
  { sa: "Surya", en: "Sun", glyph: "☉︎" },
  { sa: "Chandra", en: "Moon", glyph: "☽︎" },
  { sa: "Mangala", en: "Mars", glyph: "♂︎" },
  { sa: "Budha", en: "Mercury", glyph: "☿︎" },
  { sa: "Guru", en: "Jupiter", glyph: "♃︎" },
  { sa: "Shukra", en: "Venus", glyph: "♀︎" },
  { sa: "Shani", en: "Saturn", glyph: "♄︎" },
];

/* Directions for the sparkles that burst out of a chosen answer */
const BURST = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2;
  const r = 70 + (i % 3) * 22;
  return {
    dx: `${Math.round(Math.cos(a) * r)}px`,
    dy: `${Math.round(Math.sin(a) * r * 0.6)}px`,
    size: 8 + (i % 3) * 4,
  };
});

/* Progress as a constellation: answered stars glow and are joined by lines */
export function Constellation({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <div
      className="flex items-center"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={step + 1}
      aria-label={`Question ${step + 1} of ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="relative h-px flex-1 bg-paper/10">
              {i <= step && (
                <span className="line-grow absolute inset-0 bg-gradient-to-r from-gold-bright/80 to-gold-bright/40" />
              )}
            </span>
          )}
          <span className="relative grid h-6 w-6 shrink-0 place-items-center">
            {i < step && (
              <Sparkle className="h-4 w-4 text-gold-bright drop-shadow-[0_0_6px_rgba(214,172,82,0.9)]" />
            )}
            {i === step && (
              <span className="glow-pulse h-3 w-3 rounded-full bg-gold-bright" />
            )}
            {i > step && (
              <span className="h-1.5 w-1.5 rounded-full bg-paper/30" />
            )}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export function QuizQuestion({
  step,
  total,
  currentAnswer,
  picked,
  onChoose,
  onBack,
}: {
  step: number;
  total: number;
  currentAnswer?: El;
  /** Index of the answer just chosen, while its animation plays */
  picked: number | null;
  onChoose: (el: El, index: number) => void;
  onBack: () => void;
}) {
  const currentQ = QUESTIONS[step];
  const graha = GRAHAS[step % GRAHAS.length];
  const locked = picked !== null;

  return (
    <div>
      <Constellation step={step} total={total} />

      <div
        key={step}
        className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
      >
        <div className="rise">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-paper/45">
            Question {step + 1} of {total}
          </p>

          <p className="mt-4 font-display text-[7rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(214,172,82,0.7)] sm:text-[9rem]">
            {String(step + 1).padStart(2, "0")}
          </p>

          {/* Presiding graha: placed on the bottom of 1 and top of the question */}
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-gold/35 bg-paper/[0.04] py-1.5 pl-2.5 pr-4 backdrop-blur">
            <span className="relative grid h-7 w-7 place-items-center">
              <span className="spin-mid absolute inset-0 rounded-full border border-dashed border-gold/50" />
              <span className="font-display text-base leading-none text-gold-bright">
                {graha.glyph}
              </span>
            </span>
            <span className="text-left">
              <span className="font-display text-base text-paper">
                {graha.sa}
              </span>
              <span className="ml-2 text-[10px] uppercase tracking-[0.22em] text-gold-bright/80">
                · {graha.en} presides
              </span>
            </span>
          </div>

          <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
            {currentQ.q}
          </h2>
          {step > 0 && (
            <button
              onClick={onBack}
              disabled={locked}
              className="mt-8 flex cursor-pointer items-center gap-2 text-sm text-paper/55 transition hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          )}
        </div>

        <ol className="space-y-3 self-center">
          {currentQ.a.map(([label, el], i) => {
            const isPicked = picked === i;
            const wasChosen = !locked && currentAnswer === el;
            return (
              <li
                key={label}
                className="rise"
                style={{ animationDelay: `${120 + i * 80}ms` }}
              >
                <button
                  onClick={() => onChoose(el, i)}
                  disabled={locked}
                  className={`group relative flex w-full cursor-pointer items-center gap-5 overflow-hidden rounded-2xl border px-5 py-5 text-left backdrop-blur transition duration-300 disabled:cursor-not-allowed sm:px-6 ${
                    isPicked
                      ? "scale-[1.02] border-gold-bright bg-gold/20 shadow-[0_0_50px_rgba(214,172,82,0.35)]"
                      : wasChosen
                        ? "border-gold/60 bg-paper/[0.07]"
                        : "border-paper/12 bg-paper/[0.03] hover:-translate-y-0.5 hover:border-gold/50 hover:bg-paper/[0.06]"
                  } ${locked && !isPicked ? "opacity-40" : ""}`}
                >
                  {/* golden shimmer sweep on hover */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold-bright/15 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

                  <span
                    className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-lg transition ${
                      isPicked
                        ? "border-gold-bright bg-gold-bright text-ink"
                        : "border-gold/50 text-gold-bright group-hover:bg-gold group-hover:text-ink"
                    }`}
                  >
                    {"ABCD"[i]}
                  </span>
                  <span className="relative flex-1 font-display text-2xl text-paper/90 sm:text-[1.6rem]">
                    {label}
                  </span>
                  <ArrowRight
                    className={`relative h-5 w-5 transition ${
                      isPicked
                        ? "translate-x-1 text-gold-bright"
                        : "text-paper/30 group-hover:translate-x-1 group-hover:text-gold-bright"
                    }`}
                  />

                  {isPicked &&
                    BURST.map((b, k) => (
                      <Sparkle
                        key={k}
                        className="burst pointer-events-none absolute left-[2.6rem] top-1/2 text-gold-bright"
                        style={
                          {
                            width: b.size,
                            height: b.size,
                            "--dx": b.dx,
                            "--dy": b.dy,
                            animationDelay: `${(k % 4) * 30}ms`,
                          } as React.CSSProperties
                        }
                      />
                    ))}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

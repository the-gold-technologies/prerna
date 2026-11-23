"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { Yantra } from "./Yantra";
import { ELEMENTS, type El } from "./quizData";

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

  return (
    <div className="rise grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="text-center">
        <Yantra
          el={top}
          className={`mx-auto h-64 w-64 sm:h-80 sm:w-80 ${result.color} drop-shadow-[0_0_40px_currentColor]`}
        />
        <p className="mt-6 font-display text-7xl text-paper sm:text-8xl">
          {result.sa}
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.35em] text-paper/55">
          {result.en} · {result.signs}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
          Your guiding element
        </p>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          {result.essence}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-paper/75">
          {result.about}
        </p>

        <div className="mt-8 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-paper/45">
              Your strengths
            </p>
            <ul className="mt-3 space-y-2">
              {result.strengths.map((s) => (
                <li key={s} className="flex gap-2 text-paper/85">
                  <span className="text-gold-bright">✦</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-paper/45">
              Your mix
            </p>
            <ul className="mt-3 space-y-2.5">
              {scores.map((s) => (
                <li key={s.el} className="flex items-center gap-3 text-sm">
                  <span className="w-16 text-paper/70">
                    {ELEMENTS[s.el].sa}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper/10">
                    <span
                      className="block h-full rounded-full bg-gold-bright transition-all duration-700"
                      style={{ width: `${(s.n / total) * 100}%` }}
                    />
                  </span>
                  <span className="w-8 text-right text-paper/50">
                    {Math.round((s.n / total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 space-y-4 border-t border-paper/15 pt-8 text-paper/75">
          <p>
            <span className="font-semibold text-paper">
              When out of balance.{" "}
            </span>
            {result.shadow}
          </p>
          <p>
            <span className="font-semibold text-paper">
              A practice for you.{" "}
            </span>
            {result.practice}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => openBooking()}
            className="group flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-semibold text-ink transition hover:bg-dawn"
          >
            Explore it in a reading
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <Link
            href="/free-tools"
            className="rounded-full border border-paper/25 px-7 py-4 font-semibold transition hover:border-paper"
          >
            More free tools
          </Link>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-4 text-sm text-paper/55 transition hover:text-paper"
          >
            <RotateCcw className="h-4 w-4" /> Retake
          </button>
        </div>
        <p className="mt-6 text-xs text-paper/40">
          A reflective quiz for self-discovery, not a diagnosis. Your birth
          chart shows your full elemental balance.
        </p>
      </div>
    </div>
  );
}

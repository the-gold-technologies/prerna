"use client";

import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { El } from "./quizData";
import { QUESTIONS } from "./quizData";

export function QuizQuestion({
  step,
  total,
  currentAnswer,
  onChoose,
  onBack,
}: {
  step: number;
  total: number;
  currentAnswer?: El;
  onChoose: (el: El) => void;
  onBack: () => void;
}) {
  const currentQ = QUESTIONS[step];

  return (
    <div
      key={step}
      className="rise grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
    >
      <div>
        <p className="font-display text-[7rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(214,172,82,0.7)] sm:text-[10rem]">
          {String(step + 1).padStart(2, "0")}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-paper/45">
          Question {step + 1} of {total}
        </p>
        <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
          {currentQ.q}
        </h2>
        {step > 0 && (
          <button
            onClick={onBack}
            className="mt-8 flex items-center gap-2 text-sm text-paper/55 transition hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        )}
      </div>
      <ol className="self-center border-t border-paper/15">
        {currentQ.a.map(([label, el], i) => (
          <li key={label}>
            <button
              onClick={() => onChoose(el)}
              className={`group flex w-full items-center gap-6 border-b border-paper/15 py-6 text-left transition hover:bg-paper/[0.04] hover:pl-3 ${currentAnswer === el ? "bg-paper/[0.06] pl-3" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/50 font-display text-lg text-gold-bright transition group-hover:bg-gold group-hover:text-ink">
                {"ABCD"[i]}
              </span>
              <span className="flex-1 font-display text-2xl text-paper/90 sm:text-[1.7rem]">
                {label}
              </span>
              <ArrowRight className="h-5 w-5 text-paper/30 transition group-hover:translate-x-1 group-hover:text-gold-bright" />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

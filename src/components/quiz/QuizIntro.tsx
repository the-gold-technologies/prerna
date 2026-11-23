"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Yantra } from "./Yantra";
import { ELEMENTS, ORDER } from "./quizData";

export function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="rise text-center">
      <div className="relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
        <div className="spin-slow absolute inset-0">
          {ORDER.map((el, i) => (
            <div
              key={el}
              className="absolute h-20 w-20"
              style={
                [
                  { left: "calc(50% - 2.5rem)", top: "-1rem" },
                  { right: "-1rem", top: "calc(50% - 2.5rem)" },
                  { left: "calc(50% - 2.5rem)", bottom: "-1rem" },
                  { left: "-1rem", top: "calc(50% - 2.5rem)" },
                ][i]
              }
            >
              <Yantra
                el={el}
                className={`h-full w-full ${ELEMENTS[el].color}`}
              />
            </div>
          ))}
        </div>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl text-gold-bright">
          ॐ
        </span>
      </div>
      <p className="mt-12 text-xs font-semibold uppercase tracking-[0.35em] text-gold-bright">
        Self-discovery quiz · the elements
      </p>
      <h1 className="mx-auto mt-5 max-w-3xl font-display text-5xl font-light leading-[1.05] sm:text-7xl">
        Which element <em className="text-gold-bright">guides you?</em>
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
        In Vedic thought, everything is made of the elements. Seven quick
        questions reveal the one that shapes how you think, feel and act.
      </p>
      <button
        onClick={onStart}
        className="group mx-auto mt-10 flex items-center gap-2 rounded-full bg-paper px-8 py-4 font-semibold text-ink transition hover:bg-dawn"
      >
        Begin the quiz
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </button>
      <p className="mt-5 text-sm text-paper/45">
        7 questions · about 2 minutes · free
      </p>
    </div>
  );
}

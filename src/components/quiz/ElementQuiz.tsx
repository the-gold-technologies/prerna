"use client";

import React, { useState } from "react";
import {
  QuizIntro,
  QuizQuestion,
  QuizResult,
  ORDER,
  QUESTIONS,
  ELEMENTS,
  type El,
} from "./index";

export default function ElementQuiz() {
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 questions, n result
  const [answers, setAnswers] = useState<El[]>([]);
  const n = QUESTIONS.length;

  const choose = (el: El) => {
    const next = [...answers.slice(0, step), el];
    setAnswers(next);
    setStep(step + 1);
  };

  const scores = ORDER.map((el) => ({
    el,
    n: answers.filter((a) => a === el).length,
  }));
  const top = [...scores].sort((a, b) => b.n - a.n)[0]?.el ?? "fire";
  const result = ELEMENTS[top];

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(59,52,136,0.7),transparent_65%)]" />
      {step === n && (
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${result.glow}, transparent 60%)`,
          }}
        />
      )}

      {/* progress */}
      {step >= 0 && step < n && (
        <div className="absolute inset-x-0 top-[72px] h-0.5 bg-paper/10">
          <div
            className="h-full bg-gold-bright transition-all duration-500"
            style={{ width: `${(step / n) * 100}%` }}
          />
        </div>
      )}

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8">
        {step === -1 && <QuizIntro onStart={() => setStep(0)} />}

        {step >= 0 && step < n && (
          <QuizQuestion
            step={step}
            total={n}
            currentAnswer={answers[step]}
            onChoose={choose}
            onBack={() => setStep(step - 1)}
          />
        )}

        {step === n && (
          <QuizResult
            top={top}
            scores={scores}
            total={n}
            onReset={() => {
              setAnswers([]);
              setStep(-1);
            }}
          />
        )}
      </div>
    </section>
  );
}

export { QuizIntro, QuizQuestion, QuizResult };

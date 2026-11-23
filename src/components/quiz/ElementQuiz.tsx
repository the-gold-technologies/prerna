"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import VedicChakra, { Sparkle } from "../home/VedicChakra";
import { QuizIntro } from "./QuizIntro";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResult, QuizRevealing } from "./QuizResult";
import { ORDER, QUESTIONS, ELEMENTS, type El } from "./quizData";

const PICK_MS = 650; // let the chosen answer glow before moving on
const REVEAL_MS = 2400; // the "aligning" pause before the result

/* Deterministic starfield (no Math.random, so SSR and client match) */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: i % 9 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  delay: `${(i % 8) * 0.55}s`,
}));
const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 71 + 5) % 100}%`,
  dur: `${14 + (i % 5) * 4}s`,
  delay: `${(i * 1.7) % 12}s`,
}));

/** `footer` renders only on the intro screen, never once the quiz starts */
export default function ElementQuiz({ footer }: { footer?: ReactNode }) {
  const [step, setStep] = useState(-1); // -1 intro, 0..n-1 questions, n result
  const [answers, setAnswers] = useState<El[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealing, setRevealing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prevStep = useRef(step);
  const n = QUESTIONS.length;

  // Keep the quiz panel in view as the steps change
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (Math.abs(top) > 8) el.scrollIntoView({ behavior: "smooth" });
  }, [step]);

  // Advance after the pick animation; hold on the reveal before the result
  useEffect(() => {
    if (picked === null) return;
    const t = setTimeout(() => {
      setPicked(null);
      if (step + 1 === n) setRevealing(true);
      setStep(step + 1);
    }, PICK_MS);
    return () => clearTimeout(t);
  }, [picked, step, n]);

  useEffect(() => {
    if (!revealing) return;
    const t = setTimeout(() => setRevealing(false), REVEAL_MS);
    return () => clearTimeout(t);
  }, [revealing]);

  const choose = (el: El, index: number) => {
    if (picked !== null) return;
    setAnswers([...answers.slice(0, step), el]);
    setPicked(index);
  };

  const scores = ORDER.map((el) => ({
    el,
    n: answers.filter((a) => a === el).length,
  }));
  const top = [...scores].sort((a, b) => b.n - a.n)[0]?.el ?? "fire";
  const result = ELEMENTS[top];
  const showResult = step === n && !revealing;

  return (
    <>
      <section
        ref={sectionRef}
        id="quiz"
        className="relative overflow-hidden bg-ink text-paper"
      >
        {/* deep-space glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(59,52,136,0.75),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_90%,rgba(100,69,143,0.35),transparent_50%)]" />

        {/* slowly turning rashi chakra */}
        <VedicChakra className="pointer-events-none absolute -right-[18rem] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 text-gold-bright opacity-[0.08] sm:-right-[14rem]" />

        {/* stars */}
        {STARS.map((s, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="twinkle pointer-events-none absolute rounded-full bg-paper"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
          />
        ))}
        <Sparkle className="twinkle pointer-events-none absolute left-[8%] top-[14%] h-4 w-4 text-gold-bright" />
        <Sparkle
          className="twinkle pointer-events-none absolute right-[12%] bottom-[18%] h-3 w-3 text-gold-bright"
          style={{ animationDelay: "2s" }}
        />

        {/* rising motes, like incense embers */}
        {MOTES.map((m, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="drift-up pointer-events-none absolute bottom-0 h-1 w-1 rounded-full bg-gold-bright/70 blur-[1px]"
            style={{
              left: m.left,
              animationDuration: m.dur,
              animationDelay: m.delay,
            }}
          />
        ))}

        {/* shooting stars */}
        <div
          className="pointer-events-none absolute left-[70%] top-[12%] rotate-[150deg]"
          aria-hidden="true"
        >
          <span className="shooting-star" />
        </div>
        <div
          className="pointer-events-none absolute left-[30%] top-[6%] rotate-[160deg]"
          aria-hidden="true"
        >
          <span className="shooting-star" style={{ animationDelay: "6s" }} />
        </div>

        {/* result aura in the element's colour */}
        {showResult && (
          <div
            className="orb-pulse pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${result.glow}, transparent 60%)`,
            }}
          />
        )}

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8">
          {step === -1 && <QuizIntro onStart={() => setStep(0)} />}

          {step >= 0 && step < n && (
            <QuizQuestion
              step={step}
              total={n}
              currentAnswer={answers[step]}
              picked={picked}
              onChoose={choose}
              onBack={() => setStep(step - 1)}
            />
          )}

          {step === n && revealing && <QuizRevealing />}

          {showResult && (
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

      {step === -1 && footer}
    </>
  );
}

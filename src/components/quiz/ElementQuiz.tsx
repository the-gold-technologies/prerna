"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useBooking } from "../home/BookingProvider";

type El = "fire" | "earth" | "air" | "water";

/* ---------- Tattva yantras: the traditional shapes of the elements ---------- */
export function Yantra({ el, className = "" }: { el: El; className?: string }) {
  const stroke = { strokeWidth: 1.6, fill: "none", stroke: "currentColor" };
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" {...stroke} strokeOpacity="0.35" />
      <circle
        cx="50"
        cy="50"
        r="42"
        {...stroke}
        strokeOpacity="0.25"
        strokeDasharray="1 4"
      />
      {el === "fire" && (
        <path
          d="M50 18 L82 74 L18 74 Z"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      )}
      {el === "earth" && (
        <rect
          x="24"
          y="24"
          width="52"
          height="52"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      )}
      {el === "air" && (
        <>
          <circle
            cx="50"
            cy="50"
            r="27"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M50 27 L70 62 L30 62 Z M50 73 L30 38 L70 38 Z"
            {...stroke}
            strokeOpacity="0.7"
          />
        </>
      )}
      {el === "water" && (
        <path
          d="M22 40 A28 28 0 0 0 78 40 A28 22 0 0 1 22 40 Z"
          fill="currentColor"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      )}
      <circle cx="50" cy="50" r="2.4" fill="currentColor" />
    </svg>
  );
}

const ELEMENTS: Record<
  El,
  {
    sa: string;
    en: string;
    color: string;
    glow: string;
    essence: string;
    about: string;
    strengths: string[];
    shadow: string;
    practice: string;
    signs: string;
  }
> = {
  fire: {
    sa: "Agni",
    en: "Fire",
    color: "text-[#e8875a]",
    glow: "rgba(232,135,90,0.45)",
    essence: "You are the spark that begins things.",
    about:
      "Agni is the element of transformation, will and light. You move towards life with courage and warmth, and others often catch your energy before they catch your words.",
    strengths: [
      "Courage and initiative",
      "Warmth that inspires others",
      "Quick, decisive action",
    ],
    shadow:
      "When out of balance, fire can burn too fast: impatience, irritation or exhaustion after a burst of effort.",
    practice:
      "Cool, slow breathing and time near water help your fire glow steadily instead of flaring.",
    signs: "Aries · Leo · Sagittarius",
  },
  earth: {
    sa: "Prithvi",
    en: "Earth",
    color: "text-[#d6ac52]",
    glow: "rgba(214,172,82,0.45)",
    essence: "You are the ground others stand on.",
    about:
      "Prithvi is the element of stability, patience and form. You build things that last, and your steadiness is a quiet gift to everyone around you.",
    strengths: [
      "Reliability and patience",
      "Practical wisdom",
      "Loyalty that endures",
    ],
    shadow:
      "When out of balance, earth can become rigid: resisting change or holding on to what no longer serves.",
    practice:
      "Gentle movement, walks somewhere new and small changes to routine keep your earth fertile rather than fixed.",
    signs: "Taurus · Virgo · Capricorn",
  },
  air: {
    sa: "Vayu",
    en: "Air",
    color: "text-[#a99be0]",
    glow: "rgba(169,155,224,0.45)",
    essence: "You are the breath of new ideas.",
    about:
      "Vayu is the element of movement, thought and connection. Your mind travels easily, linking people and ideas, and you bring freshness into any room.",
    strengths: [
      "Curiosity and clear thinking",
      "Ease with people",
      "Openness to change",
    ],
    shadow:
      "When out of balance, air scatters: overthinking, restlessness or difficulty settling into the body.",
    practice:
      "Grounding practices, warm food and a steady daily rhythm help your air move freely without blowing you off course.",
    signs: "Gemini · Libra · Aquarius",
  },
  water: {
    sa: "Jala",
    en: "Water",
    color: "text-[#7fb2d6]",
    glow: "rgba(127,178,214,0.45)",
    essence: "You are the depth that feels everything.",
    about:
      "Jala is the element of feeling, intuition and flow. You sense what others miss, and your empathy creates safety for the people you love.",
    strengths: ["Empathy and intuition", "Emotional depth", "Healing presence"],
    shadow:
      "When out of balance, water floods: absorbing others' moods, or withdrawing when feelings become too much.",
    practice:
      "Clear boundaries, journalling and sunlight help your water stay clear and flowing.",
    signs: "Cancer · Scorpio · Pisces",
  },
};

const QUESTIONS: { q: string; a: [string, El][] }[] = [
  {
    q: "When a big decision arrives, you usually…",
    a: [
      ["Weigh the practical facts carefully", "earth"],
      ["Trust your gut and act quickly", "fire"],
      ["Follow what feels right inside", "water"],
      ["Talk it through and explore every idea", "air"],
    ],
  },
  {
    q: "On a free day, you are happiest…",
    a: [
      ["Exploring a new place or a new conversation", "air"],
      ["With quiet music and the people closest to you", "water"],
      ["Doing something active or adventurous", "fire"],
      ["Cooking, gardening or making your home lovely", "earth"],
    ],
  },
  {
    q: "Under stress, you tend to…",
    a: [
      ["Withdraw and feel everything deeply", "water"],
      ["Dig in and hold on tighter", "earth"],
      ["Overthink and replay it in your mind", "air"],
      ["Get restless, impatient or irritated", "fire"],
    ],
  },
  {
    q: "Friends usually come to you for…",
    a: [
      ["Courage and a push to go for it", "fire"],
      ["A fresh perspective", "air"],
      ["Reliable, practical help", "earth"],
      ["Comfort and understanding", "water"],
    ],
  },
  {
    q: "Which landscape calls to you?",
    a: [
      ["Forests and quiet mountains", "earth"],
      ["The ocean, a river or the sound of rain", "water"],
      ["A desert at sunrise", "fire"],
      ["Open sky on a windy cliff", "air"],
    ],
  },
  {
    q: "What would you most like more of?",
    a: [
      ["Freedom", "air"],
      ["Passion", "fire"],
      ["Connection", "water"],
      ["Security", "earth"],
    ],
  },
  {
    q: "Your quiet gift to the world is…",
    a: [
      ["Compassion", "water"],
      ["Inspiration", "fire"],
      ["Stability", "earth"],
      ["Ideas", "air"],
    ],
  },
];

const ORDER: El[] = ["fire", "earth", "air", "water"];

export default function ElementQuiz() {
  const { openBooking } = useBooking();
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
        {/* ---------- Intro ---------- */}
        {step === -1 && (
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
              onClick={() => setStep(0)}
              className="group mx-auto mt-10 flex items-center gap-2 rounded-full bg-paper px-8 py-4 font-semibold text-ink transition hover:bg-dawn"
            >
              Begin the quiz
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <p className="mt-5 text-sm text-paper/45">
              7 questions · about 2 minutes · free
            </p>
          </div>
        )}

        {/* ---------- Question ---------- */}
        {step >= 0 && step < n && (
          <div
            key={step}
            className="rise grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
          >
            <div>
              <p className="font-display text-[7rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(214,172,82,0.7)] sm:text-[10rem]">
                {String(step + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-paper/45">
                Question {step + 1} of {n}
              </p>
              <h2 className="mt-6 font-display text-4xl leading-tight sm:text-5xl">
                {QUESTIONS[step].q}
              </h2>
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-8 flex items-center gap-2 text-sm text-paper/55 transition hover:text-paper"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
            </div>
            <ol className="self-center border-t border-paper/15">
              {QUESTIONS[step].a.map(([label, el], i) => (
                <li key={label}>
                  <button
                    onClick={() => choose(el)}
                    className={`group flex w-full items-center gap-6 border-b border-paper/15 py-6 text-left transition hover:bg-paper/[0.04] hover:pl-3 ${answers[step] === el ? "bg-paper/[0.06] pl-3" : ""}`}
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
        )}

        {/* ---------- Result ---------- */}
        {step === n && (
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
                      <li
                        key={s.el}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span className="w-16 text-paper/70">
                          {ELEMENTS[s.el].sa}
                        </span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper/10">
                          <span
                            className="block h-full rounded-full bg-gold-bright transition-all duration-700"
                            style={{ width: `${(s.n / n) * 100}%` }}
                          />
                        </span>
                        <span className="w-8 text-right text-paper/50">
                          {Math.round((s.n / n) * 100)}%
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
                  onClick={() => {
                    setAnswers([]);
                    setStep(-1);
                  }}
                  className="flex items-center gap-2 px-3 py-4 text-sm text-paper/55 transition hover:text-paper"
                >
                  <RotateCcw className="h-4 w-4" /> Retake
                </button>
              </div>
              <p className="mt-6 text-xs text-paper/40">
                A reflective quiz for self-discovery, not a diagnosis. Your
                birth chart shows your full elemental balance.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

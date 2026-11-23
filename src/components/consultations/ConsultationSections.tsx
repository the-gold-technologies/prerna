"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import VedicChakra, { Sparkle } from "../home/VedicChakra";
import { LIFE_AREAS } from "@/data/prernaData";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

/* =====================================================================
 * 1. Hero: editorial headline beside a tall portrait
 * ===================================================================== */
export function ConsultHero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-astro-soft/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="rise lg:col-span-7 lg:pt-10">
          <p className={eyebrow}>Consultations & services</p>
          <h1 className="mt-6 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.4rem]">
            Bring a real
            <br />
            <em className="font-normal text-gold-deep">question.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            Career, marriage, money, a child who is struggling, a decision that
            will not settle. Speak one to one with a Vedic astrologer, a
            counsellor or a spiritual practitioner, and leave with a clearer
            next step.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Book a session
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a
              href="#areas"
              className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
            >
              Find your life area
            </a>
          </div>
        </div>

        <div
          className="rise relative lg:col-span-5"
          style={{ animationDelay: "120ms" }}
        >
          <VedicChakra className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[520px] text-gold opacity-30" />
          <div className="arch relative ml-auto aspect-[3/4] w-full max-w-[440px] ring-1 ring-gold/50">
            <Image
              src="/images/counselling.jpg"
              alt="A counsellor listening warmly to a client across a small table by a window"
              fill
              preload
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover object-[22%_50%]"
            />
          </div>
          <div className="absolute -left-2 bottom-2 max-w-[260px] rounded-2xl border border-line bg-paper/95 p-5 shadow-xl backdrop-blur sm:-left-10">
            <p className="font-display text-xl italic leading-snug text-ink">
              &ldquo;Not a prediction. A conversation about you.&rdquo;
            </p>
          </div>
          <Sparkle className="twinkle absolute right-4 top-6 h-6 w-6 text-gold" />
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * 2. Interactive wheel of the ten life areas
 * ===================================================================== */
const C = 200;
const R_OUT = 190;
const R_IN = 92;
const pt = (deg: number, r: number) => {
  const t = ((deg - 90) * Math.PI) / 180;
  return [
    Math.round((C + r * Math.cos(t)) * 100) / 100,
    Math.round((C + r * Math.sin(t)) * 100) / 100,
  ];
};
const slice = (i: number) => {
  const a1 = i * 36 + 1;
  const a2 = (i + 1) * 36 - 1;
  const [x1, y1] = pt(a1, R_OUT);
  const [x2, y2] = pt(a2, R_OUT);
  const [x3, y3] = pt(a2, R_IN);
  const [x4, y4] = pt(a1, R_IN);
  return `M${x1} ${y1} A${R_OUT} ${R_OUT} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${R_IN} ${R_IN} 0 0 0 ${x4} ${y4} Z`;
};

export function LifeWheel() {
  const [active, setActive] = useState(0);
  const { openBooking } = useBooking();
  const a = LIFE_AREAS[active];

  return (
    <section
      id="areas"
      className="relative scroll-mt-16 overflow-hidden bg-ink py-24 text-paper lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(59,52,136,0.6),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
            Ten areas of life
          </p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            Where is your question{" "}
            <em className="text-gold-bright">coming from?</em>
          </h2>
          <p className="mt-4 text-paper/65">
            Turn the wheel. Each area is read through Vedic astrology and
            psychology together.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* wheel */}
          <div className="relative mx-auto w-full max-w-[520px]">
            <svg
              viewBox="0 0 400 400"
              className="w-full"
              role="tablist"
              aria-label="Life areas"
            >
              <circle
                cx={C}
                cy={C}
                r={R_OUT + 6}
                fill="none"
                stroke="#d6ac52"
                strokeOpacity="0.35"
              />
              <circle
                cx={C}
                cy={C}
                r={R_OUT + 12}
                fill="none"
                stroke="#d6ac52"
                strokeOpacity="0.15"
                strokeDasharray="1 5"
              />
              {LIFE_AREAS.map((area, i) => {
                const on = i === active;
                const [lx, ly] = pt(i * 36 + 18, (R_OUT + R_IN) / 2);
                const rot = i * 36 + 18;
                const flip = rot > 90 && rot < 270;
                return (
                  <g
                    key={area.id}
                    role="tab"
                    aria-selected={on}
                    tabIndex={0}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setActive(i);
                    }}
                    className="cursor-pointer outline-none"
                  >
                    <path
                      d={slice(i)}
                      fill={on ? "#d6ac52" : "#ffffff"}
                      fillOpacity={on ? 1 : 0.04}
                      stroke="#d6ac52"
                      strokeOpacity={on ? 1 : 0.4}
                      className="transition-all duration-300 hover:fill-opacity-[0.12]"
                    />
                    <text
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform={`rotate(${flip ? rot + 180 : rot} ${lx} ${ly})`}
                      className="pointer-events-none select-none font-display"
                      fontSize={area.title.length > 12 ? 10.5 : 13}
                      fill={on ? "#1c1844" : "#fffdf8"}
                      fillOpacity={on ? 1 : 0.85}
                    >
                      {area.title.replace("Life Success & Growth", "Success")}
                    </text>
                  </g>
                );
              })}
              <circle
                cx={C}
                cy={C}
                r={R_IN - 8}
                fill="#1c1844"
                stroke="#d6ac52"
                strokeOpacity="0.5"
              />
              <text
                x={C}
                y={C - 8}
                textAnchor="middle"
                className="font-display"
                fontSize="44"
                fill="#f1dcb2"
              >
                {a.number}
              </text>
              <text
                x={C}
                y={C + 22}
                textAnchor="middle"
                fontSize="9"
                letterSpacing="3"
                fill="#fffdf8"
                fillOpacity="0.55"
              >
                OF TEN
              </text>
            </svg>
          </div>

          {/* detail */}
          <div key={a.id} className="rise">
            <p className="text-xs uppercase tracking-[0.3em] text-paper/50">
              {a.number} · {a.tagline}
            </p>
            <h3 className="mt-3 font-display text-5xl sm:text-6xl">
              {a.title}
            </h3>
            <p className="mt-6 border-l-2 border-gold-bright pl-5 font-display text-2xl italic leading-snug text-gold-bright sm:text-[1.7rem]">
              &ldquo;{a.keyTriggerQuestion}&rdquo;
            </p>

            <div className="mt-9 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#a99be0]">
                  Vedic lens
                </p>
                <p className="mt-2 text-sm text-paper/60">
                  {a.vedicInsight.focus}
                </p>
                <ul className="mt-3 space-y-1.5 text-paper/85">
                  {a.vedicInsight.planetaryFactors.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold-bright">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c9a8e8]">
                  Psychology lens
                </p>
                <p className="mt-2 text-sm text-paper/60">
                  {a.psychologyInsight.focus}
                </p>
                <ul className="mt-3 space-y-1.5 text-paper/85">
                  {a.psychologyInsight.therapeuticApproach.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold-bright">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-8 leading-relaxed text-paper/70">
              <span className="font-semibold text-paper">You leave with: </span>
              {a.sampleGuidanceOutcome}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBooking(a.title)}
                className="group flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-semibold text-ink transition hover:bg-dawn"
              >
                Book a {a.title.toLowerCase()} session
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setActive((active + 9) % 10)}
                  aria-label="Previous life area"
                  className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition hover:border-paper"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((active + 1) % 10)}
                  aria-label="Next life area"
                  className="grid h-12 w-12 place-items-center rounded-full border border-paper/25 transition hover:border-paper"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * 3. The three lenses as alternating editorial rows
 * ===================================================================== */
const LENSES = [
  {
    n: "01",
    title: "Vedic Astrology",
    sa: "ज्योतिष",
    text: "Your birth chart read with precision: the timing of your periods, the tendencies of your planets and the choices that suit them.",
    items: [
      "Kundli / birth chart",
      "Compatibility",
      "Life-area analysis",
      "Personalised guidance",
    ],
    img: "/images/night-sky.jpg",
    alt: "A violet night sky full of stars above a mountain ridge",
    tone: "text-astro",
  },
  {
    n: "02",
    title: "Counselling & Therapy",
    sa: "मनस्",
    text: "A calm, confidential space with a trained counsellor to understand feelings and patterns, and to practise new ways through them.",
    items: [
      "Child, adolescent & parent",
      "Emotional wellbeing",
      "Personality development",
      "Couple / relationship",
      "Career",
    ],
    img: "/images/connection.jpg",
    alt: "Two hands reaching towards each other",
    tone: "text-psych",
  },
  {
    n: "03",
    title: "Spiritual Wellness",
    sa: "आत्मा",
    text: "Practices that steady the mind and return you to balance, often matched to the planets most active in your chart.",
    items: [
      "Healing",
      "Elemental insight",
      "Sound",
      "Mindfulness & inner balance",
    ],
    img: "/images/sound-healing.jpg",
    alt: "A woman playing a singing bowl in a calm room",
    tone: "text-spirit",
  },
];

export function LensRows() {
  const { openBooking } = useBooking();
  return (
    <section className="py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className={eyebrow}>Three lenses</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-6xl">
            Choose one.{" "}
            <em className="text-gold-deep">Or let us combine them.</em>
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 lg:space-y-32">
          {LENSES.map((l, i) => (
            <div
              key={l.n}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <Reveal className="relative">
                <span className="pointer-events-none absolute -top-16 left-0 z-10 select-none font-display text-[9rem] font-light leading-none text-transparent [-webkit-text-stroke:1px_rgba(184,137,47,0.6)] sm:text-[12rem]">
                  {l.n}
                </span>
                <div
                  className={`relative aspect-[5/4] overflow-hidden ${i % 2 ? "rounded-[28px_120px_28px_28px]" : "rounded-[120px_28px_28px_28px]"}`}
                >
                  <Image
                    src={l.img}
                    alt={l.alt}
                    fill
                    sizes="(min-width: 1024px) 600px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <p className={`font-display text-2xl ${l.tone}`}>{l.sa}</p>
                <h3 className="mt-2 font-display text-5xl leading-tight">
                  {l.title}
                </h3>
                <p className="mt-6 text-lg leading-relaxed text-ink-2">
                  {l.text}
                </p>
                <p className="mt-8 flex flex-wrap gap-x-4 gap-y-2 border-y border-line py-5 text-ink">
                  {l.items.map((t, j) => (
                    <span key={t} className="flex items-center gap-4">
                      {j > 0 && <span className="text-[8px] text-gold">◆</span>}
                      {t}
                    </span>
                  ))}
                </p>
                <button
                  onClick={() => openBooking()}
                  className="group mt-8 flex items-center gap-2 font-semibold text-ink transition hover:text-gold-deep"
                >
                  Book {l.title.toLowerCase()}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * 4. How a session flows: a centred timeline
 * ===================================================================== */
const FLOW = [
  {
    t: "Before",
    h: "You share your details",
    d: "Birth date, time and place, and the question on your mind. Nothing more is needed.",
  },
  {
    t: "Minutes 0–5",
    h: "We listen first",
    d: "Your guide asks what brought you here and what you hope to leave with.",
  },
  {
    t: "Minutes 5–35",
    h: "The reading",
    d: "Your chart, your patterns, or both, explained in plain language and connected to your real situation.",
  },
  {
    t: "Minutes 35–45",
    h: "Next steps",
    d: "Practical choices, timing to watch and a simple practice to take with you.",
  },
  {
    t: "After",
    h: "A short summary",
    d: "Key points from your session, sent to you so nothing is forgotten.",
  },
];

export function SessionFlow() {
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="text-center">
          <p className={eyebrow}>Inside a session</p>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
            Forty-five minutes, <em className="text-astro">all about you.</em>
          </h2>
        </Reveal>

        <ol className="relative mt-16">
          <span
            aria-hidden
            className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-gold/0 via-gold/70 to-gold/0 md:left-1/2"
          />
          {FLOW.map((f, i) => (
            <Reveal
              as="li"
              key={f.t}
              delay={i * 80}
              className={`relative mb-12 pl-12 last:mb-0 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}
            >
              <span
                className={`absolute left-[9px] top-2 h-3.5 w-3.5 rounded-full bg-gold ring-4 ring-card ${i % 2 ? "md:-left-[7px]" : "md:left-auto md:-right-[7px]"}`}
              />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
                {f.t}
              </p>
              <h3 className="mt-2 font-display text-3xl">{f.h}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{f.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* =====================================================================
 * 5. Ways to begin: one band, three columns divided by gold rules
 * ===================================================================== */
export function WaysToBegin() {
  const { openBooking } = useBooking();
  const WAYS = [
    {
      k: "Free",
      t: "Free insight",
      d: "Numerology and the element quiz, in a couple of minutes.",
      href: "/free-tools",
      cta: "Try free tools",
    },
    {
      k: "45 min",
      t: "1-1 consultation",
      d: "One question, one guide, one clear next step.",
      cta: "Book a session",
    },
    {
      k: "In depth",
      t: "Personalised report",
      d: "Your whole chart and every life area, explained on a call.",
      href: "/report",
      cta: "See the report",
    },
  ];
  return (
    <section className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-4xl font-light sm:text-5xl">
            Begin where <em className="text-gold-deep">you are.</em>
          </h2>
          <div className="mt-14 grid border-y border-gold/40 md:grid-cols-3">
            {WAYS.map((w, i) => {
              const body = (
                <>
                  <p className="font-display text-5xl text-gold-deep">{w.k}</p>
                  <h3 className="mt-4 font-display text-3xl">{w.t}</h3>
                  <p className="mt-2 text-ink-2">{w.d}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                    {w.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </>
              );
              const cls = `group block px-2 py-10 text-center transition hover:bg-sand/40 md:px-8 ${i > 0 ? "border-t border-gold/40 md:border-l md:border-t-0" : ""}`;
              return w.href ? (
                <Link key={w.t} href={w.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <button
                  key={w.t}
                  onClick={() => openBooking()}
                  className={`${cls} w-full`}
                >
                  {body}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-ink-3">
            The full price of every session and report is shown before you pay.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

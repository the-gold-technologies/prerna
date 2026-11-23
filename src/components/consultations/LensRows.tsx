"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

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

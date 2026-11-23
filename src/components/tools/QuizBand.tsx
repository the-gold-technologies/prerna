"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { Yantra } from "@/components/quiz";

export function QuizBand() {
  const els = ["fire", "earth", "air", "water"] as const;
  const tones = [
    "text-[#c8643a]",
    "text-gold-deep",
    "text-psych",
    "text-[#3f7fae]",
  ];

  return (
    <section className="px-3 sm:px-5">
      <Reveal className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] border border-gold/30 bg-sand/70 px-6 py-16 text-ink sm:rounded-[48px] sm:px-14 lg:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(241,220,178,0.9),transparent_60%)]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              New · self-discovery quiz
            </p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
              Which element <em className="text-gold-deep">guides you?</em>
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-2">
              Seven questions reveal whether Agni, Prithvi, Vayu or Jala shapes
              how you think, feel and act, with a practice to bring you back
              into balance.
            </p>
            <Link
              href="/quiz"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Take the quiz
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {els.map((el, i) => (
              <div key={el} className="text-center">
                <Yantra
                  el={el}
                  className={`float mx-auto h-24 w-24 sm:h-32 sm:w-32 ${tones[i]}`}
                />
                <p className="mt-3 font-display text-2xl">
                  {["Agni", "Prithvi", "Vayu", "Jala"][i]}
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-ink-3">
                  {["Fire", "Earth", "Air", "Water"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

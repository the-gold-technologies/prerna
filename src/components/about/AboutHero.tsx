"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import VedicChakra, { SkyDecor } from "../home/VedicChakra";

export function AboutHero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36 lg:pb-32 lg:pt-40">
      <div className="pointer-events-none absolute -right-32 top-0 h-[560px] w-[560px] rounded-full bg-dawn/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-astro-soft/60 blur-3xl" />

      <div className="pointer-events-none absolute right-[-30%] top-16 z-0 h-[440px] w-[440px] text-gold-deep opacity-50 sm:right-[-8%] sm:h-[500px] sm:w-[500px] sm:opacity-80 lg:right-6 lg:top-14 lg:h-[560px] lg:w-[560px]">
        <div className="orb-pulse absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(232,211,162,0.85),transparent_70%)]" />
        <VedicChakra className="h-full w-full" />
      </div>

      <SkyDecor />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
            About PRERNA
          </p>

          <h1 className="mt-4 font-display text-4xl uppercase leading-[1.08] text-ink sm:text-6xl lg:text-[4.25rem]">
            <span className="block">Purpose, peace &</span>
            <span className="mt-1 block text-[1.15em] font-light normal-case italic leading-[0.95] text-gold-deep sm:text-[1.25em]">
              inner inspiration.
            </span>
          </h1>

          {/* Name meaning */}
          <div className="mt-8 flex max-w-xl items-center gap-5 border-y border-line py-4">
            <span className="font-display text-4xl leading-none text-gold-deep">
              प्रेरणा
            </span>
            <p className="text-sm leading-relaxed text-ink-2">
              <span className="font-semibold text-ink">Prerna</span> is the
              Sanskrit word for <em>inspiration</em>: the quiet push that moves
              a person towards their own direction.
            </p>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            PRERNA is a self-discovery and personal guidance platform uniting
            Astrology, Psychology and Spirituality, so you can understand your
            personality, relationships and life direction through one clear,
            connected view.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#story"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Get to know us
              <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </a>
            <button
              onClick={() => openBooking()}
              className="rounded-full border border-ink/25 bg-paper/60 px-7 py-4 font-semibold backdrop-blur transition hover:border-ink hover:bg-card"
            >
              Book a session
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutHero;

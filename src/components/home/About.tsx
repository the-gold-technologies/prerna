"use client";

import React from "react";
import Image from "next/image";
import { UserRound, HeartHandshake, Compass, Waves, Sprout, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const UNDERSTAND = [
  { title: "Personality", Icon: UserRound },
  { title: "Relationships", Icon: HeartHandshake },
  { title: "Life direction", Icon: Compass },
  { title: "Emotional patterns", Icon: Waves },
  { title: "Personal growth", Icon: Sprout },
];

export default function About() {
  const { openBooking } = useBooking();

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* Photo */}
        <Reveal className="relative mx-auto w-full max-w-[460px]">
          <div className="arch relative aspect-[4/5] w-full shadow-[0_40px_80px_-40px_rgba(29,26,56,0.5)]">
            <Image
              src="/images/lake-calm.jpg"
              alt="A person sitting quietly at the end of a wooden pier on a still mountain lake"
              fill
              sizes="(min-width: 1024px) 460px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="arch pointer-events-none absolute -left-4 -top-4 -z-10 h-full w-full border border-gold/40 sm:-left-6 sm:-top-6" />
          <div className="absolute -right-2 bottom-8 rounded-2xl bg-card px-5 py-4 shadow-xl sm:-right-8">
            <p className="font-display text-3xl leading-none text-gold-deep">प्रेरणा</p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-3">means inspiration</p>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">About PRERNA</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            A calmer way to <em className="text-spirit">understand</em> your life.
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-2">
            PRERNA is a self-discovery and guidance platform that looks at your life through astrology, psychology
            and spirituality — so you see the full picture, not just one part of it.
          </p>

          <p className="mt-9 text-sm font-semibold">PRERNA helps you understand your</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {UNDERSTAND.map(({ title, Icon }) => (
              <li
                key={title}
                className="flex items-center gap-2 rounded-full border border-line bg-card py-2 pl-2.5 pr-4 text-[15px]"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-sand text-gold-deep">
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                {title}
              </li>
            ))}
          </ul>

          <button
            onClick={() => openBooking()}
            className="group mt-10 flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition ring-1 ring-inset ring-gold/45 hover:bg-astro"
          >
            Start your journey
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

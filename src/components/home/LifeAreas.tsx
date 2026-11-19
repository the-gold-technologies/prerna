"use client";

import React from "react";
import {
  Briefcase,
  Heart,
  Gem,
  HeartPulse,
  GraduationCap,
  Users,
  Coins,
  House,
  Plane,
  Sprout,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { LIFE_AREAS } from "@/data/prernaData";
import { ZodiacWheel, MindRipples } from "./art";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const ICONS: Record<string, LucideIcon> = {
  career: Briefcase,
  relationship: Heart,
  marriage: Gem,
  health: HeartPulse,
  education: GraduationCap,
  family: Users,
  money: Coins,
  property: House,
  abroad: Plane,
};

const SERVICES = [
  {
    title: "Vedic Astrology",
    tags: [
      "Kundli / Birth chart",
      "Compatibility",
      "Life-area analysis",
      "Personalised guidance",
    ],
    Art: ZodiacWheel,
    tone: "bg-astro-soft text-astro",
  },
  {
    title: "Counselling & Therapy",
    tags: [
      "Child, adolescent & parent",
      "Emotional wellbeing",
      "Personality development",
      "Couples",
      "Career",
    ],
    Art: MindRipples,
    tone: "bg-psych-soft text-psych",
  },
];

export default function LifeAreas() {
  const { openBooking } = useBooking();

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
    >
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-xl font-display text-5xl font-light leading-[1.05] sm:text-6xl">
          What&apos;s on your <em className="text-psych">mind?</em>
        </h2>
        <p className="max-w-xs text-ink-2">
          Pick an area of life. We&apos;ll match you with the right guide.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {LIFE_AREAS.map((a) => {
            const Icon = ICONS[a.id] ?? Sprout;
            return (
              <li key={a.id}>
                <button
                  onClick={() => openBooking(a.title)}
                  className="group flex h-full w-full flex-col items-start justify-between gap-10 rounded-3xl border border-line bg-card p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_20px_40px_-24px_rgba(29,26,56,0.4)]"
                >
                  <span className="flex w-full items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-sand text-ink transition group-hover:bg-ink group-hover:text-paper">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-3 opacity-0 transition group-hover:opacity-100" />
                  </span>
                  <span className="font-display text-2xl leading-tight">
                    {a.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {SERVICES.map(({ title, tags, Art, tone }, i) => (
          <Reveal key={title} delay={i * 120}>
            <div
              className={`relative flex h-full flex-col items-start gap-5 overflow-hidden rounded-3xl p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8 ${tone}`}
            >
              <Art className="h-28 w-28 shrink-0 sm:h-36 sm:w-36" />
              <div>
                <h3 className="font-display text-3xl text-ink">{title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-card/80 px-3 py-1 text-xs text-ink-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import {
  ArrowRight,
  UserRound,
  HeartHandshake,
  Compass,
  Waves,
  Sprout,
} from "lucide-react";
import Image from "next/image";
import { useBooking } from "./BookingProvider";
import VedicChakra, { SkyDecor } from "./VedicChakra";

const THEMES = [
  { title: "Personality", Icon: UserRound },
  { title: "Relationships", Icon: HeartHandshake },
  { title: "Life direction", Icon: Compass },
  { title: "Emotional patterns", Icon: Waves },
  { title: "Personal growth", Icon: Sprout },
];

// Zodiac glyphs that sit between the theme chips
const GLYPHS = [
  "♈",
  "♋",
  "♌",
  "♎",
  "♐",
  "♑",
  "♒",
  "♓",
  "♉",
  "♊",
  "♍",
  "♏",
];

// The three lenses PRERNA uses, named in Sanskrit with their English meaning
const PILLARS = [
  { sa: "ज्योतिष", en: "Vedic astrology", dot: "bg-astro" },
  { sa: "मनस्", en: "Psychology", dot: "bg-psych" },
  { sa: "आत्मा", en: "Spirituality", dot: "bg-spirit" },
];

/* Repeating chain of small gold chevrons and dots, like a temple border */
function TempleBorder({ className = "" }: { className?: string }) {
  const id = `tb-${React.useId().replace(/:/g, "")}`;
  return (
    <svg
      className={`block h-3.5 w-full text-gold ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width="24" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M0 1 L6 7 L12 1 L18 7 L24 1"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".6"
          />
          <circle
            cx="12"
            cy="10"
            r="1.4"
            fill="currentColor"
            fillOpacity=".7"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/* soft background wash */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[620px] rounded-full bg-dawn/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-astro-soft blur-3xl" />

      {/* decorative wheel at the far left */}
      <VedicChakra className="pointer-events-none absolute -left-[300px] top-[110px] hidden h-[660px] w-[660px] text-gold opacity-[0.34] lg:block" />
      <SkyDecor />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-14 sm:px-8 sm:pb-32 sm:pt-18 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-36 lg:pt-22">
        <div className="flex flex-col items-start text-left">
          <p className="rise text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">
            Astrology · Psychology · Spirituality
          </p>
          <h1
            className="rise mt-3.5 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight sm:mt-4 sm:text-7xl lg:text-[6.4rem]"
            style={{ animationDelay: "80ms" }}
          >
            Know yourself.
            <br />
            Find your <em className="font-normal text-psych">peace.</em>
          </h1>
          <p
            className="rise mt-[21px] max-w-xl text-lg leading-relaxed text-ink-2 sm:mt-[25px]"
            style={{ animationDelay: "160ms" }}
          >
            Vedic astrology, psychology and spirituality, brought together to
            help you understand who you are and where your life is heading.
            Begin free, go deeper with 1-1 guidance.
          </p>
          <div
            className="rise mt-10 flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#free-insight"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition ring-1 ring-inset ring-gold/45 hover:bg-astro sm:w-auto"
            >
              Get your free insight
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => openBooking()}
              className="w-full rounded-full border border-ink/25 bg-paper/60 px-7 py-4 font-semibold backdrop-blur transition hover:border-ink hover:bg-card sm:w-auto"
            >
              Book a 1-1 session
            </button>
          </div>

          {/* three pillars */}
          <div
            className="rise mt-12 w-full max-w-xl border-t border-line/80 pt-6"
            style={{ animationDelay: "320ms" }}
          >
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7">
              {PILLARS.map((p, i) => (
                <li key={p.sa} className="flex items-center gap-5 sm:gap-7">
                  {i > 0 && <span className="h-5 w-px bg-line" aria-hidden />}
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`}
                    />
                    <span className="font-display text-lg font-medium leading-none text-gold-deep">
                      {p.sa}
                    </span>
                    <span className="text-xs text-ink-3">{p.en}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual: photo at the heart of the rashi chakra */}
        <div className="relative mx-auto aspect-square w-full max-w-[530px]">
          <div className="pointer-events-none absolute -inset-[12%] text-gold-deep opacity-60">
            <div className="orb-pulse absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(232,211,162,0.85),rgba(232,211,162,0)_70%)]" />
            <VedicChakra className="relative h-full w-full" />
          </div>

          <div
            className="rise absolute inset-[13%] rounded-full bg-paper p-2 shadow-[0_40px_80px_-30px_rgba(29,26,56,0.5)] ring-1 ring-gold/50"
            style={{ animationDelay: "120ms" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/images/meditation.jpg"
                alt="A person meditating cross-legged on a wooden deck in warm sunrise light"
                fill
                preload
                sizes="(min-width: 1024px) 400px, 75vw"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* theme ribbon: icon chips + zodiac medallions between temple border patterns */}
      <div
        className="relative mt-4 sm:mt-8 lg:mt-10 bg-card/70 backdrop-blur"
        aria-label="What PRERNA helps you understand"
      >
        <TempleBorder className="border-t border-gold/40" />
        <div className="flex overflow-hidden py-5">
          <div className="marquee flex shrink-0 items-center gap-8 pr-8">
            {[0, 1, 2, 3].flatMap((round) =>
              THEMES.map(({ title, Icon }, i) => {
                const n = round * THEMES.length + i;
                return (
                  <React.Fragment key={n}>
                    <span
                      className="flex items-center gap-3.5 whitespace-nowrap"
                      aria-hidden={round > 0}
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/45 bg-spirit-soft text-gold-deep">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                      </span>
                      <span className="font-display text-2xl text-ink-2 sm:text-[1.7rem]">
                        {title}
                      </span>
                    </span>
                    <span
                      className="flex items-center gap-3 text-gold"
                      aria-hidden
                    >
                      <span className="h-1 w-1 rounded-full bg-gold/60" />
                      <span className="font-serif text-xl text-gold-deep">
                        {GLYPHS[n % GLYPHS.length] + "\uFE0E"}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-gold/60" />
                    </span>
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>
        <TempleBorder className="rotate-180 border-t border-gold/40" />
      </div>
    </section>
  );
}

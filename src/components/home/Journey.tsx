"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Heart,
  Repeat,
  Sparkles,
  Star,
  Sun,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

type Stage = {
  title: string;
  Icon: LucideIcon;
  text: string;
  img: string;
  alt: string;
};

const STAGES: Stage[] = [
  {
    title: "Know Yourself",
    Icon: UserRound,
    text: "Discover your natural blueprint through your birth chart and personality.",
    img: "/images/stage-know-yourself.jpg",
    alt: "A person standing on a rock facing a powerful waterfall",
  },
  {
    title: "Your Patterns",
    Icon: Repeat,
    text: "Understand the emotions and choices that keep repeating in your life.",
    img: "/images/stage-patterns.jpg",
    alt: "Rolling ocean waves at dusk",
  },
  {
    title: "Relationships",
    Icon: Heart,
    text: "Build deeper, healthier bonds with partners, family and friends.",
    img: "/images/stage-relationships.jpg",
    alt: "A family holding hands on a beach at sunset",
  },
  {
    title: "Strengths",
    Icon: Star,
    text: "Bring your hidden talents into the light and lean on them with confidence.",
    img: "/images/stage-strengths.jpg",
    alt: "A climber scaling a rock overhang above the sea",
  },
  {
    title: "Life Direction",
    Icon: Compass,
    text: "Align your goals with the right timing for the big decisions ahead.",
    img: "/images/stage-direction.jpg",
    alt: "An open road leading through red rock towards a mountain",
  },
  {
    title: "Purpose & Peace",
    Icon: Sun,
    text: "Anchor lasting calm with daily practices and ongoing 1-1 support.",
    img: "/images/stage-peace.jpg",
    alt: "A lotus flower glowing in soft light",
  },
];

const STEP_MS = 6800;

export default function Journey() {
  const { openBooking } = useBooking();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // auto-advance through the stages
  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setActive((n) => (n + 1) % STAGES.length),
      STEP_MS
    );
    return () => clearInterval(t);
  }, [paused]);

  // keep the active card visible in the horizontal rail (mobile), without moving the page
  useEffect(() => {
    const rail = railRef.current;
    const card = cardRefs.current[active];
    if (!rail || !card || rail.scrollWidth <= rail.clientWidth) return;
    const r = rail.getBoundingClientRect();
    const c = card.getBoundingClientRect();
    rail.scrollTo({
      left: rail.scrollLeft + (c.left - r.left) - r.width / 2 + c.width / 2,
      behavior: "smooth",
    });
  }, [active]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const s = STAGES[active];

  return (
    <section
      id="journey"
      className="py-24 lg:py-32"
      onMouseLeave={() => setPaused(false)}
    >
      {/* Header */}
      <Reveal className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">
          <Sparkles className="h-3.5 w-3.5" />
          The self-discovery journey
        </span>
        <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] sm:text-7xl">
          Six steps <em>inward.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
          A guided, personal 1-1 journey from understanding yourself to living
          with purpose and peace. Click any stage to explore what it includes.
        </p>
      </Reveal>

      {/* Stage rail — timeline stepper */}
      <Reveal delay={100}>
        <div
          ref={railRef}
          className="mx-auto mt-10 max-w-[1080px] snap-x snap-mandatory overflow-x-auto px-4 pb-12 pt-2 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden"
        >
          <div
            role="tablist"
            aria-label="Journey stages"
            className="flex w-max lg:grid lg:w-full lg:grid-cols-6"
          >
            {STAGES.map(({ title, Icon }, i) => {
              const on = active === i;
              const done = i < active;
              const last = i === STAGES.length - 1;
              return (
                <button
                  key={title}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  role="tab"
                  aria-selected={on}
                  aria-controls="journey-panel"
                  onClick={() => select(i)}
                  className="group relative flex w-[128px] shrink-0 snap-center flex-col items-center px-2 text-center outline-none sm:w-[150px] lg:w-auto"
                >
                  {/* Connector to the next stage */}
                  {!last && (
                    <span
                      aria-hidden
                      className="absolute left-[calc(50%+36px)] right-[calc(-50%+36px)] top-7 h-px overflow-hidden rounded-full bg-line"
                    >
                      {done && <span className="absolute inset-0 bg-gold" />}
                      {on && (
                        <span
                          key={`${active}-${paused}`}
                          className={`absolute inset-y-0 left-0 bg-gold ${paused ? "w-0" : "stage-progress"}`}
                          style={
                            paused
                              ? undefined
                              : { animationDuration: `${STEP_MS}ms` }
                          }
                        />
                      )}
                    </span>
                  )}

                  {/* Node */}
                  <span
                    className={`relative grid h-14 w-14 place-items-center rounded-full transition-all duration-700 group-focus-visible:ring-2 group-focus-visible:ring-gold group-focus-visible:ring-offset-4 group-focus-visible:ring-offset-paper ${
                      on
                        ? "bg-ink text-gold-soft shadow-[0_10px_24px_-10px_rgba(28,24,68,0.6)]"
                        : done
                          ? "border border-gold/50 bg-card text-gold-deep"
                          : "border border-line bg-card text-ink-3 group-hover:border-gold/60 group-hover:text-gold-deep"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>

                  {/* Title */}
                  <span
                    className={`mt-4 whitespace-nowrap font-display text-[1.1rem] leading-tight transition-colors duration-700 sm:text-[1.3rem] ${
                      on ? "text-ink" : "text-ink-3 group-hover:text-ink-2"
                    }`}
                  >
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Detail card — full photo with the stage text over it */}
      <div className="px-3 sm:px-5">
        <Reveal
          delay={150}
          className="mx-auto max-w-[1400px] rounded-[36px] border border-gold/25 bg-card p-2.5 shadow-[0_40px_90px_-50px_rgba(28,24,68,0.35)] sm:rounded-[48px] sm:p-3.5"
        >
          <div className="relative min-h-[640px] overflow-hidden rounded-[28px] bg-sand sm:aspect-[21/9] sm:min-h-[560px] sm:rounded-[38px]">
            {STAGES.map((st, i) => (
              <Image
                key={st.img}
                src={st.img}
                alt={i === active ? st.alt : ""}
                aria-hidden={i !== active}
                fill
                sizes="(min-width: 1400px) 1400px, 100vw"
                className={`object-cover transition-all duration-[1400ms] ease-out ${
                  i === active
                    ? "scale-100 opacity-100"
                    : "scale-[1.05] opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/10 sm:bg-gradient-to-r sm:from-ink/85 sm:via-ink/45 sm:to-transparent" />

            {/* big stage number */}
            <span
              aria-hidden
              className="absolute right-6 top-4 font-display text-8xl leading-none text-paper/25 sm:right-10 sm:top-6 sm:text-[9rem]"
            >
              0{active + 1}
            </span>

            <div
              id="journey-panel"
              role="tabpanel"
              className="on-dark absolute inset-0 flex flex-col justify-end p-7 text-paper sm:p-12 lg:p-16"
            >
              <div key={active} className="rise max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft">
                  Stage {active + 1} of {STAGES.length}
                </p>
                <h3 className="mt-3 flex items-center gap-3 font-display text-4xl leading-tight sm:text-6xl">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-soft text-ink">
                    <s.Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  {s.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-paper/85 sm:text-xl">
                  {s.text}
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openBooking()}
                  className="group flex items-center gap-2 rounded-full bg-gold-soft px-7 py-4 font-semibold text-ink transition hover:bg-paper"
                >
                  Begin your journey
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

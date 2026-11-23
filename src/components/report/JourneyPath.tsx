"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import { Sparkle } from "../home/VedicChakra";
import { Lotus } from "../home/art";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export const STAGES = [
  {
    t: "Know Yourself",
    d: "Discover your natural blueprint through your birth chart and personality.",
    img: "/images/stage-know-yourself.jpg",
    tags: ["Astrology data", "Assessments"],
  },
  {
    t: "Your Patterns",
    d: "Understand the emotions and choices that keep repeating in your life.",
    img: "/images/stage-patterns.jpg",
    tags: ["Psychological questions", "Personalised results"],
  },
  {
    t: "Relationships",
    d: "Build deeper, healthier bonds with partners, family and friends.",
    img: "/images/stage-relationships.jpg",
    tags: ["Compatibility", "Content & exercises"],
  },
  {
    t: "Strengths",
    d: "Bring your hidden talents into the light and lean on them with confidence.",
    img: "/images/stage-strengths.jpg",
    tags: ["Assessments", "Recommendations"],
  },
  {
    t: "Life Direction",
    d: "Align your goals with the right timing for the big decisions ahead.",
    img: "/images/stage-direction.jpg",
    tags: ["Dasha timing", "Consultation"],
  },
  {
    t: "Purpose & Peace",
    d: "Anchor lasting calm with daily practices and ongoing 1-1 support.",
    img: "/images/stage-peace.jpg",
    tags: ["Practices", "Ongoing support"],
  },
];

// node positions in % of the 1200×640 stage
export const NODES = [
  [8, 84],
  [27, 64],
  [46, 78],
  [63, 50],
  [80, 60],
  [92, 16],
];
const STEP_MS = 4500;
export const PTS = NODES.map(([x, y]) => [x * 12, y * 6.4]);
export const seg = (i: number) => {
  const [px, py] = PTS[i - 1];
  const [x, y] = PTS[i];
  const mx = (px + x) / 2;
  return ` C${mx} ${py} ${mx} ${y} ${x} ${y}`;
};
export const FULL =
  `M${PTS[0][0]} ${PTS[0][1]}` +
  PTS.slice(1)
    .map((_, i) => seg(i + 1))
    .join("");

export function JourneyPath() {
  const [a, setA] = useState(0);
  const [hover, setHover] = useState(false);
  const [hold, setHold] = useState(false);
  const [fracs, setFracs] = useState([0, 0.2, 0.4, 0.6, 0.8, 1]);
  const segRefs = useRef<(SVGPathElement | null)[]>([]);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openBooking } = useBooking();
  const paused = hover || hold;
  const s = STAGES[a];

  useEffect(() => {
    const lens = segRefs.current.map((el) => el?.getTotalLength() ?? 0);
    const total = lens.reduce((x, y) => x + y, 0);
    if (!total) return;
    let acc = 0;
    setFracs([0, ...lens.map((l) => (acc += l) / total)]);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setA((x) => (x + 1) % STAGES.length), STEP_MS);
    return () => clearTimeout(id);
  }, [a, paused]);

  useEffect(
    () => () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
    },
    []
  );

  const pick = (n: number) => {
    setA(n);
    setHold(true);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setHold(false), 12000);
  };

  return (
    <section
      id="journey"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-paper via-paper to-dawn/40 py-16 lg:py-20"
    >
      {/* Vedic backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[12rem] leading-none text-gold/[0.08] sm:text-[18rem] lg:text-[22rem]">
          यात्रा
        </span>
        <Lotus className="float absolute bottom-20 left-[4%] hidden h-24 w-24 text-gold/40 md:block" />
        <Lotus className="float absolute bottom-24 right-[6%] hidden h-16 w-16 text-gold/30 [animation-delay:2.5s] lg:block" />
        <Sparkle className="twinkle absolute left-[38%] top-[30%] h-4 w-4 text-gold" />
        <Sparkle className="twinkle absolute right-[12%] top-[48%] h-3 w-3 text-gold-deep [animation-delay:1.3s]" />
        <Sparkle className="twinkle absolute left-[18%] top-[55%] h-3 w-3 text-gold [animation-delay:2.1s]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center text-center">
          <div className="mx-auto max-w-2xl">
            <p className={eyebrow}>The self-discovery journey</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
              Six stages, <em className="text-psych">one path upward.</em>
            </h2>
          </div>
        </Reveal>

        {/* desktop: winding path */}
        <div
          className="relative mt-4 hidden aspect-[1200/640] md:block"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <svg
            viewBox="0 0 1200 640"
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <defs>
              <radialGradient id="jp-sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1dcb2" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f1dcb2" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={PTS[5][0]} cy={PTS[5][1]} r="170" fill="url(#jp-sun)" />
            {/* measuring segments (invisible) */}
            {PTS.slice(1).map((_, i) => (
              <path
                key={i}
                ref={(el) => {
                  segRefs.current[i] = el;
                }}
                d={`M${PTS[i][0]} ${PTS[i][1]}${seg(i + 1)}`}
                fill="none"
                stroke="none"
              />
            ))}
            <path
              d={FULL}
              fill="none"
              stroke="#e9dcc3"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d={FULL}
              pathLength={1}
              fill="none"
              stroke="#b8892f"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeDasharray="0.006 0.012"
              strokeLinecap="round"
            />
            {/* progress travelling along the path */}
            <path
              d={FULL}
              pathLength={1}
              fill="none"
              stroke="url(#jp-gold)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                strokeDasharray: `${fracs[a]} 1`,
                transition:
                  "stroke-dasharray 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            <defs>
              <linearGradient id="jp-gold" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#b8892f" />
                <stop offset="100%" stopColor="#d6ac52" />
              </linearGradient>
            </defs>
          </svg>

          {STAGES.map((st, n) => {
            const on = a === n;
            return (
              <button
                key={st.t}
                onClick={() => pick(n)}
                aria-pressed={on}
                aria-label={`Stage ${n + 1}: ${st.t}`}
                className="group absolute h-0 w-0"
                style={{ left: `${NODES[n][0]}%`, top: `${NODES[n][1]}%` }}
              >
                {/* photo: its centre sits exactly on the path point */}
                {on && (
                  <span className="absolute left-0 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-gold/50" />
                )}
                <span
                  className={`absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper p-1 ring-1 transition-all duration-500 ${on ? "h-28 w-28 ring-gold shadow-[0_0_0_8px_rgba(214,172,82,0.18)]" : n < a ? "h-20 w-20 ring-gold/70" : "h-20 w-20 ring-line grayscale-[0.6] group-hover:ring-gold/60 group-hover:grayscale-0"}`}
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={st.img}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className={`absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full font-display text-sm transition ${on ? "bg-ink text-gold-bright" : "bg-gold text-ink"}`}
                  >
                    {n + 1}
                  </span>
                </span>
                {/* label hangs below the photo */}
                <span
                  className={`absolute left-0 -translate-x-1/2 whitespace-nowrap font-display text-lg transition-all duration-500 ${on ? "top-[4.1rem] text-ink" : "top-[3.1rem] text-ink-3"}`}
                >
                  {st.t}
                </span>
              </button>
            );
          })}

          {/* detail card in the open sky of the top-left */}
          <div key={a} className="rise absolute left-0 top-0 w-[38%]">
            <p className="font-display text-7xl font-light text-gold/60">
              {String(a + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-4xl text-ink">{s.t}</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink-2">{s.d}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gold/40 bg-paper/70 px-3 py-1 text-xs text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* mobile: stacked stops */}
        <ol className="mt-10 space-y-8 border-l border-dashed border-gold/60 pl-8 md:hidden">
          {STAGES.map((st, n) => (
            <li key={st.t} className="relative">
              <span className="absolute -left-[3.15rem] top-0 grid h-9 w-9 place-items-center rounded-full bg-gold font-display text-ink">
                {n + 1}
              </span>
              <h3 className="font-display text-2xl">{st.t}</h3>
              <p className="mt-1 text-ink-2">{st.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-2 flex justify-center md:-mt-4">
          <button
            onClick={() => openBooking()}
            className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
          >
            Begin the journey
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

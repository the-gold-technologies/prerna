"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import { Sparkle } from "../home/VedicChakra";
import { Lotus } from "../home/art";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

/* =====================================================================
 * 2. From order to insight: delivery timeline
 * ===================================================================== */
const DELIVERY = [
  {
    when: "Day 1",
    t: "You order",
    d: "Share your birth details and the questions most on your mind.",
  },
  {
    when: "Days 2–4",
    t: "We prepare",
    d: "Your chart is calculated and our guides write your report.",
  },
  {
    when: "Day 5",
    t: "Your 1-1 call",
    d: "We walk you through every chapter and answer your questions.",
  },
  {
    when: "Every week",
    t: "You continue",
    d: "Short insights for your Moon sign keep the guidance alive.",
  },
];

export function ReportDelivery() {
  return (
    <section className="relative overflow-hidden bg-sand/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className={eyebrow}>From order to insight</p>
            <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
              Five days to <em className="text-gold-deep">a clearer view.</em>
            </h2>
          </div>
          <p className="max-w-sm text-ink-2">
            Timings are typical. If you need your report sooner, tell us when
            you order.
          </p>
        </Reveal>

        <div className="relative mt-20">
          {/* the line, with a travelling light */}
          <div className="absolute left-0 right-0 top-[4.6rem] hidden h-px bg-gold/50 md:block">
            <span className="travel absolute -top-[3px] h-[7px] w-24 rounded-full bg-gradient-to-r from-transparent via-gold-bright to-transparent" />
          </div>
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {DELIVERY.map((s, n) => (
              <Reveal as="li" key={s.t} delay={n * 110} className="relative">
                <p className="font-display text-4xl text-gold-deep sm:text-5xl">
                  {s.when}
                </p>
                <span
                  className={`relative z-10 mt-5 grid h-6 w-6 place-items-center rounded-full ring-[6px] ring-sand ${n === 3 ? "bg-ink" : "bg-gold"}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-paper" />
                </span>
                <h3 className="mt-6 font-display text-3xl">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * 3. The six-stage journey as a path climbing to the summit.
 *    Advances on its own; pauses on hover and for a while after a click.
 * ===================================================================== */
const STAGES = [
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
const NODES = [
  [8, 84],
  [27, 64],
  [46, 78],
  [63, 50],
  [80, 60],
  [92, 16],
];
const STEP_MS = 4500;
const PTS = NODES.map(([x, y]) => [x * 12, y * 6.4]);
const seg = (i: number) => {
  const [px, py] = PTS[i - 1];
  const [x, y] = PTS[i];
  const mx = (px + x) / 2;
  return ` C${mx} ${py} ${mx} ${y} ${x} ${y}`;
};
const FULL =
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

  // measure each segment so the gold line stops exactly at each stop
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

/* =====================================================================
 * 4. Report questions
 * ===================================================================== */
const QA = [
  [
    "What do I need to share?",
    "Your full name, date of birth, exact time of birth and place of birth, plus the questions you most want answered.",
  ],
  [
    "What if I don't know my birth time?",
    "We can still prepare a useful report from your Moon and planets. For a precise ascendant, we can help you estimate your time through birth-time rectification.",
  ],
  [
    "Is the report automated?",
    "The calculations come from trusted engines. The interpretation, recommendations and practices are written and checked by PRERNA's guides, then explained on your call.",
  ],
  [
    "How long does it take?",
    "Usually around five days from your order to your 1-1 call. Tell us if you need it sooner.",
  ],
  [
    "Can I ask questions on the call?",
    "Yes. The call is yours: we walk through the report and spend as much of the time as you need on your own questions.",
  ],
  [
    "Is my information private?",
    "Always. Your details are used only to prepare your report and are never shared or sold.",
  ],
];

export function ReportFaq() {
  const { openBooking } = useBooking();
  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={eyebrow}>Before you begin</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            Questions about <em className="text-gold-deep">your report.</em>
          </h2>
          <p className="mt-5 text-ink-2">
            Anything else? Ask us directly. Every message is answered
            personally.
          </p>
          <button
            onClick={() => openBooking()}
            className="group mt-8 flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
          >
            Get my report
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
        <div className="border-t border-ink/80">
          {QA.map(([q, a], n) => (
            <details
              key={q}
              className="group border-b border-line"
              open={n === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <span className="w-8 font-display text-gold-deep">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-2xl text-ink">
                  {q}
                </span>
                <Plus className="h-5 w-5 shrink-0 text-ink-3 transition group-open:rotate-45" />
              </summary>
              <p className="pb-6 pl-13 pr-10 leading-relaxed text-ink-2">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Plus } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

/* =====================================================================
 * 1. Inside your report: contents list + a live sample page
 * ===================================================================== */
type Chapter = {
  v: string;
  t: string;
  ex: string;
  Visual: () => React.ReactNode;
};

const Row = ({ k, v }: { k: string; v: string }) => (
  <div className="flex justify-between border-b border-dotted border-line py-2 text-sm">
    <span className="text-ink-3">{k}</span>
    <span className="font-display text-base text-ink">{v}</span>
  </div>
);

const CHAPTERS: Chapter[] = [
  {
    v: "Compute",
    t: "Your birth data",
    ex: "Born as the Moon passed through Rohini, you carry a natural need for beauty, comfort and steady growth.",
    Visual: () => (
      <div>
        <Row k="Lagna (ascendant)" v="Simha · Leo" />
        <Row k="Moon sign" v="Vrishabha · Taurus" />
        <Row k="Birth nakshatra" v="Rohini, pada 3" />
        <Row k="Running period" v="Jupiter – Saturn" />
      </div>
    ),
  },
  {
    v: "Map",
    t: "Planets & signs",
    ex: "Jupiter is your strongest planet. Teaching, guidance and wisdom come to you more naturally than you realise.",
    Visual: () => (
      <div className="space-y-2.5">
        {[
          ["Jupiter", 88],
          ["Moon", 74],
          ["Venus", 66],
          ["Sun", 58],
          ["Saturn", 41],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center gap-3 text-sm">
            <span className="w-16 text-ink-2">{k}</span>
            <span className="h-1.5 flex-1 rounded-full bg-sand">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-gold to-gold-deep"
                style={{ width: `${v}%` }}
              />
            </span>
            <span className="w-8 text-right font-display text-ink">{v}</span>
          </div>
        ))}
        <p className="pt-1 text-[11px] uppercase tracking-[0.2em] text-ink-3">
          Shadbala strength
        </p>
      </div>
    ),
  },
  {
    v: "Relate",
    t: "Relationships",
    ex: "You love loyally and quietly. You feel most secure when affection is shown through small, consistent acts.",
    Visual: () => (
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 120 80" className="h-24 w-36 shrink-0" aria-hidden>
          <circle
            cx="45"
            cy="40"
            r="30"
            fill="#64458f"
            fillOpacity=".18"
            stroke="#64458f"
          />
          <circle
            cx="75"
            cy="40"
            r="30"
            fill="#b8892f"
            fillOpacity=".18"
            stroke="#b8892f"
          />
        </svg>
        <div>
          <p className="font-display text-5xl text-ink">
            27<span className="text-2xl text-ink-3">/36</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-ink-3">
            Guna Milan · very good
          </p>
        </div>
      </div>
    ),
  },
  {
    v: "Weigh",
    t: "Major life areas",
    ex: "Career and learning are strongly supported this decade. Property matters ask for patience until 2028.",
    Visual: () => (
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {[
          ["Career", 5],
          ["Marriage", 4],
          ["Health", 3],
          ["Education", 5],
          ["Family", 4],
          ["Money", 4],
          ["Property", 2],
          ["Abroad", 3],
        ].map(([k, n]) => (
          <div
            key={k}
            className="flex items-center justify-between border-b border-dotted border-line py-1.5"
          >
            <span className="text-ink-2">{k}</span>
            <span className="tracking-[0.15em] text-gold-deep">
              {"●".repeat(n as number)}
              <span className="text-line">{"●".repeat(5 - (n as number))}</span>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    v: "Build",
    t: "Career & growth",
    ex: "Your Jupiter period favours roles where you guide others. Expect a meaningful change in direction around 2027.",
    Visual: () => (
      <div>
        <div className="flex h-9 overflow-hidden rounded-full text-[10px] font-semibold uppercase tracking-[0.15em]">
          <span className="grid w-[22%] place-items-center bg-sand text-ink-3">
            Rahu
          </span>
          <span className="grid w-[46%] place-items-center bg-gold text-ink">
            Jupiter
          </span>
          <span className="grid w-[32%] place-items-center bg-astro-soft text-astro">
            Saturn
          </span>
        </div>
        <div className="mt-2 flex justify-between text-xs text-ink-3">
          <span>2007</span>
          <span>2025 — now</span>
          <span>2041</span>
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-ink-3">
          Vimshottari dasha
        </p>
      </div>
    ),
  },
  {
    v: "Secure",
    t: "Money, family & more",
    ex: "Wealth grows steadily rather than suddenly. Your second house rewards saving and long-term planning.",
    Visual: () => (
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          ["Wealth", "Steady rise"],
          ["Home", "Settling"],
          ["Studies", "Favoured"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl bg-sand/70 px-2 py-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-3">
              {k}
            </p>
            <p className="mt-1 font-display text-lg text-ink">{v}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    v: "Guide",
    t: "Recommendations",
    ex: "Say yes to the teaching opportunity. Postpone property purchase. Rest more on Saturdays.",
    Visual: () => (
      <ul className="space-y-2.5">
        {[
          "Accept roles that let you mentor others",
          "Delay big property decisions until 2028",
          "Protect Saturday as a slower day",
        ].map((t) => (
          <li key={t} className="flex gap-3 text-sm text-ink">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-spirit-soft text-spirit">
              <Check className="h-3 w-3" />
            </span>
            {t}
          </li>
        ))}
      </ul>
    ),
  },
  {
    v: "Balance",
    t: "Healing techniques",
    ex: "Strengthen Saturn through service and routine. A short mantra on Saturdays steadies the mind.",
    Visual: () => (
      <div className="rounded-2xl bg-ink px-6 py-5 text-center text-paper">
        <p className="font-display text-2xl text-gold-bright">
          ॐ शं शनैश्चराय नमः
        </p>
        <p className="mt-1 text-sm text-paper/70">
          Om Sham Shanaishcharaya Namah
        </p>
        <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-paper/50">
          108 times · Saturdays · at sunset
        </p>
      </div>
    ),
  },
  {
    v: "Follow",
    t: "Ongoing insights",
    ex: "Every Monday, a short note for the week ahead, written for your Moon sign and current period.",
    Visual: () => (
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
          <div
            key={d}
            className={`rounded-xl py-3 ${i === 3 ? "bg-gold text-ink" : "bg-sand/70"}`}
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-ink-3">
              {d}
            </p>
            <p className="mt-1 text-lg">
              {["◐", "◑", "○", "●", "◒", "◓", "◐"][i]}
            </p>
          </div>
        ))}
      </div>
    ),
  },
];

export function ReportContents() {
  const [i, setI] = useState(0);
  const c = CHAPTERS[i];

  return (
    <section id="chapters" className="scroll-mt-20 bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <Reveal>
            <p className={eyebrow}>Inside your report</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
              Nine chapters. <em className="text-astro">One life.</em>
            </h2>
            <p className="mt-4 text-ink-2">
              Open any chapter to see a sample page.
            </p>
          </Reveal>
          <ol className="mt-10 border-t border-line" role="tablist">
            {CHAPTERS.map((ch, n) => (
              <li key={ch.t}>
                <button
                  role="tab"
                  aria-selected={i === n}
                  onClick={() => setI(n)}
                  className={`relative flex w-full items-baseline gap-4 border-b border-line py-3.5 pl-5 text-left transition ${i === n ? "text-ink" : "text-ink-3 hover:text-ink"}`}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full transition ${i === n ? "bg-gold" : "bg-transparent"}`}
                  />
                  <span className="w-9 font-display text-gold-deep">
                    {ROMAN[n]}
                  </span>
                  <span className="flex-1 font-display text-xl sm:text-2xl">
                    {ch.t}
                  </span>
                  <span className="hidden text-[10px] uppercase tracking-[0.25em] sm:inline">
                    {ch.v}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* sample page */}
        <div className="relative lg:sticky lg:top-28 lg:self-start">
          <div className="absolute inset-0 translate-x-5 translate-y-5 rotate-[2deg] rounded-[22px] border border-line bg-sand" />
          <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rotate-[1deg] rounded-[22px] border border-line bg-paper" />
          <article
            key={i}
            className="rise relative min-h-[520px] rounded-[22px] border border-line bg-paper p-8 shadow-[0_40px_80px_-45px_rgba(28,24,68,0.5)] sm:p-12"
          >
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-3">
              <span>
                Chapter {ROMAN[i]} · {c.v}
              </span>
              <span>p. {(i + 1) * 4}</span>
            </div>
            <span className="mt-5 block h-px w-full bg-gradient-to-r from-gold/70 to-transparent" />
            <h3 className="mt-8 font-display text-5xl leading-tight text-ink">
              {c.t}
            </h3>
            <p className="mt-6 border-l-2 border-gold pl-5 font-display text-2xl italic leading-snug text-ink-2">
              {c.ex}
            </p>
            <div className="mt-10">{c.Visual()}</div>
            <p className="mt-10 text-xs text-ink-3">
              Sample page. Your report is written from your own chart.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

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
 * 3. The six-stage journey as a path climbing to the summit
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

export function JourneyPath() {
  const [a, setA] = useState(0);
  const { openBooking } = useBooking();
  const s = STAGES[a];
  const pts = NODES.map(([x, y]) => [x * 12, y * 6.4]);
  const d = pts.reduce((acc, [x, y], i) => {
    if (i === 0) return `M${x} ${y}`;
    const [px, py] = pts[i - 1];
    const mx = (px + x) / 2;
    return `${acc} C${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, "");

  return (
    <section id="journey" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>The self-discovery journey</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            Six stages, <em className="text-psych">one path upward.</em>
          </h2>
        </Reveal>

        {/* desktop: winding path */}
        <div className="relative mt-10 hidden aspect-[1200/640] md:block">
          <svg
            viewBox="0 0 1200 640"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <radialGradient id="jp-sun" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1dcb2" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f1dcb2" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={pts[5][0]} cy={pts[5][1]} r="160" fill="url(#jp-sun)" />
            <path
              d={d}
              fill="none"
              stroke="#e9dcc3"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="#b8892f"
              strokeWidth="2"
              strokeDasharray="0.006 0.012"
              strokeLinecap="round"
            />
          </svg>

          {STAGES.map((st, n) => (
            <button
              key={st.t}
              onClick={() => setA(n)}
              aria-pressed={a === n}
              className="group absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${NODES[n][0]}%`, top: `${NODES[n][1]}%` }}
            >
              <span
                className={`relative mx-auto block overflow-hidden rounded-full bg-paper p-1 ring-1 transition duration-300 ${a === n ? "h-28 w-28 ring-gold shadow-[0_0_0_8px_rgba(214,172,82,0.18)]" : "h-20 w-20 ring-line group-hover:ring-gold/60"}`}
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
              </span>
              <span
                className={`absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full font-display text-sm ${a === n ? "bg-ink text-gold-bright" : "bg-gold text-ink"}`}
              >
                {n + 1}
              </span>
              <span
                className={`mt-2 block whitespace-nowrap font-display text-lg transition ${a === n ? "text-ink" : "text-ink-3"}`}
              >
                {st.t}
              </span>
            </button>
          ))}

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
                  className="rounded-full border border-gold/40 px-3 py-1 text-xs text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* mobile: stacked stops */}
        <ol className="mt-12 space-y-8 border-l border-dashed border-gold/60 pl-8 md:hidden">
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

        <div className="mt-12 flex justify-center">
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

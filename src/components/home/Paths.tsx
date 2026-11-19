import React from "react";
import { ZodiacWheel, MindRipples, Lotus } from "./art";
import Reveal from "./Reveal";

const PATHS = [
  {
    n: "01",
    title: "Astrology",
    line: "Your birth chart, read with care.",
    Art: ZodiacWheel,
    tone: "bg-astro-soft text-astro",
  },
  {
    n: "02",
    title: "Psychology",
    line: "Understand the patterns you live by.",
    Art: MindRipples,
    tone: "bg-psych-soft text-psych",
  },
  {
    n: "03",
    title: "Spirituality",
    line: "Come back to calm, from within.",
    Art: Lotus,
    tone: "bg-spirit-soft text-spirit",
  },
];

export default function Paths() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-5xl font-light leading-[1.05] sm:text-6xl">
          Three paths. <em className="text-gold-deep">One you.</em>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
        {PATHS.map(({ n, title, line, Art, tone }, i) => (
          <Reveal key={title} delay={i * 120} className={i === 1 ? "md:translate-y-10" : ""}>
            <article className="group">
              <div className={`arch relative grid aspect-[4/5] place-items-center ${tone}`}>
                <Art className="h-[62%] w-[62%] transition duration-700 group-hover:scale-105" />
                <span className="absolute left-1/2 top-8 -translate-x-1/2 font-display text-sm tracking-[0.3em] opacity-70">
                  {n}
                </span>
              </div>
              <div className="pt-6 text-center">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-1.5 text-ink-2">{line}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import { ZodiacWheel, MindRipples, Lotus } from "./art";
import Reveal from "./Reveal";

const PATHS = [
  {
    n: "01",
    title: "Astrology",
    text: "Vedic astrology maps your natural tendencies through your birth chart and reveals the right timing for the important decisions in your life.",
    img: "/images/night-sky.jpg",
    alt: "The Milky Way glowing over a mountain horizon at night",
    Art: ZodiacWheel,
    badge: "bg-astro-soft text-astro",
  },
  {
    n: "02",
    title: "Psychology",
    text: "Self-assessment and counselling help you understand your personality, emotions and relationship patterns — and how to change them.",
    img: "/images/counselling.jpg",
    alt: "Two women in a calm, friendly conversation at a small table",
    Art: MindRipples,
    badge: "bg-psych-soft text-psych",
  },
  {
    n: "03",
    title: "Spirituality",
    text: "Healing, sound, mindfulness and elemental practices that bring inner balance and turn insight into everyday peace.",
    img: "/images/sound-healing.jpg",
    alt: "A person playing a brass singing bowl during a sound-healing session",
    Art: Lotus,
    badge: "bg-spirit-soft text-spirit",
  },
];

export default function Paths() {
  return (
    <section id="paths" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Three systems, one guide</p>
        <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
          Three paths. <em className="text-gold-deep">One you.</em>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-2">
          Each system answers a different part of the question. Together, they give you a complete and honest
          picture of where you are — and where you could go next.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {PATHS.map(({ n, title, text, img, alt, Art, badge }, i) => (
          <Reveal key={title} delay={i * 120} className={i === 1 ? "md:translate-y-10" : ""}>
            <article className="group">
              <div className="arch relative aspect-[4/5] bg-sand">
                <Image
                  src={img}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <span className="absolute bottom-5 left-6 font-display text-sm tracking-[0.3em] text-paper/90">{n}</span>
                <span
                  className={`absolute bottom-4 right-4 grid h-16 w-16 place-items-center rounded-full shadow-lg ${badge}`}
                >
                  <Art className="h-12 w-12" />
                </span>
              </div>
              <div className="mx-auto max-w-xs pt-6 text-center">
                <h3 className="font-display text-3xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

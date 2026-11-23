"use client";

import React from "react";
import Image from "next/image";
import Reveal from "../home/Reveal";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep";

const GUIDES = [
  {
    role: "Vedic astrologers",
    text: "Read your Kundli, compatibility and life-area timing with care and precision.",
    dot: "bg-astro",
  },
  {
    role: "Counsellors & therapists",
    text: "Child, adolescent & parent, emotional wellbeing, personality, couples and career.",
    dot: "bg-psych",
  },
  {
    role: "Spiritual practitioners",
    text: "Healing, sound, mindfulness and balancing practices for everyday steadiness.",
    dot: "bg-spirit",
  },
];

export function AboutFounder() {
  return (
    <section className="bg-sand/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 rotate-[-3deg] rounded-[32px] border border-gold/40" />
              <Image
                src="/images/meditation.jpg"
                alt="A person meditating in soft morning light"
                width={900}
                height={1100}
                className="relative aspect-[4/5] w-full rounded-[28px] object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <p className={eyebrow}>From the founder&apos;s desk</p>
            <h2 className="mt-4 font-display text-4xl font-light leading-[1.1] sm:text-5xl">
              &ldquo;Guidance should leave you{" "}
              <em className="text-astro">clearer</em>, never more afraid.&rdquo;
            </h2>

            <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <p className="font-display text-sm uppercase tracking-[0.22em] text-gold-deep">
                  Purpose
                </p>
                <p className="mt-3 leading-relaxed text-ink-2">
                  To give every person a calm, honest place to understand
                  themselves, where ancient knowledge and modern psychology work
                  together instead of side by side.
                </p>
              </div>
              <div>
                <p className="font-display text-sm uppercase tracking-[0.22em] text-gold-deep">
                  Vision
                </p>
                <p className="mt-3 leading-relaxed text-ink-2">
                  A world where people turn to self-knowledge before fear, and
                  where finding direction feels like remembering, not guessing.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Who guides you */}
        <Reveal className="mt-20">
          <p className={eyebrow}>Who guides you</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-3">
            {GUIDES.map((g) => (
              <div key={g.role} className="bg-card p-8">
                <span className={`block h-2 w-2 rounded-full ${g.dot}`} />
                <h3 className="mt-5 font-display text-2xl">{g.role}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                  {g.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutFounder;

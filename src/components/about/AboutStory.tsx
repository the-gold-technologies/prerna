"use client";

import React from "react";
import Image from "next/image";
import Reveal from "../home/Reveal";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep";

const STORY = [
  {
    k: "The question",
    t: "Most people arrive with a real-life question. Why does this relationship keep repeating? Is this the right career? Why do I feel stuck when everything looks fine?",
  },
  {
    k: "The gap",
    t: "An astrologer could describe the timing and the tendencies. A counsellor could work with the feelings and the patterns. But people were left to join the two on their own, and the answers rarely met.",
  },
  {
    k: "The idea",
    t: "PRERNA brings both to the same table, with spirituality as the ground beneath them. Your chart shows the map, psychology explains how you move through it, and spiritual practice helps you stay steady on the way.",
  },
];

export function AboutStory() {
  return (
    <section id="story" className="scroll-mt-24 bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
          <div className="relative overflow-hidden rounded-[28px]">
            <Image
              src="/images/journaling.jpg"
              alt="A fountain pen writing reflective notes in a journal"
              width={900}
              height={1100}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper/90 p-4 backdrop-blur">
              <p className="font-display text-lg italic leading-snug text-ink-2">
                &ldquo;Not more predictions. More understanding.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <p className={eyebrow}>Why PRERNA exists</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
            One question.{" "}
            <em className="text-astro">Three ways of seeing it.</em>
          </h2>

          <div className="mt-10 border-t border-line">
            {STORY.map((s, i) => (
              <div
                key={s.k}
                className="grid gap-3 border-b border-line py-7 sm:grid-cols-[10rem_1fr] sm:gap-8"
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-gold-deep">
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl text-ink">{s.k}</span>
                </p>
                <p className="text-[17px] leading-relaxed text-ink-2">{s.t}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutStory;

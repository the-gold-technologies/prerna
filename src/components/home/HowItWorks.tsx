import React from "react";
import Image from "next/image";
import { Sparkles, CalendarHeart, ScrollText } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  {
    Icon: Sparkles,
    title: "Start with a free insight",
    text: "Share a few birth details and instantly receive your numerology profile — a gentle first look at your strengths and tendencies.",
  },
  {
    Icon: CalendarHeart,
    title: "Talk 1-1 with an expert",
    text: "Book a private consultation with an astrologer or counsellor, focused on the area of life that matters most to you right now.",
  },
  {
    Icon: ScrollText,
    title: "Grow with your report",
    text: "Receive a personalised report with clear recommendations, healing practices and ongoing weekly insights to keep you on track.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
            How it works
          </p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            From a question to <em className="text-psych">clarity</em>, in three
            steps.
          </h2>
          <div className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[28px] lg:block">
            <Image
              src="/images/journaling.jpg"
              alt="A fountain pen writing reflective notes in a journal"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <ol className="space-y-4">
          {STEPS.map(({ Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 120}>
              <div className="flex gap-5 rounded-3xl border border-line bg-paper p-6 sm:gap-7 sm:p-8">
                <div className="flex flex-col items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-gold-soft">
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg text-gold-deep">
                    Step {i + 1}
                  </p>
                  <h3 className="font-display text-3xl leading-tight">
                    {title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

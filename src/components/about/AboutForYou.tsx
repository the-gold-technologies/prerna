"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep";

const FOR_YOU = [
  "you are standing at a crossroads in career, marriage or money, and want more than a yes or no.",
  "the same patterns keep returning in your relationships and you want to know why.",
  "you are curious about your birth chart but want it explained in plain language.",
  "you are a parent looking for support for your child or teenager.",
  "you want calm, practical steps, not fear or vague predictions.",
  "you simply want to understand yourself a little better.",
];

export function AboutForYou() {
  const { openBooking } = useBooking();

  return (
    <section className="bg-card py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <p className={eyebrow}>Is this for you?</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            PRERNA is <em className="text-gold-deep">for you</em> if&hellip;
          </h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Book a 1-1 session
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <Link
              href="/#free-insight"
              className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
            >
              Try the free insight
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <ul className="border-t border-line">
            {FOR_YOU.map((t) => (
              <li
                key={t}
                className="flex gap-4 border-b border-line py-5 text-lg leading-relaxed text-ink-2"
              >
                <span className="mt-1 text-gold">✦</span>
                <span>
                  <span className="font-display italic text-ink">&hellip;</span>{" "}
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default AboutForYou;

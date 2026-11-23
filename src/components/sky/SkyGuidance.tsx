"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import type { Panchang } from "@/lib/sky";

export const MOON_NOTES = [
  "Energy is quick and bold. A good day to begin something, as long as you pace your words.",
  "The mind wants comfort and steadiness. Slow meals, simple pleasures and patient decisions suit today.",
  "Curiosity is high and the mind is busy. Talk things through, write lists, and leave room to rest your thoughts.",
  "Feelings run close to the surface. Home, family and gentle care for yourself are well supported.",
  "Confidence and warmth rise. Let yourself be seen, and be generous with praise for others.",
  "A clear, practical mind. Tidy, plan and attend to health. Go easy on self-criticism.",
  "The mind looks for balance and harmony. Good for agreements, partnerships and kind conversations.",
  "Emotions go deep today. Honest reflection and quiet strength serve you better than force.",
  "Optimism and faith are strong. Study, travel or a meaningful talk with a teacher feel right.",
  "A serious, steady mood. Work towards long-term goals and keep promises to yourself.",
  "The mind thinks in big pictures and new ideas. Connect with friends and community.",
  "Sensitivity and intuition are heightened. Rest, meditate and listen to what you feel.",
];

export function SkyGuidance({ p }: { p: Panchang | null }) {
  const { openBooking } = useBooking();

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
            The day&apos;s mood
          </p>
          <p className="mt-6 font-display text-[5.5rem] font-light leading-none text-gold-deep/90 sm:text-[7.5rem]">
            {p?.moonSign.sa ?? " "}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-ink-3">
            Moon in {p?.moonSign.en ?? "…"}
          </p>
        </div>
        <div>
          <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
            {p ? MOON_NOTES[p.moonSign.index] : " "}
          </p>
          <p className="mt-8 leading-relaxed text-ink-2">
            This is the general mood of the sky for everyone. How it touches you
            depends on your own chart: your Moon, your ascendant and the period
            you are running. That is what a personal reading explains.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Read my own chart
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <Link
              href="/free-tools"
              className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
            >
              Free tools
            </Link>
          </div>
          <p className="mt-8 text-xs text-ink-3">
            Calculated in your browser with the Lahiri ayanamsha. Accurate to
            within a few minutes of time; exact transition times will come from
            PRERNA&apos;s calculation engine.
          </p>
        </div>
      </div>
    </section>
  );
}

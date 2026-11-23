"use client";

import React from "react";
import { ArrowRight, Plus } from "lucide-react";
import { useBooking } from "../home/BookingProvider";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export const QA = [
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

"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";

export function WaysToBegin() {
  const { openBooking } = useBooking();
  const WAYS = [
    {
      k: "Free",
      t: "Free insight",
      d: "Numerology and the element quiz, in a couple of minutes.",
      href: "/free-tools",
      cta: "Try free tools",
    },
    {
      k: "45 min",
      t: "1-1 consultation",
      d: "One question, one guide, one clear next step.",
      cta: "Book a session",
    },
    {
      k: "In depth",
      t: "Personalised report",
      d: "Your whole chart and every life area, explained on a call.",
      href: "/report",
      cta: "See the report",
    },
  ];

  return (
    <section className="py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-4xl font-light sm:text-5xl">
            Begin where <em className="text-gold-deep">you are.</em>
          </h2>
          <div className="mt-14 grid border-y border-gold/40 md:grid-cols-3">
            {WAYS.map((w, i) => {
              const body = (
                <>
                  <p className="font-display text-5xl text-gold-deep">{w.k}</p>
                  <h3 className="mt-4 font-display text-3xl">{w.t}</h3>
                  <p className="mt-2 text-ink-2">{w.d}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                    {w.cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </>
              );
              const cls = `group block px-2 py-10 text-center transition hover:bg-sand/40 md:px-8 ${i > 0 ? "border-t border-gold/40 md:border-l md:border-t-0" : ""}`;
              return w.href ? (
                <Link key={w.t} href={w.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <button
                  key={w.t}
                  onClick={() => openBooking()}
                  className={`${cls} w-full`}
                >
                  {body}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-center text-sm text-ink-3">
            The full price of every session and report is shown before you pay.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

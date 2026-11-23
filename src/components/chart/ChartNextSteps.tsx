"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import { eyebrow } from "./types";

export function ChartNextSteps() {
  const { openBooking } = useBooking();

  return (
    <section className="py-20 print:hidden">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className={eyebrow}>The next step</p>
        <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">
          This is your map.{" "}
          <em className="text-gold-deep">Let us read it with you.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-ink-2">
          A personalised report explains every chapter of your chart with exact
          calculations, all divisional charts and a private 1-1 call.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => openBooking()}
            className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
          >
            Get my full report{" "}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <Link
            href="/report"
            className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
          >
            What&apos;s in the report
          </Link>
        </div>
      </div>
    </section>
  );
}

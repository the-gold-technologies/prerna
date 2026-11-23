"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import VedicChakra, { Sparkle } from "../home/VedicChakra";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export function ConsultHero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-astro-soft/70 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="rise lg:col-span-7 lg:pt-10">
          <p className={eyebrow}>Consultations & services</p>
          <h1 className="mt-6 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.4rem]">
            Bring a real
            <br />
            <em className="font-normal text-gold-deep">question.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            Career, marriage, money, a child who is struggling, a decision that
            will not settle. Speak one to one with a Vedic astrologer, a
            counsellor or a spiritual practitioner, and leave with a clearer
            next step.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
            >
              Book a session
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a
              href="#areas"
              className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
            >
              Find your life area
            </a>
          </div>
        </div>

        <div
          className="rise relative lg:col-span-5"
          style={{ animationDelay: "120ms" }}
        >
          <VedicChakra className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[520px] text-gold opacity-30" />
          <div className="arch relative ml-auto aspect-[3/4] w-full max-w-[440px] ring-1 ring-gold/50 shadow-2xl">
            <Image
              src="/images/counselling.jpg"
              alt="A counsellor listening warmly to a client across a small table by a window"
              fill
              preload
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover object-[22%_50%]"
            />
          </div>
          <div className="absolute -left-2 bottom-2 max-w-[260px] rounded-2xl border border-line bg-paper/95 p-5 shadow-xl backdrop-blur sm:-left-10">
            <p className="font-display text-xl italic leading-snug text-ink">
              &ldquo;Not a prediction. A conversation about you.&rdquo;
            </p>
          </div>
          <Sparkle className="twinkle absolute right-4 top-6 h-6 w-6 text-gold" />
        </div>
      </div>
    </section>
  );
}

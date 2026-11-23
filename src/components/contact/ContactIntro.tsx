"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";
import VedicChakra, { Sparkle } from "../home/VedicChakra";
import ContactWays from "./ContactWays";

export { ContactWays };

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export function ContactIntro() {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
      {/* soft background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-astro-soft/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-dawn/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: editorial headline & CTAs */}
          <div className="rise lg:col-span-7 lg:pt-10">
            <p className={eyebrow}>Contact & support</p>
            <h1 className="mt-6 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.4rem]">
              Let&apos;s begin your
              <br />
              <em className="font-normal text-gold-deep">
                journey to clarity.
              </em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
              Book a 1-1 consultation, ask a question about your report, or
              reach out to find the right guidance for your path. We&apos;re
              here, and every message is answered personally.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
              >
                Send a message
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => openBooking()}
                className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink"
              >
                Book a session
              </button>
            </div>
          </div>

          {/* Right Column: tall arched portrait with VedicChakra and quote card */}
          <div
            className="rise relative lg:col-span-5"
            style={{ animationDelay: "120ms" }}
          >
            <VedicChakra className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[520px] text-gold opacity-30" />
            <div className="arch relative ml-auto aspect-[3/4] w-full max-w-[440px] ring-1 ring-gold/50 shadow-2xl">
              <Image
                src="/images/contact.jpg"
                alt="Two people engaged in a thoughtful conversation with notebooks and pens by a window"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div className="absolute -left-2 bottom-2 max-w-[270px] rounded-2xl border border-line bg-paper/95 p-5 shadow-xl backdrop-blur sm:-left-10">
              <p className="font-display text-xl italic leading-snug text-ink">
                &ldquo;Every message is read and answered personally.&rdquo;
              </p>
            </div>
            <Sparkle className="twinkle absolute right-4 top-6 h-6 w-6 text-gold" />
          </div>
        </div>

        {/* Quick pathways - stats-type strip */}
        <div className="mt-8 sm:mt-12">
          <ContactWays />
        </div>
      </div>
    </section>
  );
}

export default ContactIntro;

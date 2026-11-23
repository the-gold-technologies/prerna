"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import VedicChakra, { SkyDecor } from "../home/VedicChakra";
import ContactWays from "./ContactWays";

export { ContactWays };

export function ContactIntro() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
      {/* soft background wash, matching the hero palette */}
      <div className="pointer-events-none absolute -right-32 top-0 h-[560px] w-[560px] rounded-full bg-dawn/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[460px] w-[460px] rounded-full bg-astro-soft/60 blur-3xl" />

      {/* rotating rashi chakra on the right side, matching Saanvi hero composition */}
      <div className="pointer-events-none absolute z-0 right-[-10%] sm:right-[-2%] lg:right-6 top-16 sm:top-20 lg:top-14 h-[440px] w-[440px] sm:h-[500px] sm:w-[500px] lg:h-[560px] lg:w-[560px] text-gold-deep opacity-75 sm:opacity-85">
        <div className="orb-pulse absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(232,211,162,0.85),transparent_70%)]" />
        <VedicChakra className="h-full w-full" />
      </div>

      <SkyDecor />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          {/* Eyebrow */}
          <div className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-deep">
            Contact
          </div>

          {/* Heading */}
          <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[1.08] text-ink sm:text-6xl md:text-[3.75rem] lg:text-[4.25rem]">
            <span className="block">Let&apos;s begin your</span>
            <span className="mt-1 block font-display italic font-light normal-case leading-[0.95] text-gold-deep text-[1.15em] sm:text-[1.25em]">
              journey to clarity.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Book a 1-1 consultation, ask a question about your report, or reach
            out to find the right guidance for your path. We&apos;re here, and
            every message is answered personally.
          </p>

          {/* CTA button */}
          <div className="mt-8 flex items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition ring-1 ring-inset ring-gold/45 hover:bg-astro"
            >
              Send a message
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        {/* Quick pathways - stats-type strip in center */}
        <ContactWays />
      </div>
    </section>
  );
}

export default ContactIntro;

"use client";

import React from "react";
import Reveal from "../home/Reveal";

export function AboutQuote() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper lg:py-28">
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[22rem] leading-none text-gold/[0.07]"
      >
        &ldquo;
      </span>
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="font-display text-3xl font-light italic leading-snug sm:text-5xl">
          When you understand yourself, direction stops being something you
          search for.{" "}
          <span className="text-gold-bright">
            It becomes something you see.
          </span>
        </p>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-paper/50">
          PRERNA
        </p>
      </Reveal>
    </section>
  );
}

export default AboutQuote;

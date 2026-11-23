"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";

export const PIPE = [
  { t: "You", d: "Share birth details" },
  { t: "PRERNA system", d: "Secure, private layer", hi: true },
  { t: "Calculation", d: "Trusted astrology & numerology engines" },
  { t: "Interpretation", d: "PRERNA's guides add meaning" },
  { t: "Your call", d: "Walked through 1-1", gold: true },
];

export function ReportPipeline() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,52,136,0.7),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
            How your report is made
          </p>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
            Precise calculation.{" "}
            <em className="text-gold-bright">Human meaning.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <ol className="mt-16 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-0">
            {PIPE.map((p, i) => (
              <React.Fragment key={p.t}>
                <li
                  className={`flex-1 rounded-2xl px-6 py-6 text-center ${p.gold ? "bg-gold text-ink" : p.hi ? "bg-paper text-ink" : "border border-paper/20"}`}
                >
                  <p className="font-display text-2xl">{p.t}</p>
                  <p
                    className={`mt-1 text-sm ${p.gold || p.hi ? "text-ink/70" : "text-paper/60"}`}
                  >
                    {p.d}
                  </p>
                </li>
                {i < PIPE.length - 1 && (
                  <li
                    aria-hidden
                    className="flex justify-center text-gold-bright lg:px-3"
                  >
                    <ArrowRight className="h-5 w-5 rotate-90 lg:rotate-0" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-2xl text-center text-paper/60">
            Your details never go straight to an outside service. PRERNA&apos;s
            own system keeps them secure, checks every calculation and adds our
            interpretation before anything reaches you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

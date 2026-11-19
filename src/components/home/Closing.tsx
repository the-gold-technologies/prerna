"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CelestialScene, LogoMark } from "./art";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const FOOTER = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Self-discovery journey", href: "#journey" },
      { label: "Personalised report", href: "#report" },
      { label: "Free insight", href: "#free-insight" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
    ],
  },
];

export default function Closing() {
  const { openBooking } = useBooking();

  return (
    <>
      {/* Meaning + final CTA */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[9rem] font-semibold text-gold/10 sm:text-[16rem]"
        >
          प्रेरणा
        </span>
        <Reveal className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="arch mx-auto h-40 w-32 shadow-xl sm:h-48 sm:w-36">
            <CelestialScene className="h-full w-full" />
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Prerna · inspiration</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-7xl">
            Begin where <em>you are.</em>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => openBooking()}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition hover:bg-astro sm:w-auto"
            >
              Book a 1-1 session
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <a href="#free-insight" className="w-full rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink hover:bg-card sm:w-auto">
              Try the free insight
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5 text-gold-soft">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-2xl font-semibold tracking-[0.18em] text-paper">PRERNA</span>
            </a>
            <p className="mt-4 max-w-xs font-display text-xl italic text-paper/70">Purpose, Peace & Inner Inspiration.</p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-paper/70 transition hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-paper/10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-sm text-paper/50 sm:flex-row sm:px-8">
            <p>© PRERNA. All rights reserved.</p>
            <p>Guidance, not a substitute for medical or legal advice.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

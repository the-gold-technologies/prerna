"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoMark } from "./art";
import Reveal from "./Reveal";
import { useBooking } from "./BookingProvider";

const FOOTER = [
  {
    title: "Explore",
    links: [
      { label: "Consultations & services", href: "/consultations" },
      { label: "Personalised report & journey", href: "/report" },
      { label: "Free self-assessment & tools", href: "/free-tools" },
      { label: "Today's sky & panchang", href: "/today" },
      { label: "Which element guides you?", href: "/quiz" },
      { label: "Three paths", href: "/#paths" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Blog & articles", href: "/blog" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms & conditions", href: "/terms" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Refund & cancellation", href: "/refund" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

export default function Closing({ showCta = true }: { showCta?: boolean }) {
  const { openBooking } = useBooking();

  return (
    <>
      {/* Meaning + final CTA */}
      {showCta && (
        <section className="relative overflow-hidden bg-card py-28 lg:py-36">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[11rem] font-semibold leading-none text-gold/[0.11] sm:text-[20rem] lg:text-[26rem]"
          >
            प्रेरणा
          </span>
          <Reveal className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
              Prerna · inspiration
            </p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-7xl">
              Begin where <em>you are.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Whether you&apos;re facing a big decision or simply want to
              understand yourself better, your first step can be small. Start
              with a free insight, or talk to us one-to-one.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={() => openBooking()}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro sm:w-auto"
              >
                Book a 1-1 session
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </button>
              <Link
                href="/#free-insight"
                className="w-full rounded-full border border-ink/25 bg-paper/60 px-7 py-4 font-semibold backdrop-blur transition hover:border-ink hover:bg-card sm:w-auto"
              >
                Try the free insight
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-2">
              {[
                "Free to start",
                "Private & confidential",
                "Expert 1-1 guidance",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-gold">✦</span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      <footer className="border-t-2 border-gold/60 bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-gold-soft">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-2xl font-semibold tracking-[0.18em] text-paper">
                PRERNA
              </span>
            </Link>
            <p className="mt-4 max-w-xs font-display text-xl italic text-paper/70">
              Purpose, Peace & Inner Inspiration.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              A self-discovery and personal guidance platform uniting Astrology,
              Psychology and Spirituality.
            </p>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
                {col.title}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-paper/70 transition hover:text-paper"
                    >
                      {l.label}
                    </Link>
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

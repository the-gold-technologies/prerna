"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import Reveal from "../home/Reveal";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-card via-paper to-sand/30 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-astro-soft/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-dawn/40 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="rounded-[36px] border border-gold/30 bg-paper/90 p-8 shadow-xl backdrop-blur sm:p-14 lg:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-sand/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep">
              <Mail className="h-3.5 w-3.5 text-gold-deep" />
              Letters from PRERNA
            </span>
            <h2 className="mt-6 font-display text-4xl font-light leading-tight text-ink sm:text-5xl lg:text-6xl">
              Quiet reflections,{" "}
              <em className="font-normal text-gold-deep">
                delivered with the new moon.
              </em>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-2 sm:text-lg">
              Once a month, we share one carefully written reflection on an
              astrological transit, an emotional pattern, and a practical
              spiritual ritual to ground your days. Never spam, always calming.
            </p>

            {/* Newsletter Form */}
            <div className="mt-8">
              {subscribed ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-sand/80 px-6 py-3.5 text-sm font-semibold text-ink">
                  <Check className="h-4 w-4 text-gold-deep" />
                  Thank you for subscribing. Our next letter will arrive at the
                  new moon.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                  className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full flex-1 rounded-full border border-line bg-paper px-5 py-3.5 text-sm text-ink outline-none transition placeholder:text-ink-3 focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro sm:w-auto"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Guarantees */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-3">
              <span>✦ 1 letter every lunar cycle</span>
              <span>✦ 100% private</span>
              <span>✦ Unsubscribe in one click</span>
            </div>
          </div>

          {/* Quick interactive tools bridge */}
          <div className="mt-12 border-t border-line/80 pt-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink-3">
              Looking for immediate personal insight?
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <Link
                href="/chart"
                className="group flex flex-col justify-between rounded-2xl border border-line bg-card/60 p-5 transition hover:border-gold/60 hover:bg-sand/40"
              >
                <div>
                  <span className="font-display text-lg text-ink">
                    Birth Chart (Kundli)
                  </span>
                  <p className="mt-1 text-xs text-ink-2">
                    Calculate your sidereal lagna, Moon sign & nakshatra.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep transition group-hover:translate-x-1">
                  Open calculator →
                </span>
              </Link>
              <Link
                href="/quiz"
                className="group flex flex-col justify-between rounded-2xl border border-line bg-card/60 p-5 transition hover:border-gold/60 hover:bg-sand/40"
              >
                <div>
                  <span className="font-display text-lg text-ink">
                    Five Elements Quiz
                  </span>
                  <p className="mt-1 text-xs text-ink-2">
                    Discover which element (Agni, Vayu, Jala...) guides you.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep transition group-hover:translate-x-1">
                  Take quiz →
                </span>
              </Link>
              <Link
                href="/today"
                className="group flex flex-col justify-between rounded-2xl border border-line bg-card/60 p-5 transition hover:border-gold/60 hover:bg-sand/40"
              >
                <div>
                  <span className="font-display text-lg text-ink">
                    Today&apos;s Sky
                  </span>
                  <p className="mt-1 text-xs text-ink-2">
                    Planetary transits, tithi, nakshatra & daily Vedic rhythm.
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-deep transition group-hover:translate-x-1">
                  View today&apos;s sky →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Mail, Moon } from "lucide-react";
import Reveal from "../home/Reveal";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-card via-paper to-sand/20 py-24 lg:py-32">
      {/* Sacred Hindi watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[11rem] font-semibold leading-none text-gold/[0.09] sm:text-[18rem] lg:text-[24rem]"
      >
        शान्ति
      </span>

      {/* ambient ethereal background glows */}
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-astro-soft/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-dawn/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-sand/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-deep shadow-sm">
            <Moon className="h-3.5 w-3.5 text-gold-deep" />
            Letters from PRERNA
          </span>

          <h2 className="mt-5 font-display text-4xl font-light leading-[1.12] text-ink sm:text-5xl lg:text-6xl">
            Quiet reflections,{" "}
            <em className="font-normal italic text-gold-deep">
              delivered with the new moon.
            </em>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
            A monthly reflection on transits, inner patterns, and grounding
            rituals. Always calming, never spam.
          </p>

          {/* Newsletter Form */}
          <div className="mt-8">
            {subscribed ? (
              <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-gold/60 bg-sand/80 px-6 py-3.5 text-sm font-semibold text-ink shadow-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/25 text-gold-deep">
                  <Check className="h-3.5 w-3.5" />
                </span>
                Thank you for subscribing. Our next letter will arrive with the
                new moon.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubscribed(true);
                }}
                className="mx-auto max-w-lg"
              >
                <div className="flex flex-col gap-2 rounded-2xl border border-gold/50 bg-paper p-1.5 shadow-[0_8px_30px_-6px_rgba(28,24,68,0.08)] transition-all duration-300 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/25 sm:flex-row sm:items-center sm:rounded-full">
                  <div className="flex flex-1 items-center gap-3 pl-4 sm:pl-5">
                    <Mail className="h-4 w-4 shrink-0 text-gold-deep/70" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address…"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent py-3 text-sm text-ink outline-none placeholder:text-ink-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro hover:text-gold-bright"
                  >
                    Subscribe
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Minimal clean guarantee text */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-ink-3">
            <span>✦ One letter every lunar cycle</span>
            <span>·</span>
            <span>100% private</span>
            <span>·</span>
            <span>Unsubscribe in one click</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

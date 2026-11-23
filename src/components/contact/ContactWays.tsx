"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarHeart,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";

export function ContactWays() {
  const { openBooking } = useBooking();

  const WAYS = [
    {
      badge: "1-on-1 Guidance",
      stat: "Direct",
      Icon: CalendarHeart,
      title: "Book a session",
      text: "Private 45-min video or phone call with an astrologer or counsellor.",
      action: () => openBooking(),
    },
    {
      badge: "Instant & Free",
      stat: "60 sec",
      Icon: Sparkles,
      title: "Free insight",
      text: "Calculate your Vedic life path number and soul archetype in a minute.",
      href: "/#free-insight",
    },
    {
      badge: "Safe Space",
      stat: "100%",
      Icon: ShieldCheck,
      title: "Read common questions",
      text: "Quick answers about sessions, birth details, reports and privacy.",
      href: "#faq",
    },
  ];

  return (
    <Reveal delay={120} className="mx-auto mt-12 max-w-4xl sm:mt-16">
      <div className="overflow-hidden rounded-2xl border border-line/80 bg-card/90 shadow-[0_20px_50px_-25px_rgba(28,24,68,0.25)] backdrop-blur">
        <div className="grid grid-cols-1 divide-y divide-line/70 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          {WAYS.map(({ Icon, title, text, action, href }) => {
            const inner = (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-gold-soft ring-1 ring-inset ring-gold/45 transition duration-300 group-hover:scale-105">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="mt-3 flex items-center justify-center gap-1 font-display text-lg font-medium text-ink transition group-hover:text-gold-deep sm:text-xl">
                  <span>{title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep" />
                </span>
                <span className="mt-1 block max-w-[240px] text-xs leading-relaxed text-ink-3">
                  {text}
                </span>
              </>
            );
            const cls =
              "group flex w-full flex-col items-center justify-center p-5 text-center transition duration-300 hover:bg-sand/40 sm:p-6";
            return href ? (
              <Link key={title} href={href} className={cls}>
                {inner}
              </Link>
            ) : (
              <button
                key={title}
                type="button"
                onClick={action}
                className={cls}
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}

export default ContactWays;

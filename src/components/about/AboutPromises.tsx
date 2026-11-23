"use client";

import React from "react";
import {
  Compass,
  Lock,
  MessageCircleHeart,
  Receipt,
  Scale,
  ShieldCheck,
} from "lucide-react";
import Reveal from "../home/Reveal";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep";

const PROMISES = [
  {
    Icon: Scale,
    t: "Precise calculations",
    d: "Charts are computed through trusted calculation sources, then interpreted by people, not left to a template.",
  },
  {
    Icon: Lock,
    t: "Private & confidential",
    d: "Your birth details and conversations stay with PRERNA. They are never shared or sold.",
  },
  {
    Icon: MessageCircleHeart,
    t: "No fear-based predictions",
    d: "We talk about tendencies, timing and choices. Never doom, never pressure to buy remedies.",
  },
  {
    Icon: Receipt,
    t: "Clear pricing",
    d: "You see the full price of a session or report before you pay anything.",
  },
  {
    Icon: Compass,
    t: "Explained, one to one",
    d: "Every report is walked through on a private call, so nothing is left as jargon.",
  },
  {
    Icon: ShieldCheck,
    t: "Guidance, not a diagnosis",
    d: "PRERNA supports you; it does not replace medical, legal or clinical care.",
  },
];

export function AboutPromises() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className={eyebrow}>How we work</p>
          <h2 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-5xl">
            Calculated with care.{" "}
            <em className="text-psych">Explained without mystery.</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map(({ Icon, t, d }, i) => (
            <Reveal
              key={t}
              delay={(i % 3) * 80}
              className="border-b border-line py-8 sm:pr-10"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-gold-soft ring-1 ring-inset ring-gold/45">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 font-display text-2xl">{t}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutPromises;

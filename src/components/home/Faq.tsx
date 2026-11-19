import React from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Is the self-assessment really free?",
    a: "Yes. The numerology calculator and your first insights are completely free. You only pay if you choose a 1-1 consultation or a full personalised report.",
  },
  {
    q: "Why do you ask for my birth time and place?",
    a: "Vedic astrology calculates your birth chart from the exact moment and location you were born. The more accurate these details are, the more precise your chart and report will be.",
  },
  {
    q: "Do I need to believe in astrology to benefit?",
    a: "Not at all. Many people come to PRERNA for counselling or mindfulness alone. Each system stands on its own, and you choose the guidance that feels right for you.",
  },
  {
    q: "Is astrology a replacement for therapy or medical care?",
    a: "No. PRERNA offers guidance and support for self-understanding. If you are facing a medical or mental-health emergency, please contact a qualified professional or local emergency services.",
  },
  {
    q: "How do the 1-1 consultations work?",
    a: "Choose the type of guidance and the life area you want to focus on, pick a preferred date, and we'll confirm a private consultation call with the right astrologer or counsellor.",
  },
  {
    q: "Is my personal information kept private?",
    a: "Yes. Your details and everything you share in a session are treated as strictly confidential and are only used to prepare your insights and guidance.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">FAQ</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            Questions, <em className="text-astro">answered.</em>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-ink-2">
            Everything you might want to know before beginning. Can&apos;t find your answer?{" "}
            <a href="#contact" className="font-semibold text-ink underline decoration-gold underline-offset-4">
              Write to us
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-2xl leading-snug [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line transition group-open:rotate-45 group-open:bg-ink group-open:text-paper">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-5 pr-12 leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

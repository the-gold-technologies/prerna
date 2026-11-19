"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, CalendarHeart, Sparkles, MessageCircleQuestion, Plus } from "lucide-react";
import Image from "next/image";
import Reveal from "../home/Reveal";
import { useBooking } from "../home/BookingProvider";
import VedicChakra, { SkyDecor } from "../home/VedicChakra";

export function ContactIntro() {
  const { openBooking } = useBooking();

  const WAYS = [
    {
      Icon: CalendarHeart,
      title: "Book a 1-1 session",
      text: "Talk privately with an astrologer or counsellor about what matters to you.",
      action: () => openBooking(),
    },
    {
      Icon: Sparkles,
      title: "Try the free insight",
      text: "Discover your life path number in a minute, before you decide anything.",
      href: "/#free-insight",
    },
    {
      Icon: MessageCircleQuestion,
      title: "Read common questions",
      text: "Quick answers about sessions, birth details, reports and privacy.",
      href: "/#faq",
    },
  ];

  return (
    <section className="relative overflow-hidden pt-[72px]">
      {/* soft background wash, matching the home hero */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-dawn/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-astro-soft blur-3xl" />

      {/* large rotating rashi chakra behind the heading */}
      <div className="pointer-events-none absolute left-1/2 top-[330px] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-gold-deep opacity-[0.22] sm:h-[960px] sm:w-[960px]">
        <VedicChakra className="h-full w-full" />
      </div>
      <SkyDecor />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pb-28 lg:pt-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="relative mx-auto h-40 w-40 sm:h-44 sm:w-44">
            <div className="orb-pulse absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(232,211,162,0.85),rgba(232,211,162,0)_70%)]" />
            <div className="spin-slow absolute -inset-4 rounded-full border border-dashed border-gold/50">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold-bright shadow-[0_0_12px_rgba(214,172,82,0.9)]" />
            </div>
            <div className="relative h-full w-full rounded-full bg-paper p-1.5 shadow-xl ring-1 ring-gold/50">
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/images/sunrise-water.jpg"
                  alt="A person standing with open arms at sunrise, reflected in still water"
                  fill
                  preload
                  sizes="176px"
                  className="object-cover object-[55%_center]"
                />
              </div>
            </div>
          </div>
          <p className="mt-10 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">Contact PRERNA</p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] sm:text-7xl">
            Let&apos;s begin a <em>conversation.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
            A question, help choosing the right guidance, or simply curious about PRERNA — we&apos;re here, and
            every message is read with care.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {WAYS.map(({ Icon, title, text, action, href }, i) => {
            const inner = (
              <>
                <span className="flex w-full items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-gold-soft ring-1 ring-inset ring-gold/45">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep" />
                </span>
                <span className="mt-8 block font-display text-2xl leading-tight">{title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-ink-2">{text}</span>
              </>
            );
            const cls =
              "group flex h-full w-full flex-col items-start rounded-3xl border border-line bg-card/90 p-6 text-left backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_50px_-30px_rgba(28,24,68,0.45)]";
            return (
              <Reveal key={title} delay={i * 110}>
                {href ? (
                  <Link href={href} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <button type="button" onClick={action} className={cls}>
                    {inner}
                  </button>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const QUICK = [
  {
    q: "How soon will I hear back?",
    a: "We aim to reply as quickly as we can. If your message is about an upcoming session, mention the date so we can prioritise it.",
  },
  {
    q: "Can I book a session directly instead?",
    a: "Yes. Use “Book a session” at the top of any page to choose the type of guidance, your life area and a preferred date.",
  },
  {
    q: "Is what I share kept confidential?",
    a: "Always. Your message and personal details are only used to respond to you and prepare your guidance.",
  },
  {
    q: "I'm not sure what kind of help I need.",
    a: "That's completely fine — just describe what's on your mind. We'll suggest whether astrology, counselling or both would suit you best.",
  },
];

export function QuickAnswers() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">Before you write</p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            Quick <em>answers.</em>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-ink-2">
            A few things people often ask us. For everything else, see the full list of questions.
          </p>
          <Link
            href="/#faq"
            className="group mt-8 inline-flex items-center gap-2 font-semibold underline decoration-gold decoration-2 underline-offset-8 transition hover:text-astro"
          >
            View all FAQs
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div className="divide-y divide-line border-y border-line">
            {QUICK.map((f) => (
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

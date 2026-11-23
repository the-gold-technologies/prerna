"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import VedicChakra, { Sparkle } from "../home/VedicChakra";
import { POSTS } from "@/data/blog";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-18 sm:pt-32 lg:pb-20">
      {/* soft ambient glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-astro-soft/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-dawn/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: tall arched portrait with VedicChakra and quote card */}
          <div
            className="rise relative order-2 lg:order-1 lg:col-span-5"
            style={{ animationDelay: "120ms" }}
          >
            <VedicChakra className="pointer-events-none absolute -left-20 -top-16 h-[520px] w-[520px] text-gold opacity-30" />
            <div className="arch relative mx-auto aspect-[3/4] w-full max-w-[440px] ring-1 ring-gold/50 shadow-2xl lg:mx-0">
              <Image
                src="/images/blog-hero.jpg"
                alt="A person reading an inspiring book quietly in warm morning sunlight"
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -right-2 bottom-2 max-w-[270px] rounded-2xl border border-line bg-paper/95 p-5 shadow-xl backdrop-blur sm:-right-8 lg:-right-6">
              <p className="font-display text-xl italic leading-snug text-ink">
                &ldquo;Meet your patterns with patience, not labels.&rdquo;
              </p>
            </div>
            <Sparkle className="twinkle absolute left-4 top-6 h-6 w-6 text-gold" />
          </div>

          {/* Right Column: editorial headline & actions */}
          <div className="rise order-1 lg:order-2 lg:col-span-7 lg:pt-8 lg:pl-4">
            <p className={eyebrow}>The PRERNA Journal · Edition No. 1</p>
            <h1 className="mt-6 font-display text-[3.4rem] font-light leading-[0.95] tracking-tight sm:text-7xl lg:text-[6.2rem]">
              Reflections for the
              <br />
              <em className="font-normal text-gold-deep">inner journey.</em>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2">
              Calm, grounded essays uniting Vedic Astrology, Modern Psychology
              and Eastern Spirituality. Written to help you reflect, recognize
              your patterns, and navigate your seasons with patience.
            </p>

            {/* Action buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#collection"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
              >
                Explore essays
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <Link
                href="/consultations"
                className="rounded-full border border-ink/25 px-7 py-4 font-semibold transition hover:border-ink hover:bg-card"
              >
                Book a session
              </Link>
            </div>

            {/* Editorial facts */}
            <div className="mt-10 flex items-center gap-6 border-t border-line pt-6 text-xs text-ink-3">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gold-deep" />
                {POSTS.length} Longform essays
              </span>
              <span>·</span>
              <span>3 Disciplines</span>
              <span>·</span>
              <span>Always free to read</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

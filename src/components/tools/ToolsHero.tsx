"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NakshatraScale, useSky } from "../sky/SkyParts";

export function ToolsHero() {
  const p = useSky(0);
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-dawn/45 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div className="rise">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              Free self-assessment & tools
            </p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
              The instruments
              <br />
              of <em className="text-gold-deep">self-knowledge.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              Enter a few details and unlock insights instantly. Free, private
              and without sign-up.
            </p>
          </div>
          <Link
            href="/today"
            className="rise group block border-l-2 border-gold pl-6"
            style={{ animationDelay: "120ms" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-3">
              Right now
            </p>
            <p className="mt-2 font-display text-3xl leading-tight text-ink">
              {p ? (
                <>
                  Moon in <em className="text-gold-deep">{p.nakshatra.name}</em>
                  , {p.moonSign.en}
                </>
              ) : (
                "Reading the sky…"
              )}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-2 transition group-hover:text-ink">
              {p ? `${p.tithi.paksha} ${p.tithi.name} · ` : ""}See today&apos;s
              panchang
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </Link>
        </div>

        <div className="rise mt-16" style={{ animationDelay: "200ms" }}>
          <NakshatraScale p={p} />
        </div>
      </div>
    </section>
  );
}

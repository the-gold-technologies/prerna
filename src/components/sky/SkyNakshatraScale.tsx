"use client";

import React from "react";
import { NakshatraScale } from "./SkyParts";
import type { Panchang } from "@/lib/sky";

export function SkyNakshatraScale({ p }: { p: Panchang | null }) {
  return (
    <section className="bg-ink py-20 text-paper lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-bright">
              The live nakshatra scale
            </p>
            <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">
              27 mansions, <em className="text-gold-bright">one sky.</em>
            </h2>
          </div>
          <p className="max-w-md text-paper/65">
            The Moon moves through one nakshatra roughly every day. Your birth
            nakshatra is the one it stood in when you were born.
          </p>
        </div>
        <div className="mt-12">
          <NakshatraScale p={p} dark />
        </div>
      </div>
    </section>
  );
}

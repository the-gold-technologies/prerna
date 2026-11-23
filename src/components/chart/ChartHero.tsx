"use client";

import React from "react";
import Link from "next/link";
import { Download, Link2 } from "lucide-react";
import { action, eyebrow } from "./types";
import type { BirthChart } from "@/lib/chart";

export function ChartHero({
  chart,
  toast,
  onCopyLink,
}: {
  chart: BirthChart | null;
  toast: string;
  onCopyLink: () => void;
}) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 print:pt-4">
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-dawn/50 blur-3xl print:hidden" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-ink-3 print:hidden"
        >
          <Link href="/" className="hover:text-ink">
            PRERNA
          </Link>
          <span className="mx-1.5">/</span>Your Chart
        </nav>
        <div className="mt-6 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className={eyebrow}>Vedic astrology calculator</p>
            <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Your chart, <em className="text-gold-deep">in every detail.</em>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 print:hidden">
              Enter the date, time and place of birth. Your chart is computed in
              your browser and your details are never sent to us.
            </p>
          </div>

          {/* action row */}
          <div className="relative flex flex-wrap items-center gap-2 print:hidden">
            <button
              onClick={() => chart && window.print()}
              disabled={!chart}
              className={action}
            >
              <Download className="h-4 w-4" /> Download
            </button>
            <button onClick={onCopyLink} disabled={!chart} className={action}>
              <Link2 className="h-4 w-4" /> Share link
            </button>
          </div>
        </div>
        {toast && (
          <p
            role="status"
            className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-sm text-paper"
          >
            {toast}
          </p>
        )}
      </div>
    </section>
  );
}

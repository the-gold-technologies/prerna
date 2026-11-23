"use client";

import React from "react";
import { Sparkle } from "../home/VedicChakra";
import { NorthChart, SouthChart, WheelChart } from "./ChartDiagrams";
import { VARGAS, type BirthChart } from "@/lib/chart";

export function ChartDiagramView({
  shown,
  style,
  varga,
  accuracy,
  onStyleChange,
  onVargaChange,
}: {
  shown: BirthChart | null;
  style: "north" | "south" | "wheel";
  varga: number;
  accuracy: string;
  onStyleChange: (s: "north" | "south" | "wheel") => void;
  onVargaChange: (v: number) => void;
}) {
  const vInfo = VARGAS.find((v) => v.n === varga)!;

  return (
    <div className="lg:col-span-7">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex rounded-full border border-gold/40 bg-paper p-1">
          {(["north", "south", "wheel"] as const).map((s) => (
            <button
              key={s}
              onClick={() => onStyleChange(s)}
              aria-pressed={style === s}
              className={`rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] transition ${style === s ? "bg-ink text-gold-bright" : "text-ink-2 hover:text-ink"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {VARGAS.map((v) => (
            <button
              key={v.id}
              onClick={() => onVargaChange(v.n)}
              aria-pressed={varga === v.n}
              title={`${v.name}: ${v.about}`}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${varga === v.n ? "bg-gold text-ink" : "text-ink-3 hover:text-ink"}`}
            >
              {v.id}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-6 rounded-[28px] border border-line bg-card p-6 sm:p-8">
        <Sparkle className="twinkle absolute -right-2 -top-2 h-5 w-5 text-gold print:hidden" />
        {shown ? (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="font-display text-2xl text-ink">
                {vInfo.name}{" "}
                <span className="text-base text-ink-3">· {vInfo.id}</span>
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-ink-3">
                {vInfo.about}
              </p>
            </div>
            <div
              key={`${style}-${varga}`}
              className="rise mx-auto mt-5 max-w-[520px]"
            >
              {style === "north" && <NorthChart c={shown} />}
              {style === "south" && <SouthChart c={shown} title={vInfo.id} />}
              {style === "wheel" && <WheelChart c={shown} />}
            </div>
            {accuracy === "Unknown" && (
              <p className="mt-4 rounded-xl bg-[#7a2a45]/10 px-4 py-2 text-sm text-[#7a2a45]">
                Birth time unknown: the lagna and houses may not be reliable.
                The Moon and planets are still useful.
              </p>
            )}
          </>
        ) : (
          <div className="relative mx-auto max-w-[520px]">
            <svg
              viewBox="0 0 400 400"
              className="w-full opacity-70"
              aria-hidden
            >
              <rect
                x="1"
                y="1"
                width="398"
                height="398"
                fill="none"
                stroke="#e9dcc3"
                strokeWidth="2"
              />
              <path
                d="M0 0 L400 400 M400 0 L0 400 M200 0 L400 200 L200 400 L0 200 Z"
                fill="none"
                stroke="#e9dcc3"
                strokeWidth="2"
              />
            </svg>
            <p className="absolute inset-0 grid place-items-center px-10 text-center font-display text-2xl italic text-ink-3">
              Enter the birth details, and the chart is drawn here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { CORE_UNDERSTANDINGS } from "@/data/prernaData";
import { UserCheck, HeartHandshake, Compass, Waves, Sparkles, Check, ChevronRight } from "lucide-react";

export default function CoreUnderstandings() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <UserCheck className="w-5 h-5 text-[#fae8a4]" />;
      case 1:
        return <HeartHandshake className="w-5 h-5 text-[#fbc4b0]" />;
      case 2:
        return <Compass className="w-5 h-5 text-[#a7d7c5]" />;
      case 3:
        return <Waves className="w-5 h-5 text-[#93c5fd]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#e9d5ff]" />;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <span>Clarity Through Dual-Lens Guidance</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            What PRERNA Helps You <span className="text-gold-gradient">Understand</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light">
            Five fundamental dimensions where life questions become breakthroughs.
          </p>
        </div>

        {/* 5 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_UNDERSTANDINGS.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={item.title}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-7 rounded-3xl transition-all duration-300 relative overflow-hidden border flex flex-col justify-between ${
                  isHovered
                    ? "bg-[#11192e] border-[#d4af37]/60 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.2)] -translate-y-1.5"
                    : "bg-[#0b101c]/90 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Subtle corner numbering */}
                <div className="absolute top-5 right-6 font-mono text-xs text-white/25">
                  0{idx + 1}
                </div>

                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {getIcon(idx)}
                  </div>

                  <div>
                    <h3 className="font-cinzel text-2xl font-bold text-white tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-[#fae8a4] mt-1 font-mono">
                      {item.theme}
                    </p>
                  </div>

                  {/* Contrast Box: The Dilemma vs The PRERNA Breakthrough */}
                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-red-300/80 block mb-1">
                        The Friction:
                      </span>
                      <p className="text-xs text-red-200/90 font-light leading-relaxed">
                        {item.confusion}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#a7d7c5] block mb-1">
                        PRERNA Synthesis:
                      </span>
                      <p className="text-xs text-[#d1fae5] font-light leading-relaxed">
                        {item.clarity}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#fae8a4]">
                  <span className="font-medium tracking-wide">{item.stat}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
                </div>
              </div>
            );
          })}

          {/* 6th Card: The Integrated Synthesis */}
          <div className="p-7 rounded-3xl bg-gradient-to-br from-[#121c33] via-[#0b1222] to-[#070b14] border border-[#d4af37]/40 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-12 -bottom-12 w-44 h-44 rounded-full bg-[#d4af37]/10 blur-2xl group-hover:scale-125 transition-transform" />

            <div className="space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#fae8a4]" />
              </div>

              <div>
                <h3 className="font-cinzel text-2xl font-bold text-[#fae8a4]">
                  Holistic Synthesis
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#cbd5e1] mt-1 font-mono">
                  All 5 Dimensions Integrated
                </p>
              </div>

              <p className="text-xs text-[#cbd5e1] leading-relaxed font-light">
                No human being is a one-dimensional algorithm. PRERNA bridges ancient planetary calculations with empathetic psychological inquiry so you never walk in darkness.
              </p>
            </div>

            <div className="pt-6 border-t border-[#d4af37]/20 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#fae8a4] font-medium">
                Vedic + Psychological + Spiritual
              </span>
              <span className="w-2 h-2 rounded-full bg-[#fae8a4] animate-ping" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

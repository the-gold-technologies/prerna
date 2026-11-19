"use client";

import React, { useState } from "react";
import { THREE_PILLARS } from "@/data/prernaData";
import { Sparkles, Moon, Brain, Flower2, ArrowRight, CheckCircle2 } from "lucide-react";

interface ThreePillarsProps {
  onOpenBooking: () => void;
}

export default function ThreePillars({ onOpenBooking }: ThreePillarsProps) {
  const [activePillarId, setActivePillarId] = useState(THREE_PILLARS[0].id);
  const activePillar = THREE_PILLARS.find((p) => p.id === activePillarId) || THREE_PILLARS[0];

  const pillarIcons: Record<string, React.ReactNode> = {
    astrology: <Moon className="w-5 h-5 text-[#fae8a4]" />,
    psychology: <Brain className="w-5 h-5 text-[#fbc4b0]" />,
    spirituality: <Flower2 className="w-5 h-5 text-[#a7d7c5]" />,
  };

  return (
    <section id="pillars" className="py-24 relative overflow-hidden bg-[#0a0f1d]/80 border-t border-b border-[#d4af37]/15">
      {/* Subtle ambient circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Three Systems</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            Three Pillars of <span className="text-gold-gradient">Inner Wisdom</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            True transformation occurs when cosmic timing, emotional cognition, and spiritual stillness converge. Each pillar illuminates what the other two cannot.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {THREE_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`text-left p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? "bg-[#131d36] border-[#d4af37] shadow-[0_8px_30px_rgba(212,175,55,0.2)] scale-[1.02]"
                    : "bg-[#0c1322]/80 border-white/10 hover:border-white/25 hover:bg-[#10182b]"
                }`}
              >
                {/* Active Indicator Line */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#fae8a4] to-[#c5a059]" />
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {pillarIcons[pillar.id]}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#fae8a4]/70 uppercase">
                        System {pillar.number}
                      </span>
                      <h3 className="font-cinzel text-xl font-bold text-white">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${isSelected ? "border-[#d4af37]/40 text-[#fae8a4] bg-[#d4af37]/10" : "border-white/10 text-white/50"}`}>
                    {pillar.badge}
                  </span>
                </div>

                <p className="text-xs text-[#cbd5e1] font-light line-clamp-2">
                  {pillar.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Focus Card for Active Pillar */}
        <div className="bg-cosmic-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/25 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left detail column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#fae8a4]/10 text-[#fae8a4] border border-[#fae8a4]/20">
                Pillar {activePillar.number} Overview
              </div>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white leading-tight">
                {activePillar.title}
              </h3>
              <p className="font-serif italic text-xl text-[#fae8a4]">
                {activePillar.subtitle}
              </p>
              <p className="text-sm text-[#cbd5e1] leading-relaxed font-light">
                {activePillar.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#070b14] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                >
                  <span>Book {activePillar.title} Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right feature grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activePillar.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#090e1b]/80 border border-white/10 hover:border-[#d4af37]/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center gap-2 text-[#fae8a4]">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#fae8a4] transition-colors">
                      {feature.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#94a3b8] font-light leading-relaxed pl-6">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

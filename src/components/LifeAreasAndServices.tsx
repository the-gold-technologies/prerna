"use client";

import React, { useState } from "react";
import { LIFE_AREAS, LifeAreaDetail } from "@/data/prernaData";
import {
  Briefcase,
  Heart,
  Gem,
  Activity,
  GraduationCap,
  Users,
  Coins,
  Home,
  Compass,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Moon,
  Brain,
  Layers,
  HelpCircle,
} from "lucide-react";

interface LifeAreasAndServicesProps {
  onOpenBookingWithArea?: (areaTitle: string) => void;
}

export default function LifeAreasAndServices({ onOpenBookingWithArea }: LifeAreasAndServicesProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<string>(LIFE_AREAS[0].id);

  const selectedArea = LIFE_AREAS.find((a) => a.id === selectedAreaId) || LIFE_AREAS[0];

  const getAreaIcon = (id: string) => {
    switch (id) {
      case "career":
        return <Briefcase className="w-4 h-4" />;
      case "relationship":
        return <Heart className="w-4 h-4" />;
      case "marriage":
        return <Gem className="w-4 h-4" />;
      case "health":
        return <Activity className="w-4 h-4" />;
      case "education":
        return <GraduationCap className="w-4 h-4" />;
      case "family":
        return <Users className="w-4 h-4" />;
      case "money":
        return <Coins className="w-4 h-4" />;
      case "property":
        return <Home className="w-4 h-4" />;
      case "abroad":
        return <Compass className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <section id="life-areas" className="py-24 relative overflow-hidden bg-[#090d19] border-t border-[#d4af37]/20">
      {/* Background celestial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <Layers className="w-3.5 h-3.5" />
            <span>Scope of Work · 10 × 3 Matrix</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            Consultation & <span className="text-gold-gradient">Service Categories</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            Ten distinct life areas, each served through Vedic astrology and psychological counselling — giving you a clear route from a question in your life to the right kind of guidance.
          </p>
        </div>

        {/* 10 Life Areas Navigation Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 mb-10">
          {LIFE_AREAS.map((area) => {
            const isSelected = area.id === selectedAreaId;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedAreaId(area.id)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[#162344] border-[#d4af37] text-[#fae8a4] shadow-[0_4px_20px_rgba(212,175,55,0.25)] scale-105"
                    : "bg-[#0c1221]/90 border-white/10 text-[#cbd5e1] hover:border-white/20 hover:bg-[#10182b]"
                }`}
              >
                <div className={`p-2 rounded-xl ${isSelected ? "bg-[#d4af37]/20 text-[#fae8a4]" : "bg-white/5 text-white/60"}`}>
                  {getAreaIcon(area.id)}
                </div>
                <div>
                  <span className="text-[9px] font-mono opacity-50 block">{area.number}</span>
                  <span className="text-xs font-medium tracking-wide block truncate max-w-[85px]">
                    {area.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Dual-Lens Deep Dive Card for Selected Life Area */}
        <div className="bg-cosmic-card rounded-3xl p-7 sm:p-10 border border-[#d4af37]/30 shadow-2xl relative">
          {/* Header of Active Area */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#d4af37]/30 to-[#fae8a4]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#fae8a4]">
                {getAreaIcon(selectedArea.id)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#fae8a4]">
                    Area {selectedArea.number}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-xs text-white/60 font-light">
                    Dual-Lens Pathway
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                  {selectedArea.title}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-serif italic text-[#fae8a4] block">
                &ldquo;{selectedArea.tagline}&rdquo;
              </span>
            </div>
          </div>

          {/* Trigger Question Callout */}
          <div className="mb-8 p-4.5 rounded-2xl bg-[#090d19]/80 border border-white/10 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-[#fae8a4] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#fae8a4] block">
                Primary Triggering Question in {selectedArea.title}:
              </span>
              <p className="text-sm text-white font-medium italic mt-0.5">
                &ldquo;{selectedArea.keyTriggerQuestion}&rdquo;
              </p>
            </div>
          </div>

          {/* Dual Lens Comparison Grid: Vedic Astrology vs Counselling / Therapy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Type 1: Vedic Astrology */}
            <div className="p-6 rounded-2xl bg-[#0b1222]/90 border border-[#d4af37]/35 relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Moon className="w-5 h-5 text-[#fae8a4]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#fae8a4]">
                    Service Type 1: Vedic Astrology
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#fae8a4]">
                  Kundli & Transits
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Astrological Focus:
                </h4>
                <p className="text-xs text-[#fae8a4] font-mono">
                  {selectedArea.vedicInsight.focus}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-white/50 block uppercase">
                  Planetary Factors Examined:
                </span>
                <ul className="space-y-1">
                  {selectedArea.vedicInsight.planetaryFactors.map((factor, i) => (
                    <li key={i} className="text-xs text-[#cbd5e1] font-light flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080d1a] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#fae8a4] block mb-1">
                  What It Unlocks:
                </span>
                <p className="text-xs text-[#cbd5e1] font-light leading-relaxed">
                  {selectedArea.vedicInsight.whatItReveals}
                </p>
              </div>
            </div>

            {/* Service Type 2: Counselling / Therapy */}
            <div className="p-6 rounded-2xl bg-[#0b1222]/90 border border-[#e07a5f]/35 relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <Brain className="w-5 h-5 text-[#fbc4b0]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-[#fbc4b0]">
                    Service Type 2: Counselling & Therapy
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#e07a5f]/15 text-[#fbc4b0]">
                  Mind & Behavior
                </span>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-1">
                  Therapeutic Framework:
                </h4>
                <p className="text-xs text-[#fbc4b0] font-mono">
                  {selectedArea.psychologyInsight.focus}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-mono text-white/50 block uppercase">
                  Clinical & Coaching Approaches:
                </span>
                <ul className="space-y-1">
                  {selectedArea.psychologyInsight.therapeuticApproach.map((approach, i) => (
                    <li key={i} className="text-xs text-[#cbd5e1] font-light flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f]" />
                      <span>{approach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#080d1a] border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#fbc4b0] block mb-1">
                  What It Unlocks:
                </span>
                <p className="text-xs text-[#cbd5e1] font-light leading-relaxed">
                  {selectedArea.psychologyInsight.whatItReveals}
                </p>
              </div>
            </div>
          </div>

          {/* Integrated Guidance Outcome & Booking Trigger */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#fae8a4]">
                Synthesis Outcome:
              </span>
              <p className="text-xs sm:text-sm text-[#cbd5e1] font-light max-w-xl">
                {selectedArea.sampleGuidanceOutcome}
              </p>
            </div>

            <button
              onClick={() => onOpenBookingWithArea?.(selectedArea.title)}
              className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fae8a4] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Consult on {selectedArea.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 10 x 3 Proposal Callout Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#121c33] to-[#070b14] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="font-cinzel text-3xl sm:text-4xl font-bold text-[#fae8a4] shrink-0">
              10 × 3
            </div>
            <p className="text-xs sm:text-sm text-[#cbd5e1] font-light">
              Ten life areas, each served through Vedic astrology, counselling and spiritual balance — giving users a clear route from a question in their life to the right kind of guidance.
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#fae8a4] border border-[#d4af37]/30 shrink-0">
            ✓ Included in Phase 1
          </span>
        </div>
      </div>
    </section>
  );
}

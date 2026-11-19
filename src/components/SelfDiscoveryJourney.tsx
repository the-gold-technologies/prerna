"use client";

import React, { useState } from "react";
import { DISCOVERY_STAGES } from "@/data/prernaData";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
  Heart,
  Target,
  Sun,
} from "lucide-react";

interface SelfDiscoveryJourneyProps {
  onOpenBooking: () => void;
}

export default function SelfDiscoveryJourney({ onOpenBooking }: SelfDiscoveryJourneyProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const currentStage = DISCOVERY_STAGES[activeStep];

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <Compass className="w-3.5 h-3.5" />
            <span>Scope of Work · 1-on-1 Guided Flow</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            The 6-Stage <span className="text-gold-gradient">Self-Discovery Journey</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            Offered within our personalised 1-on-1 booking section. Each stage systematically moves you from subconscious conditioning to luminous self-mastery.
          </p>
        </div>

        {/* 6 Stage Horizontal Visual Stepper */}
        <div className="relative mb-12">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-[1px] bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/60 to-[#d4af37]/20 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
            {DISCOVERY_STAGES.map((stage, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#162344] border-[#d4af37] shadow-[0_8px_25px_rgba(212,175,55,0.25)] scale-105"
                      : "bg-[#0b101c]/90 border-white/10 text-white/70 hover:border-white/20 hover:bg-[#0f172a]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-bold text-sm transition-all ${
                      isActive
                        ? "bg-gradient-to-tr from-[#d4af37] to-[#fae8a4] text-[#070b14] shadow-[0_0_15px_#d4af37]"
                        : "bg-white/5 border border-white/10 text-white/50"
                    }`}
                  >
                    {stage.step}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-white block">
                      {stage.title}
                    </span>
                    <span className="text-[10px] text-[#fae8a4]/70 font-mono block">
                      Stage 0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-cosmic-card rounded-3xl p-8 sm:p-12 border border-[#d4af37]/30 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Stage Left Summary */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#fae8a4] px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20">
                <span>Stage 0{currentStage.step} of 06</span>
              </div>
              <h3 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
                {currentStage.title}
              </h3>
              <p className="font-serif italic text-xl text-[#fae8a4]">
                {currentStage.subtitle}
              </p>
              <p className="text-sm text-[#cbd5e1] font-light leading-relaxed">
                {currentStage.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                >
                  <span>Book Stage {currentStage.step} Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Stage Right Combined Tools */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-[#090e1c]/80 border border-white/10 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#fae8a4] block">
                  Each Stage Combines:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentStage.tools.map((tool, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center space-y-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#fae8a4] mx-auto" />
                      <span className="text-xs text-white font-medium block">
                        {tool}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-[#d4af37]/15 to-transparent border border-[#d4af37]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#fae8a4] block">
                      Stage Deliverable:
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {currentStage.deliverable}
                    </span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />
                </div>
              </div>

              {/* Scope breakdown items from page 5 */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-white/50">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  Assessments
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  Astrology Data
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  Psychological Questions
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  Personalised Results
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                  Recommendations & Exercises
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

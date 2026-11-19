"use client";

import React from "react";
import SacredGeometry from "./SacredGeometry";
import { Sparkles, ArrowRight, Compass, Shield, HeartHandshake, Eye } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden cosmic-grid">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#d4af37]/10 via-[#1c2847]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#3b82f6]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Proposal / Platform Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121c33]/80 border border-[#d4af37]/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#fae8a4]">
                Self-Discovery & Personal Guidance Platform
              </span>
            </div>

            {/* Main Brand Title */}
            <div className="space-y-3">
              <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-[#fae8a4] drop-shadow-[0_4px_24px_rgba(212,175,55,0.25)]">
                PRERNA
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#e2d9c8] tracking-wide font-light">
                Purpose, Peace & Inner Inspiration
              </p>
            </div>

            {/* Core Definition from Proposal */}
            <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              A self-discovery and personal guidance platform uniting{" "}
              <span className="text-[#fae8a4] font-medium border-b border-[#d4af37]/40 pb-0.5">
                Astrology
              </span>
              ,{" "}
              <span className="text-[#fbc4b0] font-medium border-b border-[#e07a5f]/40 pb-0.5">
                Psychology
              </span>{" "}
              and{" "}
              <span className="text-[#a7d7c5] font-medium border-b border-[#5e8b7e]/40 pb-0.5">
                Spirituality
              </span>
              . Decode your personality, relationships, emotional patterns, and life direction through automated insights and 1-on-1 consultations.
            </p>

            {/* The 3 Systems Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              <div className="px-3 py-1.5 rounded-lg bg-[#0f172a]/70 border border-[#d4af37]/30 text-xs text-[#fae8a4] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[10px] font-bold text-[#fae8a4]">
                  01
                </span>
                <span>Astrology · Cosmic Timing</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0f172a]/70 border border-[#e07a5f]/30 text-xs text-[#fbc4b0] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#e07a5f]/20 flex items-center justify-center text-[10px] font-bold text-[#fbc4b0]">
                  02
                </span>
                <span>Psychology · Emotional Clarity</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-[#0f172a]/70 border border-[#5e8b7e]/30 text-xs text-[#a7d7c5] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#5e8b7e]/20 flex items-center justify-center text-[10px] font-bold text-[#a7d7c5]">
                  03
                </span>
                <span>Spirituality · Inner Sanctuary</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#free-assessment"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c5a059] text-[#070b14] font-semibold text-sm tracking-wider uppercase shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_35px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#070b14]" />
                <span>Calculate Free Life Path</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#d4af37]/40 bg-[#121c33]/60 backdrop-blur-md text-[#fae8a4] hover:bg-[#d4af37]/15 hover:border-[#fae8a4] transition-all text-sm tracking-wider uppercase flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Book 1-on-1 Journey</span>
                <Compass className="w-4 h-4 text-[#fae8a4]" />
              </button>
            </div>

            {/* Reassurance Features */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#fae8a4] shrink-0" />
                <span className="text-xs text-[#cbd5e1] font-light">100% Confidential</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-[#fae8a4] shrink-0" />
                <span className="text-xs text-[#cbd5e1] font-light">10 Life Dimensions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#fae8a4] shrink-0" />
                <span className="text-xs text-[#cbd5e1] font-light">Integrative 1-on-1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Sacred Geometry with Interactive Orbit */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              <SacredGeometry size={450} />

              {/* Floating Insight Badges around the geometry */}
              <div className="absolute -top-3 right-4 px-3.5 py-1.5 rounded-full bg-[#0d1527]/90 border border-[#d4af37]/40 backdrop-blur-md shadow-xl text-[11px] text-[#fae8a4] flex items-center gap-2 animate-float-slow">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fae8a4]" />
                <span>Pythagorean Numerology</span>
              </div>

              <div className="absolute -bottom-3 left-4 px-3.5 py-1.5 rounded-full bg-[#0d1527]/90 border border-[#e07a5f]/40 backdrop-blur-md shadow-xl text-[11px] text-[#fbc4b0] flex items-center gap-2 animate-float-slow" style={{ animationDelay: "2s" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f]" />
                <span>Vedic Kundli & Navamsa</span>
              </div>

              <div className="absolute top-1/2 -left-6 -translate-y-1/2 px-3 py-1.5 rounded-full bg-[#0d1527]/90 border border-[#5e8b7e]/40 backdrop-blur-md shadow-xl text-[11px] text-[#a7d7c5] hidden sm:flex items-center gap-2 animate-float-slow" style={{ animationDelay: "4s" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#5e8b7e]" />
                <span>Somatic Therapy</span>
              </div>
            </div>

            {/* Document metadata attribution from proposal cover */}
            <div className="text-center pt-3 text-[11px] uppercase tracking-[0.25em] text-[#cbd5e1]/50">
              The Gold Technologies · Proposal V3.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

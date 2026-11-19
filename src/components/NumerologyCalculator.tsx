"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { calculatePythagoreanNumerology } from "@/data/prernaData";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Mail,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Flame,
  Sun,
  Eye,
  BookOpen,
  Share2,
  Copy,
} from "lucide-react";

interface NumerologyCalculatorProps {
  onOpenBooking: () => void;
}

export default function NumerologyCalculator({ onOpenBooking }: NumerologyCalculatorProps) {
  const [formData, setFormData] = useState({
    name: "Aarav Sharma",
    dob: "1995-10-14",
    birthTime: "08:45",
    birthPlace: "New Delhi, India",
    email: "aarav@example.com",
  });

  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculatePythagoreanNumerology> | null>(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      const calc = calculatePythagoreanNumerology(formData.name, formData.dob);
      setResult(calc);
      setIsCalculating(false);
      setHasCalculated(true);

      // Trigger festive golden confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#fae8a4", "#ffffff", "#c5a059"],
        });
      } catch {
        // graceful fallback if canvas not available
      }
    }, 600);
  };

  const handleCopySummary = () => {
    if (!result) return;
    const summary = `PRERNA Life Path Assessment for ${formData.name}:
Life Path Number: ${result.lifePathNumber} — ${result.archetype.title}
Ruling Planet: ${result.archetype.rulingPlanet}
Core Strengths: ${result.archetype.strengths.join(", ")}
Calculated via Pythagorean Numerology at PRERNA.`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="free-assessment" className="py-24 relative overflow-hidden bg-[#0a0f1e] border-t border-b border-[#d4af37]/20">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#3b82f6]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Automated Tool · Included in Phase 1</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            Pythagorean <span className="text-gold-gradient">Numerology Calculator</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            Enter a few basic details to unlock your Life Path, Expression Archetype, and Cosmic Guidance instantly — a free first step into the PRERNA experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Inputs (Scope: Name, Date of birth, Birth time, Birth place, Email) */}
          <div className="lg:col-span-5 bg-cosmic-card rounded-3xl p-7 sm:p-8 border border-[#d4af37]/25 shadow-2xl relative">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-cinzel text-xl font-bold text-white">
                  Enter Your Coordinates
                </h3>
                <p className="text-xs text-[#94a3b8] font-light mt-0.5">
                  5 Essential Inputs for Accurate Resonance
                </p>
              </div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                100% Free
              </span>
            </div>

            <form onSubmit={handleCalculate} className="space-y-4">
              {/* 01 Name */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#cbd5e1] mb-1.5 flex items-center justify-between">
                  <span>01. Full Name</span>
                  <span className="text-[10px] text-white/40">Birth Name Preferred</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#fae8a4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-[#080d1a] border border-white/15 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 02 Date of Birth */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#cbd5e1] mb-1.5 flex items-center justify-between">
                  <span>02. Date of Birth</span>
                  <span className="text-[10px] text-white/40">For Life Path Vector</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#fae8a4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-[#080d1a] border border-white/15 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* 03 Birth Time & 04 Birth Place */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#cbd5e1] mb-1.5">
                    03. Birth Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#fae8a4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="time"
                      name="birthTime"
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      className="w-full bg-[#080d1a] border border-white/15 focus:border-[#d4af37] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#cbd5e1] mb-1.5">
                    04. Birth Place
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#fae8a4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full bg-[#080d1a] border border-white/15 focus:border-[#d4af37] rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 05 Email */}
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#cbd5e1] mb-1.5 flex items-center justify-between">
                  <span>05. Email Address</span>
                  <span className="text-[10px] text-white/40">Confidential Delivery</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#fae8a4] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@domain.com"
                    className="w-full bg-[#080d1a] border border-white/15 focus:border-[#d4af37] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fae8a4] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-widest shadow-[0_4px_20px_rgba(212,175,55,0.35)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isCalculating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#070b14] border-t-transparent rounded-full animate-spin" />
                    <span>Calculating Pythagorean Matrix...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate Pythagorean Insights</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-white/50 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Zero spam · Strictly private · Instant output</span>
              </div>
            </form>
          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-7">
            {!hasCalculated || !result ? (
              /* Pre-calculation State */
              <div className="bg-[#0c1324]/80 rounded-3xl p-8 sm:p-12 border border-white/10 text-center flex flex-col items-center justify-center min-h-[460px] space-y-6">
                <div className="w-20 h-20 rounded-full border border-[#d4af37]/30 flex items-center justify-center bg-[#131d36] relative">
                  <div className="absolute inset-2 rounded-full border border-[#fae8a4]/20 animate-spin-slow" />
                  <Sun className="w-8 h-8 text-[#fae8a4]" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="font-cinzel text-2xl font-bold text-white">
                    Unlock Your Cosmic Blueprint
                  </h4>
                  <p className="text-xs sm:text-sm text-[#94a3b8] font-light leading-relaxed">
                    Pythagorean numerology assigns each letter of your name and each digit of your birth date to primary universal vibrations (1 through 9, and Master Numbers 11, 22, 33).
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Output 1</span>
                    <span className="text-xs font-semibold text-[#fae8a4]">Life Path</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Output 2</span>
                    <span className="text-xs font-semibold text-[#fae8a4]">Destiny No.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Output 3</span>
                    <span className="text-xs font-semibold text-[#fae8a4]">Soul Urge</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#fae8a4]/70 font-mono">
                  Fill in your details on the left and tap calculate
                </p>
              </div>
            ) : (
              /* Calculated Result Card */
              <div className="bg-gradient-to-br from-[#121c33] via-[#0d1527] to-[#070b14] rounded-3xl p-7 sm:p-9 border border-[#d4af37]/40 shadow-2xl relative space-y-6 animate-in fade-in-50 duration-500">
                {/* Result Top Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#d4af37] via-[#fae8a4] to-[#aa821f] flex flex-col items-center justify-center text-[#070b14] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Path</span>
                      <span className="font-cinzel text-2xl font-bold leading-none">
                        {result.lifePathNumber}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#fae8a4]">
                        Pythagorean Archetype
                      </span>
                      <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                        {result.archetype.title}
                      </h4>
                      <p className="text-xs text-[#cbd5e1] font-serif italic">
                        {result.archetype.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySummary}
                      className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Copy Summary"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#fae8a4]" />
                      <span>{copied ? "Copied!" : "Share"}</span>
                    </button>
                  </div>
                </div>

                {/* Numbers Ticker */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#080d19]/80 border border-white/10 text-center">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Life Path</span>
                    <span className="font-cinzel text-xl font-bold text-[#fae8a4]">
                      {result.lifePathNumber}
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Soul Route</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#080d19]/80 border border-white/10 text-center">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Expression</span>
                    <span className="font-cinzel text-xl font-bold text-[#fbc4b0]">
                      {result.destinyNumber}
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Natural Gift</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#080d19]/80 border border-white/10 text-center">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Soul Urge</span>
                    <span className="font-cinzel text-xl font-bold text-[#a7d7c5]">
                      {result.soulUrgeNumber}
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">Heart Desire</span>
                  </div>
                </div>

                {/* Core Essence */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#fae8a4] block mb-1">
                    Essence & Cosmic Frequency
                  </span>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] font-light leading-relaxed">
                    {result.archetype.essence}
                  </p>
                </div>

                {/* Strengths & Shadows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a7d7c5] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      Innate Superpowers
                    </span>
                    <ul className="space-y-1.5">
                      {result.archetype.strengths.map((str, idx) => (
                        <li key={idx} className="text-xs text-[#d1fae5] font-light flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      Karmic Shadow to Balance
                    </span>
                    <p className="text-xs text-amber-200/90 font-light leading-relaxed">
                      {result.archetype.shadow}
                    </p>
                  </div>
                </div>

                {/* Synthesis Guidance & Next Step */}
                <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#d4af37]/15 via-[#fae8a4]/10 to-transparent border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-white">
                      Decode Your Complete Planetary Chart
                    </h5>
                    <p className="text-[11px] text-[#cbd5e1] font-light">
                      Numerology is chapter 1. Combine this with your Vedic Kundli and psychological profile in a 1-on-1 session.
                    </p>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="shrink-0 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book 1-on-1 Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

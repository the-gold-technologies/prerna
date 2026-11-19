"use client";

import React, { useState } from "react";
import { REPORT_CHAPTERS } from "@/data/prernaData";
import {
  FileText,
  Sparkles,
  Layers,
  ArrowRight,
  Cpu,
  UserCheck,
  CheckCircle2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface PersonalisedReportProps {
  onOpenBooking: () => void;
}

export default function PersonalisedReport({ onOpenBooking }: PersonalisedReportProps) {
  const [selectedChapterNo, setSelectedChapterNo] = useState("01");

  const selectedChapter =
    REPORT_CHAPTERS.find((c) => c.no === selectedChapterNo) || REPORT_CHAPTERS[0];

  return (
    <section id="report" className="py-24 relative overflow-hidden bg-[#090d18] border-t border-[#d4af37]/20">
      {/* Ambient background aura */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <FileText className="w-3.5 h-3.5" />
            <span>Premium Comprehensive Dossier · Included in Phase 1</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            The Personalised <span className="text-gold-gradient">Life Report</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            A premium section where users receive a detailed, automated and personalised analysis of their life — combining computational rigor with human empathy.
          </p>
        </div>

        {/* How Each Report is Generated: Two-Tier Architecture from Proposal */}
        <div className="max-w-4xl mx-auto mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#11192e] via-[#0e1628] to-[#11192e] border border-[#d4af37]/30 shadow-xl">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#fae8a4] block text-center mb-6">
            How Each PRERNA Report is Generated
          </span>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Tier 1: Automated APIs */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-[#090e1c] border border-white/10 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-cinzel text-base font-bold text-white">
                Calculation Engine & APIs
              </h4>
              <p className="text-xs text-[#cbd5e1] font-light">
                High-precision ephemeris, planetary coordinates, Pythagorean numerology engines & psychometric algorithmic data.
              </p>
            </div>

            {/* Plus sign */}
            <div className="md:col-span-1 flex items-center justify-center">
              <span className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#fae8a4] font-bold text-lg">
                +
              </span>
            </div>

            {/* Tier 2: PRERNA Interpretation Layer */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-[#090e1c] border border-[#d4af37]/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center mx-auto text-[#fae8a4]">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-cinzel text-base font-bold text-[#fae8a4]">
                1-on-1 Consultation Call Layer
              </h4>
              <p className="text-xs text-[#cbd5e1] font-light">
                PRERNA&apos;s own interpretation, psychological synthesis, bespoke remedies and tailored recommendation layer.
              </p>
            </div>
          </div>
        </div>

        {/* 9 Chapters of the Report */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Chapter Selector List (9 Chapters) */}
          <div className="lg:col-span-5 space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#fae8a4] mb-3 px-1">
              9 Comprehensive Report Chapters:
            </h3>

            {REPORT_CHAPTERS.map((chapter) => {
              const isSelected = selectedChapterNo === chapter.no;
              return (
                <button
                  key={chapter.no}
                  onClick={() => setSelectedChapterNo(chapter.no)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-[#141f38] border-[#d4af37] text-white shadow-[0_4px_16px_rgba(212,175,55,0.2)]"
                      : "bg-[#0b101c]/90 border-white/10 text-white/70 hover:border-white/20 hover:bg-[#0e1628]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs px-2 py-0.5 rounded ${isSelected ? "bg-[#d4af37] text-[#070b14] font-bold" : "bg-white/5 text-white/50"}`}>
                      {chapter.no}
                    </span>
                    <span className="text-xs sm:text-sm font-medium tracking-wide">
                      {chapter.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#fae8a4] transition-transform ${isSelected ? "translate-x-1" : "opacity-40"}`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Chapter Preview Card */}
          <div className="lg:col-span-7 bg-cosmic-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/30 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#fae8a4]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#fae8a4] uppercase tracking-widest">
                    Chapter {selectedChapter.no} Preview
                  </span>
                  <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    {selectedChapter.title}
                  </h4>
                </div>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                Sample Excerpt
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#080d1a] border border-white/10 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                Chapter Scope & Details:
              </span>
              <p className="text-sm text-[#cbd5e1] font-light leading-relaxed">
                {selectedChapter.desc}
              </p>
            </div>

            {/* Visual Sample Page Preview Mockup */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#131e38] to-[#0a1020] border border-[#d4af37]/25 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#fae8a4] pb-3 border-b border-white/10 font-mono">
                <span>PRERNA CONFIDENTIAL DOSSIER</span>
                <span>VOL. I · CHAPTER {selectedChapter.no}</span>
              </div>

              <div className="space-y-2 text-xs text-[#94a3b8] font-light">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-white/80">Planetary Precision Alignment:</span>
                  <span className="font-mono text-[#fae8a4]">99.8% Mathematical Ephemeris</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-white/80">Psychological Profile Mapping:</span>
                  <span className="font-mono text-[#fbc4b0]">Cognitive Archetype Verified</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-white/80">Tailored Actionable Remedies:</span>
                  <span className="font-mono text-[#a7d7c5]">Custom Sound, Gem & Ritual</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#94a3b8] font-light">
                Included in full with every 1-on-1 Consultation package.
              </span>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Personalised Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

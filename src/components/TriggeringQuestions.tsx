"use client";

import React, { useState } from "react";
import { TRIGGERING_QUESTIONS } from "@/data/prernaData";
import { HelpCircle, ChevronDown, Sparkles, Compass, Lightbulb } from "lucide-react";

export default function TriggeringQuestions() {
  const [openId, setOpenId] = useState<string>(TRIGGERING_QUESTIONS[0].id);

  const toggleQuestion = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="questions" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>The Crossroads of Life</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            Real-Life <span className="text-gold-gradient">Triggering Questions</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            The questions that keep you awake at 2 AM are not flaws — they are invitations to align your cosmic timing with deep emotional truth.
          </p>
        </div>

        {/* Questions Accordion */}
        <div className="space-y-4">
          {TRIGGERING_QUESTIONS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#11182c] border-[#d4af37]/50 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(212,175,55,0.15)]"
                    : "bg-[#0b101c]/80 border-white/10 hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs text-[#fae8a4] w-7 h-7 rounded-full bg-[#fae8a4]/10 border border-[#fae8a4]/25 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-snug">
                        {item.question}
                      </h3>
                      {!isOpen && (
                        <p className="text-xs text-[#94a3b8] font-light mt-1 hidden sm:block">
                          {item.preview}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`p-2 rounded-full border border-white/10 bg-white/5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#d4af37]/20 border-[#d4af37]/40 text-[#fae8a4]" : "text-white/60"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10 animate-in fade-in-30 duration-300">
                    <div className="p-4 rounded-xl bg-[#090d19]/80 border border-[#d4af37]/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#fae8a4]">
                        <Lightbulb className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>The PRERNA Triad Approach:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#cbd5e1] font-light leading-relaxed">
                        {item.fullAnswer}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-white/50">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          ✓ Vedic Transit Analysis
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          ✓ Somatic Cognitive Therapy
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
                          ✓ Grounded Action Plan
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

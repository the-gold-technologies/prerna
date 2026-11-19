"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050810] border-t border-[#d4af37]/20 pt-16 pb-12 text-[#94a3b8] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#d4af37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-[#121c33]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#fae8a4] shadow-[0_0_10px_#d4af37]" />
              </div>
              <span className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#fae8a4]">
                PRERNA
              </span>
            </div>

            <p className="font-serif italic text-base text-[#fae8a4]/90">
              Purpose, Peace & Inner Inspiration
            </p>

            <p className="text-xs text-[#cbd5e1] font-light leading-relaxed max-w-sm">
              A self-discovery and personal guidance platform uniting ancient Vedic Astrology, modern Psychology and contemplative Spirituality. Dedicated to aligning human potential with cosmic rhythm.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Strict practitioner confidentiality & proprietary algorithmic security</span>
            </div>
          </div>

          {/* Nav Links Column 1: Core Systems & Tools */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#fae8a4]">
              Platform Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#pillars" className="hover:text-[#fae8a4] transition-colors">
                  01. The Three Systems
                </a>
              </li>
              <li>
                <a href="#life-areas" className="hover:text-[#fae8a4] transition-colors">
                  02. 10 Life Areas
                </a>
              </li>
              <li>
                <a href="#free-assessment" className="hover:text-[#fae8a4] transition-colors">
                  03. Free Numerology Tool
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#fae8a4] transition-colors">
                  04. 6-Stage Journey
                </a>
              </li>
              <li>
                <a href="#report" className="hover:text-[#fae8a4] transition-colors">
                  05. Personalised Report
                </a>
              </li>
              <li>
                <a href="#questions" className="hover:text-[#fae8a4] transition-colors">
                  06. Real-Life Dilemmas
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-[#fae8a4] transition-colors">
                  07. Technical Approach
                </a>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: Legal & Governance from Scope Page 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#fae8a4]">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-[#fae8a4] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fae8a4] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fae8a4] transition-colors">
                  Cookies Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fae8a4] transition-colors">
                  Astrology Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fae8a4] transition-colors">
                  Clinical Ethics Code
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#fae8a4] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#fae8a4]">
              Cosmic Dispatch
            </h4>
            <p className="text-xs text-[#cbd5e1] font-light leading-relaxed">
              Receive weekly planetary transits, psychological grounding prompts, and auspicious muhurta dates.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="your.email@domain.com"
                className="w-full bg-[#080d19] border border-white/15 focus:border-[#d4af37] rounded-l-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
              />
              <button
                type="button"
                className="px-3.5 py-2 bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#070b14] font-bold rounded-r-xl text-xs hover:opacity-90 transition-opacity cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-white/40 block">
              We honor your inbox sanctuary. Unsubscribe anytime.
            </span>
          </div>
        </div>

        {/* Bottom Attribution Bar (Reflecting Proposal Cover and Scope) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 PRERNA. All rights reserved.</span>
            <span>·</span>
            <span className="text-[#fae8a4]">Website Development Proposal V3.0</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1]">
            <span>Crafted by</span>
            <span className="text-[#fae8a4] font-semibold tracking-wider">The Gold Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

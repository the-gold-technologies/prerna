"use client";

import React from "react";
import {
  Server,
  ShieldCheck,
  Zap,
  Sliders,
  Database,
  Lock,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function TechnicalApproach() {
  const benefits = [
    { no: "01", title: "Secure API Credentials", desc: "Third-party calculation keys never leak to client browsers; everything runs through encrypted server routes." },
    { no: "02", title: "Cache Repeated Calculations", desc: "Instant retrieval of identical date/time queries, keeping response times under 150ms." },
    { no: "03", title: "Reduce API Usage & Cost", desc: "Smart algorithmic deduplication saves up to 70% in monthly external calculation overhead." },
    { no: "04", title: "Custom Business Logic", desc: "Incorporate PRERNA's proprietary interpretation rules and psychospiritual scoring filters." },
    { no: "05", title: "Multi-API Aggregation", desc: "Seamlessly combine Swiss Ephemeris, NASA planetary data, and Pythagorean numerology." },
    { no: "06", title: "Provider Agnostic Resilience", desc: "Switch or augment calculation providers without re-architecting client apps." }
  ];

  const adminModules = [
    "01 Users Management",
    "02 Services & Categories",
    "03 Assessment Questions",
    "04 Website Content (CMS)",
    "05 Reports Dispatch",
    "06 Consultation Bookings",
    "07 User Submissions",
    "08 Blog & Articles",
    "09 Tool Configurations",
  ];

  const timelinePhases = [
    { weeks: "W1 - W2", title: "R&D, API Validation & UI/UX Design", status: "Design & Discover" },
    { weeks: "W3 - W4", title: "Website Development & Backend PRERNA API Layer", status: "Core Build" },
    { weeks: "W5 - W7", title: "Reports, 6-Stage Journey & Admin CMS", status: "Feature Expansion" },
    { weeks: "W8 - W9", title: "Testing, Optimisation & Production Handover", status: "Testing & Launch" },
  ];

  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-[#070b14]">
      {/* Background grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121c33] border border-[#d4af37]/30 text-[11px] uppercase tracking-[0.2em] text-[#fae8a4]">
            <Server className="w-3.5 h-3.5" />
            <span>Architecture & Administrative Infrastructure</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide">
            Enterprise <span className="text-gold-gradient">Technical Approach</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg font-light leading-relaxed">
            Rather than connecting client browsers directly to third-party APIs, a dedicated PRERNA backend layer provides data protection, intelligent caching, and proprietary interpretation.
          </p>
        </div>

        {/* Data Flow Diagram from Proposal Page 6 */}
        <div className="p-8 sm:p-10 rounded-3xl bg-cosmic-card border border-[#d4af37]/30 shadow-2xl mb-16">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#fae8a4] block text-center mb-8">
            The Dedicated PRERNA API & Data Flow
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-center">
            <div className="p-4 rounded-2xl bg-[#090e1c] border border-white/10">
              <span className="text-xs font-mono text-white/50 block">01</span>
              <span className="text-sm font-semibold text-white block mt-1">User Input</span>
              <span className="text-[10px] text-[#cbd5e1] block mt-0.5">Encrypted Submission</span>
            </div>

            <div className="flex items-center justify-center text-[#fae8a4]">
              <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
            </div>

            <div className="p-5 rounded-2xl bg-[#14203d] border border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <span className="text-xs font-mono text-[#fae8a4] block">02 Secure Hub</span>
              <span className="text-base font-bold text-white block mt-1">PRERNA Backend</span>
              <span className="text-[10px] text-[#fae8a4]/80 block mt-0.5">Cache & Logic Layer</span>
            </div>

            <div className="flex items-center justify-center text-[#fae8a4]">
              <ArrowRight className="w-5 h-5 rotate-90 sm:rotate-0" />
            </div>

            <div className="p-4 rounded-2xl bg-[#090e1c] border border-white/10">
              <span className="text-xs font-mono text-white/50 block">03 Result</span>
              <span className="text-sm font-semibold text-white block mt-1">Interpreted Guidance</span>
              <span className="text-[10px] text-[#cbd5e1] block mt-0.5">Dossier & Booking</span>
            </div>
          </div>

          {/* 6 Core Architectural Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 mt-10 border-t border-white/10">
            {benefits.map((b) => (
              <div
                key={b.no}
                className="p-4 rounded-xl bg-[#080d19] border border-white/5 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#fae8a4] font-bold">{b.no}</span>
                  <h4 className="text-xs font-semibold text-white">{b.title}</h4>
                </div>
                <p className="text-xs text-[#94a3b8] font-light leading-relaxed pl-6">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Admin CMS & Estimated Timeline Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin CMS Modules */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-cosmic-card border border-[#d4af37]/25 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#fae8a4]">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-[#fae8a4]">Platform Management</span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Admin Panel & CMS
                </h3>
              </div>
            </div>
            <p className="text-xs text-[#cbd5e1] font-light leading-relaxed">
              A single centralized admin panel empowers the PRERNA team to manage users, update questionnaires, schedule consultations, and publish articles with zero developer friction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {adminModules.map((mod, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-[#cbd5e1] flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span className="truncate">{mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Timeline (8-9 weeks) */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-cosmic-card border border-[#d4af37]/25 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#fae8a4]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#fae8a4]">Estimated Timeline</span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                    Project Roadmap
                  </h3>
                </div>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#fae8a4]/10 border border-[#d4af37]/40 text-xs font-bold text-[#fae8a4]">
                8–9 Weeks
              </div>
            </div>

            <p className="text-xs text-[#cbd5e1] font-light leading-relaxed">
              From kick-off to launch, including R&D, design, build, automated tools, testing and deployment.
            </p>

            <div className="space-y-3">
              {timelinePhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#090e1c] border border-white/5 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">{phase.title}</span>
                    <span className="text-[10px] font-mono text-[#fae8a4]">{phase.weeks}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                    {phase.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

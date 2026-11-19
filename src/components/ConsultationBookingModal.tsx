"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { LIFE_AREAS } from "@/data/prernaData";
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  User,
  Mail,
  CheckCircle2,
  Moon,
  Brain,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultArea?: string;
}

export default function ConsultationBookingModal({
  isOpen,
  onClose,
  defaultArea,
}: ConsultationBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [serviceType, setServiceType] = useState<string>("integrative");
  const [selectedArea, setSelectedArea] = useState<string>(defaultArea || "Career");
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    birthTime: "",
    preferredDate: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ["#d4af37", "#fae8a4", "#ffffff"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#131d36] to-[#090e1b] rounded-3xl border border-[#d4af37]/40 shadow-2xl p-6 sm:p-8 text-white overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#fae8a4]">
                Step 1 of 2 · Choose Your Focus
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Book a 1-on-1 Consultation
              </h3>
              <p className="text-xs text-[#cbd5e1] font-light">
                Select your desired guidance pathway and the specific life area you wish to decode.
              </p>
            </div>

            {/* Service Type Selection */}
            <div className="space-y-2.5">
              <label className="text-xs uppercase font-mono tracking-wider text-[#cbd5e1]">
                Select Guidance Pathway:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setServiceType("vedic")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceType === "vedic"
                      ? "bg-[#18274d] border-[#d4af37] text-[#fae8a4]"
                      : "bg-[#0b101d] border-white/10 text-white/70 hover:border-white/20"
                  }`}
                >
                  <Moon className="w-5 h-5 mb-2 text-[#fae8a4]" />
                  <span className="text-xs font-bold block">Vedic Astrology</span>
                  <span className="text-[10px] opacity-70 block mt-0.5">
                    Kundli & planetary timing
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType("counselling")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceType === "counselling"
                      ? "bg-[#18274d] border-[#e07a5f] text-[#fbc4b0]"
                      : "bg-[#0b101d] border-white/10 text-white/70 hover:border-white/20"
                  }`}
                >
                  <Brain className="w-5 h-5 mb-2 text-[#fbc4b0]" />
                  <span className="text-xs font-bold block">Psychological Therapy</span>
                  <span className="text-[10px] opacity-70 block mt-0.5">
                    Behavior & emotional scripts
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setServiceType("integrative")}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    serviceType === "integrative"
                      ? "bg-[#18274d] border-[#fae8a4] text-[#fae8a4] shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                      : "bg-[#0b101d] border-white/10 text-white/70 hover:border-white/20"
                  }`}
                >
                  <Sparkles className="w-5 h-5 mb-2 text-[#fae8a4]" />
                  <span className="text-xs font-bold block">Integrative Dual-Lens</span>
                  <span className="text-[10px] opacity-70 block mt-0.5">
                    Astrology + Psychology (Recommended)
                  </span>
                </button>
              </div>
            </div>

            {/* Life Area Selection */}
            <div className="space-y-2.5">
              <label className="text-xs uppercase font-mono tracking-wider text-[#cbd5e1]">
                Select Primary Life Area (10 Dimensions):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {LIFE_AREAS.map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSelectedArea(area.title)}
                    className={`p-2.5 rounded-lg border text-xs text-center transition-all cursor-pointer truncate ${
                      selectedArea === area.title
                        ? "bg-[#d4af37]/20 border-[#d4af37] text-[#fae8a4] font-semibold"
                        : "bg-[#080d19] border-white/10 text-white/70 hover:border-white/20"
                    }`}
                  >
                    {area.title}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fae8a4] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-widest shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#fae8a4]">
                  Step 2 of 2 · Confidential Coordinates
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-white/50 hover:text-white underline"
                >
                  Change focus
                </button>
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Consultation in {selectedArea}
              </h3>
              <p className="text-xs text-[#cbd5e1] font-light">
                Session Mode:{" "}
                <span className="text-[#fae8a4] font-medium capitalize">
                  {serviceType === "integrative" ? "Integrative Dual-Lens" : serviceType}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#cbd5e1] mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#fae8a4] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-[#080d19] border border-white/15 focus:border-[#d4af37] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#cbd5e1] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#fae8a4] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full bg-[#080d19] border border-white/15 focus:border-[#d4af37] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#cbd5e1] mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-[#fae8a4] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={form.dob}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                    className="w-full bg-[#080d19] border border-white/15 focus:border-[#d4af37] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#cbd5e1] mb-1">
                  Birth Time & Place
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-[#fae8a4] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={form.birthTime}
                    onChange={(e) => setForm({ ...form, birthTime: e.target.value })}
                    placeholder="e.g. 08:30 AM, Mumbai"
                    className="w-full bg-[#080d19] border border-white/15 focus:border-[#d4af37] rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#cbd5e1] mb-1">
                Specific Question or Challenge (Optional)
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Share any context or life question you want addressed in your consultation..."
                className="w-full bg-[#080d19] border border-white/15 focus:border-[#d4af37] rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-white/60 hover:text-white"
              >
                ← Back
              </button>

              <button
                type="submit"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#fae8a4] to-[#c5a059] text-[#070b14] font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                Confirm Consultation Request
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-white/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Strict practitioner confidentiality & NDA compliant</span>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-2xl font-bold text-white">
                Consultation Request Received
              </h3>
              <p className="text-xs sm:text-sm text-[#cbd5e1] font-light max-w-md mx-auto">
                Thank you, <span className="text-[#fae8a4] font-medium">{form.name || "Seeker"}</span>. Your request for an{" "}
                <span className="text-[#fae8a4] capitalize">{serviceType}</span> session focusing on{" "}
                <span className="text-[#fae8a4]">{selectedArea}</span> has been securely logged.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#080d19] border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#fae8a4] block">
                Next Steps:
              </span>
              <p className="text-[#cbd5e1] font-light">
                1. Our coordinator will match your coordinates with an accredited Vedic Astrologer & Licensed Psychotherapist.
              </p>
              <p className="text-[#cbd5e1] font-light">
                2. You will receive private calendar scheduling links via email within 4 hours.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

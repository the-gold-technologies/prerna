"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Menu, X, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The 3 Pillars", href: "#pillars" },
    { label: "10 Life Areas", href: "#life-areas" },
    { label: "Free Numerology", href: "#free-assessment" },
    { label: "6-Stage Journey", href: "#journey" },
    { label: "Personalised Report", href: "#report" },
    { label: "Questions & Insights", href: "#questions" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#070b14]/90 backdrop-blur-md border-b border-[#d4af37]/20 py-3 shadow-2xl shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full border border-[#d4af37]/40 flex items-center justify-center bg-gradient-to-br from-[#121c33] to-[#070b14] group-hover:border-[#fae8a4] transition-colors">
              {/* Mini Sacred Rings */}
              <div className="absolute inset-1 rounded-full border border-[#d4af37]/30 animate-spin-slow" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#fae8a4] shadow-[0_0_10px_#d4af37]" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#fae8a4] group-hover:text-white transition-colors">
                PRERNA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#cbd5e1]/70 -mt-0.5">
                Purpose · Peace · Inner Inspiration
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-wider text-[#cbd5e1] hover:text-[#fae8a4] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#free-assessment"
              className="text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-[#d4af37]/30 text-[#fae8a4] hover:bg-[#d4af37]/10 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#fae8a4]" />
              Free Tool
            </a>
            <button
              onClick={onOpenBooking}
              className="text-xs tracking-wider uppercase px-4.5 py-2.2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c5a059] text-[#070b14] font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              1-on-1 Consultation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#cbd5e1] hover:text-[#fae8a4] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1020]/95 backdrop-blur-xl border-b border-[#d4af37]/20 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-wider text-[#cbd5e1] hover:text-[#fae8a4] py-1"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#free-assessment"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-xs tracking-wider uppercase px-4 py-2.5 rounded-full border border-[#d4af37]/40 text-[#fae8a4]"
              >
                Free Numerology Calculator
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="text-center text-xs tracking-wider uppercase px-4 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-[#070b14] font-bold shadow-lg"
              >
                Book 1-on-1 Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

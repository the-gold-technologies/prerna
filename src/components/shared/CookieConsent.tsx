"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "prerna_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore localStorage errors (e.g. private browsing)
    }
  }, []);

  const handleChoice = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore localStorage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-[360px] rounded-2xl border border-gold/60 bg-[#fdfbf7] p-5 text-ink shadow-[0_25px_60px_-15px_rgba(18,15,43,0.35)] transition-all duration-300 sm:bottom-6 sm:right-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/15 text-gold-deep">
            <Cookie className="h-4 w-4" />
          </div>
          <h3 className="font-display text-lg font-medium text-ink">
            Cookie choices
          </h3>
        </div>
        <button
          type="button"
          onClick={() => handleChoice("rejected")}
          className="cursor-pointer rounded-full p-1 text-ink-3 transition hover:bg-sand hover:text-ink"
          aria-label="Close cookie banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-2">
        We use cookies to maintain your session, provide personalized Vedic
        insights, and understand how you interact with our tools. Read our{" "}
        <Link
          href="/cookies"
          className="font-medium text-gold-deep underline underline-offset-2 transition hover:text-ink"
        >
          Cookie Policy
        </Link>
        .
      </p>

      <div className="mt-4 flex items-center justify-end gap-2.5">
        <button
          type="button"
          onClick={() => handleChoice("rejected")}
          className="cursor-pointer rounded-full border border-ink/20 px-4 py-1.5 text-xs font-semibold text-ink transition hover:border-ink hover:bg-sand/60"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => handleChoice("accepted")}
          className="cursor-pointer rounded-full bg-ink px-5 py-1.5 text-xs font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro"
        >
          Accept
        </button>
      </div>
    </aside>
  );
}

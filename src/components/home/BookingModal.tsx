"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { X, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { LIFE_AREAS } from "@/data/prernaData";
import { ZodiacWheel, MindRipples, Lotus } from "./art";

const SERVICES = [
  { id: "astrology", label: "Vedic Astrology", hint: "Kundli, compatibility, timing", Art: ZodiacWheel, tone: "text-astro bg-astro-soft" },
  { id: "counselling", label: "Counselling", hint: "Emotional & relationship support", Art: MindRipples, tone: "text-psych bg-psych-soft" },
  { id: "journey", label: "Self-Discovery Journey", hint: "All three, guided 1-1", Art: Lotus, tone: "text-spirit bg-spirit-soft" },
];

const inputCls =
  "w-full rounded-xl border border-line bg-card px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 outline-none transition focus:border-gold focus:ring-4 focus:ring-gold-soft/60";

export default function BookingModal({ defaultArea, onClose }: { defaultArea?: string; onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [service, setService] = useState("journey");
  const [area, setArea] = useState(defaultArea ?? "Career");
  const [form, setForm] = useState({ name: "", email: "", date: "", note: "" });
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to PRERNA backend / booking API
    setStep(3);
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.55 }, colors: ["#b8862f", "#ead6a8", "#a24e33", "#44705a"] });
    } catch {}
  };

  const chosen = SERVICES.find((s) => s.id === service)!;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className="rise relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[28px] bg-paper p-6 shadow-2xl outline-none sm:rounded-[28px] sm:p-9"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-line text-ink-2 transition hover:bg-sand"
        >
          <X className="h-4 w-4" />
        </button>

        {step < 3 && (
          <div className="mb-6 flex gap-1.5 pr-14">
            {[1, 2].map((s) => (
              <span key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-ink" : "bg-line"}`} />
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 id="booking-title" className="font-display text-4xl leading-tight">
              How can we help?
            </h2>
            <div className="mt-6 grid gap-3">
              {SERVICES.map(({ id, label, hint, Art, tone }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setService(id)}
                  aria-pressed={service === id}
                  className={`flex items-center gap-4 rounded-2xl border p-3 text-left transition ${
                    service === id ? "border-ink bg-card shadow-sm" : "border-line hover:border-ink-3"
                  }`}
                >
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${tone}`}>
                    <Art className="h-11 w-11" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{label}</span>
                    <span className="block text-sm text-ink-2">{hint}</span>
                  </span>
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full border ${
                      service === id ? "border-ink bg-ink text-paper" : "border-line"
                    }`}
                  >
                    {service === id && <Check className="h-3.5 w-3.5" />}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-7 text-sm font-semibold">Life area</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LIFE_AREAS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setArea(a.title)}
                  aria-pressed={area === a.title}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    area === a.title ? "border-ink bg-ink text-paper" : "border-line text-ink-2 hover:border-ink-3"
                  }`}
                >
                  {a.title}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 font-semibold text-paper transition hover:bg-astro"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={submit}>
            <h2 id="booking-title" className="font-display text-4xl leading-tight">
              Your details
            </h2>
            <p className="mt-2 text-sm text-ink-2">
              {chosen.label} · {area}
            </p>
            <div className="mt-6 grid gap-3">
              <input required placeholder="Full name" className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
              <input required type="email" placeholder="Email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
              <label className="grid gap-1.5 text-sm text-ink-2">
                Preferred date
                <input required type="date" className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <textarea rows={3} placeholder="Anything you'd like us to know? (optional)" className={`${inputCls} resize-none`} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
            </div>
            <div className="mt-8 flex gap-3">
              <button type="button" onClick={() => setStep(1)} aria-label="Back" className="grid h-[56px] w-[56px] shrink-0 place-items-center rounded-full border border-line transition hover:bg-sand">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-paper transition hover:bg-astro">
                Request session <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-ink-3">Private & confidential. We&apos;ll confirm a time by email.</p>
          </form>
        )}

        {step === 3 && (
          <div className="py-6 text-center">
            <div className="mx-auto h-40 w-40 text-spirit">
              <Lotus className="h-full w-full" />
            </div>
            <h2 id="booking-title" className="mt-4 font-display text-4xl">
              Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-ink-2">We&apos;ll reach out at {form.email} to confirm your session.</p>
            <button onClick={onClose} className="mt-8 rounded-full border border-ink px-7 py-3 font-semibold transition hover:bg-ink hover:text-paper">
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

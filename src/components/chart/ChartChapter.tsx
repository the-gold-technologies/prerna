"use client";

import React, { useEffect, useRef, useState } from "react";

/* True once the element has scrolled into view (used to start grow animations). */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* Numbered chapter heading shared by every results section. */
export function ChapterHead({
  n,
  kicker,
  title,
  intro,
  dark = false,
}: {
  n: string;
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className="grid gap-6 border-b pb-8 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10 print:border-line"
      style={{
        borderColor: dark ? "rgba(250,246,238,0.15)" : "var(--color-line)",
      }}
    >
      <span
        className={`font-display text-7xl font-light leading-none sm:text-8xl ${dark ? "text-gold-bright/80" : "text-gold/70"}`}
        aria-hidden
      >
        {n}
      </span>
      <div>
        <p
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${dark ? "text-gold-bright" : "text-gold-deep"}`}
        >
          {kicker}
        </p>
        <h2 className="mt-2 font-display text-4xl font-light leading-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      {intro && (
        <p
          className={`max-w-sm text-sm leading-relaxed md:text-right ${dark ? "text-paper/60" : "text-ink-2"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

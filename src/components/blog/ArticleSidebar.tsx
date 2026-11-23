"use client";

import React, { useEffect, useState } from "react";
import { BookButton } from "../shared/Buttons";

export type Heading = { id: string; text: string };

/* Sticky article rail: title, live section index and reading progress. */
export default function ArticleSidebar({
  title,
  category,
  readMinutes,
  headings,
  bodyId,
}: {
  title: string;
  category: string;
  readMinutes: number;
  headings: Heading[];
  bodyId: string;
}) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  // Highlight the section currently in the reading zone.
  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  // Reading progress through the article body.
  useEffect(() => {
    const body = document.getElementById(bodyId);
    if (!body) return;
    const onScroll = () => {
      const r = body.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const done = window.innerHeight * 0.4 - r.top;
      setProgress(Math.min(1, Math.max(0, done / Math.max(total, 1))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [bodyId]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* thin progress bar under the nav, all screen sizes */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-deep">
            {category} · {readMinutes} min
          </p>
          <p className="mt-3 font-display text-2xl leading-snug text-ink">
            {title}
          </p>

          {headings.length > 0 && (
            <nav aria-label="In this article" className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-3">
                In this article
              </p>
              <ol className="relative mt-4 border-l border-line">
                {/* progress rail */}
                <span
                  aria-hidden
                  className="absolute -left-px top-0 w-px origin-top bg-gold transition-transform duration-150"
                  style={{ height: "100%", transform: `scaleY(${progress})` }}
                />
                {headings.map((h) => {
                  const on = h.id === active;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        onClick={go(h.id)}
                        aria-current={on ? "location" : undefined}
                        className={`-ml-px block border-l-2 py-2 pl-4 text-sm leading-snug transition ${
                          on
                            ? "border-gold font-semibold text-ink"
                            : "border-transparent text-ink-3 hover:text-ink"
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}

          <div className="mt-10 rounded-2xl border border-gold/30 bg-card p-5">
            <p className="font-display text-lg leading-snug text-ink">
              Want this read for your own chart?
            </p>
            <BookButton
              label="Book a 1-1 session"
              className="mt-4 w-full !px-5 !py-3 text-sm"
            />
          </div>
        </div>
      </aside>
    </>
  );
}

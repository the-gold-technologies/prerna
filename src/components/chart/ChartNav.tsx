"use client";

import React, { useEffect, useState } from "react";
import { Download, Link2, PencilLine } from "lucide-react";

export const CHAPTERS = [
  { id: "ch-chart", label: "Chart" },
  { id: "ch-seasons", label: "Seasons" },
  { id: "ch-strength", label: "Strengths" },
  { id: "ch-karakas", label: "Karakas" },
  { id: "ch-transits", label: "Transits" },
];

/* Sticky chapter bar shown once a chart is cast, with scroll-spy and actions. */
export function ChartNav({
  name,
  toast,
  onCopyLink,
}: {
  name: string;
  toast: string;
  onCopyLink: () => void;
}) {
  const [active, setActive] = useState(CHAPTERS[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    CHAPTERS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  const btn =
    "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink-2 transition hover:bg-sand hover:text-ink";

  return (
    <div className="sticky top-[72px] z-30 border-y border-line bg-paper/90 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-2.5 sm:px-8">
        <p className="hidden max-w-[180px] truncate font-display text-lg text-ink lg:block">
          {name}
        </p>
        <nav
          aria-label="Chart chapters"
          className="-mx-1 flex flex-1 gap-1 overflow-x-auto px-1 lg:justify-center"
        >
          {CHAPTERS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => go(c.id)}
              aria-current={active === c.id ? "true" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                active === c.id
                  ? "bg-ink text-gold-bright"
                  : "text-ink-3 hover:text-ink"
              }`}
            >
              <span className="font-display text-sm normal-case tracking-normal opacity-70">
                0{i + 1}
              </span>
              {c.label}
            </button>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => go("chart-form")}
            className={btn}
            title="Edit birth details"
          >
            <PencilLine className="h-4 w-4" />
            <span className="hidden xl:inline">Edit</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className={btn}
            title="Download as PDF"
          >
            <Download className="h-4 w-4" />
            <span className="hidden xl:inline">Download</span>
          </button>
          <button
            type="button"
            onClick={onCopyLink}
            className={btn}
            title="Copy a share link"
          >
            <Link2 className="h-4 w-4" />
            <span className="hidden xl:inline">Share</span>
          </button>
        </div>
      </div>
      {toast && (
        <p
          role="status"
          className="rise absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm text-paper shadow-lg"
        >
          {toast}
        </p>
      )}
    </div>
  );
}

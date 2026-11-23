"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ZodiacWheel } from "../home/art";
import { Sparkle } from "../home/VedicChakra";
import { CHAPTERS, ROMAN } from "./chapters";

/* An open book whose pages can be turned: drag / swipe a page and it follows
 * the pointer in 3D, click either half, or use the arrows below.
 *
 * Pages are laid out as leaves hinged on the spine. Leaf k carries page
 * 2k+1 on its front (right-hand side) and page 2k+2 on its back (seen on the
 * left once turned). Page 0 is fixed on the left, the last page on the right. */

const SAMPLE = [
  ["Lagna", "Simha"],
  ["Moon", "Rohini"],
  ["Dasha", "Jupiter"],
];

const FLIP_MS = 750;

/* ---------- page shells ---------- */

function Sheet({
  side,
  tone = "card",
  children,
}: {
  side: "left" | "right";
  tone?: "card" | "paper";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col overflow-hidden p-3 sm:p-8 ${
        tone === "paper" ? "bg-paper" : "bg-card"
      } ${side === "left" ? "rounded-l-[14px]" : "rounded-r-[14px]"}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 w-10 sm:w-16 ${
          side === "left"
            ? "right-0 bg-gradient-to-l from-ink/[0.09]"
            : "left-0 bg-gradient-to-r from-ink/[0.12]"
        } to-transparent`}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

function Folio({ n, label }: { n: string | number; label?: string }) {
  return (
    <p className="mt-auto flex items-center justify-between pt-3 text-[7px] uppercase tracking-[0.2em] text-ink-3 sm:pt-5 sm:text-[10px]">
      <span>{label ?? "PRERNA · Life Map"}</span>
      <span className="font-display text-[10px] normal-case tracking-normal sm:text-sm">
        {n}
      </span>
    </p>
  );
}

function CoverPage() {
  return (
    <Sheet side="left">
      <p className="whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.25em] text-gold-deep sm:text-[10px] sm:tracking-[0.3em]">
        <span className="hidden sm:inline">PRERNA · </span>Personal report
      </p>
      <p className="mt-2 whitespace-nowrap font-display text-[1.4rem] leading-none text-ink sm:mt-3 sm:text-[2.6rem]">
        Your Life Map
      </p>
      <div className="mt-2.5 h-px w-12 bg-gold sm:mt-4 sm:w-16" />
      <div className="relative mx-auto my-auto aspect-square w-[62%] sm:w-[64%]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(235,232,247,0.9),transparent_70%)]" />
        <ZodiacWheel className="spin-slow relative h-full w-full text-astro" />
      </div>
      <dl className="grid grid-cols-3 gap-1 border-t border-line pt-2.5 sm:gap-3 sm:pt-4">
        {SAMPLE.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[7px] uppercase tracking-[0.2em] text-ink-3 sm:text-[10px]">
              {k}
            </dt>
            <dd className="mt-0.5 font-display text-[11px] text-ink sm:mt-1 sm:text-base">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </Sheet>
  );
}

function ContentsPage() {
  return (
    <Sheet side="right" tone="paper">
      <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-ink-3 sm:text-[10px]">
        Contents
      </p>
      <ol className="mt-2 sm:mt-4">
        {CHAPTERS.map((c, i) => (
          <li
            key={c.t}
            className={`flex items-baseline gap-1.5 py-[2.5px] text-[8.5px] sm:gap-2.5 sm:py-[7px] sm:text-[13px] ${
              i === 2
                ? "-mx-1.5 rounded-md bg-gold-soft/45 px-1.5 sm:-mx-2.5 sm:px-2.5"
                : ""
            }`}
          >
            <span className="w-3.5 shrink-0 font-display text-gold-deep sm:w-7">
              {ROMAN[i]}
            </span>
            <span className="min-w-0 truncate text-ink">{c.t}</span>
            <span
              aria-hidden
              className="mb-[3px] min-w-2 flex-1 border-b border-dotted border-ink/20"
            />
            <span className="shrink-0 tabular-nums text-ink-3">
              {(i + 1) * 4}
            </span>
          </li>
        ))}
      </ol>
      <Folio n="ii" label="Vedic · Psychological" />
    </Sheet>
  );
}

function ChapterOpener({ i }: { i: number }) {
  const c = CHAPTERS[i];
  return (
    <Sheet side="left">
      <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-gold-deep sm:text-[10px]">
        Chapter {ROMAN[i]}
      </p>
      <div className="my-auto">
        <p className="font-display text-[3.2rem] font-light leading-none text-gold/80 sm:text-[7rem]">
          {ROMAN[i]}
        </p>
        <p className="mt-1 font-display text-sm italic text-gold-deep sm:mt-3 sm:text-2xl">
          {c.v}
        </p>
        <p className="mt-0.5 font-display text-lg leading-tight text-ink sm:text-[2.2rem]">
          {c.t}
        </p>
        <div className="mt-2 h-px w-10 bg-gold sm:mt-4 sm:w-16" />
      </div>
      <Folio n={(i + 1) * 4} />
    </Sheet>
  );
}

/* the facing page: the chapter summary followed by "report text" */
const LINES = [92, 100, 86, 97, 64, 0, 100, 90, 95, 72];

function ChapterBody({ i }: { i: number }) {
  const c = CHAPTERS[i];
  return (
    <Sheet side="right" tone="paper">
      <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-ink-3 sm:text-[10px]">
        {c.t}
      </p>
      <p className="mt-2 font-display text-[11px] leading-snug text-ink sm:mt-5 sm:text-xl sm:leading-snug">
        <span className="float-left mr-0.5 mt-0.5 font-display text-2xl leading-[0.8] text-gold-deep sm:mr-1 sm:mt-1 sm:text-[2.9rem]">
          {c.d[0]}
        </span>
        {c.d.slice(1)}
      </p>
      <div aria-hidden className="mt-3 space-y-1.5 sm:mt-7 sm:space-y-2.5">
        {LINES.map((w, j) =>
          w ? (
            <span
              key={j}
              className="block h-[3px] rounded-full bg-ink/[0.09] sm:h-[5px]"
              style={{ width: `${w - ((i * 7 + j * 5) % 12)}%` }}
            />
          ) : (
            <span key={j} className="block h-1 sm:h-2" />
          )
        )}
      </div>
      <Folio n={(i + 1) * 4 + 1} label={`${ROMAN[i]} · ${c.v}`} />
    </Sheet>
  );
}

function ClosingPage() {
  return (
    <Sheet side="left">
      <div className="my-auto text-center">
        <Sparkle className="mx-auto h-5 w-5 text-gold sm:h-8 sm:w-8" />
        <p className="mt-3 font-display text-base italic leading-snug text-ink sm:mt-6 sm:text-3xl">
          “A chart is not a verdict. It is a map, and maps are meant to be
          walked.”
        </p>
        <div className="mx-auto mt-3 h-px w-10 bg-gold sm:mt-6 sm:w-16" />
      </div>
      <Folio n={41} />
    </Sheet>
  );
}

function EndPage({ onBook }: { onBook: () => void }) {
  return (
    <Sheet side="right" tone="paper">
      <div className="my-auto text-center">
        <p className="text-[7px] font-semibold uppercase tracking-[0.3em] text-gold-deep sm:text-[10px]">
          Your turn
        </p>
        <p className="mt-2 font-display text-lg leading-tight text-ink sm:mt-4 sm:text-[2.2rem]">
          Ready to read <em className="text-gold-deep">your</em> map?
        </p>
        <button
          type="button"
          onClick={onBook}
          className="mx-auto mt-3 flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[9px] font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro sm:mt-7 sm:gap-2 sm:px-6 sm:py-3 sm:text-sm"
        >
          Get my report
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </button>
      </div>
      <Folio n={42} label="Explained on a 1-1 call" />
    </Sheet>
  );
}

/* ---------- the book ---------- */

export function LifeMapBook({ onBook }: { onBook: () => void }) {
  const pages: React.ReactNode[] = [
    <CoverPage key="cover" />,
    <ContentsPage key="contents" />,
    ...CHAPTERS.flatMap((_, i) => [
      <ChapterOpener key={`o${i}`} i={i} />,
      <ChapterBody key={`b${i}`} i={i} />,
    ]),
    <ClosingPage key="closing" />,
    <EndPage key="end" onBook={onBook} />,
  ];
  const leaves = (pages.length - 2) / 2; // 10
  const labels = ["Contents", ...CHAPTERS.map((c) => c.t), "Your turn"];

  const [cur, setCur] = useState(0); // number of leaves turned
  const [drag, setDrag] = useState<{ k: number; a: number } | null>(null);
  const [live, setLive] = useState(false); // pointer is actively dragging
  const touched = useRef(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const ptr = useRef<{
    x: number;
    y: number;
    w: number;
    moved: boolean;
  } | null>(null);

  const go = (n: number) => {
    touched.current = true;
    setDrag(null);
    setCur(Math.max(0, Math.min(leaves, n)));
  };

  // a gentle one-time "peek" so people discover the pages turn
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t1 = setTimeout(() => {
      if (!touched.current) setDrag({ k: 0, a: -32 });
    }, 1800);
    const t2 = setTimeout(() => {
      if (!touched.current) setDrag(null);
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* --- tilt toward the mouse (CSS vars, no re-render) --- */
  const tilt = (e: React.PointerEvent) => {
    const el = tiltRef.current;
    if (!el || e.pointerType !== "mouse" || ptr.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${-7 + x * 6}deg`);
    el.style.setProperty("--rx", `${8 - y * 5}deg`);
  };
  const untilt = () => {
    tiltRef.current?.style.removeProperty("--ry");
    tiltRef.current?.style.removeProperty("--rx");
  };

  /* --- drag / swipe to turn --- */
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a")) return;
    const r = bookRef.current!.getBoundingClientRect();
    ptr.current = { x: e.clientX, y: e.clientY, w: r.width / 2, moved: false };
    touched.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    tilt(e);
    const p = ptr.current;
    if (!p) return;
    const dx = e.clientX - p.x;
    if (!p.moved && Math.abs(dx) < 6) return;
    if (!p.moved) {
      // a mostly-vertical gesture is a scroll, not a page turn
      if (Math.abs(e.clientY - p.y) > Math.abs(dx)) {
        ptr.current = null;
        return;
      }
      p.moved = true;
      setLive(true);
    }
    const t = (dx / p.w) * 180;
    if (dx < 0 && cur < leaves) {
      setDrag({ k: cur, a: Math.max(-180, Math.min(0, t)) });
    } else if (dx > 0 && cur > 0) {
      setDrag({ k: cur - 1, a: Math.max(-180, Math.min(0, -180 + t)) });
    } else {
      setDrag(null);
    }
  };

  const onUp = (e: React.PointerEvent) => {
    const p = ptr.current;
    ptr.current = null;
    setLive(false);
    if (!p) return;
    if (!p.moved) {
      // a tap: right half turns forward, left half turns back
      const r = bookRef.current!.getBoundingClientRect();
      go(e.clientX > r.left + r.width / 2 ? cur + 1 : cur - 1);
      return;
    }
    if (drag) {
      const forward = drag.k === cur;
      if (forward && drag.a < -50) setCur(cur + 1);
      if (!forward && drag.a > -130) setCur(cur - 1);
    }
    setDrag(null);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(cur + 1);
    if (e.key === "ArrowLeft") go(cur - 1);
  };

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div
        ref={tiltRef}
        onPointerMove={onMove}
        onPointerLeave={untilt}
        className="[--rx:8deg] [--ry:-7deg] [perspective:2200px]"
      >
        <div className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx))_rotateY(var(--ry))]">
          {/* hardcover */}
          <div className="absolute -inset-2.5 rounded-[20px] bg-ink shadow-[0_60px_90px_-40px_rgba(28,24,68,0.65)] sm:-inset-3.5 sm:rounded-[24px]">
            <div className="absolute inset-1 rounded-[17px] border border-gold/35 sm:rounded-[20px]" />
          </div>
          {/* page block edges */}
          <div className="absolute inset-x-1 -bottom-1 top-1 rounded-[14px] bg-sand" />
          <div className="absolute inset-x-0.5 -bottom-[3px] top-0.5 rounded-[14px] bg-[#efe4cf]" />

          <div
            ref={bookRef}
            role="group"
            aria-roledescription="book"
            aria-label={`Sample report, ${labels[cur]}. Use the arrow keys to turn pages.`}
            tabIndex={0}
            onKeyDown={onKey}
            onPointerDown={onDown}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            className="relative aspect-[1.3/1] cursor-grab touch-pan-y select-none rounded-[14px] outline-none [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-gold active:cursor-grabbing"
          >
            {/* fixed pages */}
            <div className="absolute inset-y-0 left-0 w-1/2">{pages[0]}</div>
            <div className="absolute inset-y-0 right-0 w-1/2">
              {pages[pages.length - 1]}
            </div>

            {/* turning leaves */}
            {Array.from({ length: leaves }).map((_, k) => {
              const a = drag?.k === k ? drag.a : k < cur ? -180 : 0;
              const moving = drag?.k === k;
              const onLeft = a < -90;
              const z = moving ? leaves + 2 : onLeft ? k + 1 : leaves - k;
              const shade = Math.sin((-a * Math.PI) / 180);
              // only render leaves near the open spread to keep the DOM light
              if (!moving && (k < cur - 2 || k > cur + 1)) return null;
              return (
                <div
                  key={k}
                  aria-hidden={k !== cur && k !== cur - 1}
                  className="absolute inset-y-0 right-0 w-1/2 origin-left [transform-style:preserve-3d]"
                  style={{
                    zIndex: z,
                    transform: `translateZ(${z * 0.4}px) rotateY(${a}deg)`,
                    transition: live
                      ? "none"
                      : `transform ${FLIP_MS}ms cubic-bezier(.3,.7,.2,1)`,
                  }}
                >
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    {pages[2 * k + 1]}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-r-[14px] bg-gradient-to-r from-ink/40 to-transparent"
                      style={{ opacity: shade * 0.6 }}
                    />
                  </div>
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {pages[2 * k + 2]}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-l-[14px] bg-gradient-to-l from-ink/40 to-transparent"
                      style={{ opacity: shade * 0.6 }}
                    />
                  </div>
                </div>
              );
            })}

            {/* spine */}
            <span className="pointer-events-none absolute inset-y-0 left-1/2 z-[30] w-px -translate-x-1/2 bg-ink/15" />
          </div>

          {/* ribbon bookmark */}
          <span
            aria-hidden
            className="absolute -bottom-9 right-[14%] h-12 w-2.5 bg-gradient-to-b from-gold-deep via-gold to-gold-bright shadow-[2px_4px_6px_rgba(28,24,68,0.25)] [clip-path:polygon(0_0,100%_0,100%_100%,50%_calc(100%-6px),0_100%)] sm:-bottom-12 sm:h-16 sm:w-3.5"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 h-6 w-[82%] rounded-[50%] bg-ink/25 blur-2xl" />

      {/* controls */}
      <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6">
        <button
          type="button"
          onClick={() => go(cur - 1)}
          disabled={cur === 0}
          aria-label="Previous page"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 bg-card/70 text-ink transition hover:border-ink disabled:opacity-30"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <p
          aria-live="polite"
          className="min-w-[12rem] text-center text-xs uppercase tracking-[0.2em] text-ink-3"
        >
          <span className="font-display text-base normal-case tracking-normal text-ink">
            {labels[cur]}
          </span>
          <span className="mt-0.5 block">
            {cur + 1} / {leaves + 1}
            {cur === 0 && " · swipe to turn"}
          </span>
        </p>
        <button
          type="button"
          onClick={() => go(cur + 1)}
          disabled={cur === leaves}
          aria-label="Next page"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/20 bg-card/70 text-ink transition hover:border-ink disabled:opacity-30"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

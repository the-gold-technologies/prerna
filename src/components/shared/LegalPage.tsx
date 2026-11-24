import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import BookingProvider from "../home/BookingProvider";
import Nav from "../home/Nav";
import Closing from "../home/Closing";
import { LogoMark } from "../home/art";
import { LEGAL, LEGAL_UPDATED, type LegalDoc } from "@/data/legal";
import { formatDate } from "@/data/blog";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const readMinutes = (doc: LegalDoc) => {
  const words = doc.sections
    .flatMap((s) => [s.heading, ...s.body])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
};

export default function LegalPage({ slug }: { slug: LegalDoc["slug"] }) {
  const doc = LEGAL[slug];

  return (
    <BookingProvider>
      <Nav overDark />
      <main>
        {/* ============ Full-bleed hero ============ */}
        <header className="relative flex h-[78svh] min-h-[520px] items-end overflow-hidden bg-ink text-paper">
          <Image
            src={doc.image}
            alt={doc.imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:pb-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-paper/70 transition hover:text-paper"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <p className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-bright/40 bg-ink/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-bright backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
                {doc.eyebrow}
              </span>
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">
              {doc.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/80 sm:text-lg">
              {doc.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-6 text-sm text-paper/70">
              <span className="flex items-center gap-2.5 text-paper">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-paper/10 text-gold-soft ring-1 ring-gold-bright/40">
                  <LogoMark className="h-5 w-5" />
                </span>
                The PRERNA team
              </span>
              <span>Last updated {formatDate(LEGAL_UPDATED)}</span>
              <span>{doc.sections.length} sections</span>
              <span>{readMinutes(doc)} min read</span>
              <a
                href="#policy"
                className="ml-auto hidden items-center gap-2 text-paper/70 transition hover:text-paper sm:inline-flex"
              >
                Start reading
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
        </header>

        {/* ============ Body + sticky contents ============ */}
        <div
          id="policy"
          className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 lg:py-24"
        >
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[24px] border border-line bg-card p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-3">
                On this page
              </p>
              <ol className="mt-4 space-y-2.5 border-l border-line pl-4">
                {doc.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#${anchor(s.heading)}`}
                      className="flex gap-2 text-sm text-ink-2 transition hover:text-ink"
                    >
                      <span className="w-6 shrink-0 font-display text-gold-deep">
                        {ROMAN[i]}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="max-w-3xl">
            {doc.sections.map((s, i) => (
              <section
                key={s.heading}
                id={anchor(s.heading)}
                className="scroll-mt-28 border-t border-line py-9 first:border-t-0 first:pt-0"
              >
                <h2 className="flex items-baseline gap-4 font-display text-3xl text-ink">
                  <span className="text-lg text-gold-deep">{ROMAN[i]}</span>
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-2">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}

            {/* questions CTA */}
            <div className="mt-10 flex flex-col gap-6 rounded-[24px] border border-line bg-card p-7 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-gold-soft">
                <LogoMark className="h-8 w-8" />
              </span>
              <div className="flex-1">
                <p className="font-display text-xl text-ink">
                  Questions about this policy?
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-3">
                  Write to us and a member of the PRERNA team will answer
                  personally.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink-2"
              >
                Write to us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

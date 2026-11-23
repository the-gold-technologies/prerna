import React from "react";
import Link from "next/link";
import BookingProvider from "../home/BookingProvider";
import Nav from "../home/Nav";
import Closing from "../home/Closing";
import { LEGAL, LEGAL_UPDATED, type LegalDoc } from "@/data/legal";
import { formatDate } from "@/data/blog";

const OTHERS: { slug: LegalDoc["slug"]; label: string }[] = [
  { slug: "privacy", label: "Privacy policy" },
  { slug: "terms", label: "Terms & conditions" },
  { slug: "cookies", label: "Cookie policy" },
  { slug: "refund", label: "Refund & cancellation" },
  { slug: "disclaimer", label: "Disclaimer" },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* Text-led legal page with numbered sections and a sticky contents list. */
export default function LegalPage({ slug }: { slug: LegalDoc["slug"] }) {
  const doc = LEGAL[slug];

  return (
    <BookingProvider>
      <Nav />
      <main>
        <header className="relative overflow-hidden border-b border-line pb-14 pt-32 sm:pt-36">
          <div className="pointer-events-none absolute -right-32 -top-20 h-[460px] w-[460px] rounded-full bg-dawn/40 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep">
              <span className="h-px w-8 bg-gold" aria-hidden />
              {doc.eyebrow}
            </p>
            <h1 className="mt-5 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
              {doc.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2">
              {doc.intro}
            </p>
            <p className="mt-6 text-sm text-ink-3">
              Last updated {formatDate(LEGAL_UPDATED)}
            </p>
          </div>
        </header>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[16rem_1fr] lg:gap-20 lg:py-24">
          {/* contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
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

            <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink-3">
              Other policies
            </p>
            <ul className="mt-4 space-y-2">
              {OTHERS.filter((o) => o.slug !== slug).map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/${o.slug}`}
                    className="text-sm text-ink-2 underline-offset-4 transition hover:text-ink hover:underline"
                  >
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* body */}
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

            <div className="mt-6 rounded-[20px] border border-line bg-card p-6 text-ink-2">
              Questions about this policy?{" "}
              <Link
                href="/contact"
                className="font-semibold text-ink underline underline-offset-4"
              >
                Write to us
              </Link>{" "}
              and we will answer personally.
            </div>
          </div>
        </div>
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

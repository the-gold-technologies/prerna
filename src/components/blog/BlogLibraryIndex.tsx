"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { POSTS, type Category } from "@/data/blog";
import { CATEGORY_THEMES } from "./BlogStories";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export function BlogLibraryIndex() {
  return (
    <section className="bg-card py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-end justify-between border-b-2 border-ink pb-4">
          <div>
            <p className={eyebrow}>Curated library</p>
            <h2 className="mt-2 font-display text-4xl font-light">
              The <em className="text-gold-deep">index.</em>
            </h2>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-ink-3">
            {POSTS.length} articles across 3 disciplines
          </span>
        </div>

        <div className="grid md:grid-cols-3">
          {(["Astrology", "Psychology", "Spirituality"] as Category[]).map(
            (c, i) => (
              <div
                key={c}
                className={`py-8 md:px-8 ${i ? "border-t border-line md:border-l md:border-t-0" : "md:pl-0"}`}
              >
                <p
                  className={`flex items-center gap-2 font-display text-2xl ${CATEGORY_THEMES[c].text}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${CATEGORY_THEMES[c].dot}`}
                  />
                  {c}
                </p>
                <ul className="mt-5 space-y-4">
                  {POSTS.filter((p) => p.category === c).map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="group flex items-start justify-between gap-3 text-ink-2 transition hover:text-ink"
                      >
                        <span className="font-display text-lg leading-snug group-hover:text-ink">
                          {p.title}
                        </span>
                        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-40 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

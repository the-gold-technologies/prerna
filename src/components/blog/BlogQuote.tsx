"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { POSTS } from "@/data/blog";

export function BlogQuote() {
  const quotePost = POSTS[1] ?? POSTS[0];
  const quoteBlock = quotePost.body.find(
    (b): b is { type: "quote"; text: string } => b.type === "quote"
  );
  const quote =
    quoteBlock?.text ??
    "You cannot change a pattern you cannot see. Seeing it clearly is already change.";

  return (
    <section className="bg-ink py-20 text-paper lg:py-24">
      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="block font-display text-8xl leading-none text-gold-bright">
          &ldquo;
        </span>
        <p className="-mt-6 font-display text-3xl font-light italic leading-snug sm:text-5xl">
          {quote}
        </p>
        <Link
          href={`/blog/${quotePost.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-bright transition hover:text-paper"
        >
          From “{quotePost.title}”
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

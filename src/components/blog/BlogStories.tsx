"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { POSTS, formatDate, type Category, type Post } from "@/data/blog";

const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export const CATEGORY_THEMES: Record<
  Category,
  { text: string; bg: string; dot: string }
> = {
  Astrology: {
    text: "text-astro",
    bg: "bg-astro-soft",
    dot: "bg-astro",
  },
  Psychology: {
    text: "text-psych",
    bg: "bg-psych-soft",
    dot: "bg-psych",
  },
  Spirituality: {
    text: "text-spirit",
    bg: "bg-spirit-soft",
    dot: "bg-spirit",
  },
};

export function Kicker({ p, light = false }: { p: Post; light?: boolean }) {
  const theme = CATEGORY_THEMES[p.category];
  return (
    <div
      className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] ${light ? "text-paper/70" : "text-ink-3"}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${theme.dot}`} />
      <span className={light ? "text-gold-bright" : theme.text}>
        {p.category}
      </span>
      <span>·</span>
      <span>{formatDate(p.date)}</span>
      <span>·</span>
      <span>{p.readMinutes} min read</span>
    </div>
  );
}

export function BlogStories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );

  const categories: (Category | "All")[] = [
    "All",
    "Astrology",
    "Psychology",
    "Spirituality",
  ];

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return POSTS;
    return POSTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <section
      id="collection"
      className="scroll-mt-20 border-t border-line/60 bg-sand/20 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header with discipline filter */}
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className={eyebrow}>
              {selectedCategory === "All"
                ? "Featured & Latest"
                : `${selectedCategory} Collection`}
            </p>
            <h2 className="mt-2 font-display text-3xl font-light text-ink sm:text-4xl">
              {selectedCategory === "All" ? (
                <>
                  Explore the{" "}
                  <em className="font-normal text-gold-deep">collection.</em>
                </>
              ) : (
                <>
                  Essays on{" "}
                  <em className="font-normal text-gold-deep">
                    {selectedCategory}.
                  </em>
                </>
              )}
            </h2>
          </div>

          {/* Filter by discipline selector */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-3">
              Filter by discipline
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const count =
                  cat === "All"
                    ? POSTS.length
                    : POSTS.filter((p) => p.category === cat).length;
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-ink text-paper shadow-sm"
                        : "border border-line bg-paper/60 text-ink-2 hover:border-ink/40 hover:bg-card"
                    }`}
                  >
                    {cat}
                    <span
                      className={`ml-1.5 text-[10px] ${
                        active ? "text-gold-soft" : "text-ink-3"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured spotlight card (follows the same display pattern across ALL filters) */}
        {featuredPost && (
          <Reveal key={featuredPost.slug} className="mt-10">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative block overflow-hidden rounded-[32px] border border-line bg-card shadow-sm transition duration-500 hover:border-gold/60 hover:shadow-xl"
            >
              <div className="grid lg:grid-cols-12">
                {/* Featured Image */}
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:col-span-7 lg:aspect-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover transition duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:hidden" />
                  <span className="absolute left-6 top-6 rounded-full bg-gold px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink shadow-md">
                    {selectedCategory === "All"
                      ? "Cover Story"
                      : `Featured in ${selectedCategory}`}
                  </span>
                </div>

                {/* Featured Details */}
                <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-5">
                  <div>
                    <Kicker p={featuredPost} />
                    <h3 className="mt-4 font-display text-3xl font-light leading-snug text-ink transition duration-300 group-hover:text-astro sm:text-4xl lg:text-[2.6rem]">
                      {featuredPost.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-line/80 pt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition group-hover:text-gold-deep">
                      Read full essay
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1.5" />
                    </span>
                    <span className="text-xs text-ink-3">
                      {featuredPost.readMinutes} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Grid of remaining articles */}
        {gridPosts.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
                >
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] shadow-sm backdrop-blur ${
                          CATEGORY_THEMES[post.category].bg
                        } ${CATEGORY_THEMES[post.category].text}`}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-3">
                        {formatDate(post.date)} · {post.readMinutes} min
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-light leading-snug text-ink transition duration-300 group-hover:text-astro">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-2">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink group-hover:text-gold-deep">
                        Read essay
                        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                      </span>
                      <span className="font-display text-sm italic text-ink-3">
                        PRERNA Journal
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

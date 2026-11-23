"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "../home/Reveal";
import { POSTS, formatDate, type Category, type Post } from "@/data/blog";

const TONE: Record<Category, string> = {
  Astrology: "text-astro",
  Psychology: "text-psych",
  Spirituality: "text-spirit",
};

function Kicker({ p, light = false }: { p: Post; light?: boolean }) {
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-[0.25em] ${light ? "text-paper/70" : "text-ink-3"}`}
    >
      <span className={light ? "text-gold-bright" : TONE[p.category]}>
        {p.category}
      </span>
      <span className="mx-2">·</span>
      {formatDate(p.date)}
      <span className="mx-2">·</span>
      {p.readMinutes} min
    </p>
  );
}

/* Magazine-style journal: masthead, cover story, asymmetric features,
 * pull quote, editorial rows and a topic index. */
export default function BlogIndex() {
  const [cover, tall, s1, s2, ...rest] = POSTS;
  const quotePost = POSTS.find((p) => p.slug.startsWith("dashas")) ?? cover;
  const quoteBlock = quotePost.body.find((b) => b.type === "quote");
  const quote = quoteBlock && "text" in quoteBlock ? quoteBlock.text : "";

  return (
    <>
      {/* ---------- Masthead ---------- */}
      <header className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between border-y-2 border-ink py-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-2">
            <span>Issue No. 1</span>
            <span className="hidden sm:inline">
              Astrology · Psychology · Spirituality
            </span>
            <span>November 2026</span>
          </div>
          <h1 className="rise py-4 text-center font-display text-[22vw] font-light leading-[0.85] tracking-tight text-ink sm:text-[15vw] lg:text-[12.5rem]">
            The <em className="text-gold-deep">Journal</em>
          </h1>
          <div className="border-y border-ink/80 py-[3px]">
            <div className="border-t border-ink/80" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center font-display text-xl italic text-ink-2">
            Calm, clear writing to help you understand yourself between
            sessions.
          </p>
        </div>
      </header>

      {/* ---------- Cover story ---------- */}
      <section className="mt-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Link
              href={`/blog/${cover.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/8]"
            >
              <Image
                src={cover.image}
                alt={cover.imageAlt}
                fill
                preload
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover transition duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-paper sm:p-12">
                <p className="mb-4 inline-block rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-ink">
                  Cover story
                </p>
                <Kicker p={cover} light />
                <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
                  {cover.title}
                </h2>
                <p className="mt-4 hidden max-w-2xl text-lg text-paper/75 sm:block">
                  {cover.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Asymmetric features ---------- */}
      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <Link href={`/blog/${tall.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[120px_24px_24px_24px]">
                <Image
                  src={tall.image}
                  alt={tall.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <Kicker p={tall} />
                <h3 className="mt-3 font-display text-4xl leading-tight transition group-hover:text-astro sm:text-5xl">
                  {tall.title}
                </h3>
                <p className="mt-3 max-w-xl text-lg text-ink-2">
                  {tall.excerpt}
                </p>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-14">
            {[s1, s2].map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 120}
                className={i ? "mt-10 border-t border-line pt-10" : ""}
              >
                <Link href={`/blog/${p.slug}`} className="group block">
                  <span className="font-display text-6xl font-light text-gold/70">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <Kicker p={p} />
                  <h3 className="mt-3 font-display text-3xl leading-tight transition group-hover:text-astro">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-ink-2">{p.excerpt}</p>
                  <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 420px, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pull quote ---------- */}
      <section className="bg-ink py-20 text-paper lg:py-28">
        <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <span className="block font-display text-8xl leading-none text-gold-bright">
            &ldquo;
          </span>
          <p className="-mt-6 font-display text-3xl font-light italic leading-snug sm:text-5xl">
            {quote}
          </p>
          <Link
            href={`/blog/${quotePost.slug}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold-bright"
          >
            From “{quotePost.title}”
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* ---------- More stories ---------- */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="border-b-2 border-ink pb-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink">
            More stories
          </h2>
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid items-center gap-6 border-b border-line py-10 sm:grid-cols-[5rem_1fr_16rem] sm:gap-10"
              >
                <span className="font-display text-5xl font-light text-gold-deep">
                  {String(i + 4).padStart(2, "0")}
                </span>
                <div>
                  <Kicker p={p} />
                  <h3 className="mt-2 font-display text-3xl leading-tight transition group-hover:text-astro sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-2">{p.excerpt}</p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-full sm:aspect-square">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="256px"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Index by topic ---------- */}
      <section className="bg-card py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-end justify-between border-b-2 border-ink pb-3">
            <h2 className="font-display text-4xl font-light">
              The <em className="text-gold-deep">index</em>
            </h2>
            <span className="text-xs uppercase tracking-[0.3em] text-ink-3">
              {POSTS.length} articles
            </span>
          </div>
          <div className="grid md:grid-cols-3">
            {(["Astrology", "Psychology", "Spirituality"] as Category[]).map(
              (c, i) => (
                <div
                  key={c}
                  className={`py-8 md:px-8 ${i ? "border-t border-line md:border-l md:border-t-0" : "md:pl-0"}`}
                >
                  <p className={`font-display text-2xl ${TONE[c]}`}>{c}</p>
                  <ul className="mt-4 space-y-3">
                    {POSTS.filter((p) => p.category === c).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/blog/${p.slug}`}
                          className="group flex items-start justify-between gap-3 text-ink-2 transition hover:text-ink"
                        >
                          <span className="font-display text-xl leading-snug">
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
    </>
  );
}

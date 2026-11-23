import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import { LogoMark } from "@/components/home/art";
import { BookButton } from "@/components/shared/Buttons";
import { POSTS, formatDate, getPost, type Block } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found — PRERNA" };
  return {
    title: `${post.title} — PRERNA`,
    description: post.excerpt,
    openGraph: { images: [post.image] },
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="mt-12 font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          {b.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-10 border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-ink sm:text-3xl"
        >
          {b.text}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="mt-6 space-y-3">
          {b.items.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-1 text-sm text-gold">✦</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p key={i} className="mt-6">
          {b.text}
        </p>
      );
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category)
    )
    .slice(0, 2);

  return (
    <BookingProvider>
      <Nav />
      <main>
        <article className="pb-24 pt-32 sm:pt-36 lg:pb-32">
          {/* header */}
          <header className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-ink-3 transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
              {post.category}
            </p>
            <h1 className="mt-4 font-display text-4xl font-light leading-[1.08] sm:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-sm text-ink-3">
              {formatDate(post.date)} · {post.readMinutes} min read · PRERNA
              Journal
            </p>
          </header>

          {/* cover */}
          <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[28px] ring-1 ring-gold/30">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                preload
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* body */}
          <div className="mx-auto mt-14 max-w-2xl px-5 text-[18px] leading-[1.8] text-ink-2 sm:px-8">
            <p className="font-display text-2xl leading-snug text-ink">
              {post.excerpt}
            </p>
            {post.body.map(renderBlock)}

            {/* author + CTA */}
            <div className="mt-16 flex flex-col gap-6 rounded-[24px] border border-line bg-card p-7 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-gold-soft">
                <LogoMark className="h-8 w-8" />
              </span>
              <div className="flex-1">
                <p className="font-display text-xl text-ink">
                  Written by the PRERNA team
                </p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-3">
                  Astrologers, counsellors and practitioners writing to help you
                  understand yourself between sessions.
                </p>
              </div>
              <BookButton label="Talk to us" className="shrink-0 !px-6 !py-3" />
            </div>
          </div>
        </article>

        {/* related */}
        <section className="border-t border-line bg-card py-20">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
              Keep reading
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-5 rounded-[20px] border border-line bg-paper p-4 transition hover:border-gold/50"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold-deep">
                      {p.category}
                    </p>
                    <p className="mt-1 font-display text-xl leading-snug text-ink transition group-hover:text-astro">
                      {p.title}
                    </p>
                    <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-ink-2">
                      Read
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <Closing />
      </main>
    </BookingProvider>
  );
}

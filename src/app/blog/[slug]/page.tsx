import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import { LogoMark } from "@/components/home/art";
import { BookButton } from "@/components/shared/Buttons";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import { POSTS, formatDate, getPost, type Block } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

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
          id={slugify(b.text)}
          className="mt-14 scroll-mt-28 font-display text-3xl leading-tight text-ink sm:text-4xl"
        >
          {b.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-12 rounded-r-2xl border-l-2 border-gold bg-sand/40 py-6 pl-7 pr-6 font-display text-2xl italic leading-snug text-ink sm:text-3xl"
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
        <p
          key={i}
          className={
            i === 0
              ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-gold-deep"
              : "mt-6"
          }
        >
          {b.text}
        </p>
      );
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = post.body
    .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
    .map((b) => ({ id: slugify(b.text), text: b.text }));

  const related = POSTS.filter((p) => p.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category)
    )
    .slice(0, 3);

  return (
    <BookingProvider>
      <Nav overDark />
      <main>
        {/* ============ Full-bleed hero ============ */}
        <header className="relative flex min-h-[560px] items-end overflow-hidden bg-ink text-paper h-[88svh]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 lg:pb-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-paper/70 transition hover:text-paper"
            >
              <ArrowLeft className="h-4 w-4" />
              All articles
            </Link>
            <p className="mt-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-bright/40 bg-ink/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-bright backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
                {post.category}
              </span>
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-light leading-[1.05] sm:text-6xl lg:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/80 sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/15 pt-6 text-sm text-paper/70">
              <span className="flex items-center gap-2.5 text-paper">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-paper/10 text-gold-soft ring-1 ring-gold-bright/40">
                  <LogoMark className="h-5 w-5" />
                </span>
                The PRERNA team
              </span>
              <span>{formatDate(post.date)}</span>
              <span>{post.readMinutes} min read</span>
              <a
                href="#article"
                className="ml-auto hidden items-center gap-2 text-paper/70 transition hover:text-paper sm:inline-flex"
              >
                Start reading
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
        </header>

        {/* ============ Body + sticky rail ============ */}
        <article
          id="article"
          className="mx-auto grid max-w-7xl scroll-mt-20 gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20 lg:py-24"
        >
          <ArticleSidebar
            title={post.title}
            category={post.category}
            readMinutes={post.readMinutes}
            headings={headings}
            bodyId="article-body"
          />

          <div
            id="article-body"
            className="max-w-2xl text-[18px] leading-[1.8] text-ink-2"
          >
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

        {/* ============ Related ============ */}
        <section className="border-t border-line bg-card py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
                  Keep reading
                </p>
                <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                  More from the journal
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-sm font-semibold text-gold-deep transition hover:text-ink sm:block"
              >
                All articles →
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-[24px] border border-line bg-paper transition hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                      {p.category} · {p.readMinutes} min
                    </p>
                    <p className="mt-2 font-display text-xl leading-snug text-ink transition group-hover:text-astro">
                      {p.title}
                    </p>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-ink-2">
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

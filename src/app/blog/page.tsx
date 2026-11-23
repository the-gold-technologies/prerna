import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import {
  BlogHero,
  BlogStories,
  BlogQuote,
  BlogLibraryIndex,
  BlogNewsletter,
} from "@/components/blog";

export const metadata: Metadata = {
  title: "Journal — PRERNA",
  description:
    "Articles on Vedic astrology, psychology and spirituality from the PRERNA team.",
};

export default function BlogPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <BlogHero />
        <BlogStories />
        <BlogQuote />
        <BlogLibraryIndex />
        <BlogNewsletter />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

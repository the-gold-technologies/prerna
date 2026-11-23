import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import BlogIndex from "@/components/blog/BlogIndex";

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
        <BlogIndex />
        <Closing />
      </main>
    </BookingProvider>
  );
}

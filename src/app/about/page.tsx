import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import {
  AboutHero,
  AboutStory,
  AboutQuote,
  AboutLenses,
  AboutFounder,
  AboutNumbers,
  AboutPromises,
  AboutForYou,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About — PRERNA",
  description:
    "PRERNA means inspiration. A self-discovery and personal guidance platform uniting Astrology, Psychology and Spirituality.",
};

export default function AboutPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutQuote />
        <AboutLenses />
        <AboutFounder />
        <AboutNumbers />
        <AboutPromises />
        <AboutForYou />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

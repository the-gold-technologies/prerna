import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import FreeInsight from "@/components/home/FreeInsight";
import Closing from "@/components/home/Closing";
import {
  ToolsHero,
  QuizBand,
  ToolsCatalogue,
} from "@/components/tools/ToolsSections";

export const metadata: Metadata = {
  title: "Free Self-Assessment & Tools — PRERNA",
  description:
    "Free numerology calculator, element quiz and today's panchang, with more astrology and self-assessment tools coming soon.",
};

export default function FreeToolsPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ToolsHero />
        <FreeInsight />
        <div className="h-20 lg:h-28" />
        <QuizBand />
        <ToolsCatalogue />
        <Closing />
      </main>
    </BookingProvider>
  );
}

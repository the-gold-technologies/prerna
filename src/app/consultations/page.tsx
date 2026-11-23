import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Faq from "@/components/home/Faq";
import Closing from "@/components/home/Closing";
import {
  ConsultHero,
  LifeWheel,
  LensRows,
  SessionFlow,
  WaysToBegin,
} from "@/components/consultations";

export const metadata: Metadata = {
  title: "Consultations & Services — PRERNA",
  description:
    "Private 1-1 consultations in Vedic astrology, counselling and spiritual wellness across ten areas of life.",
};

export default function ConsultationsPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ConsultHero />
        <LifeWheel />
        <LensRows />
        <SessionFlow />
        <WaysToBegin />
        <Faq />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

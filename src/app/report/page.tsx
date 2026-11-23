import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import {
  ReportHero,
  ReportPipeline,
  ReportDelivery,
  JourneyPath,
  ReportFaq,
} from "@/components/report";

export const metadata: Metadata = {
  title: "PRERNA · Personalised Vedic Report & Consultation",
  description:
    "A deep, human reading of your birth chart across career, love, health and your natural strengths. Includes a 1-1 call with our guides.",
};

export default function ReportPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ReportHero />
        <ReportPipeline />
        <ReportDelivery />
        <JourneyPath />
        <ReportFaq />
      </main>
      <Closing />
    </BookingProvider>
  );
}

import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import { ReportHero, ReportPipeline } from "@/components/report/ReportSections";
import {
  ReportContents,
  ReportDelivery,
  JourneyPath,
  ReportFaq,
} from "@/components/report/ReportMore";

export const metadata: Metadata = {
  title: "Personalised Report & Journey — PRERNA",
  description:
    "A detailed, personalised analysis of your life from your birth chart, explained on a private 1-1 call, plus a six-stage self-discovery journey.",
};

export default function ReportPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ReportHero />
        <ReportContents />
        <ReportPipeline />
        <ReportDelivery />
        <JourneyPath />
        <ReportFaq />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import TodaySky from "@/components/sky/TodaySky";

export const metadata: Metadata = {
  title: "Today's Sky & Panchang — PRERNA",
  description:
    "Today's panchang: tithi, nakshatra, yoga, karana, Moon phase, sunrise, sunset and Rahu Kaal for your city.",
};

export default function TodayPage() {
  return (
    <BookingProvider>
      <Nav overDark />
      <main>
        <TodaySky />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

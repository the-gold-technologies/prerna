import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import { TodaySky } from "@/components/sky";

export const metadata: Metadata = {
  title: "Today's Sky · Live Panchang, Moon Phase & Nakshatra",
  description:
    "Live Vedic panchang: Moon nakshatra, tithi, yoga, karana, sunrise, sunset and Rahu Kaal computed for your city in your browser.",
};

export default function TodayPage() {
  return (
    <BookingProvider>
      <Nav overDark />
      <main>
        <TodaySky />
      </main>
      <Closing />
    </BookingProvider>
  );
}

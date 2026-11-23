import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import { ChartPage } from "@/components/chart";

export const metadata: Metadata = {
  title: "Free Vedic Birth Chart (Kundli) Calculator · North, South & Wheel",
  description:
    "Cast your Vedic birth chart (kundli) with planetary positions, nakshatras, Vimshottari dashas, divisional charts (D1–D12), Gochara transits and element balance.",
};

export default function Page() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ChartPage />
      </main>
      <Closing />
    </BookingProvider>
  );
}

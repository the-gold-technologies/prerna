import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import ChartPage from "@/components/chart/ChartPage";

export const metadata: Metadata = {
  title: "Your Birth Chart (Kundli) — PRERNA",
  description:
    "Cast your Vedic birth chart free: lagna, the nine grahas in signs and nakshatras, and your Vimshottari dasha periods, in North, South or wheel style.",
};

export default function ChartRoute() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ChartPage />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import Paths from "@/components/home/Paths";
import FreeInsight from "@/components/home/FreeInsight";
import LifeAreas from "@/components/home/LifeAreas";
import Questions from "@/components/home/Questions";
import Journey from "@/components/home/Journey";
import Report from "@/components/home/Report";
import Closing from "@/components/home/Closing";

export default function HomePage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <Hero />
        <Paths />
        <FreeInsight />
        <LifeAreas />
        <Questions />
        <Journey />
        <Report />
        <Closing />
      </main>
    </BookingProvider>
  );
}

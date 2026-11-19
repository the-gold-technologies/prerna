import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Paths from "@/components/home/Paths";
import HowItWorks from "@/components/home/HowItWorks";
import FreeInsight from "@/components/home/FreeInsight";
import LifeAreas from "@/components/home/LifeAreas";
import Questions from "@/components/home/Questions";
import Journey from "@/components/home/Journey";
import Report from "@/components/home/Report";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";
import Closing from "@/components/home/Closing";

export default function HomePage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Paths />
        <HowItWorks />
        <div className="h-24 lg:h-32" />
        <FreeInsight />
        <LifeAreas />
        <Questions />
        <Journey />
        <Report />
        <Faq />
        <Contact />
        <Closing />
      </main>
    </BookingProvider>
  );
}

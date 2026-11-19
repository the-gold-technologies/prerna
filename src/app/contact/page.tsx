import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";
import Closing from "@/components/home/Closing";
import { ContactIntro } from "@/components/contact/ContactIntro";

export const metadata: Metadata = {
  title: "Contact — PRERNA",
  description:
    "Get in touch with PRERNA. Ask a question, book a 1-1 astrology or counselling session, or find the right guidance for you.",
};

export default function ContactPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ContactIntro />
        <Contact />
        <Faq showWriteToUs={false} />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

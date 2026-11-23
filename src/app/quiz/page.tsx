import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import { ElementQuiz } from "@/components/quiz";

export const metadata: Metadata = {
  title: "Vedic Elements Quiz · Discover Your Guiding Element",
  description:
    "A free reflective quiz based on the five Vedic elements (pancha mahabhuta): Agni, Prithvi, Vayu and Jala.",
};

export default function QuizPage() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <ElementQuiz />
      </main>
      <Closing />
    </BookingProvider>
  );
}

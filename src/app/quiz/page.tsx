import type { Metadata } from "next";
import BookingProvider from "@/components/home/BookingProvider";
import Nav from "@/components/home/Nav";
import Closing from "@/components/home/Closing";
import ElementQuiz from "@/components/quiz/ElementQuiz";

export const metadata: Metadata = {
  title: "Which element guides you? — PRERNA quiz",
  description:
    "A free seven-question self-discovery quiz based on the Vedic elements: Agni, Prithvi, Vayu and Jala.",
};

export default function QuizPage() {
  return (
    <BookingProvider>
      <Nav overDark />
      <main>
        <ElementQuiz />
        <Closing showCta={false} />
      </main>
    </BookingProvider>
  );
}

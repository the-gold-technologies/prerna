import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Refund & cancellation policy — PRERNA",
};

export default function RefundPage() {
  return <LegalPage slug="refund" />;
}

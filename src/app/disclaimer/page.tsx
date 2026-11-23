import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer — PRERNA",
};

export default function DisclaimerPage() {
  return <LegalPage slug="disclaimer" />;
}

import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy — PRERNA",
};

export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}

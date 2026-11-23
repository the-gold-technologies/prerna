import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Terms & conditions — PRERNA",
};

export default function TermsPage() {
  return <LegalPage slug="terms" />;
}

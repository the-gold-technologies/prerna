import type { Metadata } from "next";
import LegalPage from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy — PRERNA",
};

export default function CookiesPage() {
  return <LegalPage slug="cookies" />;
}

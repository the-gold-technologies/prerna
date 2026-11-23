"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useBooking } from "../home/BookingProvider";

const primary =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 font-semibold text-paper ring-1 ring-inset ring-gold/45 transition hover:bg-astro";
const secondary =
  "inline-flex items-center justify-center rounded-full border border-ink/25 bg-paper/60 px-7 py-4 font-semibold backdrop-blur transition hover:border-ink hover:bg-card";

/* Opens the shared booking modal. */
export function BookButton({
  label = "Book a 1-1 session",
  area,
  variant = "primary",
  className = "",
}: {
  label?: string;
  area?: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => openBooking(area)}
      className={`${variant === "primary" ? primary : secondary} ${className}`}
    >
      {label}
      {variant === "primary" && (
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      )}
    </button>
  );
}

export function LinkButton({
  href,
  label,
  variant = "secondary",
  className = "",
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${variant === "primary" ? primary : secondary} ${className}`}
    >
      {label}
      {variant === "primary" && (
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      )}
    </Link>
  );
}

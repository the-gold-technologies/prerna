"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./art";
import { useBooking } from "./BookingProvider";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Journey", href: "/#journey" },
  { label: "Reports", href: "/#report" },
  { label: "Free insight", href: "/#free-insight" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const { openBooking } = useBooking();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-gold" aria-label="PRERNA home">
          <LogoMark className="h-9 w-9" />
          <span className="font-display text-2xl font-semibold tracking-[0.18em] text-ink">PRERNA</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
              className={`text-sm transition hover:text-ink ${pathname === l.href ? "font-semibold text-ink" : "text-ink-2"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openBooking()}
            className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition ring-1 ring-inset ring-gold/45 hover:bg-astro sm:block"
          >
            Book a session
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-full text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line/70 px-5 pb-6 pt-2 lg:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/60 py-4 font-display text-2xl"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              openBooking();
            }}
            className="mt-6 w-full rounded-full bg-ink py-3.5 font-semibold text-paper"
          >
            Book a session
          </button>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useId, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { BIRTH_CITIES } from "@/lib/chart";

/*
 * Free-text place-of-birth field. Any place can be typed; listed cities are
 * offered as suggestions underneath (no native datalist dropdown arrow).
 */
export default function PlaceInput({
  value,
  onChange,
  className = "",
  placeholder = "City, town or village",
}: {
  value: string;
  onChange: (place: string) => void;
  className?: string;
  placeholder?: string;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return BIRTH_CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) && c.name.toLowerCase() !== q
    )
      .sort(
        (a, b) =>
          Number(!a.name.toLowerCase().startsWith(q)) -
          Number(!b.name.toLowerCase().startsWith(q))
      )
      .slice(0, 6);
  }, [value]);

  const show = open && matches.length > 0;

  const pick = (name: string) => {
    onChange(name);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div className="relative">
      <input
        type="text"
        className={className}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        aria-label="Place of birth"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={show}
        aria-controls={listId}
        aria-activedescendant={
          show && active >= 0 ? `${listId}-${active}` : undefined
        }
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (!show) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (a + 1) % matches.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (a <= 0 ? matches.length - 1 : a - 1));
          } else if (e.key === "Enter" && active >= 0) {
            e.preventDefault();
            pick(matches[active].name);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {show && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-2xl border border-line bg-card py-1 shadow-[0_20px_50px_-25px_rgba(28,24,68,0.35)]"
        >
          {matches.map((c, i) => (
            <li
              key={c.name}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(c.name);
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer items-center gap-2.5 px-4 py-2.5 text-sm text-ink ${i === active ? "bg-sand/70" : ""}`}
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
              {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

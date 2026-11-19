"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import BookingModal from "./BookingModal";

type BookingCtx = { openBooking: (area?: string) => void };

const Ctx = createContext<BookingCtx>({ openBooking: () => {} });

export function useBooking() {
  return useContext(Ctx);
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState<string | undefined>();

  const openBooking = useCallback((a?: string) => {
    setArea(a);
    setOpen(true);
  }, []);

  return (
    <Ctx.Provider value={{ openBooking }}>
      {children}
      {open && <BookingModal defaultArea={area} onClose={() => setOpen(false)} />}
    </Ctx.Provider>
  );
}

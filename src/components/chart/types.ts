import { BIRTH_CITIES, localToUtc } from "@/lib/chart";

export type Form = {
  name: string;
  gender: string;
  date: string;
  time: string;
  accuracy: string;
  place: string;
  lat: string;
  lon: string;
  offset: string;
  tz: string | null; // IANA zone when a listed city is chosen
  ayan: string;
  node: "mean" | "true";
  year: string;
};

export const EMPTY: Form = {
  name: "",
  gender: "",
  date: "",
  time: "",
  accuracy: "Exact",
  place: "",
  lat: "",
  lon: "",
  offset: "",
  tz: null,
  ayan: "lahiri",
  node: "mean",
  year: "365.25",
};

export const EXAMPLE: Form = {
  ...EMPTY,
  name: "Example chart",
  date: "1990-05-15",
  time: "10:30",
  place: "New Delhi",
  lat: "28.6139",
  lon: "77.209",
  offset: "5.5",
  tz: "Asia/Kolkata",
};

export const field =
  "w-full border-b border-line bg-transparent py-2 text-ink outline-none transition placeholder:text-ink-3 focus:border-gold";
export const lbl =
  "text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-3";
export const eyebrow =
  "text-xs font-semibold uppercase tracking-[0.3em] text-gold-deep";

export const offsetFor = (date: string, time: string, tz: string) => {
  if (!date) return "";
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = (time || "12:00").split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, h, mi);
  return String(
    (wall - localToUtc(date, time || "12:00", tz).getTime()) / 3600_000
  );
};

export const toQuery = (f: Form) => {
  const q = new URLSearchParams({ d: f.date, t: f.time });
  if (f.name.trim()) q.set("n", f.name.trim());
  if (f.place) q.set("p", f.place);
  if (!f.tz) {
    q.set("lat", f.lat);
    q.set("lon", f.lon);
    q.set("o", f.offset);
  }
  if (f.ayan !== "lahiri") q.set("a", f.ayan);
  if (f.node === "true") q.set("nd", "true");
  if (f.year !== "365.25") q.set("y", f.year);
  if (f.accuracy !== "Exact") q.set("acc", f.accuracy);
  return q;
};

export const fromQuery = (q: URLSearchParams): Form | null => {
  const d = q.get("d");
  const t = q.get("t");
  if (!d || !t) return null;
  const place = q.get("p") ?? q.get("c") ?? "";
  const city = BIRTH_CITIES.find((c) => c.name === place);
  return {
    ...EMPTY,
    name: q.get("n") ?? "",
    date: d,
    time: t,
    place,
    accuracy: q.get("acc") ?? "Exact",
    lat: city ? String(city.lat) : (q.get("lat") ?? ""),
    lon: city ? String(city.lon) : (q.get("lon") ?? ""),
    tz: city ? city.tz : null,
    offset: city ? offsetFor(d, t, city.tz) : (q.get("o") ?? ""),
    ayan: q.get("a") ?? "lahiri",
    node: q.get("nd") === "true" ? "true" : "mean",
    year: q.get("y") ?? "365.25",
  };
};

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

export const pill = (on: boolean) =>
  `rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${on ? "bg-ink text-paper" : "border border-line text-ink-2 hover:border-ink/40"}`;
export const action =
  "flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold transition hover:border-ink disabled:opacity-40";

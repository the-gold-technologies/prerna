/*
 * Festivals, vrat days and the important hours of a day, computed from the
 * same Sun and Moon formulas as the panchang.
 *
 * Festival dates follow the common rule of the tithi prevailing at local
 * sunrise (udaya tithi), with lunar months counted the amanta way: a month
 * begins after a new moon and is named by the sidereal sign the Sun occupies
 * at that new moon (Sun in Meena -> Chaitra). A month whose new moon falls
 * with the Sun in the same sign as the next one is adhika (extra), and its
 * festivals are skipped, as is customary.
 */
import {
  ayanamsha,
  julianDay,
  moonTropical,
  RASHI,
  sunTimes,
  sunTropical,
  type City,
} from "./sky";

const norm = (a: number) => ((a % 360) + 360) % 360;

export const LUNAR_MONTHS = [
  "Chaitra",
  "Vaishakha",
  "Jyeshtha",
  "Ashadha",
  "Shravana",
  "Bhadrapada",
  "Ashvin",
  "Kartika",
  "Margashirsha",
  "Pausha",
  "Magha",
  "Phalguna",
];

/* Tithi index 0..29: Shukla 1..15 (Purnima = 14), Krishna 1..14, Amavasya = 29. */
const S = (n: number) => n - 1;
const K = (n: number) => 14 + n;
const PURNIMA = 14;
const AMAVASYA = 29;

/* When in the day the tithi is checked: most festivals use sunrise, some the
 * time of their main observance (midday puja, pradosh, the night). */
type Mode =
  "sunrise" | "midday" | "afternoon" | "evening" | "midnight" | "moonrise";
type Rule = {
  month: number;
  tithi: number;
  name: string;
  note: string;
  at?: Mode;
};

const FESTIVALS: Rule[] = [
  {
    month: 0,
    tithi: S(1),
    name: "Ugadi · Gudi Padwa",
    note: "Lunar new year; Chaitra Navratri begins",
  },
  {
    month: 0,
    tithi: S(9),
    name: "Ram Navami",
    note: "Birth of Sri Rama",
    at: "midday",
  },
  {
    month: 0,
    tithi: PURNIMA,
    name: "Hanuman Jayanti",
    note: "Birth of Hanuman",
  },
  {
    month: 1,
    tithi: S(3),
    name: "Akshaya Tritiya",
    note: "An unfading day for new beginnings",
  },
  {
    month: 1,
    tithi: PURNIMA,
    name: "Buddha Purnima",
    note: "Birth and awakening of the Buddha",
  },
  {
    month: 3,
    tithi: S(11),
    name: "Devshayani Ekadashi",
    note: "Vishnu's rest; Chaturmas begins",
  },
  {
    month: 3,
    tithi: PURNIMA,
    name: "Guru Purnima",
    note: "Honouring teachers",
  },
  {
    month: 4,
    tithi: S(5),
    name: "Nag Panchami",
    note: "Worship of the serpent deities",
  },
  {
    month: 4,
    tithi: PURNIMA,
    name: "Raksha Bandhan",
    note: "The bond of protection",
  },
  {
    month: 4,
    tithi: K(8),
    name: "Krishna Janmashtami",
    note: "Birth of Sri Krishna",
  },
  {
    month: 5,
    tithi: S(4),
    name: "Ganesh Chaturthi",
    note: "Ganesha is welcomed home",
    at: "midday",
  },
  {
    month: 5,
    tithi: S(14),
    name: "Anant Chaturdashi",
    note: "Ganesha's farewell",
  },
  {
    month: 6,
    tithi: S(1),
    name: "Sharad Navratri begins",
    note: "Nine nights of the Goddess",
  },
  {
    month: 6,
    tithi: S(8),
    name: "Durga Ashtami",
    note: "The eighth night of Navratri",
  },
  {
    month: 6,
    tithi: S(10),
    name: "Dussehra · Vijayadashami",
    note: "Victory of good over evil",
    at: "afternoon",
  },
  {
    month: 6,
    tithi: PURNIMA,
    name: "Sharad Purnima",
    note: "The brightest Moon of the year",
    at: "evening",
  },
  {
    month: 6,
    tithi: K(4),
    name: "Karva Chauth",
    note: "A fast for a long, shared life",
    at: "moonrise",
  },
  {
    month: 6,
    tithi: K(13),
    name: "Dhanteras",
    note: "Wealth and health; Diwali begins",
    at: "evening",
  },
  {
    month: 6,
    tithi: AMAVASYA,
    name: "Diwali · Lakshmi Puja",
    note: "The festival of lights",
    at: "evening",
  },
  {
    month: 7,
    tithi: S(1),
    name: "Govardhan Puja",
    note: "Annakut, the mountain of food",
  },
  {
    month: 7,
    tithi: S(2),
    name: "Bhai Dooj",
    note: "Sisters bless their brothers",
  },
  {
    month: 7,
    tithi: S(6),
    name: "Chhath Puja",
    note: "Offerings to the setting and rising Sun",
  },
  {
    month: 7,
    tithi: S(11),
    name: "Dev Uthani Ekadashi",
    note: "Vishnu wakes; Chaturmas ends",
  },
  {
    month: 7,
    tithi: PURNIMA,
    name: "Kartika Purnima · Dev Deepawali",
    note: "Lamps for the gods",
  },
  {
    month: 7,
    tithi: PURNIMA,
    name: "Guru Nanak Jayanti",
    note: "Gurpurab",
  },
  {
    month: 8,
    tithi: S(11),
    name: "Gita Jayanti",
    note: "The day the Gita was spoken",
  },
  {
    month: 10,
    tithi: S(5),
    name: "Vasant Panchami",
    note: "Saraswati and the coming of spring",
  },
  {
    month: 10,
    tithi: K(14),
    name: "Maha Shivaratri",
    note: "The great night of Shiva",
    at: "midnight",
  },
  {
    month: 11,
    tithi: PURNIMA,
    name: "Holika Dahan",
    note: "The bonfire on the full Moon",
  },
  { month: 11, tithi: K(1), name: "Holi", note: "The festival of colours" },
];

const SANKRANTI: Record<number, { name: string; note: string }> = {
  9: { name: "Makar Sankranti · Pongal", note: "The Sun enters Makara" },
  0: {
    name: "Mesha Sankranti · Baisakhi",
    note: "The Sun enters Mesha; solar new year",
  },
};

export type FestivalKind = "festival" | "vrat";
/* The one timing that matters most for an observance, e.g. "Parana" or "Nishita". */
export type FestivalTiming = {
  label: string;
  at: Date;
  to?: Date;
  withDate?: boolean; // show the date as well as the time
};
export type FestivalDay = {
  date: Date; // local sunrise of the day
  name: string;
  note: string;
  kind: FestivalKind;
  month: string; // lunar month, e.g. "Kartika"
  tithi: string; // e.g. "Shukla Ekadashi"
  timing: FestivalTiming | null;
};

/* The 24 named Ekadashis by amanta month: [Shukla, Krishna]. */
const EKADASHI: [string, string][] = [
  ["Kamada", "Varuthini"],
  ["Mohini", "Apara"],
  ["Nirjala", "Yogini"],
  ["Devshayani", "Kamika"],
  ["Shravana Putrada", "Aja"],
  ["Parivartini", "Indira"],
  ["Papankusha", "Rama"],
  ["Prabodhini", "Utpanna"],
  ["Mokshada", "Saphala"],
  ["Pausha Putrada", "Shattila"],
  ["Jaya", "Vijaya"],
  ["Amalaki", "Papmochani"],
];

/* Monthly observances, kept in every month (adhika too). */
type VratRule = {
  tithis: number[];
  at?: Mode;
  name: (month: number, tithi: number) => string;
  note: string;
};
const VRATS: VratRule[] = [
  {
    tithis: [S(11), K(11)],
    name: (m, t) => `${EKADASHI[m][t < 15 ? 0 : 1]} Ekadashi`,
    note: "A fast sacred to Vishnu",
  },
  {
    tithis: [PURNIMA],
    name: (m) => `${LUNAR_MONTHS[m]} Purnima`,
    note: "Full Moon; Satyanarayan puja",
  },
  {
    tithis: [AMAVASYA],
    name: (m) => `${LUNAR_MONTHS[m]} Amavasya`,
    note: "New Moon; remembering the ancestors",
  },
  {
    tithis: [K(4)],
    at: "moonrise",
    name: () => "Sankashti Chaturthi",
    note: "Ganesha's fast, broken at moonrise",
  },
  {
    tithis: [K(14)],
    at: "midnight",
    name: () => "Masik Shivaratri",
    note: "Shiva's monthly night",
  },
  {
    tithis: [S(13), K(13)],
    at: "evening",
    name: () => "Pradosh Vrat",
    note: "Shiva at twilight",
  },
];

const TITHI_NAMES = [
  "Pratipada",
  "Dwitiya",
  "Tritiya",
  "Chaturthi",
  "Panchami",
  "Shashthi",
  "Saptami",
  "Ashtami",
  "Navami",
  "Dashami",
  "Ekadashi",
  "Dwadashi",
  "Trayodashi",
  "Chaturdashi",
];
const tithiLabel = (t: number) =>
  t === PURNIMA
    ? "Purnima"
    : t === AMAVASYA
      ? "Amavasya"
      : `${t < 15 ? "Shukla" : "Krishna"} ${TITHI_NAMES[t % 15]}`;

/* ---------- moonrise ---------- */
const RAD = Math.PI / 180;
/* The Moon's ecliptic latitude from its four main periodic terms (degrees). */
function moonLatitude(d: Date) {
  const T = (julianDay(d) - 2451545) / 36525;
  const D = (297.8502 + 445267.1115 * T) * RAD;
  const Mp = (134.9634 + 477198.8676 * T) * RAD;
  const F = (93.2721 + 483202.0175 * T) * RAD;
  return (
    5.1281 * Math.sin(F) +
    0.2806 * Math.sin(Mp + F) +
    0.2777 * Math.sin(Mp - F) +
    0.1732 * Math.sin(2 * D - F)
  );
}
/* Altitude of the Moon (degrees) at a place and instant. */
function moonAltitude(d: Date, lat: number, lon: number) {
  const jd = julianDay(d);
  const T = (jd - 2451545) / 36525;
  const eps = (23.4393 - 0.013 * T) * RAD;
  const lam = moonTropical(d) * RAD;
  const bet = moonLatitude(d) * RAD;
  const ra = Math.atan2(
    Math.sin(lam) * Math.cos(eps) - Math.tan(bet) * Math.sin(eps),
    Math.cos(lam)
  );
  const dec = Math.asin(
    Math.sin(bet) * Math.cos(eps) +
      Math.cos(bet) * Math.sin(eps) * Math.sin(lam)
  );
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545);
  const ha = (gmst + lon) * RAD - ra;
  const phi = lat * RAD;
  return (
    Math.asin(
      Math.sin(phi) * Math.sin(dec) +
        Math.cos(phi) * Math.cos(dec) * Math.cos(ha)
    ) / RAD
  );
}
/** First moonrise after `from` (within 30 hours), or null. */
export function moonriseAfter(from: Date, lat: number, lon: number) {
  const H0 = 0.125; // parallax minus refraction and semi-diameter
  const f = (t: number) => moonAltitude(new Date(t), lat, lon) - H0;
  let a = from.getTime();
  for (let k = 0; k < 180; k++) {
    const b = a + 10 * 60_000;
    if (f(a) < 0 && f(b) >= 0) {
      let lo = a;
      let hi = b;
      for (let j = 0; j < 20; j++) {
        const mid = (lo + hi) / 2;
        if (f(mid) < 0) lo = mid;
        else hi = mid;
      }
      return new Date(hi);
    }
    a = b;
  }
  return null;
}

const elong = (d: Date) => norm(moonTropical(d) - sunTropical(d));
const tithiAt = (d: Date) => Math.floor(elong(d) / 12);
const sunSignAt = (d: Date) =>
  Math.floor(norm(sunTropical(d) - ayanamsha(d)) / 30);

/* Local calendar date (y, m, d) in a time zone. */
function ymdIn(d: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: tz,
  }).format(d);
  const [y, m, day] = parts.split("-").map(Number);
  return { y, m, d: day };
}

/* The exact new moon between two instants where elongation wraps past 0°. */
function newMoonBetween(a: Date, b: Date) {
  let lo = a.getTime();
  let hi = b.getTime();
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (elong(new Date(mid)) > 180) lo = mid;
    else hi = mid;
  }
  return new Date(hi);
}

/** Festivals and vrat days from today (inclusive) for the next `days` days. */
export function upcomingFestivals(
  from: Date,
  city: City,
  days = 200
): FestivalDay[] {
  const BACK = 40;
  const N = BACK + days + 2;
  const sky = Array.from({ length: N }, (_, i) => {
    const { y, m, d } = ymdIn(from, city.tz);
    const noon = new Date(
      Date.UTC(y, m - 1, d + i - BACK, 12) - (city.lon / 15) * 3600_000
    );
    return sunTimes(noon, city.lat, city.lon);
  });
  const rise = (i: number) => sky[i].sunrise;
  const instant = (i: number, mode: Mode) => {
    const r = sky[i].sunrise.getTime();
    const st = sky[i].sunset.getTime();
    if (mode === "midday") return new Date((r + st) / 2);
    if (mode === "afternoon") return new Date(r + (st - r) * 0.7);
    if (mode === "evening") return new Date(st + 20 * 60_000);
    if (mode === "moonrise")
      return (
        moonriseAfter(new Date(st - 3600_000), city.lat, city.lon) ??
        new Date(st + 3 * 3600_000)
      );
    if (mode === "midnight")
      return new Date((st + sky[Math.min(i + 1, N - 1)].sunrise.getTime()) / 2);
    return sky[i].sunrise;
  };

  // tithis touching each sunrise; a tithi that touches none (kshaya) belongs to the day it begins
  const t0 = sky.map((_, i) => tithiAt(rise(i)));
  const atRise = t0.map((t, i) =>
    i + 1 < N && (t0[i + 1] - t + 30) % 30 === 2 ? [t, (t + 1) % 30] : [t]
  );

  // new moons (month starts) and the Sun's sign at each
  const starts: { at: number; sign: number }[] = [];
  for (let i = 1; i < N; i++) {
    if (elong(rise(i)) < elong(rise(i - 1))) {
      const nm = newMoonBetween(rise(i - 1), rise(i));
      starts.push({ at: nm.getTime(), sign: sunSignAt(nm) });
    }
  }
  const monthAt = (t: Date) => {
    let k = -1;
    for (let j = 0; j < starts.length; j++)
      if (starts[j].at <= t.getTime()) k = j;
    if (k < 0) return null;
    const adhika =
      k + 1 < starts.length && starts[k + 1].sign === starts[k].sign;
    return { index: (starts[k].sign + 1) % 12, adhika };
  };
  const inMonth = (i: number, mode: Mode, month: number) => {
    const m = monthAt(instant(i, mode));
    return !!m && !m.adhika && m.index === month;
  };

  /* when the tithi current at `from` gives way to the next one */
  const tithiEnd = (from: Date) => {
    const t = tithiAt(from);
    let lo = from.getTime();
    let hi = lo;
    while (tithiAt(new Date(hi)) === t && hi - lo < 40 * 3600_000)
      hi += 3600_000;
    for (let k = 0; k < 30; k++) {
      const mid = (lo + hi) / 2;
      if (tithiAt(new Date(mid)) === t) lo = mid;
      else hi = mid;
    }
    return new Date(hi);
  };
  const sunsetOf = (i: number) => sky[i].sunset;
  const pradosh = (i: number): FestivalTiming => ({
    label: "Pradosh",
    at: sunsetOf(i),
    to: new Date(sunsetOf(i).getTime() + 144 * 60_000),
  });

  /* the timing line for an observance on day i */
  const timingFor = (i: number, tithi: number, mode: Mode): FestivalTiming => {
    if (tithi === S(11) || tithi === K(11)) {
      // parana: next morning, after the first quarter of Dwadashi (Hari Vasara)
      const ekEnd = tithiEnd(instant(i, "sunrise"));
      const dwEnd = tithiEnd(new Date(ekEnd.getTime() + 60_000));
      const hariVasara =
        ekEnd.getTime() + (dwEnd.getTime() - ekEnd.getTime()) / 4;
      const at = new Date(Math.max(rise(i + 1).getTime(), hariVasara));
      return { label: "Parana", at, withDate: true };
    }
    if (mode === "midnight")
      return { label: "Nishita", at: instant(i, "midnight") };
    if (mode === "moonrise")
      return { label: "Moonrise", at: instant(i, "moonrise") };
    if (mode === "evening") return pradosh(i);
    if (mode === "midday")
      return { label: "Madhyahna", at: instant(i, "midday") };
    const probe =
      tithiAt(instant(i, mode)) === tithi
        ? instant(i, mode)
        : new Date(rise(i + 1).getTime() - 60_000);
    return { label: "Until", at: tithiEnd(probe), withDate: true };
  };

  const out: FestivalDay[] = [];
  const push = (i: number, e: Omit<FestivalDay, "date">) => {
    if (i >= BACK && i < BACK + days) out.push({ date: rise(i), ...e });
  };

  /* first day of each run of days matching an observance, with a sunrise fallback */
  const daysFor = (tithi: number, mode: Mode, month: number | null) => {
    const ok = (i: number, m: Mode) => {
      if (month === null) return true;
      return inMonth(i, m, month);
    };
    const byRise = (i: number) =>
      atRise[i].includes(tithi) &&
      (tithi === t0[i] ? ok(i, "sunrise") : ok(i + 1, "sunrise"));
    const byMode = (i: number) =>
      mode === "sunrise"
        ? byRise(i)
        : tithiAt(instant(i, mode)) === tithi && ok(i, mode);
    const hits: number[] = [];
    for (let i = 1; i < N - 1; i++)
      if (byMode(i) && !byMode(i - 1)) hits.push(i);
    for (let i = 1; i < N - 1; i++)
      if (
        byRise(i) &&
        !byRise(i - 1) &&
        !hits.some((h) => Math.abs(h - i) <= 1)
      )
        hits.push(i);
    return hits;
  };

  for (const f of FESTIVALS) {
    const mode = f.at ?? "sunrise";
    daysFor(f.tithi, mode, f.month).forEach((i) =>
      push(i, {
        name: f.name,
        note: f.note,
        kind: "festival",
        month: LUNAR_MONTHS[f.month],
        tithi: tithiLabel(f.tithi),
        timing: timingFor(i, f.tithi, mode),
      })
    );
  }

  // solar ingress: the day during which the Sun changes sign, at its exact moment
  for (let i = 1; i < N - 1; i++) {
    const next = sunSignAt(rise(i + 1));
    if (next !== sunSignAt(rise(i)) && SANKRANTI[next]) {
      let lo = rise(i).getTime();
      let hi = rise(i + 1).getTime();
      for (let k = 0; k < 30; k++) {
        const mid = (lo + hi) / 2;
        if (sunSignAt(new Date(mid)) === next) hi = mid;
        else lo = mid;
      }
      const m = monthAt(rise(i));
      push(i, {
        ...SANKRANTI[next],
        kind: "festival",
        month: m ? LUNAR_MONTHS[m.index] : "",
        tithi: `Sun enters ${RASHI[next]}`,
        timing: { label: "Sankranti", at: new Date(hi) },
      });
    }
  }

  // monthly vrats, unless a festival already marks the day
  for (const v of VRATS) {
    const mode = v.at ?? "sunrise";
    for (const t of v.tithis) {
      daysFor(t, mode, null).forEach((i) => {
        if (out.some((o) => o.date === rise(i) && o.kind === "festival"))
          return;
        const m = monthAt(instant(i, mode)) ?? monthAt(rise(i));
        if (!m) return;
        push(i, {
          name: v.name(m.index, t),
          note: v.note,
          kind: "vrat",
          month: `${m.adhika ? "Adhika " : ""}${LUNAR_MONTHS[m.index]}`,
          tithi: tithiLabel(t),
          timing: timingFor(i, t, mode),
        });
      });
    }
  }

  return out.sort(
    (a, b) =>
      a.date.getTime() - b.date.getTime() ||
      (a.kind === b.kind ? 0 : a.kind === "festival" ? -1 : 1)
  );
}

/* ---------------- Important hours of the day ---------------- */

// eighth part of daylight (1..8) for each weekday, Sunday first
const RAHU = [8, 2, 7, 5, 6, 4, 3];
const YAMA = [5, 4, 3, 2, 1, 7, 6];
const GULIKA = [7, 6, 5, 4, 3, 2, 1];

export type Timing = {
  key: string;
  name: string;
  note: string;
  start: Date;
  end: Date;
  tone: "keep" | "avoid" | "sun";
};

/** Brahma and Abhijit muhurta, Rahu Kaal, Yamaganda, Gulika Kaal, sunrise and sunset. */
export function dayTimings(sunrise: Date, sunset: Date, tz: string): Timing[] {
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: tz }).format(
      sunrise
    )
  );
  const rise = sunrise.getTime();
  const set = sunset.getTime();
  const part = (set - rise) / 8;
  const muhurta = (set - rise) / 15;
  const slot = (n: number) =>
    [new Date(rise + part * (n - 1)), new Date(rise + part * n)] as const;
  const [rs, re] = slot(RAHU[wd]);
  const [ys, ye] = slot(YAMA[wd]);
  const [gs, ge] = slot(GULIKA[wd]);
  const noon = (rise + set) / 2;

  const list: Timing[] = [
    {
      key: "brahma",
      name: "Brahma muhurta",
      note: "Before dawn; for prayer, study and stillness",
      start: new Date(rise - 96 * 60_000),
      end: new Date(rise - 48 * 60_000),
      tone: "keep",
    },
    {
      key: "sunrise",
      name: "Sunrise",
      note: "The day, its tithi and vara begin",
      start: sunrise,
      end: sunrise,
      tone: "sun",
    },
    {
      key: "abhijit",
      name: "Abhijit muhurta",
      note:
        wd === 3
          ? "Traditionally not used on Wednesdays"
          : "The victorious hour around midday",
      start: new Date(noon - muhurta / 2),
      end: new Date(noon + muhurta / 2),
      tone: wd === 3 ? "avoid" : "keep",
    },
    {
      key: "rahu",
      name: "Rahu Kaal",
      note: "Avoid starting anything new",
      start: rs,
      end: re,
      tone: "avoid",
    },
    {
      key: "yama",
      name: "Yamaganda",
      note: "Unfavourable for journeys and ventures",
      start: ys,
      end: ye,
      tone: "avoid",
    },
    {
      key: "gulika",
      name: "Gulika Kaal",
      note: "What begins now tends to repeat",
      start: gs,
      end: ge,
      tone: "avoid",
    },
    {
      key: "sunset",
      name: "Sunset",
      note: "Sandhya; a time for lamps and quiet",
      start: sunset,
      end: sunset,
      tone: "sun",
    },
  ];
  return list.sort((a, b) => a.start.getTime() - b.start.getTime());
}

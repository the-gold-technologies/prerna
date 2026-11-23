/*
 * Birth-chart calculations for PRERNA's chart page, run in the browser.
 *
 * - Sun and Moon: low-precision series from ./sky (well under a degree).
 * - Mercury–Saturn: JPL approximate Keplerian elements (Standish, valid
 *   1800–2050), typically within about a degree.
 * - Rahu/Ketu: mean lunar node.  Ascendant: from local sidereal time.
 * - Sidereal positions use the Lahiri ayanamsha; houses are whole-sign.
 *
 * Good for an approximate chart. Exact charts, divisional charts and
 * reports come from PRERNA's calculation API.
 */

import {
  CITIES,
  NAKSHATRAS,
  NAKSHATRA_LORDS,
  RASHI,
  SIGNS,
  ayanamsha,
  julianDay,
  moonTropical,
  sunTropical,
  type City,
} from "./sky";

const RAD = Math.PI / 180;
const norm = (a: number) => ((a % 360) + 360) % 360;

/* ---------------- Places ---------------- */
export const BIRTH_CITIES: City[] = [
  ...CITIES.filter((c) => c.tz === "Asia/Kolkata"),
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, tz: "Asia/Kolkata" },
  { name: "Pune", lat: 18.5204, lon: 73.8567, tz: "Asia/Kolkata" },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873, tz: "Asia/Kolkata" },
  { name: "Lucknow", lat: 26.8467, lon: 80.9462, tz: "Asia/Kolkata" },
  { name: "Patna", lat: 25.5941, lon: 85.1376, tz: "Asia/Kolkata" },
  { name: "Bhopal", lat: 23.2599, lon: 77.4126, tz: "Asia/Kolkata" },
  { name: "Chandigarh", lat: 30.7333, lon: 76.7794, tz: "Asia/Kolkata" },
  { name: "Kochi", lat: 9.9312, lon: 76.2673, tz: "Asia/Kolkata" },
  { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366, tz: "Asia/Kolkata" },
  { name: "Guwahati", lat: 26.1445, lon: 91.7362, tz: "Asia/Kolkata" },
  { name: "Bhubaneswar", lat: 20.2961, lon: 85.8245, tz: "Asia/Kolkata" },
  { name: "Nagpur", lat: 21.1458, lon: 79.0882, tz: "Asia/Kolkata" },
  { name: "Indore", lat: 22.7196, lon: 75.8577, tz: "Asia/Kolkata" },
  { name: "Surat", lat: 21.1702, lon: 72.8311, tz: "Asia/Kolkata" },
  { name: "Visakhapatnam", lat: 17.6868, lon: 83.2185, tz: "Asia/Kolkata" },
  { name: "Coimbatore", lat: 11.0168, lon: 76.9558, tz: "Asia/Kolkata" },
  { name: "Madurai", lat: 9.9252, lon: 78.1198, tz: "Asia/Kolkata" },
  { name: "Mysuru", lat: 12.2958, lon: 76.6394, tz: "Asia/Kolkata" },
  { name: "Amritsar", lat: 31.634, lon: 74.8723, tz: "Asia/Kolkata" },
  { name: "Dehradun", lat: 30.3165, lon: 78.0322, tz: "Asia/Kolkata" },
  { name: "Ranchi", lat: 23.3441, lon: 85.3096, tz: "Asia/Kolkata" },
  { name: "Raipur", lat: 21.2514, lon: 81.6296, tz: "Asia/Kolkata" },
  ...CITIES.filter((c) => c.tz !== "Asia/Kolkata"),
  { name: "Singapore", lat: 1.3521, lon: 103.8198, tz: "Asia/Singapore" },
  { name: "Toronto", lat: 43.6532, lon: -79.3832, tz: "America/Toronto" },
  {
    name: "San Francisco",
    lat: 37.7749,
    lon: -122.4194,
    tz: "America/Los_Angeles",
  },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, tz: "Australia/Sydney" },
].sort((a, b) =>
  a.tz === b.tz
    ? a.name.localeCompare(b.name)
    : a.tz === "Asia/Kolkata"
      ? -1
      : 1
);

/* ---------------- Time zones ---------------- */
function tzOffsetMs(at: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(at);
  const v = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(
    v("year"),
    v("month") - 1,
    v("day"),
    v("hour"),
    v("minute"),
    v("second")
  );
  return asUtc - at.getTime();
}

/** Local wall-clock time at a place → the real instant (UTC). */
export function localToUtc(
  date: string,
  time: string,
  tz: string | null,
  offsetHours = 0
) {
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, h, mi);
  if (!tz) return new Date(wall - offsetHours * 3600_000);
  let utc = wall - tzOffsetMs(new Date(wall), tz);
  utc = wall - tzOffsetMs(new Date(utc), tz);
  return new Date(utc);
}

/* ---------------- Planets (Keplerian elements, J2000) ---------------- */
type El = [number, number][]; // [value, rate per century] for a, e, I, L, ϖ, Ω
const ELEMENTS: Record<string, El> = {
  Mercury: [
    [0.38709927, 0.00000037],
    [0.20563593, 0.00001906],
    [7.00497902, -0.00594749],
    [252.2503235, 149472.67411175],
    [77.45779628, 0.16047689],
    [48.33076593, -0.12534081],
  ],
  Venus: [
    [0.72333566, 0.0000039],
    [0.00677672, -0.00004107],
    [3.39467605, -0.0007889],
    [181.9790995, 58517.81538729],
    [131.60246718, 0.00268329],
    [76.67984255, -0.27769418],
  ],
  Earth: [
    [1.00000261, 0.00000562],
    [0.01671123, -0.00004392],
    [-0.00001531, -0.01294668],
    [100.46457166, 35999.37244981],
    [102.93768193, 0.32327364],
    [0, 0],
  ],
  Mars: [
    [1.52371034, 0.00001847],
    [0.0933941, 0.00007882],
    [1.84969142, -0.00813131],
    [-4.55343205, 19140.30268499],
    [-23.94362959, 0.44441088],
    [49.55953891, -0.29257343],
  ],
  Jupiter: [
    [5.202887, -0.00011607],
    [0.04838624, -0.00013253],
    [1.30439695, -0.00183714],
    [34.39644051, 3034.74612775],
    [14.72847983, 0.21252668],
    [100.47390909, 0.20469106],
  ],
  Saturn: [
    [9.53667594, -0.0012506],
    [0.05386179, -0.00050991],
    [2.48599187, 0.00193609],
    [49.95424423, 1222.49362201],
    [92.59887831, -0.41897216],
    [113.66242448, -0.28867794],
  ],
};

function helio(name: string, T: number) {
  const [a, e, I, L, wbar, O] = ELEMENTS[name].map(([v, r]) => v + r * T);
  const M = norm(L - wbar) * RAD;
  const w = (wbar - O) * RAD;
  const om = O * RAD;
  const inc = I * RAD;
  let E = M + e * Math.sin(M);
  for (let k = 0; k < 8; k++)
    E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const [cw, sw, co, so, ci, si] = [
    Math.cos(w),
    Math.sin(w),
    Math.cos(om),
    Math.sin(om),
    Math.cos(inc),
    Math.sin(inc),
  ];
  return [
    (cw * co - sw * so * ci) * xp + (-sw * co - cw * so * ci) * yp,
    (cw * so + sw * co * ci) * xp + (-sw * so + cw * co * ci) * yp,
    sw * si * xp + cw * si * yp,
  ];
}

/** Geocentric tropical longitude (ecliptic of date) for a planet. */
function planetTropical(name: string, d: Date) {
  const T = (julianDay(d) - 2451545.0) / 36525;
  const p = helio(name, T);
  const e = helio("Earth", T);
  const lon = Math.atan2(p[1] - e[1], p[0] - e[0]) / RAD;
  return norm(lon + 1.396971 * T); // precess J2000 → date
}

function rahuTropical(d: Date) {
  const T = (julianDay(d) - 2451545.0) / 36525;
  return norm(125.04452 - 1934.136261 * T + 0.0020708 * T * T);
}

/** True (osculating) node: mean node plus its main periodic terms. */
function rahuTrue(d: Date) {
  const T = (julianDay(d) - 2451545.0) / 36525;
  const D = 297.8501921 + 445267.1114034 * T;
  const M = 357.5291092 + 35999.0502909 * T;
  const Mp = 134.9633964 + 477198.8675055 * T;
  const F = 93.272095 + 483202.0175233 * T;
  const s = (x: number) => Math.sin(x * RAD);
  return norm(
    rahuTropical(d) -
      1.4979 * s(2 * (D - F)) -
      0.15 * s(M) -
      0.1226 * s(2 * D) +
      0.1176 * s(2 * F) -
      0.0801 * s(2 * (Mp - F))
  );
}

function tropicalOf(name: string, d: Date, trueNode = false) {
  const node = () => (trueNode ? rahuTrue(d) : rahuTropical(d));
  if (name === "Sun") return sunTropical(d);
  if (name === "Moon") return moonTropical(d);
  if (name === "Rahu") return node();
  if (name === "Ketu") return norm(node() + 180);
  return planetTropical(name, d);
}

/** Tropical ascendant for an instant and place. */
function ascendantTropical(d: Date, lat: number, lon: number) {
  const jd = julianDay(d);
  const T = (jd - 2451545.0) / 36525;
  const gmst = norm(
    280.46061837 +
      360.98564736629 * (jd - 2451545.0) +
      0.000387933 * T * T -
      (T * T * T) / 38710000
  );
  const ramc = norm(gmst + lon) * RAD;
  const eps = (23.4392911 - 0.0130042 * T) * RAD;
  const asc = Math.atan2(
    Math.cos(ramc),
    -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat * RAD) * Math.sin(eps))
  );
  return norm(asc / RAD);
}

/* ---------------- Chart ---------------- */
export const GRAHAS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
] as const;
export type GrahaName = (typeof GRAHAS)[number];
export const ABBR: Record<GrahaName | "Asc", string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
  Asc: "As",
};
export const GRAHA_COLOR: Record<GrahaName, string> = {
  Sun: "#c0532a",
  Moon: "#5b6b86",
  Mars: "#b3352b",
  Mercury: "#2f7a4f",
  Jupiter: "#a77a22",
  Venus: "#b23a7a",
  Saturn: "#1c1844",
  Rahu: "#3b4ba8",
  Ketu: "#7a4a1e",
};

const NAK = 360 / 27;

export type Placement = {
  name: GrahaName | "Asc";
  lon: number; // sidereal
  sign: number; // 0..11
  deg: number; // within sign
  nakshatra: string;
  pada: number;
  house: number; // 1..12, whole-sign
  retro: boolean;
};

export type BirthChart = ReturnType<typeof castChart>;

export const AYANAMSHAS: { id: string; label: string; offset: number }[] = [
  { id: "lahiri", label: "Lahiri (Chitrapaksha)", offset: 0 },
  { id: "raman", label: "B. V. Raman", offset: -1.43 },
  { id: "kp", label: "Krishnamurti (KP)", offset: -0.0956 },
  { id: "yukteshwar", label: "Sri Yukteshwar", offset: -1.39 },
  { id: "fagan", label: "Fagan-Bradley", offset: 0.883 },
];
export const YEAR_OPTIONS = [
  { id: "365.25", label: "365.25 days", days: 365.25 },
  { id: "sidereal", label: "Sidereal year", days: 365.25636 },
  { id: "360", label: "360 days, savana", days: 360 },
];
export type ChartOptions = {
  ayanamsha?: string;
  trueNode?: boolean;
  yearDays?: number;
};

export function castChart(
  at: Date,
  lat: number,
  lon: number,
  opts: ChartOptions = {}
) {
  const ay =
    ayanamsha(at) +
    (AYANAMSHAS.find((a) => a.id === opts.ayanamsha)?.offset ?? 0);
  const ascLon = norm(ascendantTropical(at, lat, lon) - ay);
  const ascSign = Math.floor(ascLon / 30);
  const place = (
    name: GrahaName | "Asc",
    sid: number,
    retro: boolean
  ): Placement => {
    const sign = Math.floor(sid / 30);
    const n = Math.floor(sid / NAK);
    return {
      name,
      lon: sid,
      sign,
      deg: sid - sign * 30,
      nakshatra: NAKSHATRAS[n],
      pada: Math.floor((sid % NAK) / (NAK / 4)) + 1,
      house: ((sign - ascSign + 12) % 12) + 1,
      retro,
    };
  };

  const later = new Date(at.getTime() + 86400_000);
  const planets = GRAHAS.map((g) => {
    const now = tropicalOf(g, at, opts.trueNode);
    const next = tropicalOf(g, later, opts.trueNode);
    let move = next - now;
    if (move > 180) move -= 360;
    if (move < -180) move += 360;
    const retro =
      g === "Rahu" || g === "Ketu"
        ? true
        : g === "Sun" || g === "Moon"
          ? false
          : move < 0;
    return place(g, norm(now - ay), retro);
  });

  const asc = place("Asc", ascLon, false);
  const moon = planets[1];
  return {
    at,
    asc,
    planets,
    ascSign,
    moonSign: { en: SIGNS[moon.sign], sa: RASHI[moon.sign] },
    sunSign: { en: SIGNS[planets[0].sign], sa: RASHI[planets[0].sign] },
    lagna: { en: SIGNS[ascSign], sa: RASHI[ascSign] },
    dashas: vimshottari(moon.lon, at, opts.yearDays),
  };
}

/* ---------------- Vimshottari dasha ---------------- */
const DASHA_YEARS: Record<string, number> = {
  Ketu: 7,
  Venus: 20,
  Sun: 6,
  Moon: 10,
  Mars: 7,
  Rahu: 18,
  Jupiter: 16,
  Saturn: 19,
  Mercury: 17,
};

export type Dasha = { lord: string; start: Date; end: Date; years: number };

export function vimshottari(
  moonSid: number,
  birth: Date,
  yearDays = 365.25
): Dasha[] {
  const YEAR_MS = yearDays * 86400_000;
  const n = Math.floor(moonSid / NAK);
  const elapsed = (moonSid % NAK) / NAK;
  const first = n % 9;
  const out: Dasha[] = [];
  // start the first period where it notionally began, so the list reads naturally
  let start = new Date(
    birth.getTime() - elapsed * DASHA_YEARS[NAKSHATRA_LORDS[first]] * YEAR_MS
  );
  for (let i = 0; i < 10; i++) {
    const lord = NAKSHATRA_LORDS[(first + i) % 9];
    const years = DASHA_YEARS[lord];
    const end = new Date(start.getTime() + years * YEAR_MS);
    out.push({ lord, start, end, years });
    start = end;
  }
  return out;
}

export const fmtDeg = (d: number) => {
  const whole = Math.floor(d);
  const min = Math.floor((d - whole) * 60);
  return `${whole}° ${String(min).padStart(2, "0")}′`;
};

/** Antardashas (sub-periods) inside a mahadasha. */
export function antardashas(md: Dasha): Dasha[] {
  const i0 = NAKSHATRA_LORDS.indexOf(md.lord);
  const span = md.end.getTime() - md.start.getTime();
  let t = md.start.getTime();
  return Array.from({ length: 9 }).map((_, k) => {
    const lord = NAKSHATRA_LORDS[(i0 + k) % 9];
    const frac = DASHA_YEARS[lord] / 120;
    const start = new Date(t);
    t += span * frac;
    return { lord, start, end: new Date(t), years: md.years * frac };
  });
}

/* ---------------- Divisional charts (vargas) ---------------- */
export const VARGAS = [
  { n: 1, id: "D1", name: "Rāśi", about: "The birth chart" },
  { n: 2, id: "D2", name: "Hora", about: "Wealth" },
  { n: 3, id: "D3", name: "Drekkana", about: "Siblings and courage" },
  { n: 7, id: "D7", name: "Saptamsa", about: "Children" },
  { n: 9, id: "D9", name: "Navamsa", about: "Marriage and inner strength" },
  { n: 10, id: "D10", name: "Dasamsa", about: "Career" },
  { n: 12, id: "D12", name: "Dwadasamsa", about: "Parents" },
];

function vargaSign(lon: number, n: number) {
  const s = Math.floor(lon / 30);
  const deg = lon - s * 30;
  const odd = s % 2 === 0; // Aries (0) is an odd sign
  const part = Math.floor(deg / (30 / n));
  switch (n) {
    case 1:
      return s;
    case 2:
      return odd ? (deg < 15 ? 4 : 3) : deg < 15 ? 3 : 4; // Leo = Sun, Cancer = Moon
    case 3:
      return (s + 4 * part) % 12;
    case 7:
      return (s + (odd ? 0 : 6) + part) % 12;
    case 9:
      return Math.floor((lon * 9) / 30) % 12;
    case 10:
      return (s + (odd ? 0 : 8) + part) % 12;
    case 12:
      return (s + part) % 12;
    default:
      return s;
  }
}

/** A chart of the same shape as castChart(), with every point moved into the varga. */
export function vargaChart(c: BirthChart, n: number): BirthChart {
  if (n === 1) return c;
  const ascSign = vargaSign(c.asc.lon, n);
  const move = (p: Placement): Placement => {
    const sign = vargaSign(p.lon, n);
    const deg = (p.deg * n) % 30;
    return {
      ...p,
      sign,
      deg,
      lon: sign * 30 + deg,
      house: ((sign - ascSign + 12) % 12) + 1,
    };
  };
  return {
    ...c,
    asc: move(c.asc),
    planets: c.planets.map(move),
    ascSign,
    lagna: { en: SIGNS[ascSign], sa: RASHI[ascSign] },
  };
}

/* ---------------- Dignity ---------------- */
const SIGN_LORD = [
  "Mars",
  "Venus",
  "Mercury",
  "Moon",
  "Sun",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Saturn",
  "Jupiter",
];
const EXALT: Record<string, number> = {
  Sun: 0,
  Moon: 1,
  Mars: 9,
  Mercury: 5,
  Jupiter: 3,
  Venus: 11,
  Saturn: 6,
  Rahu: 1,
  Ketu: 7,
};
const OWN: Record<string, number[]> = {
  Sun: [4],
  Moon: [3],
  Mars: [0, 7],
  Mercury: [2, 5],
  Jupiter: [8, 11],
  Venus: [1, 6],
  Saturn: [9, 10],
};
const MOOLA: Record<string, [number, number, number]> = {
  Sun: [4, 0, 20],
  Moon: [1, 3, 30],
  Mars: [0, 0, 12],
  Mercury: [5, 15, 20],
  Jupiter: [8, 0, 10],
  Venus: [6, 0, 15],
  Saturn: [10, 0, 20],
};
const FRIENDS: Record<string, [string[], string[]]> = {
  Sun: [
    ["Moon", "Mars", "Jupiter"],
    ["Venus", "Saturn"],
  ],
  Moon: [["Sun", "Mercury"], []],
  Mars: [["Sun", "Moon", "Jupiter"], ["Mercury"]],
  Mercury: [["Sun", "Venus"], ["Moon"]],
  Jupiter: [
    ["Sun", "Moon", "Mars"],
    ["Mercury", "Venus"],
  ],
  Venus: [
    ["Mercury", "Saturn"],
    ["Sun", "Moon"],
  ],
  Saturn: [
    ["Mercury", "Venus"],
    ["Sun", "Moon", "Mars"],
  ],
};
export const DIGNITY_SCORE: Record<string, number> = {
  Exalted: 5,
  Moolatrikona: 4,
  "Own sign": 3.5,
  "Friend's sign": 2.5,
  Neutral: 2,
  "Enemy's sign": 1,
  Debilitated: 0,
};

export function dignity(p: Placement): keyof typeof DIGNITY_SCORE | "—" {
  if (p.name === "Asc") return "—";
  if (EXALT[p.name] === p.sign) return "Exalted";
  if ((EXALT[p.name] + 6) % 12 === p.sign) return "Debilitated";
  if (p.name === "Rahu" || p.name === "Ketu") return "Neutral";
  const m = MOOLA[p.name];
  if (m && m[0] === p.sign && p.deg >= m[1] && p.deg < m[2])
    return "Moolatrikona";
  if (OWN[p.name]?.includes(p.sign)) return "Own sign";
  const lord = SIGN_LORD[p.sign];
  const [fr, en] = FRIENDS[p.name];
  if (fr.includes(lord)) return "Friend's sign";
  if (en.includes(lord)) return "Enemy's sign";
  return "Neutral";
}

/** Directional strength (dig bala): the house where each planet is strongest. */
const DIG: Record<string, number> = {
  Jupiter: 1,
  Mercury: 1,
  Sun: 10,
  Mars: 10,
  Saturn: 7,
  Moon: 4,
  Venus: 4,
};

/** Simple strength ranking: dignity, directional strength and motion. Not full Shadbala. */
export function strengthRanking(c: BirthChart) {
  return c.planets
    .filter((p) => p.name !== "Rahu" && p.name !== "Ketu")
    .map((p) => {
      const d = dignity(p);
      let score = DIGNITY_SCORE[d] ?? 2;
      if (DIG[p.name] === p.house) score += 1;
      if (p.retro) score += 0.5; // cheshta bala: retrograde planets gain strength
      return { p, d, score: Math.min(6, score) };
    })
    .sort((a, b) => b.score - a.score);
}

/* ---------------- Jaimini chara karakas ---------------- */
export const KARAKAS = [
  ["AK", "Atma karaka", "The self"],
  ["AmK", "Amatya karaka", "Career and counsel"],
  ["BK", "Bhratri karaka", "Siblings"],
  ["MK", "Matri karaka", "Mother"],
  ["PiK", "Pitri karaka", "Father"],
  ["PK", "Putra karaka", "Children"],
  ["GK", "Gnati karaka", "Kin and rivals"],
  ["DK", "Dara karaka", "Spouse"],
] as const;

export function charaKarakas(c: BirthChart) {
  const list = c.planets
    .filter((p) => p.name !== "Ketu")
    .map((p) => ({ p, d: p.name === "Rahu" ? 30 - p.deg : p.deg }))
    .sort((a, b) => b.d - a.d);
  return KARAKAS.map((k, i) => ({ k, p: list[i]?.p }));
}

/* ---------------- Elements ---------------- */
export function elementBalance(c: BirthChart) {
  const out = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const keys = ["Fire", "Earth", "Air", "Water"] as const;
  [c.asc, ...c.planets].forEach((p) => (out[keys[p.sign % 4]] += 1));
  return out;
}

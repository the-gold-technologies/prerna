/*
 * Lightweight sky calculations for PRERNA's Today's Sky and tools.
 *
 * Uses standard low-precision formulas (Sun and Moon to well under a
 * degree, sunrise to about a minute) and the Lahiri ayanamsha. Good for
 * the panchang at a glance; the PRERNA calculation API will provide full
 * precision for charts and reports.
 */

export const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

export const NAKSHATRA_LORDS = [
  "Ketu",
  "Venus",
  "Sun",
  "Moon",
  "Mars",
  "Rahu",
  "Jupiter",
  "Saturn",
  "Mercury",
];

export const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export const RASHI = [
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Karka",
  "Simha",
  "Kanya",
  "Tula",
  "Vrishchika",
  "Dhanu",
  "Makara",
  "Kumbha",
  "Meena",
];

const TITHIS = [
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

const YOGAS = [
  "Vishkambha",
  "Priti",
  "Ayushman",
  "Saubhagya",
  "Shobhana",
  "Atiganda",
  "Sukarma",
  "Dhriti",
  "Shula",
  "Ganda",
  "Vriddhi",
  "Dhruva",
  "Vyaghata",
  "Harshana",
  "Vajra",
  "Siddhi",
  "Vyatipata",
  "Variyana",
  "Parigha",
  "Shiva",
  "Siddha",
  "Sadhya",
  "Shubha",
  "Shukla",
  "Brahma",
  "Indra",
  "Vaidhriti",
];

const KARANAS_MOVABLE = [
  "Bava",
  "Balava",
  "Kaulava",
  "Taitila",
  "Garaja",
  "Vanija",
  "Vishti",
];

const VARAS = [
  "Ravivara",
  "Somavara",
  "Mangalavara",
  "Budhavara",
  "Guruvara",
  "Shukravara",
  "Shanivara",
];

// Rahu Kaal: which eighth of the daylight it occupies, Sunday first (1-based).
const RAHU_PART = [8, 2, 7, 5, 6, 4, 3];

export type City = { name: string; lat: number; lon: number; tz: string };

export const CITIES: City[] = [
  { name: "New Delhi", lat: 28.6139, lon: 77.209, tz: "Asia/Kolkata" },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, tz: "Asia/Kolkata" },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946, tz: "Asia/Kolkata" },
  { name: "Chennai", lat: 13.0827, lon: 80.2707, tz: "Asia/Kolkata" },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639, tz: "Asia/Kolkata" },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867, tz: "Asia/Kolkata" },
  { name: "Varanasi", lat: 25.3176, lon: 82.9739, tz: "Asia/Kolkata" },
  { name: "London", lat: 51.5072, lon: -0.1276, tz: "Europe/London" },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, tz: "Asia/Dubai" },
  { name: "New York", lat: 40.7128, lon: -74.006, tz: "America/New_York" },
];

const RAD = Math.PI / 180;
const norm = (a: number) => ((a % 360) + 360) % 360;
const sin = (d: number) => Math.sin(d * RAD);
const cos = (d: number) => Math.cos(d * RAD);

export const julianDay = (d: Date) => d.getTime() / 86400000 + 2440587.5;
const fromJulian = (jd: number) => new Date((jd - 2440587.5) * 86400000);

/** Lahiri ayanamsha, linear approximation (good to a few arc-minutes this century). */
export function ayanamsha(d: Date) {
  const years = (julianDay(d) - 2451545.0) / 365.25;
  return 23.853 + years * 0.013972;
}

/** Tropical ecliptic longitude of the Sun. */
export function sunTropical(d: Date) {
  const n = julianDay(d) - 2451545.0;
  const L = 280.46 + 0.9856474 * n;
  const g = 357.528 + 0.9856003 * n;
  return norm(L + 1.915 * sin(g) + 0.02 * sin(2 * g));
}

/** Tropical ecliptic longitude of the Moon (main periodic terms). */
/* Main periodic terms of the lunar longitude (Meeus, ch. 47):
 * [D, M, M', F, coefficient in millionths of a degree]. */
const MOON_TERMS: [number, number, number, number, number][] = [
  [0, 0, 1, 0, 6288774],
  [2, 0, -1, 0, 1274027],
  [2, 0, 0, 0, 658314],
  [0, 0, 2, 0, 213618],
  [0, 1, 0, 0, -185116],
  [0, 0, 0, 2, -114332],
  [2, 0, -2, 0, 58793],
  [2, -1, -1, 0, 57066],
  [2, 0, 1, 0, 53322],
  [2, -1, 0, 0, 45758],
  [0, 1, -1, 0, -40923],
  [1, 0, 0, 0, -34720],
  [0, 1, 1, 0, -30383],
  [2, 0, 0, -2, 15327],
  [0, 0, 1, 2, -12528],
  [0, 0, 1, -2, 10980],
  [4, 0, -1, 0, 10675],
  [0, 0, 3, 0, 10034],
  [4, 0, -2, 0, 8548],
  [2, 1, -1, 0, -7888],
  [2, 1, 0, 0, -6766],
  [1, 0, -1, 0, -5163],
  [1, 1, 0, 0, 4987],
  [2, -1, 1, 0, 4036],
  [2, 0, 2, 0, 3994],
  [4, 0, 0, 0, 3861],
  [2, 0, -3, 0, 3665],
  [0, 1, -2, 0, -2689],
  [2, 0, -1, 2, -2602],
  [2, -1, -2, 0, 2390],
  [1, 0, 1, 0, -2348],
  [2, -2, 0, 0, 2236],
  [0, 1, 2, 0, -2120],
  [0, 2, 0, 0, -2069],
  [2, -2, -1, 0, 2048],
  [2, 0, 1, -2, -1773],
  [2, 0, 0, 2, -1595],
  [4, -1, -1, 0, 1215],
  [0, 0, 2, 2, -1110],
];

/** Tropical ecliptic longitude of the Moon (Meeus main terms, ~0.01°). */
export function moonTropical(d: Date) {
  const T = (julianDay(d) - 2451545.0) / 36525;
  const Lp = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  const D = 297.8501921 + 445267.1114034 * T - 0.0018819 * T * T;
  const M = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  const Mp = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  const F = 93.272095 + 483202.0175233 * T - 0.0036539 * T * T;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const A1 = 119.75 + 131.849 * T;
  const A2 = 53.09 + 479264.29 * T;
  let sum = 0;
  for (const [d1, m, mp, f, c] of MOON_TERMS) {
    const e = Math.abs(m) === 2 ? E * E : m !== 0 ? E : 1;
    sum += c * e * sin(d1 * D + m * M + mp * Mp + f * F);
  }
  sum += 3958 * sin(A1) + 1962 * sin(Lp - F) + 318 * sin(A2);
  return norm(Lp + sum / 1e6);
}

/** Sunrise and sunset (sunrise equation) for the day containing `d`. */
export function sunTimes(d: Date, lat: number, lon: number) {
  const n = Math.round(julianDay(d) - 2451545.0 + 0.0008 - lon / 360);
  const Jstar = n + lon / -360;
  const M = norm(357.5291 + 0.98560028 * Jstar);
  const C = 1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M);
  const lam = norm(M + C + 180 + 102.9372);
  const Jt = 2451545.0 + Jstar + 0.0053 * sin(M) - 0.0069 * sin(2 * lam);
  const decl = Math.asin(sin(lam) * sin(23.4397)) / RAD;
  const cosW = (sin(-0.833) - sin(lat) * sin(decl)) / (cos(lat) * cos(decl));
  const w = Math.acos(Math.max(-1, Math.min(1, cosW))) / RAD;
  return {
    sunrise: fromJulian(Jt - w / 360),
    sunset: fromJulian(Jt + w / 360),
    noon: fromJulian(Jt),
  };
}

export type Panchang = ReturnType<typeof panchang>;

export function panchang(d: Date, city: City) {
  const ay = ayanamsha(d);
  const sunT = sunTropical(d);
  const moonT = moonTropical(d);
  const sun = norm(sunT - ay);
  const moon = norm(moonT - ay);
  const elong = norm(moonT - sunT);

  const tithiIdx = Math.floor(elong / 12); // 0..29
  const paksha = tithiIdx < 15 ? "Shukla" : "Krishna";
  const tithiName =
    tithiIdx === 14
      ? "Purnima"
      : tithiIdx === 29
        ? "Amavasya"
        : TITHIS[tithiIdx % 15];

  const nakIdx = Math.floor(moon / (360 / 27));
  const pada = Math.floor((moon % (360 / 27)) / (360 / 108)) + 1;
  const yogaIdx = Math.floor(norm(sun + moon) / (360 / 27));

  const k = Math.floor(elong / 6); // 0..59
  const karana =
    k === 0
      ? "Kimstughna"
      : k >= 57
        ? ["Shakuni", "Chatushpada", "Naga"][k - 57]
        : KARANAS_MOVABLE[(k - 1) % 7];

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: city.tz,
  }).format(d);
  const wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekday);

  const { sunrise, sunset } = sunTimes(d, city.lat, city.lon);
  const part = (sunset.getTime() - sunrise.getTime()) / 8;
  const rStart = new Date(sunrise.getTime() + part * (RAHU_PART[wd] - 1));
  const rEnd = new Date(rStart.getTime() + part);

  return {
    date: d,
    city,
    sun,
    moon,
    elongation: elong,
    illumination: (1 - cos(elong)) / 2,
    waxing: elong < 180,
    tithi: {
      index: tithiIdx + 1,
      name: tithiName,
      paksha,
      progress: (elong % 12) / 12,
    },
    nakshatra: {
      index: nakIdx,
      name: NAKSHATRAS[nakIdx],
      pada,
      lord: NAKSHATRA_LORDS[nakIdx % 9],
      progress: (moon % (360 / 27)) / (360 / 27),
    },
    yoga: YOGAS[yogaIdx],
    karana,
    vara: VARAS[wd],
    moonSign: {
      index: Math.floor(moon / 30),
      en: SIGNS[Math.floor(moon / 30)],
      sa: RASHI[Math.floor(moon / 30)],
    },
    sunSign: {
      index: Math.floor(sun / 30),
      en: SIGNS[Math.floor(sun / 30)],
      sa: RASHI[Math.floor(sun / 30)],
    },
    sunrise,
    sunset,
    rahuKaal: { start: rStart, end: rEnd },
  };
}

export const timeIn = (d: Date, tz: string) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: tz,
  }).format(d);

export const dateIn = (d: Date, tz: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: tz,
  }).format(d);

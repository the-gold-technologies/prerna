"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  BIRTH_CITIES,
  VARGAS,
  YEAR_OPTIONS,
  castChart,
  localToUtc,
  vargaChart,
  type BirthChart,
} from "@/lib/chart";
import { panchang, type Panchang } from "@/lib/sky";
import {
  ChartHero,
  ChartForm,
  ChartDiagramView,
  ChartSummaryStrip,
  ChartPlanetsTable,
  ChartDashaTimeline,
  ChartStrengthsElements,
  ChartKarakasPanchang,
  ChartTransits,
  ChartNextSteps,
  ChartFaq,
  EMPTY,
  EXAMPLE,
  fromQuery,
  offsetFor,
  toQuery,
  type Form,
} from "./index";

export default function ChartPage() {
  const [f, setF] = useState<Form>(EMPTY);
  const [chart, setChart] = useState<BirthChart | null>(null);
  const [transit, setTransit] = useState<BirthChart | null>(null);
  const [birthDay, setBirthDay] = useState<Panchang | null>(null);
  const [who, setWho] = useState<{ name: string; line: string } | null>(null);
  const [now, setNow] = useState(0);
  const [style, setStyle] = useState<"north" | "south" | "wheel">("north");
  const [varga, setVarga] = useState(1);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const results = useRef<HTMLDivElement>(null);

  const flash = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(""), 2400);
  };
  const update = (patch: Partial<Form>) => setF((x) => ({ ...x, ...patch }));

  const onPlace = (place: string) => {
    const city = BIRTH_CITIES.find(
      (c) => c.name.toLowerCase() === place.trim().toLowerCase()
    );
    if (city)
      update({
        place: city.name,
        lat: String(city.lat),
        lon: String(city.lon),
        tz: city.tz,
        offset: offsetFor(f.date, f.time, city.tz),
      });
    else update({ place });
  };

  const cast = (form: Form, scroll = true) => {
    setError("");
    if (!form.date || !form.time)
      return setError("Please enter the date and time of birth.");
    const year = Number(form.date.slice(0, 4));
    if (year < 1900 || year > 2049)
      return setError("Please choose a birth year between 1900 and 2049.");
    const lat = Number(form.lat);
    const lon = Number(form.lon);
    if (
      !form.lat ||
      !form.lon ||
      !Number.isFinite(lat) ||
      !Number.isFinite(lon) ||
      Math.abs(lat) > 66 ||
      Math.abs(lon) > 180
    )
      return setError(
        "Choose a place from the list, or enter latitude (−66 to 66) and longitude (−180 to 180)."
      );
    const offset = Number(form.offset || 0);
    if (!form.tz && !Number.isFinite(offset))
      return setError("Please enter the UTC offset in hours, for example 5.5.");

    const at = localToUtc(form.date, form.time, form.tz, offset);
    const opts = {
      ayanamsha: form.ayan,
      trueNode: form.node === "true",
      yearDays: YEAR_OPTIONS.find((y) => y.id === form.year)?.days,
    };
    const c = castChart(at, lat, lon, opts);
    const t = Date.now();
    setNow(t);
    setChart(c);
    setTransit(castChart(new Date(t), lat, lon, opts));
    setBirthDay(
      panchang(at, {
        name: form.place || "Birthplace",
        lat,
        lon,
        tz: form.tz ?? "UTC",
      })
    );
    const d = new Date(form.date + "T00:00:00Z").toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    setWho({
      name: form.name.trim() || "Your chart",
      line: `${d} · ${form.time} · ${form.place || `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`}`,
    });
    window.history.replaceState(null, "", `?${toQuery(form).toString()}`);
    if (scroll)
      requestAnimationFrame(() =>
        results.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
  };

  const reset = () => {
    setF(EMPTY);
    setChart(null);
    setTransit(null);
    setBirthDay(null);
    setWho(null);
    setVarga(1);
    setError("");
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // open a shared or homepage link: /chart?d=YYYY-MM-DD&t=HH:MM&p=<place>&n=<name>
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const form = fromQuery(q);
    if (!form) return;
    const sty = q.get("s");
    const id = setTimeout(() => {
      if (sty === "south" || sty === "wheel") setStyle(sty);
      setF(form);
      cast(form, false);
    });
    return () => clearTimeout(id);
  }, []);

  /* ---------- actions ---------- */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      flash(
        "Link copied. It carries the birth details; nothing is stored by PRERNA."
      );
    } catch {
      flash("Copy the address from your browser bar to share this chart.");
    }
  };

  const running = chart?.dashas.find(
    (d) => d.start.getTime() <= now && d.end.getTime() > now
  );
  const shown = chart ? vargaChart(chart, varga) : null;
  const vInfo = VARGAS.find((v) => v.n === varga)!;

  return (
    <>
      <ChartHero chart={chart} toast={toast} onCopyLink={copyLink} />

      {/* Form + Chart canvas */}
      <section className="pb-20 pt-10 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <ChartForm
            f={f}
            error={error}
            onUpdate={update}
            onPlace={onPlace}
            onSubmit={() => cast(f)}
            onReset={reset}
            onLoadExample={() => {
              setF(EXAMPLE);
              cast(EXAMPLE);
            }}
          />

          <ChartDiagramView
            shown={shown}
            style={style}
            varga={varga}
            accuracy={f.accuracy}
            onStyleChange={setStyle}
            onVargaChange={setVarga}
          />
        </div>
      </section>

      {/* Results */}
      {chart && who && shown && (
        <div ref={results} className="scroll-mt-16">
          <ChartSummaryStrip chart={chart} who={who} running={running} />

          <ChartPlanetsTable
            chart={chart}
            shown={shown}
            vInfo={vInfo}
            ayan={f.ayan}
            node={f.node}
          />

          <ChartDashaTimeline chart={chart} running={running} now={now} />

          <ChartStrengthsElements chart={chart} />

          <ChartKarakasPanchang chart={chart} birthDay={birthDay} />

          {transit && <ChartTransits chart={chart} transit={transit} />}

          <ChartNextSteps />
        </div>
      )}

      <ChartFaq />
    </>
  );
}

export {
  ChartHero,
  ChartForm,
  ChartDiagramView,
  ChartSummaryStrip,
  ChartPlanetsTable,
  ChartDashaTimeline,
  ChartStrengthsElements,
  ChartKarakasPanchang,
  ChartTransits,
  ChartNextSteps,
  ChartFaq,
};

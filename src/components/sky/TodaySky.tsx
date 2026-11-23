"use client";

import React, { useState } from "react";
import { useSky } from "./SkyParts";
import {
  SkyHero,
  SkyLimbs,
  SkyDayLine,
  SkyNakshatraScale,
  SkyGuidance,
} from "./index";

export default function TodaySky() {
  const [city, setCity] = useState(0);
  const p = useSky(city);

  return (
    <>
      <SkyHero p={p} city={city} onCityChange={setCity} />
      <SkyLimbs p={p} />
      <SkyDayLine p={p} />
      <SkyNakshatraScale p={p} />
      <SkyGuidance p={p} />
    </>
  );
}

export { SkyHero, SkyLimbs, SkyDayLine, SkyNakshatraScale, SkyGuidance };

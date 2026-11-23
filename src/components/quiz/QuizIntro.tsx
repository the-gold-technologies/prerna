"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import VedicChakra, { Sparkle } from "../home/VedicChakra";
import { Yantra } from "./Yantra";
import { ELEMENTS, ORDER, QUESTIONS, type El } from "./quizData";

/* Point on a circle as % of its box, for placing items on an orbit ring */
const onRing = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return {
    left: `${(50 + 50 * Math.sin(a)).toFixed(3)}%`,
    top: `${(50 - 50 * Math.cos(a)).toFixed(3)}%`,
  };
};

// U+FE0E keeps these as text glyphs rather than emoji
const GRAHA_GLYPHS = ["☉", "☽", "♂", "☿", "♃", "♀", "♄"].map((g) => g + "︎");
const RASHI_GLYPHS = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
].map((g) => g + "︎");

const GLOW: Record<El, string> = {
  fire: "shadow-[0_0_30px_rgba(232,135,90,0.45)]",
  earth: "shadow-[0_0_30px_rgba(214,172,82,0.45)]",
  air: "shadow-[0_0_30px_rgba(169,155,224,0.45)]",
  water: "shadow-[0_0_30px_rgba(127,178,214,0.45)]",
};

/* Animated cosmic mandala: rashi wheel, element orbit, graha ring, OM core */
function CosmicMandala() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[440px] lg:max-w-[540px]">
      {/* rashi chakra (its rings turn on their own) */}
      <VedicChakra className="absolute inset-0 h-full w-full text-gold-bright opacity-40" />

      {/* core glow */}
      <div className="orb-pulse absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(214,172,82,0.35),rgba(100,69,143,0.25)_45%,transparent_70%)] blur-md" />

      {/* element orbit: four yantras, kept upright while the ring turns */}
      <div className="spin-slow absolute inset-[12%] rounded-full border border-dashed border-gold/30">
        {ORDER.map((el, i) => (
          <div
            key={el}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={onRing(i * 90)}
          >
            <div
              className={`orbit-upright grid h-14 w-14 place-items-center rounded-full bg-ink/85 ring-1 ring-gold/40 backdrop-blur sm:h-20 sm:w-20 ${GLOW[el]}`}
            >
              <Yantra
                el={el}
                className={`h-10 w-10 sm:h-14 sm:w-14 ${ELEMENTS[el].color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* graha ring: the seven classical planets, turning the other way */}
      <div className="spin-rev absolute inset-[29%] rounded-full border border-paper/15">
        {GRAHA_GLYPHS.map((g, i) => (
          <span
            key={i}
            className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink ring-1 ring-paper/20 sm:h-9 sm:w-9"
            style={onRing((i * 360) / 7)}
          >
            <span className="orbit-upright-rev font-display text-sm leading-none text-paper/80 sm:text-lg">
              {g}
            </span>
          </span>
        ))}
      </div>

      {/* OM core */}
      <div className="absolute inset-[39%] grid place-items-center rounded-full bg-[radial-gradient(circle,rgba(214,172,82,0.3),rgba(28,24,68,0.9)_70%)] ring-1 ring-gold/50">
        <span className="glow-pulse absolute inset-0 rounded-full" />
        <span className="font-display text-4xl text-gold-bright drop-shadow-[0_0_16px_rgba(214,172,82,0.9)] sm:text-6xl">
          ॐ
        </span>
      </div>

      <Sparkle className="twinkle absolute right-[6%] top-[8%] h-5 w-5 text-gold-bright" />
      <Sparkle
        className="twinkle absolute bottom-[10%] left-[4%] h-4 w-4 text-paper/70"
        style={{ animationDelay: "1.4s" }}
      />
      <Sparkle
        className="twinkle absolute left-[12%] top-[14%] h-3 w-3 text-gold-bright"
        style={{ animationDelay: "2.6s" }}
      />
    </div>
  );
}

export function QuizIntro({ onStart }: { onStart: () => void }) {
  return (
    <div>
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        {/* mandala sits above the copy on mobile, to the right on desktop */}
        <div className="rise lg:order-2" style={{ animationDelay: "120ms" }}>
          <CosmicMandala />
        </div>

        <div className="rise text-center lg:text-left">
          <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold-bright lg:justify-start">
            <span className="h-px w-8 bg-gold-bright/60" />
            Self-discovery quiz · the elements
          </p>
          <h1 className="mt-5 font-display text-5xl font-light leading-[1.02] sm:text-7xl">
            Which element <em className="text-gold-bright">guides you?</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/70 lg:mx-0">
            In Vedic thought, everything is made of the elements. Seven quick
            questions reveal the one that shapes how you think, feel and act.
          </p>
          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:justify-start">
            <button
              onClick={onStart}
              className="group flex cursor-pointer items-center gap-2 rounded-full bg-paper px-8 py-4 font-semibold text-ink shadow-[0_0_40px_rgba(214,172,82,0.3)] transition hover:bg-dawn"
            >
              Begin the quiz
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <p className="text-sm text-paper/45">
              {QUESTIONS.length} questions · about 2 minutes · free
            </p>
          </div>

          {/* the four tattvas */}
          <ul className="mx-auto mt-12 grid max-w-xl grid-cols-4 gap-2 border-t border-paper/10 pt-8 sm:gap-4 lg:mx-0">
            {ORDER.map((el, i) => (
              <li
                key={el}
                className="rise group flex flex-col items-center gap-2 rounded-2xl border border-paper/10 bg-paper/[0.03] px-2 py-4 transition hover:-translate-y-1 hover:border-gold/40 hover:bg-paper/[0.06]"
                style={{ animationDelay: `${300 + i * 90}ms` }}
              >
                <span
                  className="float block"
                  style={{ animationDelay: `${i * 0.8}s` }}
                >
                  <Yantra
                    el={el}
                    className={`h-10 w-10 transition duration-700 group-hover:rotate-45 sm:h-12 sm:w-12 ${ELEMENTS[el].color}`}
                  />
                </span>
                <span className="font-display text-lg text-paper/85">
                  {ELEMENTS[el].sa}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* drifting zodiac ribbon */}
      <div
        className="relative mt-16 overflow-hidden border-y border-paper/10 py-4 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
        aria-hidden="true"
      >
        <div className="marquee flex w-max items-center">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {[...RASHI_GLYPHS, ...RASHI_GLYPHS].map((g, i) => (
                <span key={i} className="flex items-center">
                  <span className="px-6 font-display text-2xl text-gold-bright/60">
                    {g}
                  </span>
                  <Sparkle className="h-2.5 w-2.5 text-paper/25" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

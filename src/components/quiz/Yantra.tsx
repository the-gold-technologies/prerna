import React from "react";
import type { El } from "./quizData";

/* ---------- Tattva yantras: the traditional shapes of the elements ---------- */
export function Yantra({
  el,
  className = "",
  style,
}: {
  el: El;
  className?: string;
  style?: React.CSSProperties;
}) {
  const stroke = { strokeWidth: 1.6, fill: "none", stroke: "currentColor" };
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="47"
        pathLength={1}
        {...stroke}
        strokeOpacity="0.35"
      />
      <circle
        cx="50"
        cy="50"
        r="42"
        {...stroke}
        strokeOpacity="0.25"
        strokeDasharray="1 4"
      />
      {el === "fire" && (
        <path
          pathLength={1}
          d="M50 18 L82 74 L18 74 Z"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      )}
      {el === "earth" && (
        <rect
          pathLength={1}
          x="24"
          y="24"
          width="52"
          height="52"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      )}
      {el === "air" && (
        <>
          <circle
            pathLength={1}
            cx="50"
            cy="50"
            r="27"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            pathLength={1}
            d="M50 27 L70 62 L30 62 Z M50 73 L30 38 L70 38 Z"
            {...stroke}
            strokeOpacity="0.7"
          />
        </>
      )}
      {el === "water" && (
        <path
          pathLength={1}
          d="M22 40 A28 28 0 0 0 78 40 A28 22 0 0 1 22 40 Z"
          fill="currentColor"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="1.8"
        />
      )}
      <circle cx="50" cy="50" r="2.4" fill="currentColor" />
    </svg>
  );
}

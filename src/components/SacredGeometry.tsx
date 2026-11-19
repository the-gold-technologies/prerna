"use client";

import React from "react";

interface SacredGeometryProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export default function SacredGeometry({
  className = "",
  size = 460,
  interactive = true,
}: SacredGeometryProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient gold glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4af37]/15 via-transparent to-[#fae8a4]/10 blur-3xl animate-pulse-subtle" />

      {/* SVG Sacred Geometry directly inspired by PRERNA Proposal Cover Art */}
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
      >
        <defs>
          <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae8a4" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#aa821f" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae8a4" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>

          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe699" stopOpacity="1" />
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Outermost Cosmic Boundary with Radial Calibrations (Rotating Slowly) */}
        <g className="origin-center animate-spin-slow">
          <circle
            cx="250"
            cy="250"
            r="238"
            stroke="url(#goldStroke)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            opacity="0.6"
          />
          <circle
            cx="250"
            cy="250"
            r="228"
            stroke="url(#goldStroke)"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* 12 Astrological Graduation Tick Marks on Outer Ring */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            const x1 = 250 + 228 * Math.cos(rad);
            const y1 = 250 + 228 * Math.sin(rad);
            const x2 = 250 + 242 * Math.cos(rad);
            const y2 = 250 + 242 * Math.sin(rad);
            return (
              <g key={`tick-${i}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#goldStroke)"
                  strokeWidth="2"
                  opacity="0.9"
                />
                <circle
                  cx={x2}
                  cy={y2}
                  r="2.5"
                  fill="#fae8a4"
                  opacity="0.9"
                />
              </g>
            );
          })}
        </g>

        {/* 2. Secondary Celestial Ring with Reverse Rotation */}
        <g className="origin-center animate-spin-reverse-slow">
          <circle
            cx="250"
            cy="250"
            r="195"
            stroke="url(#goldStroke)"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <circle
            cx="250"
            cy="250"
            r="165"
            stroke="url(#goldStroke)"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.5"
          />

          {/* Sacred Equilateral Hexagram / Interlocking Triangles */}
          {/* Triangle 1: Ascending Spirit */}
          <polygon
            points="250,55 418.8,347.5 81.2,347.5"
            stroke="url(#goldStroke)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.45"
          />
          {/* Triangle 2: Descending Matter */}
          <polygon
            points="250,445 81.2,152.5 418.8,152.5"
            stroke="url(#goldStroke)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.45"
          />
        </g>

        {/* 3. The Sacred Triad / Vesica Piscis (Astrology, Psychology, Spirituality Overlap) */}
        <g className="origin-center">
          {/* Top circle representing Spirit / Astrology */}
          <circle
            cx="250"
            cy="195"
            r="92"
            stroke="url(#goldStroke)"
            strokeWidth="1.4"
            opacity="0.75"
          />
          {/* Bottom-left circle representing Mind / Psychology */}
          <circle
            cx="195"
            cy="285"
            r="92"
            stroke="url(#goldStroke)"
            strokeWidth="1.4"
            opacity="0.75"
          />
          {/* Bottom-right circle representing Soul / Spirituality */}
          <circle
            cx="305"
            cy="285"
            r="92"
            stroke="url(#goldStroke)"
            strokeWidth="1.4"
            opacity="0.75"
          />

          {/* Elliptical Orbits */}
          <ellipse
            cx="250"
            cy="250"
            rx="120"
            ry="65"
            transform="rotate(-30 250 250)"
            stroke="url(#goldStroke)"
            strokeWidth="1"
            opacity="0.4"
          />
          <ellipse
            cx="250"
            cy="250"
            rx="120"
            ry="65"
            transform="rotate(30 250 250)"
            stroke="url(#goldStroke)"
            strokeWidth="1"
            opacity="0.4"
          />
        </g>

        {/* 4. Cardinal Cross Lines */}
        <line
          x1="250"
          y1="10"
          x2="250"
          y2="490"
          stroke="url(#goldStroke)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.3"
        />
        <line
          x1="10"
          y1="250"
          x2="490"
          y2="250"
          stroke="url(#goldStroke)"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.3"
        />

        {/* 5. Center Bindu / Golden Seed of Consciousness */}
        <circle
          cx="250"
          cy="250"
          r="16"
          fill="url(#centerGlow)"
          opacity="0.5"
          className="animate-pulse"
        />
        <circle
          cx="250"
          cy="250"
          r="7"
          fill="#fae8a4"
          stroke="#d4af37"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

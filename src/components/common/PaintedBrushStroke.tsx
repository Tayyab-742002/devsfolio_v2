// BrushStroke.tsx
import React from "react";

type Props = {
  width?: number | string;
  height?: number | string;
  colorA?: string;
  colorB?: string;
  colorC?: string;
  roughness?: number;
  className?: string;
};

export default function BrushStroke({
  width = "100%",
  height = 220,
  colorA = "#8c5cff",
  colorB = "#8c5cff",
  colorC = "#8c5cff",
  roughness = 16,
  className,
}: Props) {
  const r = Math.max(0, Math.min(30, roughness));

  return (
    <svg
      viewBox="0 0 1000 220"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <filter id="roughEdge" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={r}
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>

        <filter id="grain" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            seed="21"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="saturate"
            values="0.0"
            result="desat"
          />
          <feComponentTransfer in="desat" result="grain2">
            <feFuncA type="table" tableValues="0 0.12" />
          </feComponentTransfer>
        </filter>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="6" in="SourceAlpha" result="off" />
          <feGaussianBlur in="off" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.45"
            result="shadow"
          />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="paintGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={colorA} />
          <stop offset="0.45" stopColor={colorB} />
          <stop offset="1" stopColor={colorC} />
        </linearGradient>

        <radialGradient id="spec" cx="30%" cy="40%" r="40%">
          <stop offset="0" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      {/* shadow stroke */}
      <g filter="url(#shadow)">
        <path
          d="M40 110 C200 80, 520 80, 960 100"
          fill="none"
          stroke="#000"
          strokeOpacity="0.18"
          strokeWidth="46"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* main body */}
      <g filter="url(#roughEdge)">
        <path
          d="M30 100 C190 70, 510 70, 970 95"
          fill="none"
          stroke="url(#paintGradient)"
          strokeWidth="70"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="1"
        />
        {/* highlight */}
        <path
          d="M80 93 C240 78, 540 78, 960 106"
          fill="none"
          stroke="url(#spec)"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.85"
        />
      </g>

      {/* subtle grain */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="220"
        filter="url(#grain)"
        opacity="0.12"
      />

      {/* splatters */}
      <g fill={colorB} opacity="0.9">
        <ellipse cx="120" cy="140" rx="4" ry="6" />
        <ellipse cx="230" cy="150" rx="3" ry="4" />
        <ellipse cx="410" cy="132" rx="5" ry="7" />
        <ellipse cx="500" cy="160" rx="3" ry="5" />
        <ellipse cx="780" cy="135" rx="4" ry="6" />
      </g>

      {/* gloss */}
      <path
        d="M140 86 C300 75, 600 85, 960 104"
        fill="none"
        stroke="white"
        strokeOpacity="0.18"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

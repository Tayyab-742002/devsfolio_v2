import * as React from "react";
import type { SVGProps } from "react";

const PrevItem = (props: SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="30 40 30 20"
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    {...props}
  >
    <g id="previous-icon">
      {/* Arrow shaft - slightly wobbly */}
      <path
        d="M35 50 Q45 48 55 50"
        fill="none"
        stroke="#8c5cff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Arrow head - hand-drawn style */}
      <path
        d="M35 50 L42 43 M35 50 L43 57"
        fill="none"
        stroke="#8c5cff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default PrevItem;

import * as React from "react";
import type { SVGProps } from "react";

const NextItem = (props: SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="130 40 30 20"
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    width="1em"
    {...props}
  >
    <g id="next-icon">
      {/* Arrow shaft - slightly wobbly */}
      <path
        d="M135 50 Q145 52 155 50"
        fill="none"
        stroke="#8c5cff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Arrow head - hand-drawn style */}
      <path
        d="M155 50 L148 43 M155 50 L147 57"
        fill="none"
        stroke="#8c5cff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export default NextItem;

// components/Brushstroke.tsx
import React from "react";

interface BrushstrokeProps {
  color?: string; // Tailwind or HEX color (e.g., "#facc15" or "rgb(250,204,21)")
  width?: number; // Width in px
  height?: number; // Height in px
}

const Brushstroke: React.FC<BrushstrokeProps> = ({
  color = "#facc15",
  width = 300,
  height = 60,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 100"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      {/* Main realistic stroke */}
      <path
        d="M10 50 Q150 40 490 50"
        fill="none"
        stroke={color}
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: "blur(0.4px) drop-shadow(0 0 2px rgba(0,0,0,0.15))",
        }}
      />

      {/* Slight texture overlay for realism */}
      <path
        d="M12 52 Q150 45 488 52"
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="8 14"
        opacity="0.35"
      />
    </svg>
  );
};

export default Brushstroke;

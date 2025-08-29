"use client";
import { motion } from "framer-motion";

const BubbleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          animate={{
            y: [-50, window.innerHeight + 50],
            x: [Math.random() * 100 - 50, Math.random() * 100 + 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 8,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `-50px`,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <path
              d="M3,8 Q5,3 8,4 Q13,5 13,8 Q11,13 8,12 Q3,11 3,8 Z"
              fill="#8B5CF6"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default BubbleEffect;

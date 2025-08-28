"use client";
import { FC, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { motion, AnimatePresence } from "framer-motion";
import BrushStroke from "@/components/common/PaintedBrushStroke";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = slice.primary.testimonials;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="min-h-screen py-24 relative">
      {/* Section Header */}
      <div className="mb-16 pl-4 md:pl-8 relative z-30">
        <div className="flex items-center gap-4">
          <span
            className="text-2xl tracking-wider"
            style={{ color: "#8A5AFB" }}
          >
            05
          </span>
          <h2
            className="text-2xl font-bold tracking-wider"
            style={{ color: "#FFFFFF" }}
          >
            TESTIMONIALS
          </h2>
        </div>
        <BrushStroke width={280} height={25} />
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-5xl mx-auto px-4 relative z-20">
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote Symbol */}
              <div className="absolute -top-6 left-6 z-10">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  <path
                    d="M0,24 L8,8 L16,8 L8,24 Z M16,24 L24,8 L32,8 L24,24 Z"
                    fill="#8A5AFB"
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className=" shadow-[0_20px_50px_rgba(140,92,255,0.3)] rounded-[10px] hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300 p-8 md:p-12 mb-12 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <p className="text-gray-100 text-center text-xl md:text-2xl leading-relaxed mb-8 font-light">
                    {testimonials[currentIndex].comment}
                  </p>

                  <div className="text-center">
                    <h4 className="text-[#8A5AFB] text-xl md:text-2xl font-semibold mb-2">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-lg">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-25 mt-15">
            {/* Previous Button - Hand-drawn style */}
            <motion.button
              onClick={goToPrev}
              disabled={testimonials.length <= 1}
              whileHover={{
                scale: 1.15,
                rotate: -5,
                boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ scale: 0.9, rotate: 5 }}
              className="group relative w-16 h-16 flex items-center bg-primary/60 cursor-pointer justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform rotate-2"
              style={{
                clipPath: "polygon(10% 0%, 90% 5%, 95% 90%, 5% 95%)",
                boxShadow:
                  "0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(139, 92, 246, 0.2)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="group-hover:scale-125 transition-transform"
              >
                <path
                  d="M12,3 Q6,8 7,10 Q8,12 12,17"
                  stroke="url(#leftArrowRoughGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="leftArrowRoughGradient">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.button>

            {/* Next Button - Hand-drawn style */}
            <motion.button
              onClick={goToNext}
              disabled={testimonials.length <= 1}
              whileHover={{
                scale: 1.15,
                rotate: 5,
                boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)",
              }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              className="group relative w-16 h-16 flex items-center bg-primary/60 cursor-pointer justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform -rotate-2"
              style={{
                clipPath: "polygon(5% 5%, 95% 0%, 90% 95%, 10% 90%)",
                boxShadow:
                  "0 8px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(139, 92, 246, 0.2)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className="group-hover:scale-125 transition-transform"
              >
                <path
                  d="M8,3 Q14,8 13,10 Q12,12 8,17"
                  stroke="url(#rightArrowRoughGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="rightArrowRoughGradient">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

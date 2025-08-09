"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import BrushStroke from "@/components/common/PaintedBrushStroke";

gsap.registerPlugin(ScrollTrigger);

export type ExperienceProps = SliceComponentProps<Content.ExperienceSlice>;

const Experience: FC<ExperienceProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 640) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }
  }, []);

  const isDesktop = deviceType === "desktop";

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-12 md:py-20 relative"
      data-slice-type="experience"
      data-slice-variation={slice.variation}
    >
      {/* Title Section */}
      <div className="mb-10 pl-4 md:pl-8 relative z-30">
        <div className="flex items-center gap-4 ">
          <span className="text-primary text-2xl tracking-wider">02</span>
          <h2 className="text-2xl  font-bold text-white tracking-wider ">
            EXPERIENCE
          </h2>
        </div>
        <BrushStroke width={240} height={25} />
      </div>

      <div className="container  relative max-w-7xl mx-auto px-6 lg:px-15">
        {/* Timeline Line */}
        <div
          className={`absolute ${
            isDesktop
              ? "left-1/2 -translate-x-[1px]"
              : "left-[21px] sm:left-[25px]"
          } top-0 bottom-0 w-[2px]`}
        >
          <div
            ref={timelineRef}
            className="w-full relative h-0"
            style={{
              background: `repeating-linear-gradient(180deg, #222327 0%, #8c5cff 50%, transparent 50%, transparent 100%)`,
              backgroundSize: "4px 15px",
              boxShadow: "0 0 15px #8c5cff",
              opacity: 0.8,
            }}
          />
        </div>

        <div className="relative">
          {slice.primary.experiences.map((experience, index) => (
            <div
              key={index}
              className={`flex items-start mb-12 md:mb-16 ${
                isDesktop
                  ? index % 2 === 0
                    ? "flex-row pr-8"
                    : "flex-row-reverse pl-8"
                  : "ml-8 sm:ml-12"
              }`}
            >
              {/* Timeline Node */}
              <div
                className={`absolute ${
                  isDesktop
                    ? "left-1/2 -translate-x-1/2"
                    : "md:-left-1.5 md:-translate-x-1/2 -translate-x-7/4"
                } z-10`}
              >
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center cursor-pointer relative"
                  onClick={() =>
                    setActiveCard(activeCard === index ? null : index)
                  }
                >
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-primary shadow-[0_0_10px_#8c5cff]" />
                </div>
              </div>

              {/* Experience Card */}
              <div
                className={`${
                  isDesktop ? "w-[calc(50%-2rem)]" : "w-[calc(100%-2rem)]"
                } p-4 sm:p-5 md:p-6 transition-all duration-300 ${
                  activeCard === index
                    ? "border-primary shadow-[0_0_20px_rgba(79,143,255,0.2)]"
                    : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                      {experience.title}
                    </h3>
                    <h4 className="text-primary text-sm md:text-base mb-1 font-mono">
                      {experience.company_name}
                    </h4>
                  </div>
                  <div className="text-foreground text-xs md:text-sm font-mono whitespace-nowrap">
                    {experience.start_date} - {experience.end_date}
                  </div>
                </div>
                <div className="border-t border-border/40 mt-3 pt-3">
                  <h5 className="text-white text-sm md:text-base mb-2">
                    {experience.key_achievement} :
                  </h5>

                  <div className="text-[#cccccc] text-xs md:text-sm prose prose-invert">
                    <PrismicRichText field={experience.achievments} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

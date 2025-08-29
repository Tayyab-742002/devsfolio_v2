"use client";
import { FC, useRef, useEffect, useState } from "react";
import { Content, ImageField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import gsap from "gsap";
import BrushStroke from "@/components/common/PaintedBrushStroke";

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ImageField | null;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = (hovering: boolean) => {
    setIsHovered(hovering);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: hovering ? -5 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="w-[320px] h-[400px] mt-10 lg:mt-0 relative group cursor-pointer"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Main card with handmade paper effect */}
      <div
        className="relative w-full h-full p-8 overflow-hidden"
        style={{
          background: "#1A1B1E",
          borderRadius: "12px 15px 14px 16px",
          boxShadow: `
            0 8px 32px rgba(140, 92, 255, 0.4),
          `,
          transform: "rotate(-0.5deg)",
          border: "1px solid rgba(138, 90, 251, 0.2)",
        }}
      >
        {/* Paper grain texture overlay */}

        {/* Icon section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Hand-drawn circle background */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              className="absolute inset-0 -rotate-3"
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#8A5AFB"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.6"
                style={{
                  strokeDasharray: "8,4,2,4",
                  filter: "url(#roughCircle)",
                }}
              />
              <defs>
                <filter id="roughCircle">
                  <feTurbulence
                    baseFrequency="0.8"
                    numOctaves="3"
                    result="turbulence"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="2"
                  />
                </filter>
              </defs>
            </svg>

            {/* Icon container */}
            <div className="relative w-20 h-20 flex items-center justify-center"></div>
          </div>
        </div>

        {/* Title with handwritten underline */}
        <div className="mb-6 text-center">
          <h3
            className="text-2xl text-primary font-bold mb-2 relative inline-block"
            style={{
              transform: "rotate(0.3deg)",
            }}
          >
            {title}{" "}
          </h3>
        </div>

        {/* Description */}
        <p
          className="text-center text-base leading-relaxed"
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            transform: "rotate(-0.2deg)",
            lineHeight: "1.7",
          }}
        >
          {description}
        </p>

        {/* Bottom decorative element */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <svg width="60" height="8" viewBox="0 0 60 8">
            <circle cx="30" cy="4" r="3" fill="#8A5AFB" opacity="0.6" />
            <circle cx="18" cy="4" r="2" fill="#8A5AFB" opacity="0.4" />
            <circle cx="42" cy="4" r="2" fill="#8A5AFB" opacity="0.4" />
            <circle cx="10" cy="4" r="1.5" fill="#8A5AFB" opacity="0.3" />
            <circle cx="50" cy="4" r="1.5" fill="#8A5AFB" opacity="0.3" />
          </svg>
        </div>

        {/* Tape effect at corners */}
        <div
          className="absolute -top-1 right-8 w-12 h-6 opacity-60"
          style={{
            background:
              "linear-gradient(145deg, rgba(138, 90, 251, 0.1), rgba(138, 90, 251, 0.05))",
            transform: "rotate(15deg)",
            borderRadius: "2px",
            border: "1px solid rgba(138, 90, 251, 0.3)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>

      {/* Hover shadow */}
      <div
        className={`absolute inset-0 rounded-xl transition-all duration-300 -z-10 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(145deg, rgba(138, 90, 251, 0.08), rgba(138, 90, 251, 0.12))",
          filter: "blur(20px)",
          transform: "scale(1.1) translateY(10px)",
        }}
      />
    </div>
  );
};

const Services: FC<ServicesProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap
            .timeline()
            .from(".services-header", {
              y: -30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            })
            .from(
              ".services-cards > *",
              {
                y: 40,
                opacity: 0,
                duration: 0.7,
                stagger: 0.2,
                ease: "power3.out",
              },
              "-=0.4"
            );
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24" data-slice-type="services">
      <div className="container mx-auto px-4">
        <div className="mb-16 pl-4 md:pl-8 relative z-30">
          <div className="flex items-center gap-4">
            <span
              className="text-2xl tracking-wider "
              style={{ color: "#8A5AFB" }}
            >
              04
            </span>
            <h2
              className="text-2xl font-bold tracking-wider"
              style={{ color: "#FFFFFF" }}
            >
              SERVICES
            </h2>
          </div>
          <BrushStroke width={210} height={25} />
        </div>

        <div className="services-cards flex flex-wrap lg:flex-nowrap justify-center items-start gap-8 lg:gap-12">
          {slice.primary.services?.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title || ""}
              description={service.description || ""}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

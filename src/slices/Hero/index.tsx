"use client";
import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";




const Hero: FC<SliceComponentProps<Content.HeroSlice>> = ({ slice }) => {

  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative lg:mt-80 flex items-center justify-center overflow-hidden">
      {/* 3D Scene Container */}
      

      {/* Content Container */}
      <div className="container mx-auto px-4 text-center p-10">
        {/* Avatar */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-transparent opacity-80 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-background">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-background border border-primary/30">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <PrismicNextImage
                  field={slice.primary.avatar}
                  className="w-full h-full object-cover"
                  fallbackAlt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <div ref={textRef} className="mt-10 ">
          <PrismicRichText
            field={slice.primary.name}
            components={{
              paragraph: ({ children }) => (
                <h1 className="text-4xl font-bold text-white glow-text mb-2">
                  {children}
                </h1>
              ),
            }}
          />
        </div>

        {/* Title */}
        <PrismicRichText
          field={slice.primary.title}
          components={{
            paragraph: ({ children }) => (
              <h2 className="text-xl text-primary glow-text mb-4">
                {children}
              </h2>
            ),
          }}
        />

        {/* CTA Button */}
        <PrismicNextLink
          // field={slice.primary.cta}
          href={"#projects"}
          className="inline-flex mt-10 items-center gap-2 px-8 py-3 hover:text-primary rounded-full border-2 border-primary/30 text-white hover:bg-primary/10 transition-all duration-300 group"
        >
          EXPLORE WORK
          <span className="transform hover:text-primary translate-x-0 group-hover:translate-x-2 transition-transform duration-300">
            →
          </span>
        </PrismicNextLink>

        {/* Scroll Indicator */}
      </div>
    </section>
  );
};

export default Hero;

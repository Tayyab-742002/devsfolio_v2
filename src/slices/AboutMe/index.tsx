"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getSvg } from "@/utils/getSvg";
import { Tooltip } from "react-tooltip";
import Brushstroke from "@/components/common/PaintedBrushStroke";
gsap.registerPlugin(ScrollTrigger);

export type AboutMeProps = SliceComponentProps<Content.AboutMeSlice>;

const AboutMe: FC<AboutMeProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const glitchRef = useRef<HTMLDivElement | null>(null);
  const techGridRef = useRef<HTMLDivElement | null>(null);

  // Track if we're on md+ on the client (avoid SSR window usage)
  const [isMd, setIsMd] = useState<boolean>(false);

  useEffect(() => {
    // set initial value on client
    const handleResize = () => {
      setIsMd(window.innerWidth >= 768); // md breakpoint
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const glitchInterval = setInterval(() => {
        if (glitchRef.current) {
          gsap.to(glitchRef.current, {
            duration: 0.15,
            x: gsap.utils.random(-1, 1),
            y: gsap.utils.random(-1, 1),
            scale: 1.01,
            repeat: 1,
            yoyo: true,
            ease: "none",
          });
        }
      }, 4000);

      return () => {
        clearInterval(glitchInterval);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  // Optional: animate tech items on scroll
  useEffect(() => {
    if (techGridRef.current) {
      const items = techGridRef.current.querySelectorAll(".tech-layer");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: techGridRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type="about_me"
      className="min-h-screen relative overflow-hidden py-20"
    >
      {/* Header */}
      <div className="pl-4 mb-16 md:pl-8 relative z-30">
        <div className="flex items-center gap-4">
          <span className="text-primary text-2xl tracking-wider ">01</span>
          <h2 className="text-2xl font-bold text-foreground tracking-wider">
            ABOUT ME
          </h2>
        </div>
        <Brushstroke width={210} height={25} />
        {/* <div className="w-32 h-0.5 mt-2 bg-primary ml-9 neon-divider" /> */}
      </div>

      {/* Responsive Layout */}
      <div className="grid grid-cols-1 gap-8 max-w-7xl mx-auto px-6 lg:px-15 lg:grid-cols-12 items-start">
        {/* Profile */}
        <div className="lg:col-span-7 flex">
          <div className="w-full rounded-2xl hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300">
            <div className="w-full backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-primary shadow-xl hover:shadow-primary transition-all duration-500 card-3d">
              <div className="flex flex-col items-center h-full">
                <div className="text-left w-full">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    BIO
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Software engineer with a passion for building web
                    applications that are both functional and aesthetically
                    pleasing. Software engineer with a passion for building web
                    applications that are both functional and aesthetically
                    pleasing.
                  </p>
                </div>
                <div className="flex mt-5 items-center justify-center gap-5 w-full">
                  {slice.primary.techareas.map((item) => (
                    <div
                      key={item.title}
                      className="w-full max-w-[84px] h-full gap-4 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                    >
                      <CircularProgressbar
                        value={parseInt(item.percentage || "0") || 0}
                        text={`${item.percentage || 0}`}
                        className="w-12 h-12"
                        styles={{
                          path: { stroke: "#8c5cff", strokeLinecap: "butt" },
                          trail: { stroke: "#1e293b" },
                          text: { fill: "#8c5cff", fontSize: "16px" },
                        }}
                      />
                      <span className="text-primary text-xs">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey */}
        <div className="lg:col-span-5 flex">
          <div className="w-full rounded-2xl hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300">
            <div className="w-full h-full backdrop-blur-xl border border-border/40 rounded-2xl p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500 card-3d">
              <h3 className="text-xl font-bold text-foreground mb-6 tracking-wider">
                {slice.primary.my_journey}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {slice.primary.journey_detail}
              </p>
              <div className="flex flex-wrap gap-3">
                {slice.primary.tags.map((skill, index) => {
                  const Icon = getSvg(String(skill.tag_name).toLowerCase());
                  if (index < 24) {
                    return (
                      <div key={skill.tag_name}>
                        <Tooltip
                          id={skill.tag_name as string}
                          className="bg-primary!  border-primary!  shadow-primary/20!  text-xs! font-medium! tracking-wider!"
                        />

                        <div
                          // key={skill.tag_name}
                          className="rounded-lg bg-transparent flex items-center justify-center group cursor-pointer hover:scale-105 hover:shadow-glow transition-all duration-300"
                        >
                          <span className="text-primary group-hover:text-foreground transition-colors">
                            {Icon ? (
                              <Icon
                                className="w-5 h-5"
                                data-tooltip-id={skill.tag_name as string}
                                data-tooltip-content={skill.tag_name}
                              />
                            ) : (
                              skill.tag_name
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Expertise - Fixed responsive widths */}
        <div className="lg:col-span-12 flex">
          <div className="w-full rounded-2xl hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300">
            <div className="w-full h-full backdrop-blur-2xl border border-border/40 rounded-2xl p-10 shadow-lg hover:shadow-primary/20 transition-all duration-500 card-3d">
              <h3 className="text-xl font-semibold text-foreground mb-8 tracking-wide">
                {slice.primary.tech_expertise}
              </h3>

              <div
                ref={techGridRef}
                className="flex flex-col items-center gap-4"
              >
                {slice.primary.tech_skills.map((tech, index) => {
                  // compute width only on client (isMd)
                  const computedWidth = isMd
                    ? `${Math.max(30, 80 - index * 10)}%`
                    : "100%";

                  return (
                    <div
                      key={tech.skill}
                      className="tech-layer hover:scale-105 transition-all duration-300 w-full"
                      style={{ width: computedWidth } as React.CSSProperties}
                    >
                      <div className="text-center bg-transparent border border-primary/40 p-2 md:p-3 hover:bg-primary/5 transition-all duration-300 ">
                        <span className="text-foreground/90 text-xs md:text-sm font-medium">
                          {tech.skill}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

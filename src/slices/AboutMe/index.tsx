"use client";
import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
gsap.registerPlugin(ScrollTrigger);

export type AboutMeProps = SliceComponentProps<Content.AboutMeSlice>;

const AboutMe: FC<AboutMeProps> = ({ slice }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      data-slice-type="about_me"
      className="min-h-screen relative overflow-hidden py-20"
    >
      {/* Header */}
      <div className="pl-4 mb-16 md:pl-8 relative z-30">
        <div className="flex items-center gap-4">
          <span className="text-primary text-lg tracking-wider neon-text">
            01
          </span>
          <h2 className="text-2xl font-bold text-foreground tracking-wider">
            ABOUT ME
          </h2>
        </div>
        <div className="w-32 h-0.5 mt-2 bg-primary ml-9 neon-divider" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block relative">
        <div className="max-w-7xl mx-auto px-8">
          {/* First Card - Profile */}
          <div className="flex justify-center rounded-2xl place-self-start hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300 ">
            <div className="w-[400px] ">
              <div className="w-full h-full  backdrop-blur-xl border border-border rounded-2xl p-8 shadow-primary shadow-xl hover:shadow-primary transition-all duration-500 card-3d">
                <div className="flex flex-col items-center h-full">
                  {/* Bio */}
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-foreground mb-4">
                      Profile
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Software engineer with a passion for building web
                      applications that are both functional and aesthetically
                      pleasing.
                    </p>
                  </div>
                  {/* we will  show here the circular progress bar for  */}
                  <div className="flex mt-5 items-center justify-center gap-5">
                    {slice.primary.techareas.map((item) => (
                      <div
                        key={item.title}
                        className="w-full h-full gap-4 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300 "
                      >
                        <CircularProgressbar
                          value={parseInt(item.percentage || "0") || 0}
                          text={`${item.percentage || 0}`}
                          className="w-12 h-12"
                          styles={{
                            path: {
                              // Path color
                              stroke: "#8c5cff",
                              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                              strokeLinecap: "butt",
                            },
                            trail: {
                              stroke: "#1e293b",
                            },

                            text: {
                              // Text color
                              fill: "#8c5cff",

                              fontSize: "16px",
                            },
                          }}
                        />
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-primary text-xs">
                            {item.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Card - Journey */}
          <div className="flex justify-center rounded-2xl place-self-center hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300 ">
            <div className="w-[400px] ">
              <div className="w-full h-full bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500 card-3d">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold text-foreground mb-6 tracking-wider">
                    {slice.primary.my_journey}
                  </h3>

                  <div className="flex-1 mb-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {slice.primary.journey_detail}
                    </p>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {slice.primary.tags.map((skill, index) => {
                      if (index < 6) {
                        return (
                          <div
                            key={skill.tag_name}
                            className="skill-orb w-full h-16 rounded-lg bg-card border border-border/30 flex items-center justify-center group cursor-pointer hover:scale-105 hover:shadow-glow transition-all duration-300"
                          >
                            <span className="text-primary text-xs group-hover:text-foreground transition-colors">
                              {skill.tag_name}
                            </span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Card - Tech Stack */}
          <div className="flex justify-center place-self-end rounded-2xl  hover:scale-105 hover:shadow-[0_20px_50px_rgba(140,92,255,0.7)] transition-all duration-300">
            <div className="w-[400px] ">
              <div className="w-full h-full  backdrop-blur-xl border border-border  rounded-2xl p-8 shadow-2xl hover:shadow-primary/10 transition-all duration-500 card-3d">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold text-foreground mb-8 tracking-wider">
                    {slice.primary.tech_expertise}
                  </h3>

                  <div className="flex-1 flex flex-col items-center gap-4">
                    {slice.primary.tech_skills.map((tech, index) => (
                      <div
                        key={tech.skill}
                        className="w-full tech-layer hover:scale-102 transition-all duration-300"
                        style={{ width: `${100 - index * 8}%` }}
                      >
                        <div className="tech-stack-item text-center bg-card border border-primary p-3 hover:bg-primary/10 transition-all duration-300 rounded-lg">
                          <span className="text-foreground text-sm font-medium">
                            {tech.skill}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col gap-8 px-4">
        {/* Profile Card */}
        <div className="h-[400px]">
          <div className="w-full h-full bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col items-center h-full">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden mb-4">
                <div className="glitch-photo absolute inset-0 bg-muted rounded-xl flex items-center justify-center">
                  <PrismicNextImage
                    field={slice.primary.avatar}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="relative w-28 h-28 mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="54"
                    cy="54"
                    r="45"
                    className="stroke-muted stroke-[6] fill-none"
                  />
                  <circle
                    cx="54"
                    cy="54"
                    r="45"
                    className="stroke-primary stroke-[6] fill-none"
                    strokeDasharray="283"
                    strokeDashoffset="28"
                  />
                </svg>
                {slice.primary.techareas.map((item) => (
                  <div
                    key={item.title}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <span className="text-primary text-xs">{item.title}</span>
                    <span className="text-foreground text-xs font-bold">
                      {item.percentage}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h3 className="text-base font-bold text-foreground mb-2">
                  Profile
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Software engineer with a passion for building web
                  applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Card */}
        <div className="h-[350px]  self-end">
          <div className="w-full h-full bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold text-foreground mb-4 tracking-wider">
                {slice.primary.my_journey}
              </h3>

              <div className="flex-1 mb-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {slice.primary.journey_detail}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {slice.primary.tags.map((skill, index) => {
                  if (index < 4) {
                    return (
                      <div
                        key={skill.tag_name}
                        className="skill-orb w-full h-12 rounded-lg bg-card border border-border/30 flex items-center justify-center hover:scale-95 transition-all duration-300"
                      >
                        <span className="text-primary text-xs">
                          {skill.tag_name}
                        </span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Card */}
        <div className="h-[300px]">
          <div className="w-full h-full bg-card/50 backdrop-blur-xl border border-border/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold text-foreground mb-6 tracking-wider">
                {slice.primary.tech_expertise}
              </h3>

              <div className="flex-1 flex flex-col items-center gap-3">
                {slice.primary.tech_skills.map((tech, index) => (
                  <div
                    key={tech.skill}
                    className="w-full tech-layer hover:scale-98 transition-all duration-300"
                    style={{ width: `${100 - index * 6}%` }}
                  >
                    <div className="tech-stack-item bg-card border border-border/30 p-2 rounded-lg transition-all duration-300">
                      <span className="text-foreground text-sm">
                        {tech.skill}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

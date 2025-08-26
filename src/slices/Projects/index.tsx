"use client";
import { FC, useEffect, useRef, useState } from "react";
import { Content, asLink } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { motion, AnimatePresence } from "framer-motion";

import ProjectModal from "@/components/ProjectModal";
import BrushStroke from "@/components/common/PaintedBrushStroke";
import { getSvg } from "@/utils/getSvg";
import { Tooltip } from "react-tooltip";
import { NextItem, PrevItem } from "@/components/icons";

export type ProjectsProps = SliceComponentProps<Content.ProjectsSlice>;

const Projects: FC<ProjectsProps> = ({ slice }) => {
  const GithubIconComponent = getSvg("github");
  const LinkIconComponent = getSvg("link");

  const filters = ["ALL", "WEB", "MOBILE", "AI"] as const;
  type FilterType = (typeof filters)[number];

  type PrismicProjectItem = Content.ProjectsSliceDefaultPrimaryProjectsItem;
  type TechItem = { text: string };
  interface UIProject {
    category: string;
    thumbnail: PrismicProjectItem["thumbnail"];
    title: string;
    description: string;
    live_link: PrismicProjectItem["live_link"];
    github_link: PrismicProjectItem["github_link"];
    demo_video?: { url: string };
    long_description: PrismicProjectItem["long_description"];
    technologies: TechItem[];
  }

  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [filteredProjects, setFilteredProjects] = useState<UIProject[]>([]);
  const [touchStart, setTouchStart] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProject, setSelectedProject] = useState<UIProject | null>(
    null
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!slice.primary.projects) {
      setFilteredProjects([]);
      return;
    }

    const processProjects = () => {
      const projectsRaw = slice.primary.projects ?? [];
      return projectsRaw.map((project) => {
        const p = project as unknown as PrismicProjectItem;
        const techArray: TechItem[] = [];
        if (p.technologies && typeof p.technologies === "string") {
          p.technologies
            .split(/\s*[\|,]\s*/)
            .map((tech) => tech.trim())
            .filter(Boolean)
            .forEach((tech) => techArray.push({ text: tech }));
        }
        const demoUrl = asLink(p.demo_video);
        return {
          category: p.category || "WEB",
          thumbnail: p.thumbnail,
          title: p.title || "",
          description: p.description || "",
          live_link: p.live_link,
          github_link: p.github_link,
          demo_video: demoUrl ? { url: demoUrl } : undefined,
          long_description: p.long_description,
          technologies: techArray,
        } satisfies UIProject;
      });
    };

    const processedProjects = processProjects();
    if (activeFilter === "ALL") {
      setFilteredProjects(processedProjects);
    } else {
      const filtered = processedProjects.filter(
        (project) =>
          project.category && project.category.toUpperCase() === activeFilter
      );
      setFilteredProjects(filtered);
    }
    setActiveIndex(0);
  }, [activeFilter, slice.primary.projects]);

  const goToNext = () => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prevIndex) => (prevIndex + 1) % filteredProjects.length);
  };

  const goToPrev = () => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? filteredProjects.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <section
      className="py-16 md:py-20 lg:py-24 relative"
      data-slice-type="projects"
      id="projects"
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 pl-4 md:pl-8 relative z-30">
          <div className="flex items-center gap-4">
            <span className="text-primary text-2xl tracking-wider">03</span>
            <h2 className="text-2xl font-bold text-white tracking-wider">
              PROJECTS
            </h2>
          </div>
          <BrushStroke width={210} height={25} />
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex space-x-4 flex-wrap justify-center">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`rounded-full text-xs px-4 py-0.5 lg:px-4 lg:py-1 lg:text-sm mb-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "border border-border text-white"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-[300px] md:max-w-4xl h-[420px] mb-12">
          <div
            ref={carouselRef}
            className="relative h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isActive = index === activeIndex;
                const position =
                  index === activeIndex
                    ? "center"
                    : index ===
                        (activeIndex - 1 + filteredProjects.length) %
                          filteredProjects.length
                      ? "left"
                      : index === (activeIndex + 1) % filteredProjects.length
                        ? "right"
                        : index < activeIndex
                          ? "far-left"
                          : "far-right";

                const xPosition = {
                  "far-left": isMobile ? "-85px" : "-450px",
                  left: isMobile ? "-60px" : "-220px",
                  center: "0px",
                  right: isMobile ? "60px" : "220px",
                  "far-right": isMobile ? "85px" : "450px",
                }[position];

                const opacity = {
                  "far-left": 0,
                  left: 0.4,
                  center: 1,
                  right: 0.4,
                  "far-right": 0,
                }[position];

                const scale = {
                  "far-left": 0.7,
                  left: 0.8,
                  center: 1,
                  right: 0.8,
                  "far-right": 0.7,
                }[position];

                return (
                  <motion.div
                    key={`${project.title}-${index}`}
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      width: "300px",
                      cursor: "pointer",
                      pointerEvents: ["left", "center", "right"].includes(
                        position
                      )
                        ? "auto"
                        : "none",
                      visibility: ["left", "center", "right"].includes(position)
                        ? "visible"
                        : "hidden",
                      zIndex:
                        position === "center"
                          ? 30
                          : position === "left"
                            ? 20
                            : position === "right"
                              ? 20
                              : 10,
                    }}
                    onClick={() => {
                      if (
                        !isActive &&
                        ["left", "center", "right"].includes(position)
                      ) {
                        if (position === "left") {
                          goToPrev();
                        } else if (position === "right") {
                          goToNext();
                        }
                      } else if (isActive) {
                        setSelectedProject(project);
                      }
                    }}
                    initial={false}
                    animate={{
                      x: xPosition,
                      opacity: opacity,
                      scale: scale,
                      rotateY:
                        position === "left"
                          ? 25
                          : position === "right"
                            ? -25
                            : 0,
                      translateZ: position === "center" ? 0 : -100,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 35,
                      mass: 1,
                    }}
                    whileHover={{
                      scale: isActive ? 1.05 : scale,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <div
                      className={`bg-background card-3d border border-border/40 rounded-[10px] p-4 overflow-hidden transition-all duration-300 w-[300px] h-[400px] ${
                        isActive ? "border-border/40 " : ""
                      }`}
                    >
                      <div className="rounded-[12px] h-48 mb-4 overflow-hidden relative">
                        {project.thumbnail ? (
                          <PrismicNextImage
                            field={project.thumbnail}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-[#555555]">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col h-[calc(100%-13rem)]">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white text-lg font-semibold truncate pr-2">
                            {project.title}
                          </h3>
                          <div className="flex">
                            {project.live_link &&
                              project.live_link.link_type !== "Any" && (
                                <a
                                  href={asLink(project.live_link) || ""}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 rounded-lg text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                  {LinkIconComponent && (
                                    <LinkIconComponent className="w-4 h-4" />
                                  )}
                                </a>
                              )}
                            {project.github_link &&
                              project.github_link.link_type !== "Any" && (
                                <a
                                  href={asLink(project.github_link) || ""}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="p-2 rounded-lg hover:text-gray-300 transition-colors"
                                >
                                  {GithubIconComponent && (
                                    <GithubIconComponent className="w-4 h-4" />
                                  )}
                                </a>
                              )}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Technologies - beautified */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                          <Tooltip
                            id={project.title as string}
                            className="bg-primary! border-primary! shadow-primary/20! text-xs! font-medium! tracking-wider!"
                          />
                          {project.technologies.map(
                            (tech: TechItem, index: number) => {
                              if (index > 10) return null;
                              const IconComponent = getSvg(
                                String(tech.text).toLowerCase()
                              );
                              return IconComponent ? (
                                <div
                                  key={index}
                                  data-tooltip-id={project.title as string}
                                  data-tooltip-content={tech.text}
                                  className="p-1.5 rounded-md bg-background border border-border/30 hover:border-primary/50 hover:bg-background transition-all duration-300 flex items-center justify-center shadow-sm"
                                >
                                  <IconComponent className="w-4 h-4 text-gray-300 hover:text-primary transition-colors" />
                                </div>
                              ) : null;
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-[-5rem] left-0 right-0 flex items-center justify-center gap-5">
            <button
              onClick={goToPrev}
              className="w-8 h-8 cursor-pointer rounded-full   flex items-center justify-center hover:bg-[#252535] transition-colors"
              disabled={filteredProjects.length <= 1}
            >
              <PrevItem className="w-6 h-6" />
            </button>

            <div className="flex items-center">
              {filteredProjects.map((_, index) => (
                <div key={index} className="flex items-center">
                  {index < filteredProjects.length - 1 && (
                    <div
                      className={`w-6 h-[2px] mx-1 transition-colors duration-300 ${
                        index < activeIndex ? "bg-primary" : "bg-[#252535]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-8 h-8 rounded-full cursor-pointer  flex items-center justify-center hover:bg-[#252535] transition-colors"
              disabled={filteredProjects.length <= 1}
            >
              <NextItem className="w-6 h-6" />
            </button>
          </div>
        </div>

        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;

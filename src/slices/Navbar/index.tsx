"use client";
import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Home } from "lucide-react";
import { gsap } from "gsap";

import { NavbarSliceDefaultPrimaryLinksItem } from "../../../prismicio-types";
import { getSvg } from "@/utils/getSvg";

// Define which tabs to show on mobile/tablet
const mobileTabs = ["home", "about", "projects", "contact"];

/**
 * Props for `Navbar`.
 */
export type NavbarProps = SliceComponentProps<Content.NavbarSlice>;

/**
 * Component for "Navbar" Slices.
 */
const Navbar: FC<NavbarProps> = ({ slice }) => {
  // Initialize isMobile with a default value based on window width if available
  const [isMobile, setIsMobile] = useState(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    // Default to false for server-side rendering
    return false;
  });

  const [activeSection, setActiveSection] = useState("home");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Mark as loaded after first render
    setIsLoaded(true);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[data-slice-type]");
      const scrollPosition = window.scrollY + window.innerHeight / 3; // Better offset for detection

      // Check if we're at the top of the page
      if (scrollPosition < window.innerHeight / 2) {
        setActiveSection("home");
        return;
      }

      let currentSection = "home";
      let minDistance = Infinity;

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionCenter = sectionTop + section.clientHeight / 2;

        // Calculate distance from current scroll position to section center
        const distance = Math.abs(scrollPosition - sectionCenter);

        if (distance < minDistance) {
          minDistance = distance;
          const sectionType = section.getAttribute("data-slice-type");
          if (sectionType) {
            // Map section types to navigation items
            const sectionMap: { [key: string]: string } = {
              hero: "home",
              about_me: "about",
              projects: "projects",
              blog: "blogs",
              contact: "contact",
              experience: "exp",
              services: "services",
            };
            currentSection = sectionMap[sectionType] || "home";
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Debounce the scroll handler for smoother updates
    let scrollTimeout: NodeJS.Timeout;
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener("scroll", debouncedScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Initial entrance animation for the tab bar
      gsap.fromTo(
        ".mobile-tab-bar",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.8)",
        }
      );

      // Staggered animation for icons
      gsap.fromTo(
        ".nav-icon",
        {
          scale: 0,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.2,
        }
      );
    }
  }, [isMobile]);

  const handleNavigation = (e: React.MouseEvent, linkText: string) => {
    e.preventDefault();
    const sectionMap: { [key: string]: string } = {
      home: "hero",
      about: "about_me",
      projects: "projects",
      blogs: "blog",
      contact: "contact",
      exp: "experience",
      services: "services",
    };

    const sectionType = sectionMap[linkText.toLowerCase()];
    if (sectionType) {
      if (linkText.toLowerCase() === "home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setActiveSection("home");
      } else {
        const section = document.querySelector(
          `section[data-slice-type="${sectionType}"]`
        );
        if (section) {
          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionTop - 100, // Offset for better positioning
            behavior: "smooth",
          });
        }
      }
    } else {
      // Handle other navigation normally
      const link = e.currentTarget as HTMLAnchorElement;
      if (link.href) {
        window.location.href = link.href;
      }
    }
  };

  // Filter links based on screen size
  const getVisibleLinks = () => {
    if (!slice.primary.links) return [];

    if (isMobile) {
      return slice.primary.links.filter((link) => {
        const linkText = link?.url?.text?.trim().toLowerCase() || "home";
        return mobileTabs.includes(linkText);
      });
    }

    return slice.primary.links;
  };

  const isActive = (link: NavbarSliceDefaultPrimaryLinksItem) => {
    const linkText = link?.url?.text?.trim().toLowerCase() || "home";
    return activeSection === linkText;
  };

  const getIcon = (link: { url: { text: string } }) => {
    const linkText = link?.url?.text?.trim().toLowerCase() || "home";
    const Icon = getSvg(linkText) || Home;
    return <Icon className="w-6 h-6" />;
  };

  // Only render the mobile tab bar if the component has loaded
  const renderMobileTabBar = () => {
    if (!isLoaded || !isMobile) return null;

    return (
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[80%] z-50">
        <div className="mobile-tab-bar relative bg-primary-500/80 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-gradient-x" />
          <div className="flex justify-around items-center relative z-10">
            {getVisibleLinks().map(
              (link: NavbarSliceDefaultPrimaryLinksItem, index: number) => (
                <button
                  key={index}
                  onClick={(e) =>
                    handleNavigation(
                      e,
                      link?.url?.text?.trim().toLowerCase() || "home"
                    )
                  }
                  className={`flex flex-col items-center min-w-0 flex-1 group relative py-1.5 transition-all duration-300 ${
                    isActive(link) ? "text-primary" : "text-white/70"
                  }`}
                >
                  {/* Active indicator */}
                  <div
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary transition-all duration-300 ${
                      isActive(link)
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                  />

                  {/* Icon container */}
                  <div
                    className={`relative mb-1 transition-transform duration-300 ${
                      isActive(link) ? "scale-110" : "scale-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isActive(link)
                          ? "bg-primary/5 shadow-[0_0_15px_rgba(140,92,255,0.3)]"
                          : "bg-transparent"
                      }`}
                    >
                      {getIcon(link as { url: { text: string } })}
                    </div>
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                        isActive(link) ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute inset-0 bg-primary/20 blur-md animate-pulse" />
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[7px] sm:text-[8px] font-medium transition-all duration-300 truncate max-w-full text-center ${
                      isActive(link) ? "text-primary" : "text-white/70"
                    }`}
                  >
                    {link?.url?.text || "Link"}
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full hidden lg:block max-w-[940px] shadow-[0_10px_20px_rgba(140,_92,_255,_0.7)] rounded-2xl ${
          isMobile ? "hidden" : "block"
        }`}
      >
        <nav
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="bg-background rounded-[40px] flex items-center px-12 py-2 justify-between"
        >
          {/* Desktop content remains the same */}
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {slice.primary.logo && (
                <PrismicNextImage
                  field={slice.primary.logo}
                  className="w-10 h-10"
                />
              )}
            </div>
            <span className="text-white text-sm font-medium">
              {slice.primary.logotext}
            </span>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center">
              {slice.primary.links?.map((item, index) => {
                const linkText =
                  item?.url?.text?.trim().toLowerCase() || "home";
                const isActive = activeSection === linkText;

                return (
                  <div key={index} className="relative group">
                    <PrismicNextLink
                      field={item.url}
                      className={`text-white text-[10px] uppercase px-2 transition-colors ${
                        isActive ? "text-primary" : ""
                      }`}
                      onClick={(e) => handleNavigation(e, linkText)}
                    >
                      {item.url.text || "Link"}
                    </PrismicNextLink>
                    <div
                      className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive
                          ? "w-[40%] left-[30%]"
                          : "w-0 group-hover:w-[40%] group-hover:left-[30%]"
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </header>
      {/* Use the new render function for mobile tab bar */}
      {renderMobileTabBar()}
    </>
  );
};

export default Navbar;

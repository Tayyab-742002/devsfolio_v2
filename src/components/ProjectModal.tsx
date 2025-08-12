import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrismicNextImage } from "@prismicio/next";
import {
  X,
  Github,
  Globe,
  Play,
  ExternalLink,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import {
  ImageField,
  LinkField,
  RichTextField,
  asLink,
} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { getSvg } from "@/utils/getSvg";

type TechItem = { text: string };

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    thumbnail: ImageField;
    title: string;
    description: string;
    live_link?: LinkField;
    github_link?: LinkField;
    demo_video?: { url: string };
    long_description?: RichTextField;
    technologies?: TechItem[];
  } | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsPlaying(false);
      setShowShareOptions(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleShare = async () => {
    if (!project) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.log("Error copying to clipboard:", error);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", duration: 0.4, bounce: 0.25 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
  };

  if (!project) return null;

  const hasVideo = !!project.demo_video?.url;
  const liveUrl = asLink(project.live_link) || "";
  const githubUrl = asLink(project.github_link) || "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl overflow-hidden bg-background backdrop-blur-2xl border border-border/40  shadow-[0_20px_50px_rgba(140,92,255,0.9)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Thumbnail / Video */}
              {hasVideo ? (
                <div className="relative bg-black">
                  {!isPlaying ? (
                    <div className="relative aspect-video flex items-center justify-center">
                      <PrismicNextImage
                        field={project.thumbnail}
                        fill
                        className="object-cover opacity-60"
                      />
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="z-10 flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/90 hover:bg-primary text-white transition"
                      >
                        <Play className="w-5 h-5" />
                        Watch Demo
                      </button>
                    </div>
                  ) : (
                    <video
                      src={project.demo_video?.url}
                      controls
                      className="w-full"
                      autoPlay
                      playsInline
                      controlsList="nodownload"
                    />
                  )}
                </div>
              ) : (
                <div className="relative aspect-video">
                  <PrismicNextImage
                    field={project.thumbnail}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                </div>
              )}

              {/* Text & Actions */}
              <div className="p-6 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <p className="text-white/80 text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {liveUrl && (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                {showShareOptions && (
                  <div className="bg-white/10 rounded-lg p-3 space-y-2 border border-white/20">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-white hover:underline"
                    >
                      <LinkIcon className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                )}

                {/* Technologies */}
                {project.technologies?.length ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.slice(0, 12).map((tech, idx) => {
                      const Icon = getSvg(String(tech.text).toLowerCase());
                      return (
                        <div
                          key={`${tech.text}-${idx}`}
                          className="px-2 py-2 rounded-md bg-background text-white border border-border flex items-center gap-2 text-xs"
                          title={tech.text}
                        >
                          {Icon ? <Icon className="w-3.5 h-3.5" /> : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}

                {/* Long Description */}
                {project.long_description && (
                  <div className="prose prose-invert max-w-none">
                    <PrismicRichText field={project.long_description} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

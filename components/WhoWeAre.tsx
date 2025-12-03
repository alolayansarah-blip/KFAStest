"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function MinimalCallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle video play/pause events and show first frame
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleLoadedData = () => {
      if (video.readyState >= 2 && !isPlaying) {
        video.currentTime = 0.1;
      }
    };

    const handleCanPlay = () => {
      if (video.readyState >= 2 && !isPlaying) {
        video.currentTime = 0.1;
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);

    if (video.readyState >= 2 && !isPlaying) {
      video.currentTime = 0.1;
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [isPlaying]);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-white overflow-hidden py-24 sm:py-32 lg:py-40 font-poppins"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* About Us Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
            About Us
          </p>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-6"
        >
          <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight leading-tight">
            Kuwait Foundation for the Advancement of Sciences{" "}
            <span className="font-bold">(KFAS)</span>
          </h2>
        </motion.div>

        {/* Separator Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={
            isVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }
          }
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-8"
        >
          <div className="w-20 h-0.5 bg-[#EC601B]"></div>
        </motion.div>

        {/* Content Grid: Left (Paragraph + Vision/Mission) and Right (Video) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Paragraph and Vision/Mission */}
          <div className="space-y-8">
            {/* Paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="space-y-4"
            >
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                The Foundation’s efforts toward fostering STI to address
                national challenges first began through the pledge made by the
                private sector shareholding companies to fund the Foundation
                based on a set percentage of their annual profits — currently at
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-[#EC601B] font-medium hover:text-[#F7911E] transition-colors duration-300 group"
              >
                Read More
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Vision and Mission - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-gray-200">
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="space-y-4"
              >
                <h3 className="font-montserrat text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">
                  Vision
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  To advance science, technology, and innovation for a{" "}
                  <span className="font-semibold text-[#EC601B]">
                    resilient, thriving, and sustainable future
                  </span>
                  .
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="space-y-4"
              >
                <h3 className="font-montserrat text-xl sm:text-2xl font-normal text-gray-900 tracking-tight">
                  Mission
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  To pursue{" "}
                  <span className="font-semibold text-[#F7911E]">
                    scientific excellence to tackle national challenges
                  </span>{" "}
                  through a prominent science, technology, and innovation model.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group border-4 border-white hover:border-[#EC601B]/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(236,96,27,0.3)]">
              {/* Decorative gradient border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#EC601B] via-[#F7911E] to-[#EC601B] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>

              <video
                ref={videoRef}
                src="/image/bendoluim.mp4"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  if (video.readyState >= 2) {
                    video.currentTime = 0.1;
                  }
                }}
                onCanPlay={(e) => {
                  const video = e.currentTarget;
                  if (!isPlaying && video.readyState >= 2) {
                    video.currentTime = 0.1;
                  }
                }}
              />

              {/* Multi-layer gradient overlays for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#EC601B]/30 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#F7911E]/10 pointer-events-none"></div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer pointer-events-none transition-opacity duration-500"></div>
              {/* Play/Pause Button */}
              <button
                onClick={() => {
                  if (videoRef.current) {
                    if (isPlaying) {
                      videoRef.current.pause();
                    } else {
                      videoRef.current.play();
                    }
                    setIsPlaying(!isPlaying);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <svg
                    className="w-16 h-16 text-white drop-shadow-lg transition-transform duration-300 hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-16 h-16 text-white drop-shadow-lg transition-transform duration-300 hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(MinimalCallToAction);

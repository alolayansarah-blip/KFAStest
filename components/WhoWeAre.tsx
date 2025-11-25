"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MinimalCallToAction() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Animated Heading Component - Scroll-based
  const AnimatedHeading = ({
    text,
    className = "",
  }: {
    text: string;
    className?: string;
  }) => {
    const [visibleLetters, setVisibleLetters] = useState(0);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
      const handleScroll = () => {
        if (!headingRef.current || !sectionRef.current) return;

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate scroll progress within the section
        // Animation starts when section top enters viewport
        // Animation completes when section top is at 30% of viewport
        const sectionTop = rect.top;
        const triggerPoint = windowHeight * 0.7; // Start animation when section is 70% down viewport
        const endPoint = windowHeight * 0.3; // Complete when section is 30% down viewport

        let progress = 0;
        if (sectionTop <= triggerPoint && sectionTop >= endPoint) {
          // Section is in the animation zone
          progress = 1 - (sectionTop - endPoint) / (triggerPoint - endPoint);
        } else if (sectionTop < endPoint) {
          // Section has passed the animation zone
          progress = 1;
        } else {
          // Section hasn't reached animation zone
          progress = 0;
        }

        const totalLetters = text.length;
        const lettersToShow = Math.round(progress * totalLetters);
        setVisibleLetters(lettersToShow);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      // Initial check - ensure text is visible on load
      setTimeout(() => {
        handleScroll();
        // On mobile, show all letters immediately if section is in view
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            setVisibleLetters(text.length);
          }
        }
      }, 100);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [text]);

    const defaultClasses = "font-light leading-tight tracking-tight";
    const combinedClasses = className
      ? `${defaultClasses} ${className}`
      : `text-3xl lg:text-4xl xl:text-5xl ${defaultClasses}`;

    // Split text into words to prevent breaking within words
    const words = text.split(" ");
    let currentIndex = 0;

    return (
      <h2
        ref={headingRef}
        className={`${combinedClasses} break-normal whitespace-normal text-justify`}
        style={{ wordBreak: "normal", overflowWrap: "normal" }}
      >
        {words.map((word, wordIndex) => {
          const wordStartIndex = currentIndex;
          const wordLetters = word.split("");
          const wordEndIndex = currentIndex + wordLetters.length;
          currentIndex = wordEndIndex + 1; // +1 for the space

          return (
            <span
              key={wordIndex}
              className="inline-block whitespace-nowrap"
              style={{ whiteSpace: "nowrap" }}
            >
              {wordLetters.map((letter, letterIndex) => {
                const globalIndex = wordStartIndex + letterIndex;
                return (
                  <span
                    key={letterIndex}
                    className={`inline-block transition-colors duration-200 ${
                      globalIndex < visibleLetters
                        ? "text-[#EC601B]"
                        : "text-gray-900"
                    }`}
                  >
                    {letter}
                  </span>
                );
              })}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">{"\u00A0"}</span>
              )}
            </span>
          );
        })}
      </h2>
    );
  };

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

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className="relative bg-white overflow-hidden pt-32 sm:pt-24 lg:pt-32 pb-12 lg:pb-16"
      style={{ marginTop: "-200px" }}
    >
      {/* Beautiful orange gradient effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-[#EC601B]/12 via-[#F7911E]/6 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-[#FFAB40]/10 via-[#F7911E]/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#F26A21]/8 via-[#EC601B]/4 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#EC601B]/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#F7911E]/7 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-[5%] relative z-10">
        {/* Main Content Section */}
        <div className="pt-12 sm:pt-8 lg:pt-12">
          <div className="max-w-4xl mx-auto">
            {/* Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={
                  isVisible
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 30, scale: 0.95 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#EC601B] via-[#F7911E] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <AnimatedHeading text="Our vision and mission for the 2025-29 Strategy:" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={
                  isVisible
                    ? { opacity: 1, width: "auto" }
                    : { opacity: 0, width: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="w-24 h-1 bg-gradient-to-r from-[#EC601B] via-[#F7911E] to-transparent rounded-full shadow-lg shadow-[#EC601B]/30"></div>
              </motion.div>

              <div
                className={`transition-all duration-1000 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "0.5s" }}
              >
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light">
                  The Foundation's efforts toward fostering STI to address
                  national challenges first began through the pledge made by the
                  private sector shareholding companies to fund the Foundation
                  based on a set percentage of their annual profits — currently
                  at one percent — as well as through the incorporation of a
                  unique governance modality, in which the Board of Directors is
                  chaired and appointed by the Amir of the State of Kuwait.
                  Today, KFAS's impact is prominently embedded within the
                  country's scientific and technological accomplishments and ...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="pt-8 lg:pt-16 pb-8 lg:pb-12">
          <div className="flex flex-col max-w-4xl mx-auto">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50/50 rounded-t-2xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-x border-t border-gray-100 hover:border-[#EC601B]/20 overflow-hidden hover:scale-[1.03] origin-top z-10 hover:z-20">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#EC601B]/5 via-[#F7911E]/3 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Animated accent bar */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#EC601B] via-[#F7911E] to-[#FFAB40] rounded-l-2xl"
                ></motion.div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EC601B] to-[#F7911E] flex items-center justify-center shadow-lg shadow-[#EC601B]/30">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <AnimatedHeading
                      text="Our Vision"
                      className="text-2xl lg:text-3xl font-semibold"
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.6, delay: 1.3 }}
                    className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light"
                  >
                    Our vision is to advance science, technology, and innovation
                    for a resilient, thriving, and sustainable future.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* White Divider */}
            <div className="h-[1px] bg-white/80"></div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.8,
                delay: 1.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50/50 rounded-b-2xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border-x border-b border-gray-100 hover:border-[#EC601B]/20 overflow-hidden hover:scale-[1.03] origin-bottom z-10 hover:z-20">
                {/* Decorative gradient background */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-[#F7911E]/5 via-[#FFAB40]/3 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Animated accent bar */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                  className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#F7911E] via-[#FFAB40] to-[#FFC107] rounded-r-2xl"
                ></motion.div>

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F7911E] to-[#FFAB40] flex items-center justify-center shadow-lg shadow-[#F7911E]/30">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <AnimatedHeading
                      text="Our Mission"
                      className="text-2xl lg:text-3xl font-semibold"
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="text-lg lg:text-xl text-gray-600 leading-relaxed font-light"
                  >
                    Our mission is to pursue scientific excellence to tackle
                    national challenges through a prominent science, technology,
                    and innovation model.
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="pb-16 lg:pb-20"></div>
      </div>
    </section>
  );
}

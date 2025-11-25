"use client";

import React, { useState, useEffect, useRef } from "react";

export default function MinimalCounterSection() {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const counterValues = [1100, 1600, 3250, 26800, 950, 10000];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Animate counters
            counterValues.forEach((value, index) => {
              const duration = 2000;
              const steps = 60;
              const increment = value / steps;
              const stepDuration = duration / steps;

              let currentStep = 0;
              const timer = setInterval(() => {
                currentStep++;
                setCounts((prev) => {
                  const newCounts = [...prev];
                  if (newCounts[index] < value) {
                    newCounts[index] = Math.min(
                      newCounts[index] + increment,
                      value
                    );
                  }
                  return newCounts;
                });

                if (currentStep >= steps) {
                  clearInterval(timer);
                  setCounts((prev) => {
                    const newCounts = [...prev];
                    newCounts[index] = value;
                    return newCounts;
                  });
                }
              }, stepDuration);
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
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
  }, [hasAnimated]);

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "url('/image/banner3.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      ></div>

      {/* Transparent Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(236, 96, 27, 0.75) 0%, rgba(247, 145, 30, 0.70) 50%, rgba(236, 96, 27, 0.75) 100%)",
        }}
      ></div>

      {/* Animated gradient orbs for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
        {/* Left Text Content */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight leading-tight mb-6 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            50 years journey supporting science, technology, and innovation
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-white/80 via-white/60 to-transparent rounded-full"></div>
        </div>

        {/* Right Counters with Glassmorphism Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Counter Item 1 */}
          <div
            className="flex flex-col items-center text-center group"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="relative mb-4 flex justify-center">
                {/* Main counter circle */}
                <div
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 flex items-center justify-center text-2xl lg:text-3xl font-semibold transition-all duration-500 group-hover:rotate-6"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="relative z-10">
                    {formatNumber(counts[0])}
                  </span>
                </div>
              </div>
              <p className="text-white text-base lg:text-lg font-medium group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Researcher Supported
              </p>
            </div>
          </div>

          {/* Counter Item 2 */}
          <div
            className="flex flex-col items-center text-center group"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="relative mb-4 flex justify-center">
                <div
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 flex items-center justify-center text-2xl lg:text-3xl font-semibold transition-all duration-500 group-hover:-rotate-6"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="relative z-10">
                    {formatNumber(counts[1])}
                  </span>
                </div>
              </div>
              <p className="text-white text-base lg:text-lg font-medium group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Project Funded
              </p>
            </div>
          </div>

          {/* Counter Item 3 */}
          <div
            className="flex flex-col items-center text-center group"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="relative mb-4 flex justify-center">
                <div
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 flex items-center justify-center text-2xl lg:text-3xl font-semibold transition-all duration-500 group-hover:rotate-6"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="relative z-10">
                    {formatNumber(counts[2])}
                  </span>
                </div>
              </div>
              <p className="text-white text-base lg:text-lg font-medium group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Articles Published
              </p>
            </div>
          </div>

          {/* Counter Item 4 */}
          <div
            className="flex flex-col items-center text-center group"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="relative mb-4 flex justify-center">
                <div
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 flex items-center justify-center text-2xl lg:text-3xl font-semibold transition-all duration-500 group-hover:-rotate-6"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="relative z-10">
                    {formatNumber(counts[3])}
                  </span>
                </div>
              </div>
              <p className="text-white text-base lg:text-lg font-medium group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Citations
              </p>
            </div>
          </div>

          {/* Counter Item 5 */}
          <div
            className="flex flex-col items-center text-center group"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="relative mb-4 flex justify-center">
                <div
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 flex items-center justify-center text-2xl lg:text-3xl font-semibold transition-all duration-500 group-hover:rotate-6"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="relative z-10">
                    {formatNumber(counts[4])}
                  </span>
                </div>
              </div>
              <p className="text-white text-base lg:text-lg font-medium group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                International Collaborations
              </p>
            </div>
          </div>

          {/* Counter Item 6 */}
          <div
            className="flex flex-col items-center text-center group"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <div className="relative mb-4 flex justify-center">
                <div
                  className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 flex items-center justify-center text-2xl lg:text-3xl font-semibold transition-all duration-500 group-hover:-rotate-6"
                  style={{
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    color: "#FFFFFF",
                  }}
                >
                  <span className="relative z-10">
                    {formatNumber(counts[5])}
                  </span>
                </div>
              </div>
              <p className="text-white text-base lg:text-lg font-medium group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                Professional Trends
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

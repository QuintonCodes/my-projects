"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { sections } from "@/lib/data";

export default function VerticalNav() {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [indicatorTop, setIndicatorTop] = useState(10);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observation = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update active section only if it's visible and crossing the 50% threshold
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observation.observe(element);
    });
    return () => observation.disconnect();
  }, []);

  useEffect(() => {
    const index = sections.indexOf(activeSection);
    // Calculate new top position (30px gap + 10px initial offset)
    const newTop = index * 38 + 10;
    setIndicatorTop(newTop);
  }, [activeSection, sections]);

  const slideInVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  function handleScroll(id: string) {
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  return (
    <motion.div
      className="fixed z-50 hidden transform -translate-y-1/2 md:block right-8 top-1/2"
      initial="hidden"
      animate="visible"
      variants={slideInVariants}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Vertical line */}
        <div className="absolute h-full w-0.5 bg-border left-1/2 -translate-x-1/2 -z-10"></div>

        {/* Active section indicator - Enhanced with smoother transitions */}
        <motion.div
          className="absolute -translate-x-1/2 rounded-full size-2 bg-primary left-1/2"
          animate={{ top: indicatorTop }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-primary"
            variants={{
              pulse: {
                opacity: [1, 0.5, 1],
                transition: {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              },
            }}
            animate="pulse"
          />
        </motion.div>

        {/* Section dots */}
        {sections.map((id) => (
          <div key={id} className="relative flex items-center py-3 group">
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(id);
              }}
              className={`size-4 rounded-full border flex items-center justify-center transition-transform duration-200 hover:scale-110
                ${
                  id === activeSection
                    ? "border-primary"
                    : "border-muted-foreground"
                }`}
              aria-label={`Scroll to ${id}`}
            >
              <span
                className={`size-2 rounded-full transition-colors duration-200
                ${id === activeSection ? "bg-primary" : "bg-transparent"}`}
              ></span>
            </a>

            {/* Label that appears on hover */}
            <span className="absolute px-2 py-1 text-xs transition-opacity border rounded-md shadow-sm opacity-0 right-7 group-hover:opacity-100 bg-background whitespace-nowrap">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

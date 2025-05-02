"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function VerticalNav() {
  const [activeSection, setActiveSection] = useState("hero");

  // Cache section offsets and dimensions
  const sectionElements = useMemo(() => {
    return sections.map((section) => {
      const element = document.getElementById(section.id);
      return {
        id: section.id,
        offset: element?.offsetTop || 0,
        height: element?.offsetHeight || 0,
      };
    });
  }, []);

  // Function to determine which section is currently visible
  const determineActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY;
    const buffer = 100; // pixels

    const currentSection = sectionElements.find(
      (section) =>
        scrollPosition >= section.offset - buffer &&
        scrollPosition < section.offset + section.height - buffer
    );

    if (currentSection) {
      setActiveSection(currentSection.id);
    } else if (scrollPosition < sectionElements[0].offset) {
      setActiveSection(sectionElements[0].id);
    }
  }, [sectionElements]);

  useEffect(() => {
    const handleScroll = debounce(determineActiveSection, 100); // Debounce scroll events
    window.addEventListener("scroll", handleScroll);
    determineActiveSection();

    return () => {
      window.removeEventListener("scroll", determineActiveSection);
    };
  }, [determineActiveSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="fixed z-50 block transform -translate-y-1/2 right-8 top-1/2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative flex flex-col items-center">
        {/* Vertical line */}
        <div className="absolute h-full w-0.5 bg-border dark:bg-border left-1/2 transform -translate-x-1/2 -z-10"></div>

        {/* Active section indicator - Enhanced with smoother transitions */}
        <motion.div
          className="absolute w-2 h-2 transform -translate-x-1/2 rounded-full bg-primary left-1/2 line-pulse"
          animate={{
            top: `${
              sections.findIndex((s) => s.id === activeSection) * 40 + 10
            }px`,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 1.2,
          }}
        />

        {/* Section dots */}
        {sections.map((section) => (
          <div key={section.id} className="flex items-center py-4 group">
            <motion.button
              className={`w-4 h-4 rounded-full border border-primary flex items-center justify-center
                ${
                  activeSection === section.id
                    ? "border-primary"
                    : "border-muted-foreground"
                }`}
              onClick={() => scrollToSection(section.id)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
              aria-label={`Scroll to ${section.label} section`}
            >
              <span
                className={`w-2 h-2 rounded-full
                ${
                  activeSection === section.id ? "bg-primary" : "bg-transparent"
                }`}
              ></span>
            </motion.button>

            {/* Label that appears on hover */}
            <span className="absolute px-2 py-1 text-sm transition-opacity border rounded-md shadow-sm opacity-0 right-7 group-hover:opacity-100 bg-background whitespace-nowrap">
              {section.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

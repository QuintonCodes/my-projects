"use client";

import { useEffect, useState } from "react";

import { sections } from "@/lib/data";

export default function VerticalNav() {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observation = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observation.observe(element);
    });
    return () => observation.disconnect();
  }, []);

  return (
    <div className="fixed z-50 hidden transform -translate-y-1/2 md:block right-8 top-1/2 animate-fade-in-slide">
      <div className="relative flex flex-col items-center">
        {/* Vertical line */}
        <div className="absolute h-full w-0.5 bg-border left-1/2 -translate-x-1/2 -z-10"></div>

        {/* Active section indicator - Enhanced with smoother transitions */}
        <div
          className="absolute transition-all duration-300 -translate-x-1/2 rounded-full size-2 bg-primary left-1/2 line-pulse"
          style={{
            top: `${sections.indexOf(activeSection) * 40 + 10}px`,
          }}
        />

        {/* Section dots */}
        {sections.map((id) => (
          <div key={id} className="relative flex items-center py-3 group">
            <a
              href={`#${id}`}
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
    </div>
  );
}

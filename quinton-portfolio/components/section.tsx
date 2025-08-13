"use client";

import { ChevronDown } from "lucide-react";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  nextSectionId?: string;
};

export default function Section({
  id,
  children,
  className = "",
  nextSectionId,
}: SectionProps) {
  function scrollToNextSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  }

  return (
    <section
      id={id}
      className={`min-h-screen py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center relative overflow-hidden animate-fade-in-up ${className}`}
    >
      <div
        className="absolute inset-0 -z-10 gradient-bg will-change-[background-position,filter]"
        aria-hidden="true"
      />
      {children}

      {nextSectionId && (
        <div
          className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2 animate-bounce-slow"
          onClick={() => scrollToNextSection(nextSectionId)}
        >
          <ChevronDown size={24} />
        </div>
      )}
    </section>
  );
}

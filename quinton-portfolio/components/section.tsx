"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

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
    <motion.section
      id={id}
      className={`min-h-screen py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="absolute inset-0 -z-10 gradient-bg will-change-[background-position,filter]"
        aria-hidden="true"
      />
      {children}

      {nextSectionId && (
        <motion.div
          className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2"
          onClick={() => scrollToNextSection(nextSectionId)}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={24} />
        </motion.div>
      )}
    </motion.section>
  );
}

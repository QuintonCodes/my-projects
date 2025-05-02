"use client";

import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { useRef } from "react";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Section({ id, children, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={ref}
        id={id}
        className={`min-h-screen py-20 px-4 md:px-8 lg:px-16 flex flex-col justify-center relative overflow-hidden ${className}`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        style={{ willChange: "opacity, transform" }}
      >
        <div
          className="absolute inset-0 -z-10 gradient-bg will-change-[background-position,filter]"
          aria-hidden="true"
        />
        {children}
      </m.section>
    </LazyMotion>
  );
}

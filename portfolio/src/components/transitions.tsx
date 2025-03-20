"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

export function StairTransition() {
  const pathname = usePathname();

  const stairAnimation = {
    initial: {
      top: "0%",
    },
    animate: {
      top: "100%",
    },
    exit: {
      top: ["100%", "0%"],
    },
  };

  const reverseIndex = (index: number) => {
    const totalSteps = 6;
    return totalSteps - index - 1;
  };

  return (
    <AnimatePresence mode="wait">
      <div key={pathname}>
        <div className="fixed top-0 left-0 right-0 z-40 flex w-screen h-screen pointer-events-none">
          {[...Array(6)].map((_, index) => (
            <motion.div
              animate="animate"
              className="relative w-full h-full bg-white"
              exit="exit"
              initial="initial"
              key={index}
              transition={{
                delay: reverseIndex(index) * 0.1,
                duration: 0.4,
                ease: "easeInOut",
              }}
              variants={stairAnimation}
            />
          ))}
        </div>

        <motion.div
          animate={{
            opacity: 0,
            transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
          }}
          className="fixed top-0 w-screen h-screen pointer-events-none bg-primary"
          initial={{ opacity: 1 }}
        />
      </div>
    </AnimatePresence>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          animate={{
            opacity: 0,
            transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
          }}
          className="fixed top-0 w-screen h-screen pointer-events-none bg-primary"
          initial={{ opacity: 1 }}
        />
        {children}
      </div>
    </AnimatePresence>
  );
}

"use client";

import { motion } from "motion/react";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.4, ease: "easeIn" },
        }}
        className="w-[298px] h-[298px] xl:w-[490px] xl:h-[490px] relative"
      >
        {/* Image */}
        <Image
          src="/potrait.png"
          quality={90}
          priority
          fill
          sizes="(max-width: 1024px) 298px, 490px"
          alt="Kagiso Jiyane"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Photo;

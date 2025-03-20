"use client";

import { Download } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Button } from "./ui/button";

interface HeroData {
  description: string;
  role: string;
  subtitle: string;
  title: string;
}

export default function Hero({
  children,
  data,
}: {
  children: React.ReactNode;
  data: HeroData;
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-10 xl:flex-row xl:pt-6 xl:pb-10">
      {/* Text */}
      <div className="order-2 text-center xl:text-left xl:order-none">
        <span className="text-xl">{data.role}</span>
        
        <h1 className="mb-6 h1">
          {data.title} <br />
          <span className="text-accent">{data.subtitle}</span>
        </h1>
        <p className="max-w-lg mb-9 text-white/80">{data.description}</p>
        {/* Button and socials */}
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <a download="Quinton's Resume" href="/resume.pdf">
            <Button
              className="flex items-center gap-2 uppercase rounded-full"
              size="lg"
              variant="outline"
            >
              <span>Download CV</span>
              <Download />
            </Button>
          </a>
          {/* Socials */}
          <div className="mb-8 xl:mb-0">{children}</div>
        </div>
      </div>

      {/* Photo */}
      <div className="order-1 mb-8 xl:order-none xl:mb-0">
        <div className="relative w-full h-full">
          <motion.div
            animate={{
              opacity: 1,
              transition: { delay: 0.2, duration: 0.3, ease: "easeOut" },
            }}
            className="w-[298px] h-[298px] xl:w-[490px] xl:h-[490px] relative"
            initial={{ opacity: 0 }}
          >
            {/* Image */}
            <Image
              alt={data.subtitle}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 298px, (max-width: 1024px) 490px, 490px"
              src="/potrait.webp"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

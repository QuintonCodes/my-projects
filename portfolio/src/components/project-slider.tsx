"use client";

import { projectsData } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import SwiperCore from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProjectSlider({
  onSlideChange,
  projects,
}: {
  onSlideChange: (project: (typeof projectsData)[0]) => void;
  projects: typeof projectsData;
}) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  return (
    <div className="w-full xl:w-[50%]">
      <Swiper
        className="xl:h-[520px] mb-12"
        onSlideChange={(swiper) => {
          const currentIndex = swiper.activeIndex;
          onSlideChange(projects[currentIndex]);
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        slidesPerView={1}
        spaceBetween={30}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
              <div className="absolute top-0 bottom-0 z-10 w-full h-full bg-black/10"></div>
              <div className="relative w-full h-full">
                <Image
                  alt={`Project ${index}`}
                  className="object-contain"
                  fill
                  quality={100}
                  src={project.image}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Slider Buttons */}
        <div className="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none">
          <button
            className="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all cursor-pointer"
            onClick={() => swiperInstance?.slidePrev()}
          >
            <PiCaretLeftBold />
          </button>
          <button
            className="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all cursor-pointer"
            onClick={() => swiperInstance?.slideNext()}
          >
            <PiCaretRightBold />
          </button>
        </div>
      </Swiper>
    </div>
  );
}

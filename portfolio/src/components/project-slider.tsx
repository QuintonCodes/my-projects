import WorkSliderBtns from "@/components/worksliderbtns";
import { projectsData } from "@/data/info-data";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const ProjectSlider = ({
  projects,
  onSlideChange,
}: {
  projects: typeof projectsData;
  onSlideChange: (project: (typeof projectsData)[0]) => void;
}) => (
  <div className="w-full xl:w-[50%]">
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      className="xl:h-[520px] mb-12"
      onSlideChange={(swiper) => {
        const currentIndex = swiper.activeIndex;
        onSlideChange(projects[currentIndex]);
      }}
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index} className="w-full">
          <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
            <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                quality={100}
                fill
                className="object-contain"
                alt={`Project ${index}`}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
      <WorkSliderBtns
        containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
        btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
      />
    </Swiper>
  </div>
);

export default ProjectSlider;

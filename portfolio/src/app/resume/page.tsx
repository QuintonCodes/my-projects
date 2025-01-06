"use client";

import EducationList from "@/components/education-list";
import ExperienceList from "@/components/experience-list";
import SectionHeader from "@/components/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { educationData, experienceData } from "@/data/info-date";
import { motion } from "motion/react";
import {
  FaCss3,
  FaGit,
  FaHtml5,
  FaJs,
  FaNode,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const about = {
  title: "About me",
  description: "A full description about myself",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Kagiso Jiyane",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+27) 69 787 4817",
    },
    {
      fieldName: "Experience",
      fieldValue: "2+ Years",
    },
    {
      fieldName: "Nationality",
      fieldValue: "South African",
    },
    {
      fieldName: "Email",
      fieldValue: "kagisojiyane28@gmail.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Afrikaans & Sepedi",
    },
  ],
};

const skills = {
  title: "My skills",
  description: "An overview of my best strengths",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaJs />,
      name: "javascript",
    },
    {
      icon: <FaNode />,
      name: "node.js",
    },
    {
      icon: <FaPython />,
      name: "python",
    },
    {
      icon: <FaReact />,
      name: "react",
    },
    {
      icon: <FaGit />,
      name: "git",
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <SiTypescript />,
      name: "typescript",
    },
    {
      icon: <TbBrandCSharp />,
      name: "c#",
    },
  ],
};

const ResumePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            {/* Experience Section */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <SectionHeader
                  title="My Experience"
                  description="Overview of my experience"
                  icon="/resume/badge.svg"
                />
                <ExperienceList items={experienceData} />
              </div>
            </TabsContent>

            {/* Education Section */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <SectionHeader
                  title="My Education"
                  description="Overview of my education"
                  icon="/resume/cap.svg"
                />
                <EducationList items={educationData} />
              </div>
            </TabsContent>

            {/* Skills Section */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <SectionHeader
                  title="My Skills"
                  description="An overview of my best strengths"
                  icon=""
                  other={true}
                />
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[125px] bg-[#232329] rounded-xl flex justify-center items-center group">
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">
                              {skill.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* About Section */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <SectionHeader
                  title="About Me"
                  description="A full description about myself"
                  icon=""
                  other={true}
                />
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 w-full mx-auto xl:mx-0">
                  {about.info.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center xl:justify-start gap-4"
                    >
                      <span className="text-white/60">{item.fieldName}</span>
                      <span className="text-lg">{item.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ResumePage;

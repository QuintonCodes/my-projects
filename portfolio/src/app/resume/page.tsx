"use client";

import ResumeSection from "@/components/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aboutData, education, experience, skills } from "@/lib/data";
import { motion } from "motion/react";

export default function ResumePage() {
  return (
    <motion.div
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      initial={{ opacity: 0 }}
    >
      <div className="container px-4 mx-auto max-w-7xl">
        <Tabs
          className="flex flex-col xl:flex-row gap-[60px]"
          defaultValue="experience"
        >
          <TabsList className="flex flex-col h-60 w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            {/* Experience Section */}
            <TabsContent className="w-full" value="experience">
              <ResumeSection
                 header={{ title: "My Experience", description: "Overview of my experience", icon: "/resume/badge.svg" }}
                 items={experience}
                 listType="experience"
              />

            </TabsContent>

            {/* Education Section */}
            <TabsContent className="w-full" value="education">
              <ResumeSection
                header={{ title: "My Education", description: "Overview of my education", icon: "/resume/cap.svg" }}
                items={education}
                listType="education"
              />
            </TabsContent>

            {/* Skills Section */}
            <TabsContent className="w-full h-full" value="skills">
              <ResumeSection
                header={{ title: "My Skills", description: "An overview of my best strengths", icon: "" }}
                items={skills.skillList}
                listType="skills"
              />
            </TabsContent>

            {/* About Section */}
            <TabsContent
              className="w-full text-center xl:text-left"
              value="about"
            >
              <ResumeSection
                header={{ title: "About Me", description: "A full description about myself", icon: "" }}
                items={aboutData.info}
                listType="about"
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}

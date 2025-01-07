"use client";

import Section from "@/components/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";

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
              <Section alt={false}>
                <Section.Experience />
              </Section>
            </TabsContent>

            {/* Education Section */}
            <TabsContent value="education" className="w-full">
              <Section alt={false}>
                <Section.Education />
              </Section>
            </TabsContent>

            {/* Skills Section */}
            <TabsContent value="skills" className="w-full h-full">
              <Section alt={true}>
                <Section.Skills />
              </Section>
            </TabsContent>

            {/* About Section */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <Section alt={true}>
                <Section.About />
              </Section>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ResumePage;

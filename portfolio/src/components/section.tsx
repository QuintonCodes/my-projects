import {
  aboutData,
  educationData,
  experienceData,
  skillsData,
} from "@/data/info-data";
import { ReactNode } from "react";
import List from "./list";
import SectionHeader from "./section-header";

const Section = ({ children, alt }: { children: ReactNode; alt: boolean }) => {
  return (
    <div
      className={`${
        alt
          ? "flex flex-col gap-[30px]"
          : "flex flex-col gap-[30px] text-center xl:text-left"
      }`}
    >
      {children}
    </div>
  );
};

const Education = () => {
  return (
    <>
      <SectionHeader
        title="My Education"
        description="Overview of my education"
        icon="/resume/cap.svg"
      />
      <List items={educationData} type="education" />
    </>
  );
};

Section.Education = Education;

const Experience = () => {
  return (
    <>
      <SectionHeader
        title="My Experience"
        description="Overview of my experience"
        icon="/resume/badge.svg"
      />
      <List items={experienceData} type="experience" />
    </>
  );
};

Section.Experience = Experience;

const Skills = () => {
  return (
    <>
      <SectionHeader
        title="My Skills"
        description="An overview of my best strengths"
        icon=""
        other={true}
      />
      <List items={skillsData.skillList} type="skills" />
    </>
  );
};

Section.Skills = Skills;

const About = () => {
  return (
    <>
      <SectionHeader
        title="About Me"
        description="A full description about myself"
        icon=""
        other={true}
      />
      <List items={aboutData.info} type="about" />
    </>
  );
};

Section.About = About;

export default Section;

"use client";

import { Download } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import EducationCard from "@/components/education-card";
import ExperienceCard from "@/components/experience-card";
import ProjectCard from "@/components/project-card";
import Section from "@/components/section";
import SkillItem from "@/components/skill-item";
import Stats from "@/components/stats";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerticalNav from "@/components/vertical-nav";
import { details, education, experience, projects, skills } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="relative">
      <div className="fixed z-50 top-4 left-4">
        <ThemeToggle />
      </div>

      <div className="hidden md:block">
        <VerticalNav />
      </div>

      <Section
        id="hero"
        nextSectionId="experience"
        className="flex flex-col items-center gap-8 md:flex-row"
      >
        {/* Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Avatar className="w-56 h-56 border-4 shadow-xl border-primary/20">
            <AvatarImage
              src={details.imageURL}
              alt={details.name}
              className="object-cover aspect-auto"
            />
            <AvatarFallback>KQ</AvatarFallback>
          </Avatar>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            {details.title}{" "}
            <span className="dark:text-primary text-accent">
              {details.name}
            </span>
          </h1>
          <h2 className="mb-4 text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl text-primary dark:text-muted-foreground">
            {details.role}
          </h2>
          <p className="max-w-xl mb-6 text-base sm:text-lg">
            {details.hero_description}
          </p>
          <div className="flex gap-3 sm:gap-4">
            <a download="Quinton's Resume" href="/resume.pdf">
              <Button size="lg" className="rounded-full">
                <span>Download Resume</span>
                <Download />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="rounded-full dark:hover:bg-accent hover:bg-primary/20"
            >
              <a href="#projects">View My Work</a>
            </Button>
          </div>
        </motion.div>

        <div className="hidden md:block">
          <Stats />
        </div>
      </Section>

      <Section id="experience" nextSectionId="skills">
        <div className="max-w-5xl mx-auto">
          <h2 className="inline-block pb-1 mb-6 text-2xl font-bold border-b-2 border-primary sm:text-3xl">
            Experience
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {experience.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="skills" nextSectionId="projects">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-1 mb-6 text-2xl font-bold border-b-2 sm:text-3xl border-primary">
            Skills
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold">Frontend</h3>
              <div className="space-y-3">
                {skills.frontend.map((skill, index) => (
                  <SkillItem key={index} {...skill} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">Backend</h3>
              <div className="space-y-3">
                {skills.backend.map((skill, index) => (
                  <SkillItem key={index} {...skill} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-lg font-bold">Tools & Practices</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, index) => (
                <Badge
                  key={index}
                  className="px-3 py-1 text-sm bg-accent/10 text-primary border-accent/20"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects" nextSectionId="education">
        <div className="max-w-5xl mx-auto">
          <h2 className="inline-block pb-1 mb-6 text-2xl font-bold border-b-2 sm:text-3xl border-primary">
            Projects
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="education" nextSectionId="contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-1 mb-6 text-2xl font-bold border-b-2 sm:text-3xl border-primary">
            Education
          </h2>
          <div className="space-y-4">
            <EducationCard {...education} />
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-1 mb-6 text-2xl font-bold border-b-2 sm:text-3xl border-primary">
            Get In Touch
          </h2>

          <div className="mb-8 space-y-6">
            <p className="text-base sm:text-lg">
              I&apos;m currently open to freelance projects and full-time
              opportunities. If you&apos;d like to work together or just want to
              say hello, feel free to reach out!
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                variant="outline"
                className="w-full rounded-full sm:w-auto"
              >
                <a href={`mailto:${details.email}`}>Email Me</a>
              </Button>
              <div className="flex items-center gap-3">
                {details.links.map(({ path, icon: Icon }, index) => (
                  <a
                    className="flex items-center justify-center text-base duration-500 border rounded-full size-9 border-primary text-primary hover:bg-accent hover:text-primary hover:transition-all"
                    href={path}
                    key={index}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`Link to ${path}`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-sm text-primary dark:text-muted-foreground">
              <p>Phone: {details.phone}</p>
              <p>Location: {details.location}</p>
            </div>
          </div>

          <p className="mt-10 text-sm text-center text-primary dark:text-muted-foreground">
            © {new Date().getFullYear()} {details.name}. All rights reserved.
          </p>
        </div>
      </Section>
    </main>
  );
}

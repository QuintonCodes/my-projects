"use client";

import ExperienceCard from "@/components/experience-card";
import ProjectCard from "@/components/project-card";
import Section from "@/components/section";
import SkillItem from "@/components/skill-item";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import VerticalNav from "@/components/vertical-nav";
import { backend, experience, frontend, projects, tools } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HomePage() {
  const scrollToNextSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="relative">
      <div className="fixed z-50 top-4 left-4">
        <ThemeToggle />
      </div>

      <VerticalNav />
      {/* <MobileNav /> */}

      <Section id="hero" className="relative flex items-center">
        <div className="flex flex-col items-center max-w-4xl gap-8 mx-auto md:flex-row">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 md:mb-0"
          >
            <Avatar className="w-48 h-48 border-4 shadow-xl border-primary/20">
              <AvatarImage src="/potrait.webp" alt="Alex Chen" />
              <AvatarFallback>KQ</AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Hello, I&apos;m <span className="text-primary">Alex Chen</span>
            </h1>
            <h2 className="mb-6 text-2xl font-medium md:text-3xl lg:text-4xl text-muted-foreground">
              Full Stack Developer
            </h2>
            <p className="max-w-2xl mb-8 text-lg">
              I build accessible, user-friendly web applications with modern
              technologies. Focused on creating clean, efficient, and
              maintainable code.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#projects">View My Work</a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={() => scrollToNextSection("about")}
        >
          <ChevronDown size={24} />
        </motion.div>
      </Section>

      <Section id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-2 mb-8 text-3xl font-bold border-b-2 border-primary">
            About Me
          </h2>
          <div className="space-y-6 text-lg">
            <p>
              I&apos;m a passionate software developer with over 5 years of
              experience building web applications. My journey in tech started
              when I was 15, tinkering with HTML and CSS to create my first
              website.
            </p>
            <p>
              After graduating with a degree in Computer Science, I&apos;ve
              worked with startups and established companies to deliver robust,
              scalable solutions that solve real-world problems.
            </p>
            <p>
              When I&apos;m not coding, you&apos;ll find me hiking in the
              mountains, reading sci-fi novels, or experimenting with new
              cooking recipes. I believe in continuous learning and regularly
              attend tech conferences and workshops to stay updated with the
              latest industry trends.
            </p>
            <p>
              My approach to development focuses on writing clean, maintainable
              code and creating intuitive user experiences. I&apos;m
              particularly interested in performance optimization and
              accessibility.
            </p>
          </div>
        </div>
      </Section>

      <Section id="skills">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-2 mb-8 text-3xl font-bold border-b-2 border-primary">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="mb-6 text-xl font-bold">Frontend</h3>
              <div className="space-y-4">
                {frontend.map((skill, index) => (
                  <SkillItem
                    key={index}
                    name={skill.title}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-bold">Backend</h3>
              <div className="space-y-4">
                {backend.map((skill, index) => (
                  <SkillItem
                    key={index}
                    name={skill.title}
                    level={skill.level}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-6 text-xl font-bold">Tools & Practices</h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground"
                >
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-2 mb-8 text-3xl font-bold border-b-2 border-primary">
            Projects
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.stack}
                liveLink={project.live}
                codeLink={project.gihub}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-2 mb-8 text-3xl font-bold border-b-2 border-primary">
            Experience
          </h2>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="max-w-4xl mx-auto">
          <h2 className="inline-block pb-2 mb-8 text-3xl font-bold border-b-2 border-primary">
            Get In Touch
          </h2>

          <div className="mb-10">
            <p className="mb-6 text-lg">
              I&apos;m currently open to freelance projects and full-time
              opportunities. If you&apos;d like to work together or just want to
              say hello, feel free to reach out!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <a href="mailto:hello@example.com">Email Me</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-20 text-center text-muted-foreground">
            <p>© 2025 Alex Chen. All rights reserved.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}

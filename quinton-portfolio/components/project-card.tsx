"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  codeLink?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  liveLink,
  codeLink,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="flex flex-col h-full project-card glass-card border-accent/20">
        <CardHeader>
          <CardTitle className="text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="mb-4 text-base text-foreground/80">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-accent/10 text-accent-foreground border-accent/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-start gap-3">
          {liveLink && (
            <Button
              variant="default"
              size="sm"
              className="bg-accent hover:bg-accent/80 text-accent-foreground"
              asChild
            >
              <a href={liveLink} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
          {codeLink && (
            <Button
              variant="outline"
              size="sm"
              className="border-accent/30 hover:bg-accent/10"
              asChild
            >
              <a href={codeLink} target="_blank" rel="noopener noreferrer">
                View Code
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

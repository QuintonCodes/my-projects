"use client";

import { motion } from "motion/react";

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
import { Project } from "@/lib/data";

export default function ProjectCard({
  title,
  description,
  stack,
  live,
  gitHub,
}: Project) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="flex flex-col h-full border shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-md bg-card/40 border-white/10 hover:translate-y-[5px]">
        <CardHeader>
          <CardTitle className="text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grow">
          <CardDescription className="mb-4 text-base text-foreground/80">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            {stack.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="bg-accent/10 text-primary border-accent/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-start gap-3">
          {live && (
            <Button
              variant="default"
              size="sm"
              className="rounded-full bg-accent hover:bg-accent/80 text-accent-foreground"
              asChild
            >
              <a href={live} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
          {gitHub && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full hover:bg-accent/10 glow-on-hover"
              asChild
            >
              <a href={gitHub} target="_blank" rel="noopener noreferrer">
                View Code
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

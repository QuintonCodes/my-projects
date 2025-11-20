"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Experience } from "@/lib/data";
import { Button } from "./ui/button";

export default function ExperienceCard({
  title,
  company,
  duration,
  description,
  technologies,
  links,
}: Experience) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="h-full mb-6 border shadow-lg backdrop-blur-md bg-card/40 border-white/10">
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {title}
              </CardTitle>
              <CardDescription className="text-base font-medium text-foreground/80">
                {company}
              </CardDescription>
            </div>
            <span className="text-sm text-primary dark:text-muted-foreground md:whitespace-nowrap">
              {duration}
            </span>
          </div>
        </CardHeader>
        <CardContent className="grow">
          <p className="mb-4 text-foreground/90">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                className="bg-secondary text-accent-foreground border-accent/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-start w-full gap-3">
          {links.map((link, index) => (
            <Button
              key={index}
              className="rounded-full hover:bg-accent/10"
              variant="outline"
              size="sm"
              asChild
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </Button>
          ))}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

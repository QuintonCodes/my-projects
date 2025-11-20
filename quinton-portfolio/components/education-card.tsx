"use client";

import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Education } from "@/lib/data";

export default function EducationCard({
  institution,
  degree,
  location,
  gpa,
  duration,
  description,
  modules,
}: Education) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Card className="mb-6 border shadow-lg backdrop-blur-md bg-card/40 border-white/10">
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {institution} - {location}
              </CardTitle>
              <CardDescription className="text-base font-medium text-foreground/80">
                {degree}
              </CardDescription>
              <span className="text-sm text-primary dark:text-muted-foreground whitespace-nowrap">
                GPA: {gpa}/4.0
              </span>
            </div>
            <span className="text-sm text-primary dark:text-muted-foreground whitespace-nowrap">
              {duration}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground/90">{description}</p>
          <div className="flex flex-wrap gap-2">
            {modules.map((mod) => (
              <Badge
                key={mod}
                className="bg-accent/10 text-primary border-accent/20"
              >
                {mod}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

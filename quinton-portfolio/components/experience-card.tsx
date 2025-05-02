import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";

interface ExperienceCardProps {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export default function ExperienceCard({
  title,
  company,
  duration,
  description,
  technologies,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 glass-card border-accent/20">
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
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {duration}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground/90">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                className="bg-accent/10 text-accent-foreground border-accent/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Experience } from "@/lib/data";

export default function ExperienceCard({
  title,
  company,
  duration,
  description,
  technologies,
}: Experience) {
  return (
    <div className="animate-fade-in-up will-change-transform">
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
            <span className="text-sm text-primary dark:text-muted-foreground whitespace-nowrap">
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
                className="bg-secondary text-accent-foreground border-accent/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

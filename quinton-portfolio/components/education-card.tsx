import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type EducationProps = {
  institution: string;
  degree: string;
  location: string;
  duration: string;
  description: string;
  gpa: number;
  modules: string[];
};

export default function EducationCard({
  institution,
  degree,
  location,
  gpa,
  duration,
  description,
  modules,
}: EducationProps) {
  return (
    <div className="animate-fade-in-up will-change-transform">
      <Card className="mb-6 glass-card border-accent/20">
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {institution} - {location}
              </CardTitle>
              <CardDescription className="text-base font-medium text-foreground/80">
                {degree}
              </CardDescription>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                GPA: {gpa}/4.0
              </span>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">
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
    </div>
  );
}

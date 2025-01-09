import { Download } from "lucide-react";
import { ReactNode } from "react";
import Photo from "./photo";
import { Button } from "./ui/button";

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  role: string;
}

const Hero = ({ data, children }: { data: HeroData; children: ReactNode }) => {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-2 xl:pb-8">
      {/* Text */}
      <div className="text-center xl:text-left order-2 xl:order-none">
        <span className="text-xl">{data.role}</span>
        <h1 className="h1 mb-6">
          {data.title} <br />
          <span className="text-accent">{data.subtitle}</span>
        </h1>
        <p className="max-w-[500px] mb-9 text-white/80">{data.description}</p>
        {/* Button and socials */}
        <div className="flex flex-col xl:flex-row items-center gap-8">
          <a href="/resume.pdf" download="Quinton's Resume">
            <Button
              variant="outline"
              size="lg"
              className="uppercase flex items-center gap-2"
            >
              <span>Download CV</span>
              <Download />
            </Button>
          </a>
          {/* Socials */}
          <div className="mb-8 xl:mb-0">{children}</div>
        </div>
      </div>
      {/* Photo */}
      <div className="order-1 xl:order-none mb-8 xl:mb-0">
        <Photo />
      </div>
    </div>
  );
};

export default Hero;

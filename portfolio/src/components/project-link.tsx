import Link from "next/link";
import { JSX } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const ProjectLink = ({
  href,
  icon,
  tooltip,
}: {
  href: string;
  icon: JSX.Element;
  tooltip: string;
}) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
          {icon}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </Link>
);

export default ProjectLink;

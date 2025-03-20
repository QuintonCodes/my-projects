import { projectsData } from "@/lib/data";
import Link from "next/link";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ProjectLinkProps {
  href: string;
  icon: React.JSX.Element;
  tooltip: string;
}

export default function ProjectInfo({
  project,
}: {
  project: (typeof projectsData)[0];
}) {
  return (
    <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
      <div className="flex flex-col gap-[30px] h-[50%]">
        <div className="font-extrabold leading-none text-transparent text-8xl text-outline">
          {project.num}
        </div>
        <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
          {project.category} project
        </h2>
        <p className="text-white/60">{project.description}</p>
        <ul className="flex flex-wrap gap-4">
          {project.stack.map((item, index) => (
            <li className="text-xl text-accent text-wrap" key={index}>
              {item.name}
              {index !== project.stack.length - 1 && ","}
            </li>
          ))}
        </ul>
        <div className="border border-white/20"></div>
        <div className="flex items-center gap-4">
          {project.live && (
            <ProjectLink
              href={project.live}
              icon={
                <BsArrowUpRight className="text-3xl text-white cursor-pointer group-hover:text-accent" />
              }
              tooltip="Live project"
            />
          )}
          {project.github && (
            <ProjectLink
              href={project.github}
              icon={
                <BsGithub className="text-3xl text-white cursor-pointer group-hover:text-accent" />
              }
              tooltip="Github repository"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectLink({ href, icon, tooltip }: ProjectLinkProps) {
  return (
    <Link href={href} rel="noopener noreferrer" target="_blank">
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
}

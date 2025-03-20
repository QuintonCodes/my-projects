import {
  AboutItem,
  EducationItem,
  ExperienceItem,
  ListProps,
  SkillItem,
} from "@/lib/types";
import { ScrollArea } from "./ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function List({ items, type }: ListProps) {
  switch (type) {
    case "about":
      return (
        <ul className="grid w-full grid-cols-1 mx-auto xl:grid-cols-2 gap-y-6 xl:mx-0">
          {(items as AboutItem[]).map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-center gap-4 xl:justify-start"
            >
              <span className="text-white/60">{item.fieldName}</span>
              <span className="text-lg">{item.fieldValue}</span>
            </li>
          ))}
        </ul>
      );
    case "skills":
      return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
          {(items as SkillItem[]).map((skill, index) => (
            <li key={index}>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger className="w-full h-[125px] bg-[#232329] rounded-xl flex justify-center items-center group">
                    <div className="text-6xl transition-all duration-300 group-hover:text-accent">
                      {skill.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">{skill.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      );
    case "experience":
      return (
        <ScrollArea className="h-[400px]">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {(items as ExperienceItem[]).map((item, index) => (
              <li
                key={index}
                className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
              >
                <span className="text-accent">{item.duration}</span>
                <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                  {item.position}
                </h3>
                <div className="flex items-center gap-3">
                  {/* Dot */}
                  <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                  <p className="text-white/60">{item.company}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      );
    case "education":
      return (
        <ScrollArea className="h-[400px]">
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {(items as EducationItem[]).map((item, index) => (
              <li
                key={index}
                className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
              >
                <span className="text-accent">{item.duration}</span>
                <h3 className="text-lg max-w-[260px] min-h-[60px] text-center lg:text-left">
                  {item.degree}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                  <p className="text-white/60">{item.institution}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      );

    default:
      return null;
  }
}

import { ResumeSectionProps, SectionHeaderProps } from "@/lib/types";
import Image from "next/image";
import List from "./list";

function SectionHeader({ description, icon, title }: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-center max-xl:justify-center">
        <h3 className="text-4xl font-bold">{title}</h3>
        {icon && (
        <Image
          alt={`${title} Icon`}
          className="w-6 h-6 mt-2 ml-3"
          height={24}
          src={icon}
          width={24}
        />
        )}
      </div>

      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
        {description}
      </p>
    </div>
  )
}

export default function ResumeSection({
  header,
  items,
  listType,
}: ResumeSectionProps) {
  return (
    <div
      className="flex flex-col text-center gap-7 xl:text-left"
    >
      <SectionHeader {...header}/>
      <List items={items} type={listType}/>
    </div>
  );
}
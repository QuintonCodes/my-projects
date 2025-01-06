import { ScrollArea } from "./ui/scroll-area";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
}

interface ExperienceListProps {
  items: ExperienceItem[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ items }) => {
  return (
    <ScrollArea className="h-[400px]">
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
        {items.map((item, index) => (
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
};

export default ExperienceList;

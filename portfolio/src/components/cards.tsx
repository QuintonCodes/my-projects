import { CardProps, ContactItem, ServiceItem } from "@/lib/types";
import { ArrowDownRight } from "lucide-react";

export default function Card({ items, type }: CardProps) {
  switch (type) {
    case "contact":
      return (
        <div className="flex items-center flex-1 order-1 mb-8 xl:justify-end xl:order-none xl:mb-0">
          <ul className="flex flex-col gap-10">
            {(items as ContactItem[]).map((item, index) => (
              <li className="flex items-center gap-6" key={index}>
                <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                  <div className="text-[28px]">{item.icon}</div>
                </div>
                <div className="flex-1">
                  <p className="text-white/60">{item.title}</p>
                  <h3 className="text-xl">{item.description}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    case "service":
      return (
        <>
          {(items as ServiceItem[]).map((item, index) => (
            <div
              className="flex flex-col justify-center flex-1 gap-6 group"
              key={index}
            >
              <div className="flex items-center justify-between w-full">
                <div className="text-5xl font-extrabold text-transparent transition-all duration-500 text-outline group-hover:text-outline-hover">
                  {item.num}
                </div>
                <div className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                  <ArrowDownRight className="text-3xl text-primary" />
                </div>
              </div>
              {/* Title */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                {item.title}
              </h2>
              {/* Description */}
              <p className="text-white/60">{item.description}</p>
              {/* Divider */}
              <div className="w-full border-b border-white/20"></div>
            </div>
          ))}
        </>
      );
    default:
      return null;
  }
}

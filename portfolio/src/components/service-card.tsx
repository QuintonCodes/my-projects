import { ArrowDownRight } from "lucide-react";

export interface Service {
  num: string;
  title: string;
  description: string;
}

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <div className="flex-1 flex flex-col justify-center gap-6 group">
      {/* Top Section */}
      <div className="w-full flex justify-between items-center">
        <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
          {service.num}
        </div>
        <div className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
          <ArrowDownRight className="text-primary text-3xl" />
        </div>
      </div>
      {/* Title */}
      <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
        {service.title}
      </h2>
      {/* Description */}
      <p className="text-white/60">{service.description}</p>
      {/* Divider */}
      <div className="border-b border-white/20 w-full"></div>
    </div>
  );
};

export default ServiceCard;

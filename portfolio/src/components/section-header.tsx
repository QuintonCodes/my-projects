import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface SectionHeaderProps {
  title: string;
  description: string;
  icon: string | StaticImport; // Icon path for the section
  other?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon,
  other = false,
}) => {
  return (
    <div>
      {other ? (
        <>
          <div className="flex flex-col gap-[30px] text-center xl:text-left">
            <h3 className="text-4xl font-bold">{title}</h3>
            <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <h3 className="text-4xl font-bold">{title}</h3>
            <Image
              src={icon}
              alt={`${title} Icon`}
              width={20}
              height={20}
              className="ml-3 mt-2"
            />
          </div>
          <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
            {description}
          </p>
        </>
      )}
    </div>
  );
};

export default SectionHeader;

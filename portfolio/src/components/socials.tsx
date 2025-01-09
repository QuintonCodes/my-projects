import Link from "next/link";
import { JSX } from "react";

interface SocialsProps {
  icon: JSX.Element;
  path: string;
}

const Socials = ({ socials }: { socials: SocialsProps[] }) => {
  return (
    <div className="flex gap-6">
      {socials.map((social, index) => (
        <Link
          key={index}
          href={social.path}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;

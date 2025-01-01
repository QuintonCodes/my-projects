import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const socials = [
  { icon: <Github />, path: "" },
  { icon: <Instagram />, path: "" },
  { icon: <Linkedin />, path: "" },
  { icon: <Twitter />, path: "" },
];

const Socials = ({
  containerStyles,
  iconStyles,
}: {
  containerStyles: string | undefined;
  iconStyles: string | undefined;
}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link key={index} href={item.path} className={iconStyles}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;

import Hero from "@/components/hero";
import Socials from "@/components/socials";
import Stats from "@/components/stats";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const HomePage = () => {
  const heroData = {
    title: "Hello I'm",
    subtitle: "Kagiso Jiyane",
    description:
      "I excel at crafting elegant digital experiences and I am proficient in various programming languages and technologies.",
    role: "Software Engineer",
  };

  const socials = [
    { icon: <FaGithub />, path: "https://github.com/QuintonCodes" },
    { icon: <FaInstagram />, path: "https://www.instagram.com/insomiac.ww" },
    {
      icon: <FaLinkedinIn />,
      path: "https://www.linkedin.com/in/kagiso-jiyane",
    },
    { icon: <FaTwitter />, path: "" },
  ];

  return (
    <section className="h-full">
      <div className="container max-w-7xl mx-auto px-4">
        <Hero data={heroData}>
          <Socials socials={socials} />
        </Hero>
        <Stats />
      </div>
    </section>
  );
};

export default HomePage;

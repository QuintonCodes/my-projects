import Hero from "@/components/hero";
import Socials from "@/components/socials";
import Stats from "@/components/stats";
import { heroData, socialsData } from "@/data/info-data";

const HomePage = () => {
  return (
    <section className="h-full">
      <div className="container max-w-7xl mx-auto px-4">
        <Hero data={heroData}>
          <Socials socials={socialsData} />
        </Hero>
        <Stats />
      </div>
    </section>
  );
};

export default HomePage;

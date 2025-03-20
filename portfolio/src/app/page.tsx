import Hero from "@/components/hero";
import Stats from "@/components/stats";
import { heroData, socials } from "@/lib/data";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="h-full">
      <div className="container px-4 mx-auto max-w-7xl">
        <Hero data={heroData}>
          {/* Socials */}
          <div className="flex gap-4 md:gap-6">
            {socials.map((social, index) => (
              <Link
                className="flex items-center justify-center text-base duration-500 border rounded-full w-9 h-9 border-accent text-accent hover:bg-accent hover:text-primary hover:transition-all"
                href={social.path}
                key={index}
                rel="noopener noreferrer"
                target="_blank"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </Hero>

        <Stats />
      </div>
    </section>
  );
}

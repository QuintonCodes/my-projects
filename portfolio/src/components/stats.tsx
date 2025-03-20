"use client";

import { useStats } from "@/hooks/useStats";
import CountUp from "react-countup";

export default function Stats() {
  const statsData = useStats();

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="xl:flex xl:flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none grid grid-cols-2">
          {statsData.map((item, index) => (
            <div
              className="flex items-center justify-center flex-1 gap-4 xl:justify-start"
              key={index}
            >
              <CountUp
                className="text-4xl font-extrabold xl:text-6xl"
                delay={2}
                duration={5}
                end={item.num}
              />
              <p
                className={`${
                  item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                } leading-snug text-white/80`}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

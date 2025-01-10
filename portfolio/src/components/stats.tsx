"use client";

import useStats from "@/hooks/useStats";
import CountUp from "react-countup";

const Stats = () => {
  const statsData = useStats();

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="xl:flex xl:flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none grid grid-cols-2">
          {statsData.map((item, index) => (
            <Stat key={index} number={item.num} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Stat = ({ number, text }: { number: number; text: string }) => (
  <div className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
    <CountUp
      end={number}
      duration={5}
      delay={2}
      className="text-4xl xl:text-6xl font-extrabold"
    />
    <p
      className={`${
        text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
      } leading-snug text-white/80`}
    >
      {text}
    </p>
  </div>
);

export default Stats;

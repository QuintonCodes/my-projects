"use client";

import CardItem from "@/components/card-item";
import CardTab from "@/components/card-tab";
import Header from "@/components/header";
import { albums, artists, homeTabs, playlists } from "@/lib/data";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good Afternoon");
      } else if (hour >= 18 && hour < 21) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    updateGreeting();
  }, []);

  return (
    <section className="h-full">
      <Header>
        <div className="mb-2">
          <h1 className="text-3xl font-semibold text-white">{greeting}</h1>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {homeTabs.map((tab, index) => (
              <CardTab
                key={index}
                image={tab.image}
                name={tab.name}
                href={tab.href}
              />
            ))}
          </div>
        </div>
      </Header>

      {/* Song Section */}
      <div className="px-6 my-3">
        <h1 className="text-2xl font-semibold text-white">Your Music</h1>

        {/* Page Content component */}
        <div className="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-3">
          <CardItem items={artists} type="artist" />
          <CardItem items={albums} type="album" />
          <CardItem items={playlists} type="playlist" />
        </div>
      </div>
    </section>
  );
}

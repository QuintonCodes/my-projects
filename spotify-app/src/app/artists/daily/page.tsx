"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import React, { useState } from "react";

const DailyArtistPage = () => {
  // Mock artist data for specific dates
  const mockArtistData: Record<
    string,
    { name: string; followers: number; image: string }
  > = {
    "2024-12-25": {
      name: "John Mayer",
      followers: 1500000,
      image: "/john-mayer.jpg",
    },
    "2024-12-26": {
      name: "Taylor Swift",
      followers: 3000000,
      image: "/taylor-swift.jpg",
    },
    "2024-12-27": {
      name: "Ed Sheeran",
      followers: 2500000,
      image: "/ed-sheeran.jpg",
    },
    "2024-12-28": {
      name: "Adele",
      followers: 2000000,
      image: "/adele.jpg",
    },
  };

  const [selectedDate, setSelectedDate] = useState<string>("2024-12-25");

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      if (mockArtistData[formattedDate]) {
        setSelectedDate(formattedDate);
      } else {
        alert("No artist data available for this date.");
      }
    }
  };

  const currentArtist = mockArtistData[selectedDate];

  return (
    <div className="items-center flex flex-col m-10 space-y-8">
      <h3>Artist of the Day</h3>
      <div className="flex flex-row space-x-12 items-start">
        {/* Calender */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl">
          <Calendar
            mode="single"
            selected={new Date(selectedDate)}
            onSelect={handleDateSelect}
            className="w-full h-auto"
          />
        </div>

        {/* Artist Card */}
        <div className="bg-[#1f1f1f] rounded-2xl max-w-[345px]">
          <Image
            src={currentArtist.image}
            alt={`Picture of ${currentArtist.name}`}
            width={320}
            height={320}
          />
          <div className="items-center flex flex-col space-y-3 mb-4">
            <div className="items-center flex flex-col">
              <h5 className="text-white">{currentArtist.name}</h5>
              <span className="text-white">
                Monthly Followers: {currentArtist.followers.toLocaleString()}
              </span>
            </div>
            <Button>Listen on Spotify</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyArtistPage;

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const DailyArtistPage = () => {
  return (
    <div className="items-center flex flex-col m-10 space-y-8">
      <h3>Artist of the Day</h3>
      <div className="flex flex-row space-x-12 items-start">
        {/* Artist Card */}
        <div className="bg-[#1f1f1f] rounded-2xl max-w-[345px]">
          <Image
            src="/picture.png"
            alt={`Picture of`}
            width={320}
            height={320}
          />
          <div className="items-center flex flex-col space-y-3 mb-4">
            <div className="items-center flex flex-col">
              <h5 className="text-white">Drake</h5>
              <span className="text-white">Monthly Followers: 100000</span>
            </div>
            <Button>Listen on Spotify</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyArtistPage;

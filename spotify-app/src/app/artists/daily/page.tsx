import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const DailyArtistPage = () => {
  return (
    <div className="items-center flex flex-col m-10 space-y-8">
      <h3>Artist of the Day</h3>
      <div className="bg-[#1f1f1f] rounded-2xl max-w-[345px]">
        <Image
          src="/public/logo.png"
          alt="Picture of Artist"
          width={320}
          height={320}
        />
        <div className="items-center flex flex-col space-y-3 mb-4">
          <div className="items-center flex flex-col">
            <h5 className="text-white">Artist Name</h5>
            <span className="text-white">Monthly Followers: {10000}</span>
          </div>
          <Button>Listen on Spotify</Button>
        </div>
      </div>
    </div>
  );
};

export default DailyArtistPage;

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const ArtistPage = () => {
  const colors = ["#FF5733", "#33C4FF", "#D333FF", "#33FF57", "#FFD633"];

  return (
    <div className="flex w-full m-10 space-y-5">
      {/* Artist Image */}
      <div className="w-full overflow-hidden">
        <Image
          src="/logo.png"
          alt="Artist Image"
          className="flex-shrink-0 mr-5 h-auto w-full"
        />
      </div>
      <div className="w-full py-0 px-[50px]">
        {/* Artist Info */}
        <div className="text-white flex flex-col justify-center">
          <div className="flex">
            <VerifiedIcon className="w-5 h-5 text-[#2196f3]" />
            <span className="pl-[1px]">Verified Artist</span>
          </div>
          <h4>Artist Name</h4>
          <div className="flex justify-between">
            <span>Followers: {10000}</span>
            <div className="flex">
              <span>Artist Popularity</span>
            </div>
          </div>
          <h5>Genres:</h5>
          <div className="grid gap-2 w-full">
            {[...Array(5)].map((_, index) => (
              // Genre Card
              <div
                key={index}
                className="grid-cols-3 flex justify-center items-center rounded-[2px] h-[12vh] p-[1px]"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <span>{index + 1}</span>
              </div>
            ))}
          </div>
          {/* Tracks */}
          <h4>Top Tracks:</h4>
          <div className="flex items-center bg-zinc-700 rounded-lg shadow-md mb-3 p-3 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
            <Avatar>
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-grow ml-3">
              <span className="text-white text-sm font-medium">
                Artist Name
              </span>
            </div>
            <Button className="group-hover:flex items-center bg-gray-700 text-white px-3 py-1 rounded-md text-xs">
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPage;

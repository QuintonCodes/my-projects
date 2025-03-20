"use client";

import Card from "@/components/card";
import Header from "@/components/header";
import ListItem from "@/components/listitem";

export default function Home() {
  const data = {
    id: "1",
    name: "N 2 Deep",
    author: "Drake",
  };

  return (
    <div className="bg-neutral-900 rounded-xl h-[90.5vh] mt-2 mr-3 overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            {/* Implement more  */}
            <ListItem image="/liked.jpg" name="Liked Songs" href="liked" />
            <ListItem image="/liked.jpg" name="Liked Songs" href="liked" />
            <ListItem image="/liked.jpg" name="Liked Songs" href="liked" />
            <ListItem image="/liked.jpg" name="Liked Songs" href="liked" />
          </div>
        </div>
      </Header>

      {/* Song Section */}
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Your Music</h1>
        </div>

        {/* Page Content component */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
          <Card data={data} onClick={(data) => console.log(data)} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRightSidebar } from "@/context/right-sidebar-context";
import { oneSong, songs } from "@/lib/data";
import { ClockFading, ListMusic, X } from "lucide-react";
import ListItem from "./list-item";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function RightSidebar() {
  const queue = true;
  const recentlyPlayed = true;
  const { activeTab, setActiveTab, setIsOpen } = useRightSidebar();

  return (
    <div className="h-full overflow-hidden bg-neutral-900 rounded-xl max-xl:hidden">
      {/* Header */}
      <div className="flex justify-between h-full p-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="gap-2 bg-transparent">
            <TabsTrigger value="queue">Queue</TabsTrigger>
            <TabsTrigger value="recently-played">Recently Played</TabsTrigger>
          </TabsList>
          <TabsContent
            value="queue"
            className={`${
              queue ? "block h-full" : "flex flex-1 justify-center items-center"
            }`}
          >
            {queue ? (
              <div className="flex flex-col h-full mt-2 space-y-4">
                <div>
                  <span className="text-xs font-bold">Now Playing</span>
                  <ListItem items={oneSong} type="song" />
                </div>
                <div className="h-full min-h-0 mb-12 text-xs">
                  <div className="mb-2 font-bold">
                    <span>Next from: </span>
                    {/* TODO: Should direct to the playlist or album that is playing */}
                    <span className="underline cursor-pointer underline-offset-2">
                      Chilled UK
                    </span>
                  </div>

                  <div className="h-full pb-6 overflow-hidden">
                    <ScrollArea className="h-full">
                      <ListItem items={songs} type="song" />
                    </ScrollArea>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <ListMusic className="size-10" />
                <div>
                  <h1 className="mb-1 text-lg font-semibold">
                    Add to your queue
                  </h1>
                  <span className="text-xs text-neutral-400">
                    Tap &quot;Add to queue&quot; from a track&apos;s menu to see
                    it here
                  </span>
                </div>
                <button className="p-3 px-4 text-sm font-medium text-black bg-white rounded-full cursor-pointer hover:scale-105">
                  Find something to play
                </button>
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="recently-played"
            className={`${
              recentlyPlayed
                ? "h-full pb-10"
                : "flex flex-1 justify-center items-center"
            }`}
          >
            {recentlyPlayed ? (
              <ScrollArea className="h-full mb-4 overflow-hidden">
                <ListItem items={songs} type="song" />
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <ClockFading className="size-10" />
                <div>
                  <h1 className="mb-1 text-lg font-semibold">
                    See what you&apos;ve listened to
                  </h1>
                  <span className="text-xs text-neutral-400">
                    Your listening history will appear here
                  </span>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        {/* TODO: Close Button */}
        <button
          className="flex items-center justify-center rounded-full cursor-pointer size-7 text-neutral-300 hover:bg-neutral-700/65"
          onClick={() => setIsOpen(false)}
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}

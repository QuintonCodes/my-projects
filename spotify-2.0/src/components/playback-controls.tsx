"use client";

import { useRightSidebar } from "@/context/right-sidebar-context";
import {
  Heart,
  ListMusic,
  Pause,
  Play,
  PlaySquare,
  PlusCircle,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

export default function PlaybackControls() {
  const repeat = true;
  const [mute, setMute] = useState(false);
  const [play, setPlay] = useState(false);
  const { setActiveTab, setIsOpen } = useRightSidebar();

  return (
    <div className="h-[5.4rem] py-2 px-4 mx-2 mt-2 mb-0 rounded-xl bg-neutral-900 flex items-center justify-between">
      {/* Currently playing song */}
      <div className="hidden sm:flex items-center gap-4 min-w-fit w-[30%] justify-start">
        <Image
          src=""
          alt=""
          className="object-cover rounded-md w-14 h-14"
          width={56}
          height={56}
        />
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate cursor-pointer hover:underline">
              Not You Too
            </div>
            <div className="text-sm truncate cursor-pointer text-zinc-400 hover:underline">
              Drake
            </div>
          </div>

          <Heart className="size-5 fill-green-600 text-green-600 cursor-pointer hover:scale-110 transition-transform" />

          <PlusCircle className="size-5 text-zinc-400 cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
        <div className="flex items-center gap-4 sm:gap-6">
          <Button
            size="icon"
            variant="ghost"
            className="hidden text-green-600 hover:bg-transparent sm:inline-flex hover:text-white"
          >
            <Shuffle className="size-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-white"
          >
            <SkipBack className="size-4 fill-white" />
          </Button>

          <Button
            size="icon"
            className="size-8 text-black bg-white rounded-full hover:bg-white/80"
            onClick={() => setPlay(!play)}
          >
            {play ? (
              <Pause className="size-4 fill-black" />
            ) : (
              <Play className="size-4 fill-black" />
            )}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-transparent hover:text-white"
          >
            <SkipForward className="size-4 fill-white" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="hidden sm:inline-flex hover:text-white text-zinc-400 hover:bg-transparent"
          >
            {repeat ? (
              <Repeat1 className="size-4" />
            ) : (
              <Repeat className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="items-center justify-center hidden w-full gap-3 sm:flex">
          <span className="text-xs text-zinc-400 text-nowrap">-:--</span>
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-full hover:cursor-grab active:cursor-grabbing"
          />
          <span className="text-xs text-zinc-400 text-nowrap">-:--</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="hidden sm:flex items-center gap-2 min-w-[180px] w-[30%] justify-end">
        <Button
          size="icon"
          variant="ghost"
          className="hover:text-white hover:bg-transparent text-zinc-400"
        >
          <PlaySquare className="size-4" />
        </Button>
        {/* Queue button */}
        <Button
          size="icon"
          variant="ghost"
          className="hover:text-white hover:bg-transparent text-zinc-400"
          onClick={() => {
            setActiveTab("queue");
            setIsOpen(true);
          }}
        >
          <ListMusic className="size-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white hover:bg-transparent text-zinc-400"
            onClick={() => setMute(!mute)}
          >
            {mute ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </Button>

          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className="w-24 hover:cursor-grab active:cursor-grabbing"
          />
        </div>
      </div>
    </div>
  );
}

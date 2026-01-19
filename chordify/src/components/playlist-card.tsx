"use client";

import { MoreVertical, Pin, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type PlaylistCardProps = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  songsCount: number;
  duration: string;
  isPinned: boolean;
};

export function PlaylistCard({
  name,
  description,
  imageUrl,
  songsCount,
  duration,
  isPinned,
}: PlaylistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  function handlePlay() {
    window.open("https://open.spotify.com", "_blank");
  }

  // TODO: Implement framer motion

  return (
    <div
      className="glass backdrop-blur-[1px] shadow-xl rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isPinned && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Pin className="h-3 w-3" />
          </div>
        )}
        <div
          className={cn(
            "absolute bottom-4 right-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            onClick={handlePlay}
          >
            <Play className="h-5 w-5 fill-current" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1 text-balance">
            {name}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-primary/10"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass">
              <DropdownMenuItem>Edit Playlist</DropdownMenuItem>
              <DropdownMenuItem>
                {isPinned ? "Unpin" : "Pin"} Playlist
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{songsCount} songs</span>
          <span>•</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
}

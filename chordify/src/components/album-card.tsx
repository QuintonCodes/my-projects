"use client";

import { Play, Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AlbumCardProps = {
  id: number;
  title: string;
  artist: string;
  year: string;
  imageUrl: string;
  matchScore: number;
};

export function AlbumCard({
  title,
  artist,
  year,
  imageUrl,
  matchScore,
}: AlbumCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  function handlePlay() {
    window.open("https://open.spotify.com", "_blank");
  }

  function handleAddToPlaylist() {
    toast.success("Album added to your library");
  }

  return (
    <div
      className="glass rounded-2xl p-4 transition-all duration-300 hover:shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={300}
          height={300}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Match Score Badge */}
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded-lg text-xs font-bold">
          {matchScore}% Match
        </div>

        {/* Hover Actions */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            onClick={handlePlay}
          >
            <Play className="h-5 w-5 fill-current" />
          </Button>
          <Button
            size="icon"
            className="h-10 w-10 rounded-full glass hover:bg-white/30"
            onClick={handleAddToPlaylist}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-foreground line-clamp-1 text-balance">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{artist}</p>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
    </div>
  );
}

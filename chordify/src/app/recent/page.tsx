"use client";

import { Clock, Play, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RecentlyPlayedPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const recentTracks = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      playedAt: "2 hours ago",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      playedAt: "5 hours ago",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      title: "The Less I Know The Better",
      artist: "Tame Impala",
      album: "Currents",
      playedAt: "Yesterday",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      title: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      playedAt: "Yesterday",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      title: "Midnight City",
      artist: "M83",
      album: "Hurry Up, We're Dreaming",
      playedAt: "2 days ago",
      imageUrl: "/placeholder.svg?height=80&width=80",
    },
  ];

  const filteredTracks = recentTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass backdrop-blur-[1px] rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="glass-dark backdrop-blur-xs rounded-2xl p-8 flex items-center justify-center">
            <Clock className="h-24 w-24 text-primary" />
          </div>
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              History
            </div>
            <h1 className="text-5xl font-bold mb-3 text-balance text-foreground">
              Recently Played
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Your listening history from Spotify
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {recentTracks.length} tracks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass backdrop-blur-xs rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search in recently played..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass backdrop-blur-xl border-border/50"
          />
        </div>
      </div>

      {/* Tracks List */}
      <div className="glass backdrop-blur-xl rounded-2xl overflow-hidden">
        <div className="divide-y divide-border/50">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-4 hover:bg-primary/10 transition-colors group"
            >
              <Image
                src={track.imageUrl || "/placeholder.svg"}
                alt={track.title}
                className="size-16 rounded-lg"
                width={64}
                height={64}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate text-lg">
                  {track.title}
                </p>
                <p className="text-muted-foreground truncate">
                  {track.artist} • {track.album}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {track.playedAt}
              </span>
              <Button
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:bg-primary/90"
              >
                <Play className="h-4 w-4 fill-current" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

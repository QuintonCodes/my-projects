"use client";

import { ChevronLeft, FolderOpen, Play, Shuffle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

import { PlaylistCard } from "@/components/playlist-card";
import { Button } from "@/components/ui/button";

export default function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const folderId = use(params);

  if (!folderId) {
    notFound();
  }

  // Mock folder data
  const folder = {
    id: folderId,
    name: "Productivity",
    playlistCount: 4,
  };

  const playlists = [
    {
      id: 1,
      name: "Chill Vibes",
      description: "Relaxing tunes for peaceful moments",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 45,
      duration: "2h 34m",
      isPinned: true,
    },
    {
      id: 2,
      name: "Deep Focus",
      description: "Ambient sounds for concentration",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 38,
      duration: "2h 15m",
      isPinned: false,
    },
    {
      id: 3,
      name: "Meditation Flow",
      description: "Peaceful tracks for mindfulness",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 28,
      duration: "1h 45m",
      isPinned: false,
    },
    {
      id: 4,
      name: "Sleep Sounds",
      description: "Soothing melodies for rest",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 32,
      duration: "2h 00m",
      isPinned: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/library">
        <Button variant="ghost" className="hover:bg-primary/10 gap-2 mb-3">
          <ChevronLeft className="h-4 w-4" />
          Back to Library
        </Button>
      </Link>

      {/* Folder Header */}
      <div className="glass backdrop-blur-[1px] rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="glass-dark rounded-2xl p-8 flex items-center justify-center">
            <FolderOpen className="h-24 w-24 text-primary" />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
                Folder
              </div>
              <h1 className="text-5xl font-bold mb-2 text-balance text-foreground">
                {folder.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {folder.playlistCount} playlists
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Play className="h-5 w-5" />
                Play All
              </Button>
              <Button
                variant="outline"
                className="glass hover:bg-primary/10 gap-2"
              >
                <Shuffle className="h-5 w-5" />
                Shuffle
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Playlists in Folder */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-foreground">Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>
    </div>
  );
}

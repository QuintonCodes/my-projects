"use client";

import {
  ChevronLeft,
  ListChecks as ListCheck,
  MoreHorizontal,
  Play,
  Search,
  Shuffle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function PlaylistDetailPage({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);

  const playlistId = use(params);

  if (!playlistId) {
    notFound();
  }

  const playlist = {
    id: playlistId,
    name: "Chill Vibes",
    description: "Relaxing tunes for peaceful moments",
    imageUrl: "/placeholder.svg?height=300&width=300",
    creator: "Music Lover",
    songsCount: 45,
    duration: "2h 34m",
    folder: "Relaxation",
  };

  const songs = [
    {
      id: 1,
      title: "Weightless",
      artist: "Marconi Union",
      album: "Weightless",
      duration: "8:09",
      addedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Breathe",
      artist: "Télépopmusik",
      album: "Genetic World",
      duration: "4:41",
      addedAt: "1 week ago",
    },
    {
      id: 3,
      title: "Electra",
      artist: "Airstream",
      album: "L'Esperanza",
      duration: "5:18",
      addedAt: "2 weeks ago",
    },
    {
      id: 4,
      title: "Pure Shores",
      artist: "All Saints",
      album: "Saints & Sinners",
      duration: "4:43",
      addedAt: "3 weeks ago",
    },
    {
      id: 5,
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      duration: "4:45",
      addedAt: "1 month ago",
    },
  ];

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSong = (songId: number) => {
    setSelectedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  function handleBulkDelete() {
    toast.success(`Removed ${selectedSongs.length} songs from playlist`);
    setSelectedSongs([]);
    setIsSelecting(false);
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/library">
        <Button variant="ghost" className="hover:bg-primary/10 gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Library
        </Button>
      </Link>

      {/* Playlist Header */}
      <div className="glass rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="relative aspect-square w-48 rounded-2xl overflow-hidden">
            <Image
              src={playlist.imageUrl || "/placeholder.svg"}
              alt={playlist.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Playlist • {playlist.folder}
              </p>
              <h1 className="text-5xl font-bold mb-2 text-balance text-foreground">
                {playlist.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-3">
                {playlist.description}
              </p>
              <p className="text-sm text-muted-foreground">
                {playlist.creator} • {playlist.songsCount} songs •{" "}
                {playlist.duration}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Play className="h-5 w-5" />
                Play
              </Button>
              <Button
                variant="outline"
                className="glass hover:bg-primary/10 gap-2"
              >
                <Shuffle className="h-5 w-5" />
                Shuffle
              </Button>
              <Button
                variant="outline"
                className="glass hover:bg-primary/10 gap-2"
                onClick={() => setIsSelecting(!isSelecting)}
              >
                <ListCheck className="h-5 w-5" />
                {isSelecting ? "Cancel" : "Select"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search in playlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-border/50"
            />
          </div>
        </div>

        {/* Bulk Actions */}
        {isSelecting && selectedSongs.length > 0 && (
          <div className="mt-4 flex items-center gap-2 p-3 glass-dark rounded-lg">
            <span className="text-sm font-medium text-foreground">
              {selectedSongs.length} selected
            </span>
            <div className="flex gap-2 ml-auto">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                Remove from Playlist
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Songs List */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-bold text-foreground mb-4">Songs</h2>
          <div className="space-y-1">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
              >
                {isSelecting && (
                  <Checkbox
                    checked={selectedSongs.includes(song.id)}
                    onCheckedChange={() => toggleSong(song.id)}
                  />
                )}
                <span className="text-sm text-muted-foreground w-8">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {song.artist}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground hidden md:block">
                  {song.album}
                </span>
                <span className="text-xs text-muted-foreground hidden lg:block">
                  {song.addedAt}
                </span>
                <span className="text-xs text-muted-foreground">
                  {song.duration}
                </span>
                {!isSelecting && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

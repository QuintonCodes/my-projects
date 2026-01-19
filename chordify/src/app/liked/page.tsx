"use client";

import {
  FolderPlus,
  Heart,
  ListChecks,
  Play,
  Search,
  Shuffle,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

export default function LikedSongsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dateAdded");
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  const likedSongs = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      imageUrl: "/placeholder.svg?height=80&width=80",
      dateAdded: "2024-03-15",
    },
    {
      id: 2,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      imageUrl: "/placeholder.svg?height=80&width=80",
      dateAdded: "2024-03-10",
    },
    {
      id: 3,
      title: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:35",
      imageUrl: "/placeholder.svg?height=80&width=80",
      dateAdded: "2024-03-08",
    },
    {
      id: 4,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "2:58",
      imageUrl: "/placeholder.svg?height=80&width=80",
      dateAdded: "2024-03-05",
    },
    {
      id: 5,
      title: "Stay",
      artist: "The Kid LAROI, Justin Bieber",
      album: "Stay",
      duration: "2:21",
      imageUrl: "/placeholder.svg?height=80&width=80",
      dateAdded: "2024-03-01",
    },
  ];

  function handleSelectAll() {
    if (selectedSongs.length === filteredSongs.length) {
      setSelectedSongs([]);
    } else {
      setSelectedSongs(filteredSongs.map((song) => song.id));
    }
  }

  function handleBulkAction(action: string) {
    if (selectedSongs.length === 0) {
      toast.error("No songs selected");
      return;
    }

    switch (action) {
      case "addToPlaylist":
        toast.success(`Added ${selectedSongs.length} songs to playlist`);
        break;
      case "addToFavourites":
        toast.success(`Added ${selectedSongs.length} songs to favourites`);
        break;
      case "remove":
        toast.success(`Removed ${selectedSongs.length} songs from liked`);
        break;
    }
    setSelectedSongs([]);
    setIsSelectMode(false);
  }

  const filteredSongs = likedSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDuration = likedSongs.reduce((acc, song) => {
    const [minutes, seconds] = song.duration.split(":").map(Number);
    return acc + minutes * 60 + seconds;
  }, 0);

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="glass backdrop-blur-[1px] rounded-3xl p-8">
        <div className="flex items-start gap-6">
          <div className="glass-dark backdrop-blur-xs rounded-2xl p-8 flex items-center justify-center">
            <Heart className="h-24 w-24 text-primary fill-primary" />
          </div>
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2">
              Playlist
            </div>
            <h1 className="text-5xl font-bold mb-3 text-balance text-foreground">
              Liked Songs
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              All your liked songs from Spotify
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {likedSongs.length} songs
              </span>
              <span>•</span>
              <span>
                {hours}h {minutes}m
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => {
              toast.success("Playing liked songs on Spotify");
              window.open("https://open.spotify.com", "_blank");
            }}
          >
            <Play className="h-5 w-5 mr-2 fill-current" />
            Play All
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass backdrop-blur-xl hover:bg-primary/10"
          >
            <Shuffle className="h-5 w-5 mr-2" />
            Shuffle
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`glass backdrop-blur-xl ${
              isSelectMode
                ? "bg-primary/10 text-primary"
                : "hover:bg-primary/10"
            }`}
            onClick={() => {
              setIsSelectMode(!isSelectMode);
              setSelectedSongs([]);
            }}
          >
            <ListChecks className="h-5 w-5 mr-2" />
            Select
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {isSelectMode && (
        <div className="glass backdrop-blur-[1px] rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectedSongs.length === filteredSongs.length}
                onCheckedChange={handleSelectAll}
                className="border-black/30"
              />
              <span className="text-sm font-medium text-foreground">
                {selectedSongs.length} selected
              </span>
            </div>
            {selectedSongs.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="glass backdrop-blur-xl"
                  onClick={() => handleBulkAction("addToPlaylist")}
                >
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add to Playlist
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="glass backdrop-blur-xl"
                  onClick={() => handleBulkAction("addToFavourites")}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Favourites
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="glass backdrop-blur-xl text-destructive hover:text-destructive"
                  onClick={() => handleBulkAction("remove")}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="glass backdrop-blur-xl rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search in liked songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass backdrop-blur-xl border-border/50"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[200px] glass backdrop-blur-xl border-border/50">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass backdrop-blur-xl">
              <SelectItem value="dateAdded">Date Added</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Songs List */}
      <div className="glass backdrop-blur-[1px] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="grid grid-cols-12 gap-4 px-4 text-sm font-medium text-muted-foreground">
            {isSelectMode && <div className="col-span-1"></div>}
            <div className={isSelectMode ? "col-span-1" : "col-span-1"}>#</div>
            <div className={isSelectMode ? "col-span-4" : "col-span-5"}>
              Title
            </div>
            <div className="col-span-3">Album</div>
            <div className="col-span-2">Date Added</div>
            <div className="col-span-1 text-right">Duration</div>
          </div>
        </div>
        <div className="divide-y divide-border/50">
          {filteredSongs.map((song, index) => (
            <div
              key={song.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-primary/10 transition-colors group items-center"
            >
              {isSelectMode && (
                <div className="col-span-1 flex items-center">
                  <Checkbox
                    checked={selectedSongs.includes(song.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSongs([...selectedSongs, song.id]);
                      } else {
                        setSelectedSongs(
                          selectedSongs.filter((id) => id !== song.id)
                        );
                      }
                    }}
                  />
                </div>
              )}
              <div
                className={`${
                  isSelectMode ? "col-span-1" : "col-span-1"
                } text-muted-foreground`}
              >
                {index + 1}
              </div>
              <div
                className={`${
                  isSelectMode ? "col-span-4" : "col-span-5"
                } flex items-center gap-3`}
              >
                <Image
                  src={song.imageUrl || "/placeholder.svg"}
                  alt={song.title}
                  className="size-10 rounded"
                  width={40}
                  height={40}
                />
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {song.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {song.artist}
                  </p>
                </div>
              </div>
              <div className="col-span-3 text-muted-foreground truncate">
                {song.album}
              </div>
              <div className="col-span-2 text-muted-foreground">
                {song.dateAdded}
              </div>
              <div className="col-span-1 text-right text-muted-foreground">
                {song.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

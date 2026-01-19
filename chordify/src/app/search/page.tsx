"use client";

import { Play, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { PlaylistCard } from "@/components/playlist-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = {
    songs: [
      {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        imageUrl: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        imageUrl: "/placeholder.svg?height=80&width=80",
      },
    ],
    playlists: [
      {
        id: 1,
        name: "Top Hits 2024",
        description: "The biggest songs right now",
        imageUrl: "/placeholder.svg?height=200&width=200",
        songsCount: 50,
        duration: "3h 15m",
        isPinned: false,
      },
      {
        id: 2,
        name: "Pop Essentials",
        description: "Must-have pop tracks",
        imageUrl: "/placeholder.svg?height=200&width=200",
        songsCount: 40,
        duration: "2h 30m",
        isPinned: false,
      },
    ],
    artists: [
      {
        id: 1,
        name: "The Weeknd",
        genre: "R&B, Pop",
        followers: "98M followers",
        imageUrl: "/placeholder.svg?height=160&width=160",
      },
      {
        id: 2,
        name: "Dua Lipa",
        genre: "Pop, Dance",
        followers: "87M followers",
        imageUrl: "/placeholder.svg?height=160&width=160",
      },
    ],
  };

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setTimeout(() => {
      toast.success("Search completed");
    }, 500);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Search Header */}
      <div className="glass backdrop-blur-[1px] rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Search</h1>
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg glass backdrop-blur-[2px] border-border/50 focus-visible:border-accent focus-visible:ring-accent/50"
          />
        </form>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <Tabs defaultValue="all" className="space-y-6">
          <div className="glass backdrop-blur-[1px] rounded-2xl p-2">
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="songs">Songs</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-8">
            {/* Top Songs */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Songs</h2>
              <div className="glass backdrop-blur-[1px] rounded-2xl overflow-hidden">
                {searchResults.songs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-4 hover:bg-primary/10 transition-colors group"
                  >
                    <Image
                      src={song.imageUrl || "/placeholder.svg"}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {song.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {song.artist}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {song.duration}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Playlists */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Playlists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchResults.playlists.map((playlist) => (
                  <PlaylistCard key={playlist.id} {...playlist} />
                ))}
              </div>
            </section>

            {/* Artists */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Artists
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {searchResults.artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="glass backdrop-blur-[1px] rounded-2xl p-4 hover:bg-primary/10 transition-colors cursor-pointer group"
                  >
                    <div className="aspect-square rounded-full overflow-hidden mb-4">
                      <Image
                        src={artist.imageUrl || "/placeholder.svg"}
                        alt={artist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 truncate">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {artist.genre}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {artist.followers}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="songs">
            <div className="glass backdrop-blur-[1px] rounded-2xl overflow-hidden">
              {searchResults.songs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-4 p-4 hover:bg-primary/10 transition-colors group"
                >
                  <Image
                    src={song.imageUrl || "/placeholder.svg"}
                    alt={song.title}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground truncate text-lg">
                      {song.title}
                    </p>
                    <p className="text-muted-foreground truncate">
                      {song.artist} • {song.album}
                    </p>
                  </div>
                  <span className="text-muted-foreground">{song.duration}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Play className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} {...playlist} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artists">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {searchResults.artists.map((artist) => (
                <div
                  key={artist.id}
                  className="glass backdrop-blur-[1px] rounded-2xl p-6 hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <div className="aspect-square rounded-full overflow-hidden mb-4">
                    <Image
                      src={artist.imageUrl || "/placeholder.svg"}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 truncate text-lg">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    {artist.genre}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {artist.followers}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Browse Categories when no search */}
      {!searchQuery && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Browse All
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Pop",
              "Rock",
              "Hip-Hop",
              "Electronic",
              "Jazz",
              "Classical",
              "Country",
              "R&B",
            ].map((genre) => (
              <div
                key={genre}
                className="glass backdrop-blur-[2px] rounded-2xl p-6 aspect-square flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, rgba(206, 18, 18, 0.2), rgba(255, 255, 255, 0.7))`,
                }}
              >
                <h3 className="text-2xl font-bold text-foreground">{genre}</h3>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

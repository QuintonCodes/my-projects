"use client";

import { Music2, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AlbumCard } from "@/components/album-card";
import { DailyArtistCard } from "@/components/daily-artist-card";
import { Button } from "@/components/ui/button";

export default function DiscoverPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dailyArtist = {
    name: "Tame Impala",
    genre: "Psychedelic Rock",
    followers: "5.2M",
    imageUrl: "/placeholder.svg?height=400&width=400",
    bio: "Tame Impala is the psychedelic music project of Australian multi-instrumentalist Kevin Parker. Known for their dreamy, synth-heavy sound and hypnotic melodies.",
    topTracks: [
      { id: 1, name: "The Less I Know The Better", plays: "1.2B" },
      { id: 2, name: "Let It Happen", plays: "520M" },
      { id: 3, name: "Borderline", plays: "480M" },
    ],
  };

  const recommendedAlbums = [
    {
      id: 1,
      title: "Currents",
      artist: "Tame Impala",
      year: "2015",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 95,
    },
    {
      id: 2,
      title: "Lonerism",
      artist: "Tame Impala",
      year: "2012",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 92,
    },
    {
      id: 3,
      title: "Innerspeaker",
      artist: "Tame Impala",
      year: "2010",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 90,
    },
    {
      id: 4,
      title: "The Slow Rush",
      artist: "Tame Impala",
      year: "2020",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 88,
    },
  ];

  const genreBasedAlbums = [
    {
      id: 5,
      title: "AM",
      artist: "Arctic Monkeys",
      year: "2013",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 87,
    },
    {
      id: 6,
      title: "Wolfgang Amadeus Phoenix",
      artist: "Phoenix",
      year: "2009",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 85,
    },
    {
      id: 7,
      title: "Humbug",
      artist: "Arctic Monkeys",
      year: "2009",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 83,
    },
    {
      id: 8,
      title: "Is This It",
      artist: "The Strokes",
      year: "2001",
      imageUrl: "/placeholder.svg?height=300&width=300",
      matchScore: 82,
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Finding new artist...");
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Discovered new artist!");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-balance text-foreground">
              Discover
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore new music tailored to your taste
          </p>
        </div>
      </div>

      {/* Daily Artist of the Day */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            Artist of the Day
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="glass hover:bg-primary/10"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
        <DailyArtistCard {...dailyArtist} />
      </section>

      {/* Recommended Albums from Artist */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Music2 className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Albums by {dailyArtist.name}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedAlbums.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      </section>

      {/* Genre-Based Recommendations */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            More {dailyArtist.genre} Albums
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {genreBasedAlbums.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      </section>
    </div>
  );
}

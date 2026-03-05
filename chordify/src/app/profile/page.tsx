"use client";

import { Crown, Edit, Heart, Music, Star, Trophy, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  AchievementCard,
  AchievementCardProps,
} from "@/components/achievement-card";
import { PlaylistCard } from "@/components/playlist-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePage() {
  const [user] = useState<{
    name: string;
    email: string;
    imageUrl: string;
    spotifyId: string;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("spotify_user");
    if (storedUser) {
      try {
        // setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const userLevel = 12;
  const currentXP = 850;
  const nextLevelXP = 1000;
  const xpProgress = (currentXP / nextLevelXP) * 100;

  const stats = [
    {
      label: "Total Playlists",
      value: "24",
      icon: Music,
      color: "text-blue-500",
    },
    { label: "Liked Songs", value: "342", icon: Heart, color: "text-red-500" },
    {
      label: "Listening Hours",
      value: "156",
      icon: Zap,
      color: "text-yellow-500",
    },
    { label: "Achievements", value: "18", icon: Trophy, color: "text-primary" },
  ];

  const topPlaylists = [
    {
      id: 1,
      name: "Chill Vibes",
      description: "Your most played",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 45,
      duration: "2h 34m",
      isPinned: true,
    },
    {
      id: 2,
      name: "Workout Mix",
      description: "High energy favorites",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 32,
      duration: "1h 52m",
      isPinned: true,
    },
    {
      id: 3,
      name: "Focus Flow",
      description: "Concentration mode",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 28,
      duration: "1h 45m",
      isPinned: false,
    },
  ];

  const unlockedAchievements: AchievementCardProps[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Create your first playlist",
      icon: "🎵",
      xp: 50,
      rarity: "common",
      isLocked: false,
      unlockedDate: "2024-01-15",
      category: "playlists",
    },
    {
      id: "2",
      title: "Music Explorer",
      description: "Listen to 100 different artists",
      icon: "🧭",
      xp: 100,
      rarity: "rare",
      unlockedDate: "2024-02-20",
      category: "listening",
      isLocked: false,
    },
    {
      id: "3",
      title: "Playlist Master",
      description: "Create 10 playlists",
      icon: "👑",
      xp: 200,
      rarity: "epic",
      unlockedDate: "2024-03-01",
      category: "playlists",
      isLocked: false,
    },
    {
      id: "4",
      title: "Night Owl",
      description: "Listen to music past midnight for 7 days",
      icon: "🦉",
      xp: 150,
      rarity: "rare",
      unlockedDate: "2024-03-10",
      category: "listening",
      isLocked: false,
    },
  ];

  const lockedAchievements: AchievementCardProps[] = [
    {
      id: "6",
      title: "Legendary Curator",
      description: "Create 50 playlists",
      icon: "🏆",
      xp: 500,
      rarity: "legendary",
      progress: 24,
      total: 50,
      category: "playlists",
      isLocked: true,
    },
    {
      id: "7",
      title: "Marathon Listener",
      description: "Listen to music for 1000 hours",
      icon: "⚡",
      xp: 300,
      rarity: "epic",
      progress: 156,
      total: 1000,
      category: "listening",
      isLocked: true,
    },
    {
      id: "8",
      title: "Genre Hopper",
      description: "Listen to songs from 20 different genres",
      icon: "🎭",
      xp: 150,
      rarity: "rare",
      progress: 12,
      total: 20,
      category: "discovery",
      isLocked: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="glass-card rounded-3xl p-8">
        <div className="flex items-start gap-8">
          <div className="relative">
            <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-primary/20">
              <Image
                src={user?.imageUrl || "/placeholder.svg?height=160&width=160"}
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 glass-dark rounded-full p-3 ring-2 ring-background">
              <Crown className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">
                  {user?.name || "Music Lover"}
                </h1>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass hover:bg-primary/10"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {user?.email || "user@example.com"}
              </p>

              {/* Level Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span className="font-bold text-foreground">
                      Level {userLevel}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {currentXP} / {nextLevelXP} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {nextLevelXP - currentXP} XP to Level {userLevel + 1}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-dark rounded-xl p-4 flex flex-col items-center text-center"
                >
                  <stat.icon className={`h-6 w-6 mb-2 ${stat.color}`} />
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="playlists" className="w-full">
        <TabsList className="glass backdrop-blur-xl">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="playlists" className="space-y-6 mt-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Top Playlists
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topPlaylists.map((playlist) => (
                <PlaylistCard key={playlist.id} {...playlist} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6 mt-6">
          {/* Unlocked Achievements */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">
                Unlocked ({unlockedAchievements.length})
              </h2>
              <div className="flex items-center gap-2 glass-dark rounded-lg px-4 py-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  3,450 Points Earned
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {unlockedAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  {...achievement}
                  isLocked={false}
                />
              ))}
            </div>
          </section>

          {/* Locked Achievements */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              In Progress ({lockedAchievements.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  {...achievement}
                  isLocked={true}
                />
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

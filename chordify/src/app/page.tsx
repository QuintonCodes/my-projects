import {
  Album,
  Clock,
  Heart,
  Music,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";

import { CreatePlaylistDialog } from "@/components/create-playlist-dialog";
import { PlaylistCard } from "@/components/playlist-card";
import { RecentActivityCard } from "@/components/recent-activity-card";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const pinnedPlaylists = [
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
      name: "Workout Mix",
      description: "High energy tracks to fuel your fitness",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 32,
      duration: "1h 52m",
      isPinned: true,
    },
    {
      id: 3,
      name: "Focus Flow",
      description: "Instrumental beats for deep work",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 28,
      duration: "1h 45m",
      isPinned: true,
    },
    {
      id: 4,
      name: "Late Night Drives",
      description: "Smooth tracks for evening cruises",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 38,
      duration: "2h 12m",
      isPinned: true,
    },
  ];

  const recentPlaylists = [
    {
      id: 5,
      name: "Indie Discoveries",
      description: "Fresh indie tracks",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 52,
      duration: "3h 15m",
      isPinned: false,
    },
    {
      id: 6,
      name: "Jazz Classics",
      description: "Timeless jazz standards",
      imageUrl: "/placeholder.svg?height=200&width=200",
      songsCount: 40,
      duration: "2h 48m",
      isPinned: false,
    },
  ];

  const stats = [
    {
      title: "Total Playlists",
      value: "24",
      icon: Music,
      trend: "+3 this month",
      color: "text-primary",
    },
    {
      title: "Listening Hours",
      value: "156",
      icon: TrendingUp,
      trend: "+22% from last month",
      color: "text-primary",
    },
    {
      title: "Favourite Songs",
      value: "342",
      icon: Heart,
      trend: "+18 new",
      color: "text-primary",
    },
    {
      title: "Level & XP",
      value: "12",
      icon: Trophy,
      trend: "850 / 1000 XP",
      color: "text-primary",
    },
  ];

  const quickActions = [
    {
      title: "Daily Mix",
      description: "Your personalized playlist for today",
      icon: Sparkles,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Recently Played",
      description: "Pick up where you left off",
      icon: Clock,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "New Releases",
      description: "Fresh tracks from your favorite artists",
      icon: Album,
      color: "bg-green-500/10 text-green-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-balance text-foreground">
            Welcome back
          </h1>
          <p className="text-lg text-muted-foreground">
            Your music hub, reimagined
          </p>
        </div>
        <CreatePlaylistDialog />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.title}
            className="glass backdrop-blur-[1px] shadow-xl rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-left group"
          >
            <div
              className={cn("inline-flex p-3 rounded-xl mb-4", action.color)}
            >
              <action.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
          </button>
        ))}
      </section>

      {/* Pinned Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Pinned Playlists
          </h2>
          <Button variant="ghost" className="text-primary hover:bg-primary/10">
            Manage Pins
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pinnedPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      </section>

      {/* Recent Activity & Recently Played */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Recently Played
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} {...playlist} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Recent Activity
          </h2>
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
}

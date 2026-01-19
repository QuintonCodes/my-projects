"use client";

import { FolderOpen, LayoutGrid, LayoutList, Plus, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { CreateFolderModal } from "@/components/create-folder-modal";
import { CreatePlaylistDialog } from "@/components/create-playlist-dialog";
import { PlaylistTable } from "@/components/playlist-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function LibraryPage() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("name");

  const folders = [
    { id: 1, name: "Relaxation", playlistCount: 4 },
    { id: 2, name: "Fitness", playlistCount: 3 },
    { id: 3, name: "Productivity", playlistCount: 5 },
  ];

  const playlists = [
    {
      id: 1,
      name: "Chill Vibes",
      folder: "Relaxation",
      songs: 45,
      duration: "2h 34m",
      dateAdded: "2024-01-15",
      isPinned: true,
    },
    {
      id: 2,
      name: "Workout Mix",
      folder: "Fitness",
      songs: 32,
      duration: "1h 52m",
      dateAdded: "2024-01-20",
      isPinned: true,
    },
    {
      id: 3,
      name: "Focus Flow",
      folder: "Productivity",
      songs: 28,
      duration: "1h 45m",
      dateAdded: "2024-02-01",
      isPinned: true,
    },
    {
      id: 4,
      name: "Late Night Drives",
      folder: "Mood",
      songs: 38,
      duration: "2h 12m",
      dateAdded: "2024-02-10",
      isPinned: false,
    },
    {
      id: 5,
      name: "Indie Discoveries",
      folder: "Genres",
      songs: 52,
      duration: "3h 15m",
      dateAdded: "2024-02-15",
      isPinned: false,
    },
    {
      id: 6,
      name: "Jazz Classics",
      folder: "Genres",
      songs: 40,
      duration: "2h 48m",
      dateAdded: "2024-03-01",
      isPinned: false,
    },
  ];

  function handleBulkAction(action: string) {
    if (selectedPlaylists.length === 0) {
      toast.error("No playlists selected");
      return;
    }

    switch (action) {
      case "pin":
        toast.success(`Pinned ${selectedPlaylists.length} playlists`);
        break;
      case "move":
        toast.success(`Moved ${selectedPlaylists.length} playlists to folder`);
        break;
      case "delete":
        toast.success(`Deleted ${selectedPlaylists.length} playlists`);
        break;
      default:
        break;
    }
    setSelectedPlaylists([]);
  }

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-balance text-foreground">
            Your Library
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your playlists and organize your music
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreateFolderModal />
          <CreatePlaylistDialog
            trigger={
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Playlist
              </Button>
            }
          />
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Folders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <Link key={folder.id} href={`/library/${folder.id}`}>
              <button className="w-full glass backdrop-blur-[1px] rounded-2xl p-6 hover:scale-105 transition-all duration-300 text-left group">
                <div className="flex items-center gap-4">
                  <div className="glass p-4 rounded-xl group-hover:bg-primary/20 transition-colors">
                    <FolderOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {folder.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {folder.playlistCount} playlists
                    </p>
                  </div>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </section>

      {/* Controls */}
      <div className="glass backdrop-blur-[1px] rounded-2xl p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass border-border/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] glass border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass backdrop-blur-xl">
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="songs">Song Count</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 glass rounded-lg p-1">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPlaylists.length > 0 && (
          <div className="mt-4 flex items-center gap-2 p-3 glass-dark rounded-lg">
            <span className="text-sm font-medium text-foreground">
              {selectedPlaylists.length} selected
            </span>
            <div className="flex gap-2 ml-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("pin")}
                className="glass"
              >
                Pin Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction("move")}
                className="glass"
              >
                Move to Folder
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleBulkAction("delete")}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Playlist Table */}
      <PlaylistTable
        playlists={filteredPlaylists}
        selectedPlaylists={selectedPlaylists}
        onSelectionChange={setSelectedPlaylists}
        view={view}
      />
    </div>
  );
}

"use client";

import { Folder, MoreVertical, Pin, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Playlist = {
  id: number;
  name: string;
  folder: string;
  songs: number;
  duration: string;
  dateAdded: string;
  isPinned: boolean;
};

type PlaylistTableProps = {
  playlists: Playlist[];
  selectedPlaylists: number[];
  onSelectionChange: (ids: number[]) => void;
  view: "grid" | "list";
};

export function PlaylistTable({
  playlists,
  selectedPlaylists,
  onSelectionChange,
  view,
}: PlaylistTableProps) {
  function handleSelectAll(checked: boolean) {
    if (checked) {
      onSelectionChange(playlists.map((p) => p.id));
    } else {
      onSelectionChange([]);
    }
  }

  function handleSelectOne(id: number, checked: boolean) {
    if (checked) {
      onSelectionChange([...selectedPlaylists, id]);
    } else {
      onSelectionChange(selectedPlaylists.filter((pid) => pid !== id));
    }
  }

  function handlePlay() {
    window.open("https://open.spotify.com", "_blank");
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="glass backdrop-blur-[1px] rounded-2xl p-4 space-y-3 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <Checkbox
                checked={selectedPlaylists.includes(playlist.id)}
                onCheckedChange={(checked) =>
                  handleSelectOne(playlist.id, checked as boolean)
                }
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  <DropdownMenuItem onClick={handlePlay}>
                    Play on Spotify
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem>
                    {playlist.isPinned ? "Unpin" : "Pin"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Move to Folder</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                {playlist.isPinned && <Pin className="h-3 w-3 text-primary" />}
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {playlist.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Folder className="h-3 w-3" />
                <span>{playlist.folder}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{playlist.songs} songs</span>
              <span>{playlist.duration}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass backdrop-blur-[1px] rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-black/30 hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={
                  playlists.length > 0 &&
                  selectedPlaylists.length === playlists.length
                }
                onCheckedChange={handleSelectAll}
                className="border-black/30"
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Folder</TableHead>
            <TableHead className="text-right">Songs</TableHead>
            <TableHead className="text-right">Duration</TableHead>
            <TableHead className="text-right">Date Added</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlists.map((playlist) => (
            <TableRow
              key={playlist.id}
              className="border-black/10 hover:bg-primary/5 cursor-pointer"
            >
              <TableCell>
                <Checkbox
                  checked={selectedPlaylists.includes(playlist.id)}
                  onCheckedChange={(checked) =>
                    handleSelectOne(playlist.id, checked as boolean)
                  }
                  className="border-black/30"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {playlist.isPinned && (
                    <Pin className="h-3 w-3 text-primary" />
                  )}
                  <span className="font-medium text-foreground">
                    {playlist.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Folder className="h-3 w-3" />
                  <span>{playlist.folder}</span>
                </div>
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {playlist.songs}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {playlist.duration}
              </TableCell>
              <TableCell className="text-right text-muted-foreground text-sm">
                {new Date(playlist.dateAdded).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="glass-dark backdrop-blur-[2px]"
                  >
                    <DropdownMenuItem onClick={handlePlay}>
                      <Play className="h-4 w-4 mr-2" />
                      Play on Spotify
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem>
                      {playlist.isPinned ? "Unpin" : "Pin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>Move to Folder</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

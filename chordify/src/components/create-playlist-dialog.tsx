"use client";

import { Heart, Music, Plus, Search, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function CreatePlaylistDialog({
  trigger,
}: {
  trigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const likedSongs = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
    { id: 2, title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
    { id: 3, title: "Heat Waves", artist: "Glass Animals", duration: "3:58" },
    { id: 4, title: "Heat Waves", artist: "Glass Animals", duration: "3:58" },
    { id: 5, title: "Heat Waves", artist: "Glass Animals", duration: "3:58" },
    {
      id: 6,
      title: "The Less I Know The Better",
      artist: "Tame Impala",
      duration: "3:36",
    },
  ];

  const favouriteSongs = [
    { id: 5, title: "Midnight City", artist: "M83", duration: "4:04" },
    { id: 6, title: "Electric Feel", artist: "MGMT", duration: "3:49" },
    { id: 7, title: "Take On Me", artist: "a-ha", duration: "3:46" },
  ];

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success("Image uploaded successfully");
    }
  }

  function handleCreatePlaylist() {
    if (!playlistName.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }

    toast.success(
      `Created playlist "${playlistName}" with ${selectedSongs.length} songs`
    );
    setOpen(false);
    // Reset form
    setPlaylistName("");
    setPlaylistDescription("");
    setCustomImage(null);
    setSelectedSongs([]);
  }

  function toggleSong(songId: number) {
    setSelectedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  }

  const filteredLikedSongs = likedSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFavouriteSongs = favouriteSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Create Playlist
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="glass-dark backdrop-blur-md sm:max-w-4xl max-h-[85vh] p-0 flex flex-col rounded-2xl">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-foreground">
            Create New Playlist
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Customize your playlist with a name, description, cover image, and
            songs
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="grid md:grid-cols-5 gap-6 pb-4">
            {/* Left Column - Details */}
            <div className="md:col-span-2 space-y-4">
              {/* Cover Image */}
              <div className="space-y-2">
                <Label htmlFor="cover-image" className="text-foreground">
                  Cover Image
                </Label>
                <div
                  className="relative aspect-square size-60 rounded-2xl overflow-hidden glass cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {customImage ? (
                    <>
                      <Image
                        src={customImage || "/placeholder.svg"}
                        alt="Playlist cover"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Upload className="h-8 w-8 text-white" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomImage(null);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="cover-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Playlist Name
                </Label>
                <Input
                  id="name"
                  placeholder="My Awesome Playlist"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="glass border-border/50"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Add a description..."
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  className="glass border-border/50 min-h-20 resize-none"
                />
              </div>

              {/* Selected Count */}
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Music className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {selectedSongs.length} songs selected
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Song Selection */}
            <div className="md:col-span-3 space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Add Songs</Label>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search songs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-border/50"
                  />
                </div>

                {/* Tabs for different sources */}
                <Tabs defaultValue="liked" className="w-full">
                  <TabsList className="glass w-full">
                    <TabsTrigger
                      value="liked"
                      className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Liked Songs
                    </TabsTrigger>
                    <TabsTrigger
                      value="favourites"
                      className="flex-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Music className="h-4 w-4 mr-2" />
                      Favourites
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="liked" className="mt-4">
                    <ScrollArea className="flex-1 glass rounded-2xl">
                      <div className="p-2 space-y-1">
                        {filteredLikedSongs.map((song) => (
                          <div
                            key={song.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                            onClick={() => toggleSong(song.id)}
                          >
                            <Checkbox
                              checked={selectedSongs.includes(song.id)}
                              onCheckedChange={() => toggleSong(song.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {song.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {song.artist}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {song.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="favourites" className="mt-4">
                    <ScrollArea className="flex-1 glass rounded-2xl">
                      <div className="p-2 space-y-1">
                        {filteredFavouriteSongs.map((song) => (
                          <div
                            key={song.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                            onClick={() => toggleSong(song.id)}
                          >
                            <Checkbox
                              checked={selectedSongs.includes(song.id)}
                              onCheckedChange={() => toggleSong(song.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {song.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {song.artist}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {song.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="glass hover:bg-primary/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreatePlaylist}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Create Playlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

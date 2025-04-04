"use client";

import { ArrowLeft, Library, List, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BiGridAlt } from "react-icons/bi";
import CardItem from "./card-item";
import ListItem from "./list-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const toggles = [
  {
    value: "playlists",
    label: "Toggle Playlists",
  },
  {
    value: "albums",
    label: "Toggle Albums",
  },
  {
    value: "artists",
    label: "Toggle Artists",
  },
];

export default function LeftSidebar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const artist = [
    {
      name: "Kendrick Lamar",
      imageSrc: "/kendrick.png",
    },
  ];

  const album = [
    {
      name: "Flower Boy",
      imageSrc: "/album.png",
      artist: "Tyler, The Creator",
    },
    {
      name: "Flower Boy",
      imageSrc: "/album.png",
      artist: "Tyler, The Creator",
    },
    {
      name: "Flower Boy",
      imageSrc: "/album.png",
      artist: "Tyler, The Creator",
    },
  ];

  const playlist = [
    {
      name: "Liked Songs",
      imageSrc: "/liked.jpg",
      creator: "insomniac",
    },
    {
      name: "Chilled UK",
      imageSrc: "/playlist.png",
      creator: "insomniac",
    },
  ];

  return (
    <div className="h-full overflow-hidden bg-neutral-900 rounded-xl max-xl:hidden">
      <div className="flex flex-col h-full m-3 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between transition-colors cursor-pointer text-neutral-300 hover:text-white">
          <div className="flex items-center gap-1">
            <Library />
            <p className="font-semibold">Your Library</p>
          </div>
          <button className="flex items-center justify-center rounded-full cursor-pointer size-7 text-neutral-300 hover:bg-neutral-700/65">
            <ArrowLeft className="size-4" />
          </button>
        </div>

        {/* Toggle Group */}
        <div>
          <ToggleGroup
            size="sm"
            type="multiple"
            className="justify-start gap-2"
          >
            {toggles.map((item) => (
              <ToggleGroupItem
                key={item.value}
                value={item.value}
                aria-label={item.label}
                className="rounded-full bg-neutral-700/50 hover:bg-neutral-700/65 hover:text-white data-[state=on]:bg-slate-200 data-[state=on]:text-black capitalize text-xs px-4"
              >
                {item.value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Search and Filters Group */}
        <div className="flex items-center justify-between">
          {/* Search input */}
          <div className="relative" ref={searchRef}>
            <div
              className={`flex items-center overflow-hidden transition-all duration-300 rounded-3xl focus-within:ring-2 focus-within:ring-white px-2 cursor-pointer ${
                searchOpen ? "w-48" : "w-10 p-2"
              }`}
              onClick={!searchOpen ? () => setSearchOpen(true) : undefined}
            >
              <Search className="text-white size-4" />
              {searchOpen && (
                <Input
                  ref={inputRef}
                  onClick={(e) => e.stopPropagation()}
                  type="text"
                  placeholder="Search in your Library"
                  className="flex-1 ml-2 bg-transparent border-none outline-none focus:ring-0"
                  name="search"
                  autoComplete={undefined}
                />
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 transition-colors bg-transparent cursor-pointer hover:scale-105 text-neutral-400 hover:text-white">
                <p className="text-xs">Recents</p>
                <List className="size-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white w-44 bg-neutral-800">
              <DropdownMenuLabel className="text-xs text-neutral-300">
                Sort by
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Recents</DropdownMenuItem>
                <DropdownMenuItem>Recently Added</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                <DropdownMenuItem>Creator</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-neutral-300">
                View as
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <List className="size-4" />
                  <span>List</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BiGridAlt className="size-4" />
                  <span>Grid</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="h-full pb-5 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="hidden grid-cols-2 gap-2">
              {/* Grid View */}
              <CardItem items={playlist} type="playlist" />
              <CardItem items={album} type="album" />
              <CardItem items={artist} type="artist" />
            </div>

            {/* List View */}
            <div className="block">
              <ListItem items={playlist} type="playlist" />
              <ListItem items={album} type="album" />
              <ListItem items={artist} type="artist" />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

import Header from "@/components/header";
import SongsTable from "@/components/songs-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { playlistSongData } from "@/lib/data";
import {
  CheckCircle2,
  Clock3,
  List,
  Play,
  Search,
  Shuffle,
  User,
} from "lucide-react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { RxDotsHorizontal } from "react-icons/rx";

export default function PlaylistPage() {
  return (
    <div className="h-full">
      <Header className="from-[#5038a0]/80 p-3">
        <div className="flex gap-6 p-2 pb-8">
          <Image
            src=""
            alt=""
            className="rounded shadow-xl size-60"
            width={240}
            height={240}
          />
          <div className="flex flex-col justify-end">
            <p className="text-sm font-medium">Public Playlist</p>
            <h1 className="my-4 text-6xl font-bold">Ethereal</h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Avatar className="size-7">
                  <AvatarImage src="" alt="" />
                  <AvatarFallback className="bg-neutral-700">
                    <User className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold text-white cursor-pointer hover:underline underline-offset-2">
                  insomniac
                </span>
              </div>
              <span>&#183; 50 songs, 3 hr</span>
            </div>
          </div>
        </div>
      </Header>

      {/* Buttons and Filters */}
      <div className="flex items-center justify-between px-6 pb-4">
        <div className="flex items-center gap-6">
          <button className="flex items-center p-3 transition bg-green-500 rounded-full drop-shadow-md hover:scale-110">
            <FaPlay className="text-black" />
          </button>
          <button className="transition cursor-pointer text-zinc-400 hover:text-white hover:scale-105">
            <Shuffle className="size-7" />
          </button>
          {/* TODO: Add a drop down menu with options */}
          <button className="transition cursor-pointer hover:scale-105 text-zinc-400 hover:text-white">
            <RxDotsHorizontal className="size-7" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center size-8 transition-colors rounded-full cursor-pointer hover:bg-zinc-700">
            <Search className="size-4 text-white" />
          </button>
          <div className="flex items-center gap-2 transition bg-transparent cursor-pointer hover:scale-105 text-zinc-500 hover:text-white">
            <p className="text-xs">Custom Order</p>
            <List className="size-4" />
          </div>
        </div>
      </div>

      <SongsTable>
        <SongsTable.Header gridTemplate="grid-cols-[20px_16px_2.75fr_2fr_1fr_50px]">
          <SongsTable.Cell className="pr-3">
            <Checkbox aria-label="Select all rows" />
          </SongsTable.Cell>
          <SongsTable.HeaderCell>#</SongsTable.HeaderCell>
          <SongsTable.HeaderCell sortable filterable>
            Title
          </SongsTable.HeaderCell>
          <SongsTable.HeaderCell>Album</SongsTable.HeaderCell>
          <SongsTable.HeaderCell>Date Added</SongsTable.HeaderCell>
          <SongsTable.HeaderCell>
            <div className="flex justify-center">
              <Clock3 className="size-4" />
            </div>
          </SongsTable.HeaderCell>
        </SongsTable.Header>

        {/* Body */}
        <SongsTable.Body>
          {playlistSongData.map((song, index) => (
            <SongsTable.Row
              key={index}
              gridTemplate="grid-cols-[20px_16px_2.75fr_2fr_1fr_50px]"
            >
              <SongsTable.Cell className="flex items-center justify-center pl-1">
                <Checkbox aria-label="Select row" />
              </SongsTable.Cell>
              <SongsTable.Cell className="flex items-center justify-center">
                <span className="block group-hover:hidden">{song.number}</span>
                <Play className="hidden size-4 group-hover:block" />
              </SongsTable.Cell>
              <SongsTable.Cell className="flex items-center gap-3">
                <Image
                  src={song.imageSrc}
                  alt=""
                  className="object-cover rounded-md size-10"
                  width={40}
                  height={40}
                />
                <div className="space-y-1">
                  <div className="font-medium text-white">{song.title}</div>
                  <div className="flex items-center gap-1">
                    {song.explicit && (
                      <div className="py-0.5 px-2 text-[10px] rounded-md bg-zinc-800">
                        E
                      </div>
                    )}
                    <span className="transition hover:underline underline-offset-2">
                      {song.artist}
                    </span>
                  </div>
                </div>
              </SongsTable.Cell>
              <SongsTable.Cell className="flex items-center justify-between">
                <span className="transition hover:underline underline-offset-2">
                  {song.album}
                </span>
                <div className="hidden transition group-hover:block">
                  {/* TODO: Add a tooltip to show 'Add to Playlist' which will add to other playlists with menu */}
                  <CheckCircle2 className="text-black size-5 fill-green-600" />
                  {/* TODO: Use to when not in current playlist */}
                  {/* <PlusCircle className="size-5" /> */}
                </div>
              </SongsTable.Cell>
              <SongsTable.Cell className="flex items-center">
                {song.dateAdded}
              </SongsTable.Cell>
              <SongsTable.Cell className="flex items-center gap-2">
                <span>{song.duration}</span>
                <button className="hidden transition cursor-pointer hover:scale-105 text-zinc-400 hover:text-white group-hover:block">
                  <RxDotsHorizontal className="size-5" />
                </button>
              </SongsTable.Cell>
            </SongsTable.Row>
          ))}
        </SongsTable.Body>
      </SongsTable>
    </div>
  );
}

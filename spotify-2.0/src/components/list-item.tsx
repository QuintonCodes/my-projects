import { Disc3, MusicIcon } from "lucide-react";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { RxDotsHorizontal } from "react-icons/rx";

type ArtistItem = {
  name: string;
  imageSrc: string;
};

type AlbumItem = {
  name: string;
  imageSrc: string;
  artist: string;
};

type PlaylistItem = {
  name: string;
  imageSrc: string;
  creator: string;
};

type SongItem = {
  title: string;
  imageSrc: string;
  artist: string;
};

type ListItem = ArtistItem | AlbumItem | PlaylistItem | SongItem;

interface ListItemProps {
  items: ListItem[];
  type: "artist" | "album" | "playlist" | "song";
}

export default function ListItem({ items, type }: ListItemProps) {
  const isImage = false;

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        // TODO: Replace with Link tag
        <div
          className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-zinc-800 group"
          key={index}
        >
          {isImage ? (
            <div className="relative">
              <Image
                src={item.imageSrc}
                alt=""
                className={`${
                  type === "artist" ? "rounded-full" : "rounded-md"
                } flex-shrink-0 object-cover size-12 bg-neutral-700`}
                width={48}
                height={48}
              />
            </div>
          ) : (
            <div
              className={`${
                type === "artist" ? "rounded-full" : "rounded-md"
              } relative size-12 aspect-square bg-neutral-700`}
            >
              {type === "artist" ? (
                <div className="absolute -translate-1/2 top-1/2 left-1/2">
                  <BiUser className="size-7" />
                </div>
              ) : type === "album" ? (
                <div className="absolute -translate-1/2 top-1/2 left-1/2">
                  <Disc3 className="size-7" />
                </div>
              ) : (
                <div className="absolute -translate-1/2 top-1/2 left-1/2">
                  <MusicIcon className="size-7" />
                </div>
              )}
            </div>
          )}
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-sm font-medium truncate">
              {type === "song"
                ? (item as SongItem).title
                : (item as ArtistItem | AlbumItem | PlaylistItem).name}
            </p>
            {type === "song" ? (
              <p className="text-xs truncate text-zinc-400">
                {(item as SongItem).artist}
              </p>
            ) : (
              <p className="text-xs truncate text-zinc-400">
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {type === "playlist"
                  ? ` · ${(item as PlaylistItem).creator}`
                  : type === "album" && ` · ${(item as AlbumItem).artist}`}
              </p>
            )}
          </div>
          {type === "song" && (
            <button className="hidden transition cursor-pointer hover:scale-105 text-zinc-400 hover:text-white group-hover:block">
              <RxDotsHorizontal className="size-5" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

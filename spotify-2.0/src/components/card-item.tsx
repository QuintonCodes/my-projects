import { Disc3, MusicIcon } from "lucide-react";
import Image from "next/image";
import { BiUser } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";

type ArtistItem = {
  name: string;
  imageSrc: string;
};

type AlbumItem = {
  name: string;
  imageSrc: string;
  artist: string;
  year?: number;
};

type PlaylistItem = {
  name: string;
  imageSrc: string;
  creator: string;
};

type CardItem = ArtistItem | AlbumItem | PlaylistItem;

interface CardItemProps {
  items: CardItem[];
  type: "artist" | "album" | "playlist";
  isArtistPage?: boolean;
}

export default function CardItem({ items, type, isArtistPage }: CardItemProps) {
  const isImage = false;

  return (
    <>
      {items.map((item, index) => (
        <div
          className="relative flex flex-col items-center justify-center w-full p-3 overflow-hidden transition rounded-md cursor-pointer group hover:bg-neutral-400/5"
          key={index}
        >
          {isImage ? (
            <div className="relative overflow-hidden rounded-md size-full aspect-square">
              <Image
                className={`${
                  type === "artist" ? "rounded-full" : "rounded-md"
                } object-cover bg-neutral-700 drop-shadow-lg`}
                src={item.imageSrc}
                fill
                alt=""
              />
            </div>
          ) : (
            <div
              className={`${
                type === "artist" ? "rounded-full" : "rounded-md"
              } relative size-full bg-neutral-700 aspect-square`}
            >
              {type === "artist" ? (
                <div className="absolute -translate-1/2 top-1/2 left-1/2">
                  <BiUser className="size-12" />
                </div>
              ) : type === "album" ? (
                <div className="absolute -translate-1/2 top-1/2 left-1/2">
                  <Disc3 className="size-12" />
                </div>
              ) : (
                <div className="absolute -translate-1/2 top-1/2 left-1/2">
                  <MusicIcon className="size-12" />
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col items-start w-full gap-1 pt-4">
            <p className="w-full font-semibold truncate">{item.name}</p>
            {isArtistPage ? (
              <p className="w-full text-xs truncate text-nowrap text-neutral-400">
                {`${(item as AlbumItem).year} · `}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </p>
            ) : (
              <p className="w-full text-xs truncate text-nowrap text-neutral-400">
                {type.charAt(0).toUpperCase() + type.slice(1)}
                {type === "playlist"
                  ? ` · ${(item as PlaylistItem).creator}`
                  : type === "album" && ` · ${(item as AlbumItem).artist}`}
              </p>
            )}
          </div>

          <div className="absolute bottom-20 right-5">
            <button className="flex items-center p-4 transition bg-green-500 rounded-full opacity-0 cursor-pointer drop-shadow-md translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
              <FaPlay className="text-black" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

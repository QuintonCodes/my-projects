import CardItem from "@/components/card-item";
import SongsTable from "@/components/songs-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { albumSongData } from "@/lib/data";
import { CheckCircle2, Play, Shuffle, Verified } from "lucide-react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { RxDotsHorizontal } from "react-icons/rx";

export default function ArtistPage() {
  const album = [
    {
      name: "Flower Boy",
      imageSrc: "/album.png",
      artist: "Tyler, The Creator",
      year: 2017,
    },
    {
      name: "Flower Boy",
      imageSrc: "/album.png",
      artist: "Tyler, The Creator",
      year: 2017,
    },
    {
      name: "Flower Boy",
      imageSrc: "/album.png",
      artist: "Tyler, The Creator",
      year: 2017,
    },
  ];

  const artist = [
    {
      name: "Kendrick Lamar",
      imageSrc: "/kendrick.png",
    },
    {
      name: "Kendrick Lamar",
      imageSrc: "/kendrick.png",
    },
    {
      name: "Kendrick Lamar",
      imageSrc: "/kendrick.png",
    },
  ];

  return (
    <div className="h-full">
      {/* Header */}
      <div className="relative">
        <Image alt="" src="" className="object-cover w-full h-64" />

        {/* TODO: Show on top of the image with some spacing */}
        <div className="absolute space-y-2 text-white bottom-5 left-5">
          <div className="flex items-center gap-2">
            <Verified className="text-white size-5 fill-blue-600" />
            <span className="text-xs">Verified Artist</span>
          </div>
          <h1 className="text-6xl">Kendrick Lamar</h1>
          <span className="text-sm text-neutral-300">
            80,782,190 monthly listeners
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-6 mx-5 my-3">
        <button className="flex items-center p-4 transition bg-green-500 rounded-full cursor-pointer drop-shadow-md translate hover:scale-110">
          <FaPlay className="text-black" />
        </button>
        <button className="transition cursor-pointer text-zinc-400 hover:text-white hover:scale-105">
          <Shuffle className="size-7" />
        </button>
        {/* TODO: Add a drop down menu with options */}
        <button className="px-3 py-1 transition bg-transparent border cursor-pointer hover:scale-105 text-zinc-400 hover:text-white rounded-3xl">
          Following
        </button>
        <button className="transition cursor-pointer hover:scale-105 text-zinc-400 hover:text-white">
          <RxDotsHorizontal className="size-7" />
        </button>
      </div>

      {/* Content */}
      <div className="mx-5">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="gap-2 bg-transparent">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="discography">Discography</TabsTrigger>
            <TabsTrigger value="features">Features & More</TabsTrigger>
          </TabsList>
          <TabsContent value="home">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold">Popular</h1>
              {/* Top Songs Table */}
              <SongsTable className="px-2">
                <SongsTable.Body>
                  {albumSongData.map((song, index) => (
                    <SongsTable.Row
                      key={index}
                      gridTemplate="grid-cols-[16px_2.75fr_2fr_50px]"
                    >
                      <SongsTable.Cell className="flex items-center justify-center">
                        <span className="block group-hover:hidden">
                          {song.number}
                        </span>
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
                          <div className="font-medium text-white">
                            {song.title}
                          </div>
                          {song.explicit && (
                            <div className="py-0.5 px-2 text-[10px] rounded-md bg-zinc-800 w-fit">
                              E
                            </div>
                          )}
                        </div>
                      </SongsTable.Cell>
                      <SongsTable.Cell className="flex items-center justify-between">
                        <span>{song.plays}</span>
                        <div className="hidden transition group-hover:block">
                          <CheckCircle2 className="text-black size-5 fill-green-600" />
                        </div>
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
          </TabsContent>
          <TabsContent value="discography">
            {/* Discography Section */}
            <div className="my-2 space-y-2">
              <h1 className="text-2xl font-semibold">Discography</h1>
              <div className="grid grid-cols-4 gap-2">
                <CardItem items={album} type="album" isArtistPage />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features">
            {/* Artist Recommendation */}
            <div className="my-2 space-y-2">
              <h1 className="text-2xl font-semibold">Fans also like</h1>
              <div className="grid grid-cols-4 gap-2">
                <CardItem items={artist} type="artist" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

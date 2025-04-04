"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export default function CardTab({ image, name, href }: ListItemProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className="relative flex items-center gap-4 pr-4 overflow-hidden transition rounded-md cursor-pointer group bg-neutral-100/10 hover:bg-neutral-100/20"
    >
      <div className="relative size-16">
        <Image className="object-cover" fill src={image} alt="" />
      </div>
      <p className="py-5 font-medium truncate">{name}</p>
      <div className="absolute flex items-center justify-center p-3 transition bg-green-500 rounded-full opacity-0 cursor-pointer drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
}

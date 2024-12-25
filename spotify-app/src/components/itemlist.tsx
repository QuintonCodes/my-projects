import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface ItemListProps {
  id: string;
  image?: string;
  onClick?: () => void;
  primary: string;
  secondary?: string;
}

const ItemList = ({
  id,
  image,
  onClick,
  primary,
  secondary,
}: ItemListProps) => {
  return (
    <div
      className="flex items-center bg-zinc-700 rounded-lg shadow-md mb-3 p-3 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
      key={id}
    >
      <Avatar>
        <AvatarImage src={image} />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-grow ml-3">
        <span className="text-white text-sm font-medium">{primary}</span>
      </div>
      {secondary && (
        <div className="flex flex-col flex-grow justify-end ml-3">
          <span className="text-white text-sm font-medium">{secondary}</span>
        </div>
      )}
      {onClick && (
        <Button
          className="group-hover:flex items-center bg-gray-700 text-white px-3 py-1 rounded-md text-xs"
          onClick={onClick}
        >
          View
        </Button>
      )}
    </div>
  );
};

export default ItemList;

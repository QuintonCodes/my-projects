import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-1 rounded-3xl px-2 bg-zinc-800/90 shadow-sm w-full max-w-[290px] focus-within:ring-2 focus-within:ring-white">
      <Search className="text-white w-6 h-6" />
      <Input
        type="text"
        placeholder="What do you want to play?"
        className="border-none outline-none flex-1 bg-transparent focus:ring-0"
      />
    </div>
  );
};

export default SearchBar;

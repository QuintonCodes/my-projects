import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-1 border rounded-3xl p-2 bg-transparent shadow-sm w-full max-w-[280px]">
      <Search className="text-white w-6 h-6" />
      <Input
        type="text"
        placeholder="Search for artist..."
        className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 bg-transparent"
      />
    </div>
  );
};

export default SearchBar;

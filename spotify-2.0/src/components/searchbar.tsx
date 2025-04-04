import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar() {
  return (
    <div className="flex items-center w-full px-2 space-x-1 shadow-sm rounded-3xl bg-zinc-800/90 focus-within:ring-2 focus-within:ring-white">
      <Search className="text-white size-5" />
      <Input
        type="text"
        placeholder="What do you want to play?"
        className="flex-1 truncate bg-transparent border-none outline-none focus:ring-0 min-w-56"
        name="search"
        autoComplete={undefined}
      />
    </div>
  );
}

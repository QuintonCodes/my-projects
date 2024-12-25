import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const FollowedArtistsPage = () => {
  return (
    <div className="items-center flex flex-col m-10 space-y-5 w-full">
      <h3>Followed Artists</h3>
      {/* Sort Filter */}
      <Select>
        <SelectTrigger className="w-[180px] bg-transparent">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filters</SelectLabel>
            <SelectItem value="az">A to Z</SelectItem>
            <SelectItem value="za">Z to A</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* List */}
      <div className="w-full max-w-lg pt-4">
        <div className="flex items-center bg-zinc-700 rounded-lg shadow-md mb-3 p-3 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-grow ml-3">
            <span className="text-white text-sm font-medium">Artist Name</span>
          </div>
          <Button className="group-hover:flex items-center bg-gray-700 text-white px-3 py-1 rounded-md text-xs">
            View
          </Button>
        </div>
        <div className="flex items-center bg-zinc-700 rounded-lg shadow-md mb-3 p-3 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-grow ml-3">
            <span className="text-white text-sm font-medium">Artist Name</span>
          </div>
          <Button className="group-hover:flex items-center bg-gray-700 text-white px-3 py-1 rounded-md text-xs">
            View
          </Button>
        </div>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default FollowedArtistsPage;

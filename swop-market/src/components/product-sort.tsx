"use client";

import { ArrowDownAZ, SortAsc, SortDesc } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        Sort by:
      </span>
      <Select
        defaultValue={searchParams.get("sort") || "newest"}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">
            <div className="flex items-center">
              <ArrowDownAZ className="w-4 h-4 mr-2" />
              <span>Newest First</span>
            </div>
          </SelectItem>
          <SelectItem value="price_asc">
            <div className="flex items-center">
              <SortAsc className="w-4 h-4 mr-2" />
              <span>Price: Low to High</span>
            </div>
          </SelectItem>
          <SelectItem value="price_desc">
            <div className="flex items-center">
              <SortDesc className="w-4 h-4 mr-2" />
              <span>Price: High to Low</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

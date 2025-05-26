"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Button } from "../ui/button";
import FilterContent from "./filter-content";

export default function DesktopFilters() {
  const { activeFilterCount, resetFilters } = useProductFilters();

  return (
    <div className="hidden md:block">
      <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-8 text-xs"
            >
              Clear all
            </Button>
          )}
        </div>

        <FilterContent />
      </div>
    </div>
  );
}

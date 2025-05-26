"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProductFilters } from "@/hooks/use-product-filters";
import { Filter, X } from "lucide-react";
import { Button } from "../ui/button";
import FilterContent from "./filter-content";

export default function MobileFilters() {
  const { activeFilterCount, isMobileFiltersOpen, setIsMobileFiltersOpen } =
    useProductFilters();

  return (
    <div className="md:hidden">
      <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-between w-full"
          >
            <span className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </span>
            {activeFilterCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-teal-700 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <FilterContent />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                <X className="w-4 h-4 mr-2" />
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

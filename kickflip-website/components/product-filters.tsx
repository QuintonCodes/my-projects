"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(true);

  const currentCategory = searchParams.get("category");
  const currentColor = searchParams.get("color");
  const currentSize = searchParams.get("size");

  const categories = [
    { id: "hoodies", name: "Hoodies" },
    { id: "sweaters", name: "Sweaters" },
    { id: "t-shirts", name: "T-Shirts" },
  ];

  const colors = [
    { id: "black", name: "Black", value: "#000000" },
    { id: "white", name: "White", value: "#FFFFFF" },
    { id: "red", name: "Red", value: "#7F1310" },
    { id: "gray", name: "Gray", value: "#333333" },
  ];

  const sizes = [
    { id: "s", name: "S" },
    { id: "m", name: "M" },
    { id: "l", name: "L" },
    { id: "xl", name: "XL" },
    { id: "xxl", name: "XXL" },
  ];

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }

    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/products");
  };

  const hasActiveFilters = currentCategory || currentColor || currentSize;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center text-lg font-semibold">
          <Filter className="w-4 h-4 mr-2" /> Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="md:hidden"
        >
          {filtersOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {(filtersOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 overflow-hidden"
          >
            {hasActiveFilters && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Active filters</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Category</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={currentCategory === category.id}
                      onCheckedChange={() =>
                        handleFilterChange("category", category.id)
                      }
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleFilterChange("color", color.id)}
                    className={cn(
                      "h-8 w-8 rounded-full border flex items-center justify-center",
                      currentColor === color.id &&
                        "ring-2 ring-kickflip ring-offset-2"
                    )}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {currentColor === color.id && (
                      <span
                        className={cn(
                          "text-white",
                          color.id === "white" && "text-black"
                        )}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleFilterChange("size", size.id)}
                    className={cn(
                      "h-9 min-w-[36px] rounded-md border px-2 text-sm",
                      currentSize === size.id
                        ? "border-kickflip bg-kickflip text-white"
                        : "border-input bg-background hover:bg-muted"
                    )}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Price Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="px-3 py-2 border rounded-md">
                  <p className="mb-1 text-xs text-muted-foreground">Min</p>
                  <input
                    type="number"
                    min="0"
                    placeholder="$0"
                    className="w-full text-sm bg-transparent outline-none"
                  />
                </div>
                <div className="px-3 py-2 border rounded-md">
                  <p className="mb-1 text-xs text-muted-foreground">Max</p>
                  <input
                    type="number"
                    min="0"
                    placeholder="$100"
                    className="w-full text-sm bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

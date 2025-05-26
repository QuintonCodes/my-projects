"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type FilterState = {
  minPrice?: number;
  maxPrice?: number;
  conditions?: string[];
  category?: string;
  search?: string;
  sort?: string;
};

interface UseFilterPersistenceProps {
  key: string;
  defaultFilters?: FilterState;
  autoApplyOnFirstLoad?: boolean; // New parameter
}

export const useFilterPersistence = ({
  key,
  defaultFilters,
  autoApplyOnFirstLoad = false,
}: UseFilterPersistenceProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  console.log(defaultFilters);

  // Function to get current filters from URL
  const getCurrentFilters = useCallback((): FilterState => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const conditions = searchParams.get("conditions");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    return {
      minPrice: minPrice ? Number.parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? Number.parseInt(maxPrice) : undefined,
      conditions: conditions ? conditions.split(",") : undefined,
      category: category || undefined,
      search: search || undefined,
      sort: sort || undefined,
    };
  }, [searchParams]);

  const [currentFilters, setCurrentFilters] = useState<FilterState>(
    getCurrentFilters()
  );

  useEffect(() => {
    if (!isInitialized) {
      setCurrentFilters(getCurrentFilters());
    }
  }, [searchParams, isInitialized, getCurrentFilters]);

  // Load saved filters on initial load if URL has no filters
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if URL already has filters
    const hasUrlFilters = Array.from(searchParams.keys()).some((key) =>
      [
        "minPrice",
        "maxPrice",
        "conditions",
        "category",
        "search",
        "sort",
      ].includes(key)
    );

    // If URL has no filters and autoApplyOnFirstLoad is true, try to load from localStorage
    if (!hasUrlFilters && autoApplyOnFirstLoad) {
      try {
        const savedFilters = localStorage.getItem(key);
        if (savedFilters) {
          const parsedFilters = JSON.parse(savedFilters) as FilterState;

          // Build URL with saved filters
          const params = new URLSearchParams(searchParams.toString());

          if (parsedFilters.minPrice)
            params.set("minPrice", parsedFilters.minPrice.toString());
          if (parsedFilters.maxPrice)
            params.set("maxPrice", parsedFilters.maxPrice.toString());
          if (parsedFilters.conditions && parsedFilters.conditions.length > 0) {
            params.set("conditions", parsedFilters.conditions.join(","));
          }
          if (parsedFilters.category)
            params.set("category", parsedFilters.category);
          if (parsedFilters.search) params.set("search", parsedFilters.search);
          if (parsedFilters.sort) params.set("sort", parsedFilters.sort);

          // Only navigate if we have filters to apply
          if (params.toString() !== searchParams.toString()) {
            router.push(`/products?${params.toString()}`);
          }
        }
      } catch (error) {
        console.error("Error loading saved filters:", error);
      }
    }

    setIsInitialized(true);
  }, [key, router, searchParams, autoApplyOnFirstLoad]);

  // Function to clear saved filters
  const clearSavedFilters = () => {
    localStorage.removeItem(key);

    // Remove filter params from URL, but keep any other params
    const params = new URLSearchParams(searchParams.toString());

    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("conditions");
    params.delete("category");
    params.delete("search");
    params.delete("sort");

    router.push(`/products${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return {
    currentFilters,
    clearSavedFilters,
  };
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFilterPersistence } from "./use-filter-persistence";

export const MAX_PRICE = 50_000;

const filterSchema = z.object({
  minPrice: z.number().min(0).max(MAX_PRICE),
  maxPrice: z.number().min(0).max(MAX_PRICE),
  conditions: z.array(z.string()),
});

export type FilterValues = z.infer<typeof filterSchema>;

export function useProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearSavedFilters } = useFilterPersistence({
    key: "swopmarket-filters",
    defaultFilters: {},
  });

  const [showPriceDistribution, setShowPriceDistribution] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Initialize form with values from URL
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || MAX_PRICE,
      conditions:
        searchParams.get("conditions")?.split(",").filter(Boolean) || [],
    },
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([
    form.getValues("minPrice"),
    form.getValues("maxPrice") || MAX_PRICE,
  ]);

  // Update price range state when form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.minPrice !== undefined && value.maxPrice !== undefined) {
        setPriceRange([value.minPrice, value.maxPrice]);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Initialize price range from form values
  useEffect(() => {
    const { minPrice, maxPrice } = form.getValues();
    setPriceRange([minPrice, maxPrice]);
  }, [form]);

  // Apply filters
  const applyFilters = (values: FilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update price params
    if (values.minPrice > 0) {
      params.set("minPrice", values.minPrice.toString());
    } else {
      params.delete("minPrice");
    }

    if (values.maxPrice < MAX_PRICE) {
      params.set("maxPrice", values.maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }

    // Update condition params
    if (values.conditions.length > 0) {
      params.set("conditions", values.conditions.join(","));
    } else {
      params.delete("conditions");
    }

    // Get existing category if any
    const category = searchParams.get("category");
    if (category) {
      params.set("category", category);
    }

    // Get existing search if any
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }

    // Get existing sort if any
    const sort = searchParams.get("sort");
    if (sort) {
      params.set("sort", sort);
    }

    // Update URL with new params
    router.push(`/products?${params.toString()}`);
    setIsMobileFiltersOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    form.reset({
      minPrice: 0,
      maxPrice: MAX_PRICE,
      conditions: [],
    });

    // Clear saved filters
    clearSavedFilters();
  };

  // Handle price slider change
  const handlePriceSliderChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
    form.setValue("minPrice", value[0]);
    form.setValue("maxPrice", value[1]);
  };

  // Handle min price input change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    const maxPrice = form.getValues("maxPrice");
    const newValue = Math.min(value, maxPrice);

    form.setValue("minPrice", newValue);
    setPriceRange([newValue, maxPrice]);
  };

  // Handle max price input change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value)) return;

    const minPrice = form.getValues("minPrice");
    const newValue = Math.max(value, minPrice);

    form.setValue("maxPrice", newValue);
    setPriceRange([minPrice, newValue]);
  };

  // Count active filters
  const activeFilterCount = (() => {
    let count = 0;
    if (form.getValues("minPrice") > 0) count++;
    if (form.getValues("maxPrice") < MAX_PRICE) count++;
    count += form.getValues("conditions").length;
    return count;
  })();

  return {
    form,
    priceRange,
    showPriceDistribution,
    isMobileFiltersOpen,
    activeFilterCount,
    setShowPriceDistribution,
    setIsMobileFiltersOpen,
    applyFilters,
    resetFilters,
    handlePriceSliderChange,
    handleMinPriceChange,
    handleMaxPriceChange,
  };
}

"use client";

import ProductGrid from "@/components/product-grid";
import ProductSort from "@/components/product-sort";
import ActiveFilters from "@/components/products/active-filters";
import DesktopFilters from "@/components/products/desktop-filters";
import MobileFilters from "@/components/products/mobile-filters";
import { useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // Check if any filters are applied
  const hasFilters = Array.from(searchParams.keys()).some((key) =>
    ["minPrice", "maxPrice", "conditions", "category", "search"].includes(key)
  );

  return (
    <div className="container px-4 py-8 md:px-6">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">All Products</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/4">
          <DesktopFilters />
          <MobileFilters />
          <ActiveFilters />
        </div>

        <div className="md:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {hasFilters
                ? "Showing filtered products"
                : "Showing all products"}
            </p>
            <ProductSort />
          </div>

          <ProductGrid />
        </div>
      </div>
    </div>
  );
}

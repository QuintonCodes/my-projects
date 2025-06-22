"use client";

import { useProductList } from "@/hooks/use-product-list";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import { Skeleton } from "./ui/skeleton";

export default function ProductGrid() {
  const { products, filters, isLoading, error } = useProductList();

  if (isLoading) {
    // Show a grid of skeletons while loading
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[340px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2 text-destructive">
          Failed to load products
        </h3>
        <p className="text-muted-foreground">
          {typeof error === "object" && error !== null && "message" in error
            ? error.message
            : "An unexpected error occurred. Please try again later."}
        </p>
      </div>
    );
  }

  // When category, filter or search doesn't exist
  if (!products.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          {filters.search ||
          filters.category ||
          filters.minPrice !== undefined ||
          filters.maxPrice !== undefined ||
          filters.conditions?.length
            ? "Try adjusting your filters or search criteria."
            : "No products available at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ProductCard product={product} searchTerm={filters.search} />
        </motion.div>
      ))}
    </div>
  );
}

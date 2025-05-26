"use client";

import { useProductList } from "@/hooks/use-product-list";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";

export default function ProductGrid() {
  const { products, filters } = useProductList();

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

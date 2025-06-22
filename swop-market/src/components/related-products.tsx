"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useRelatedProducts } from "@/hooks/use-related-products";

export default function RelatedProducts({ productId }: { productId: string }) {
  const {
    relatedProducts,
    containerRef,
    translateX,
    canScrollLeft,
    canScrollRight,
    prev,
    next,
  } = useRelatedProducts(productId);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Related Products</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            disabled={!canScrollLeft}
            className="w-8 h-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            disabled={!canScrollRight}
            className="w-8 h-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: translateX,
          }}
        >
          {relatedProducts.map((product) => (
            <motion.div
              key={product.id}
              className="flex-none w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="justify-center hidden mt-6 md:flex">
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>
    </div>
  );
}

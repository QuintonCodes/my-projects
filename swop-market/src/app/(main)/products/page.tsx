"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

import EnhancedProductFilters from "@/components/enhanced-product-filters";
import ProductGrid from "@/components/product-grid";
import ProductSort from "@/components/product-sort";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function ProductsPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <main className="flex-1 w-full px-4 py-8 md:px-6">
      <div className="flex flex-col gap-8 md:flex-row">
        <section className="hidden md:w-1/4 md:block">
          <div className="sticky top-24">
            <EnhancedProductFilters />
          </div>
        </section>

        <section className="md:w-3/4">
          <div className="flex flex-col justify-between gap-4 mb-6 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h1 className="text-2xl font-bold md:text-3xl">All Products</h1>
              <p className="text-muted-foreground">
                Discover amazing products from our marketplace
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Sheet
                open={isMobileFiltersOpen}
                onOpenChange={setIsMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="py-4">
                    <EnhancedProductFilters />
                  </div>
                </SheetContent>
              </Sheet>
              <ProductSort />
            </div>
          </div>

          <ProductGrid />
        </section>
      </div>
    </main>
  );
}

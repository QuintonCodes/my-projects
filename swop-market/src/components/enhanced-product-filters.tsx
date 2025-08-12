"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { MAX_PRICE, useProductFilters } from "@/hooks/use-product-filters";
import { formatCondition, formatCurrency } from "@/lib/utils";
import FilterContent from "./filter-content";

export default function EnhancedProductFilters() {
  const productFilters = useProductFilters();

  const { activeFilterCount, applyFilters, form, resetFilters } =
    productFilters;

  return (
    <>
      <div className="hidden md:block">
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

        <FilterContent {...productFilters} />
      </div>

      <div className="block md:hidden p-4 py-6">
        <FilterContent {...productFilters} />
      </div>

      {activeFilterCount === 0 && (
        <div className="mt-4 mb-2 text-sm text-muted-foreground px-4 md:px-0">
          <p>Showing all products. Apply filters to refine results.</p>
        </div>
      )}

      {activeFilterCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {form.getValues("minPrice") > 0 && (
            <FilterBadge
              label={`Min: ${formatCurrency(form.getValues("minPrice"))}`}
              onRemove={() => {
                form.setValue("minPrice", 0);
                applyFilters(form.getValues());
              }}
            />
          )}

          {form.getValues("maxPrice") < MAX_PRICE && (
            <FilterBadge
              label={`Max: ${formatCurrency(form.getValues("maxPrice"))}`}
              onRemove={() => {
                form.setValue("maxPrice", MAX_PRICE);
                applyFilters(form.getValues());
              }}
            />
          )}

          {form.watch("conditions").map((condition) => {
            const conditionLabel = formatCondition(condition);
            return (
              <FilterBadge
                key={condition}
                label={conditionLabel}
                onRemove={() => {
                  form.setValue(
                    "conditions",
                    form.getValues("conditions").filter((c) => c !== condition)
                  );
                  applyFilters(form.getValues());
                }}
              />
            );
          })}
        </motion.div>
      )}
    </>
  );
}

function FilterBadge({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-background p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}

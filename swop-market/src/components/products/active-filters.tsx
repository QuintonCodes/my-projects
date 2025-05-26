"use client";

import { MAX_PRICE, useProductFilters } from "@/hooks/use-product-filters";
import { conditionOptions } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import { motion } from "motion/react";
import FilterBadge from "./filter-badge";

export default function ActiveFilters() {
  const { activeFilterCount, form, applyFilters } = useProductFilters();

  if (activeFilterCount === 0) {
    return (
      <div className="mt-4 mb-2 text-sm text-muted-foreground">
        <p>Showing all products. Apply filters to refine results.</p>
      </div>
    );
  }

  return (
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

      {form.getValues("conditions").map((condition) => {
        const conditionLabel = conditionOptions.find(
          (o) => o.id === condition
        )?.label;
        return (
          <FilterBadge
            key={condition}
            label={conditionLabel || condition}
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
  );
}

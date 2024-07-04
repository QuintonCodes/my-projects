import { useMemo } from "react";
import { Products } from "../utils/models";

const useFilteredProducts = (
  products: Products[] | undefined,
  categoryFilter: string
) => {
  return useMemo(() => {
    if (!products) return [];

    return categoryFilter === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === categoryFilter.toLowerCase()
        );
  }, [categoryFilter, products]);
};

export default useFilteredProducts;

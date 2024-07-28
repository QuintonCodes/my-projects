import { useMemo } from "react";
import { IProducts } from "../utils/models";

const useFilteredProducts = (
  products: IProducts[] | undefined,
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

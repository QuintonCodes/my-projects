import { useMemo } from "react";
import { Products } from "../utils/models";

const useSortedProducts = (products: Products[], sortOption: string) => {
  return useMemo(() => {
    return products.slice().sort((a, b) => {
      if (sortOption === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [products, sortOption]);
};

export default useSortedProducts;

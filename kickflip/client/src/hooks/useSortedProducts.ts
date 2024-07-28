import { useMemo } from "react";
import { IProducts } from "../utils/models";

const useSortedProducts = (products: IProducts[], sortOption: string) => {
  return useMemo(() => {
    return products.slice().sort((a, b) => {
      if (sortOption === "alphabetical") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [products, sortOption]);
};

export default useSortedProducts;

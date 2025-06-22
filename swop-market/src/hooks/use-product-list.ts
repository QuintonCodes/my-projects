import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FilterState, useFilterPersistence } from "./use-filter-persistence";
import { useProducts } from "./use-products";

export function useProductList() {
  const { currentFilters } = useFilterPersistence({
    key: "swopmarket-filters",
    autoApplyOnFirstLoad: true,
  });
  const { products: allProducts, isLoading, error } = useProducts();
  const params = useSearchParams();

  const filters: FilterState = useMemo(() => {
    return {
      category: params.get("category") || currentFilters.category,
      search: params.get("search") || currentFilters.search,
      minPrice: params.get("minPrice")
        ? Number(params.get("minPrice"))
        : currentFilters.minPrice,
      maxPrice: params.get("maxPrice")
        ? Number(params.get("maxPrice"))
        : currentFilters.maxPrice,
      conditions:
        params.get("conditions")?.split(",").filter(Boolean) ||
        currentFilters.conditions,
      sort: params.get("sort") || "newest",
    };
  }, [currentFilters, params]);

  const products = useMemo(() => {
    let list = [...allProducts];

    if (filters.category) {
      list = list.filter(
        (product) =>
          product.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      list = list.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      list = list.filter((product) => {
        const meetsMin =
          filters.minPrice !== undefined
            ? Number(product.price) >= filters.minPrice
            : true;
        const meetsMax =
          filters.maxPrice !== undefined
            ? Number(product.price) <= filters.maxPrice
            : true;
        return meetsMin && meetsMax;
      });
    }

    if (filters.conditions?.length) {
      list = list.filter((product) =>
        filters.conditions!.includes(product.condition)
      );
    }

    switch (filters.sort) {
      case "price_asc":
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "newest":
        list.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.createdAt || "").getTime() -
            new Date(a.createdAt || "").getTime()
        );
    }

    return list;
  }, [allProducts, filters]);

  return { products, filters, isLoading, error };
}

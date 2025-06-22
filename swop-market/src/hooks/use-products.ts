import { ProductWithSeller } from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProducts() {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get<ProductWithSeller[]>("/api/products");
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 60 minutes
  });

  return {
    products,
    isLoading,
    error,
  };
}

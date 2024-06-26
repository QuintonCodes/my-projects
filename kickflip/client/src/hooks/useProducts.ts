import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../utils/api";
import { Products } from "../utils/models";

const useProducts = () => {
  return useQuery<Products[], Error>({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60 * 60 * 6,
    enabled: true,
  });
};

export default useProducts;

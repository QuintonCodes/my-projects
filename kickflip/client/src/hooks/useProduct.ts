import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../utils/api";
import { Products } from "../utils/models";

const useProduct = (productId: string | null | undefined) => {
  return useQuery<Products, Error>({
    queryKey: ["products"],
    queryFn: () => fetchProduct(productId),
    staleTime: 1000 * 60 * 60 * 6,
    enabled: true,
  });
};

export default useProduct;

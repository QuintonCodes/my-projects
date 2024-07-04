import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../utils/api";
import { Products } from "../utils/models";

const useProduct = (productId: string | undefined) => {
  return useQuery<Products, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 1000 * 60 * 60 * 6,
    refetchOnWindowFocus: false,
  });
};

export default useProduct;

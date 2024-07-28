import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../features/cart/cartService";
import { IProducts } from "../utils/models";

const useProduct = (productId: string | undefined) => {
  return useQuery<IProducts, Error>({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 1000 * 60 * 60 * 6,
    refetchOnWindowFocus: false,
  });
};

export default useProduct;

import { useReviewsStore } from "@/lib/stores/reviews-store";
import { Review } from "@/lib/types/product";
import { useEffect, useMemo } from "react";
import { useProducts } from "./use-products";

export function useProductReviews(productId: string) {
  const { products } = useProducts();
  const { reviews, setReviews, addReview } = useReviewsStore();

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  );

  useEffect(() => {
    if (
      product &&
      product.reviews &&
      (!reviews[productId] || reviews[productId].length === 0)
    ) {
      setReviews(productId, product.reviews);
    }
  }, [product, productId, reviews, setReviews]);

  const productReviews = reviews[productId] || [];

  return {
    reviews: Array.isArray(productReviews) ? productReviews : [],
    addReview: (review: Review) => addReview(productId, review),
  };
}

import { create } from "zustand";
import { Review } from "../types/product";

type ReviewsState = {
  reviews: Record<string, Review[]>;
  addReview: (productId: string, review: Review) => void;
  setReviews: (productId: string, reviews: Review[]) => void;
};

export const useReviewsStore = create<ReviewsState>((set) => ({
  reviews: {},
  addReview: (productId, review) =>
    set((state) => ({
      reviews: {
        ...state.reviews,
        [productId]: [review, ...(state.reviews[productId] || [])],
      },
    })),
  setReviews: (productId, reviews) =>
    set((state) => ({
      reviews: {
        ...state.reviews,
        [productId]: reviews,
      },
    })),
}));

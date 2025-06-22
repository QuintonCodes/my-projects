"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Star, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { registerReview } from "@/app/actions/review";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/context/auth-provider";
import { useProductReviews } from "@/hooks/use-product-reviews";

const reviewSchema = z.object({
  comment: z.string().min(5, "Review must be at least 5 characters"),
  rating: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ProductReviews({ productId }: { productId: string }) {
  const { reviews, addReview } = useProductReviews(productId);
  const { user } = useAuthStore();

  const reviewForm = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const {
    formState: { isSubmitting },
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
  } = reviewForm;

  async function onSubmit(data: ReviewFormValues) {
    if (!user) {
      toast.error("You must be logged in to post a review.");
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("comment", data.comment);
    formData.append("rating", data.rating.toString());
    formData.append("user", user?.firstName || "You");
    formData.append("buyerId", user?.id || "");

    try {
      const result = await registerReview(formData);
      if (result.success && result.review) {
        addReview({
          ...result.review,
          comment: result.review.comment ?? "",
        });

        toast.success("Review submitted", {
          description: "Thank you for your feedback!",
        });
      } else {
        toast.error("Failed to submit review", {
          description: result.error || "Please try again.",
        });
      }
    } catch {
      toast.error("Failed to submit review", {
        description: "Please try again.",
      });
    }

    reset();
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>

      {/* Review Form */}
      <div className="p-4 border rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
        {user ? (
          <Form {...reviewForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            onMouseEnter={() => setValue("rating", star)}
                            onMouseLeave={() => setValue("rating", field.value)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= field.value
                                  ? "fill-amber-500 text-amber-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {field.value > 0
                            ? `${field.value} star${field.value > 1 ? "s" : ""}`
                            : "Select rating"}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts about this product..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800"
                disabled={!watch("rating") || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-muted-foreground text-sm">
            You must be logged in to post a review.
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-muted-foreground text-center py-8">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{review.user}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.createdAt &&
                      !isNaN(new Date(review.createdAt).getTime())
                        ? format(new Date(review.createdAt), "yyyy-MM-dd")
                        : "Unknown date"}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

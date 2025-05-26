"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Star, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const reviewSchema = z.object({
  comment: z.string().min(5, "Review must be at least 5 characters"),
  rating: z.number().min(1).max(5),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    user: "John Doe",
    rating: 5,
    comment: "Excellent product! Exactly as described and arrived quickly.",
    date: "2024-04-15",
  },
  {
    id: "2",
    user: "Sarah Smith",
    rating: 4,
    comment:
      "Very good quality. The only reason I'm not giving 5 stars is because the color is slightly different from what I expected.",
    date: "2024-04-10",
  },
  {
    id: "3",
    user: "Michael Brown",
    rating: 5,
    comment:
      "Perfect condition and great value for money. The seller was very responsive and helpful.",
    date: "2024-04-05",
  },
];

export default function ProductReviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    // In a real app, you would submit the review to an API
    const newReview = {
      id: Date.now().toString(),
      user: "You",
      rating: data.rating,
      comment: data.comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    form.reset();
    setRating(0);

    toast.success("Review submitted", {
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>

      {/* Review Form */}
      <div className="p-4 border rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                    form.setValue("rating", star);
                  }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= (hoveredRating || rating)
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0
                  ? `${rating} star${rating > 1 ? "s" : ""}`
                  : "Select rating"}
              </span>
            </div>

            <FormField
              control={form.control}
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
              disabled={!rating || form.formState.isSubmitting}
            >
              Submit Review
            </Button>
          </form>
        </Form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b last:border-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium">{review.user}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
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
        ))}
      </div>
    </div>
  );
}

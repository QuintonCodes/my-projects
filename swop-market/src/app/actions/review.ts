"use server";

import { db } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  comment: z.string().min(5, "Review must be at least 5 characters"),
  rating: z.number().min(1).max(5),
  user: z.string().min(1, "User name is required"),
  buyerId: z.string().min(1, "Buyer ID is required"),
});

export async function registerReview(formData: FormData) {
  const raw = {
    productId: formData.get("productId")?.toString() || "",
    comment: formData.get("comment")?.toString() || "",
    rating: Number(formData.get("rating")),
    user: formData.get("user")?.toString() || "",
    buyerId: formData.get("buyerId")?.toString() || "",
  };

  const parsed = reviewSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }

  const { productId, comment, rating, user, buyerId } = parsed.data;

  try {
    const review = await db.review.create({
      data: {
        buyerId,
        productId,
        user,
        rating,
        comment,
      },
    });

    return { success: true, review };
  } catch {
    return {
      success: false,
      error: "Failed to save review. Please try again.",
    };
  }
}

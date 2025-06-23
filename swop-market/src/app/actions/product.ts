"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(1),
  condition: z.enum(
    ["new", "used_new", "used_good", "used_fair", "for_parts"],
    {
      errorMap: () => ({ message: "Please select a valid condition" }),
    }
  ),
  brand: z.string().optional(),
  model: z.string().optional(),
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
      })
    )
    .min(1),
  price: z.coerce.number().min(1),
  originalPrice: z.coerce.number().optional(),
  location: z.string().min(1),
  deliveryOptions: z.array(z.string()).min(1),
});

const updateProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(1),
  condition: z.enum(["new", "used_new", "used_good", "used_fair", "for_parts"]),
  brand: z.string().optional(),
  model: z.string().optional(),
  price: z.coerce.number().min(1),
  originalPrice: z.coerce.number().optional(),
  location: z.string().min(1),
});

const validConditions = [
  "new",
  "used_new",
  "used_good",
  "used_fair",
  "for_parts",
] as const;

const validDeliveryOptions = [
  "pickup",
  "courier",
  "local_delivery",
  "meet_in_person",
] as const;

export async function createProduct(formData: FormData) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { success: false, error: "User not authenticated" };
    }

    const raw: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      if (key === "images" || key === "deliveryOptions") {
        // These are sent as JSON strings
        raw[key] = JSON.parse(value as string);
      } else {
        raw[key] = value;
      }
    }

    const parsed = productSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(", "),
      };
    }
    const data = parsed.data;

    const condition = validConditions.includes(
      data.condition as (typeof validConditions)[number]
    )
      ? (data.condition as (typeof validConditions)[number])
      : undefined;
    if (!condition) {
      return { success: false, error: "Invalid product condition" };
    }

    const deliveryOptions = (data.deliveryOptions as string[]).filter(
      (opt): opt is (typeof validDeliveryOptions)[number] =>
        validDeliveryOptions.includes(
          opt as (typeof validDeliveryOptions)[number]
        )
    );
    if (!deliveryOptions.length) {
      return { success: false, error: "No valid delivery options selected" };
    }

    const seller = await db.seller.findUnique({
      where: { userId: session.userId },
    });
    if (!seller) {
      return { success: false, error: "Seller profile not found" };
    }

    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.images.map((img: { url: string }) => img.url),
        category: data.category,
        condition,
        brand: data.brand || undefined,
        model: data.model || undefined,
        price: data.price,
        originalPrice: data.originalPrice || undefined,
        location: data.location,
        deliveryOptions,
        sellerId: seller.id,
        status: "active",
      },
    });

    return { success: true, product };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const raw: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      raw[key] = value;
    }
    const parsed = updateProductSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(", "),
      };
    }
    const data = parsed.data;

    const updated = await db.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        category: data.category,
        condition: data.condition,
        brand: data.brand || undefined,
        model: data.model || undefined,
        price: data.price,
        originalPrice: data.originalPrice || undefined,
        location: data.location,
      },
    });

    return { success: true, product: updated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { success: false, error: "Failed to update product" };
  }
}

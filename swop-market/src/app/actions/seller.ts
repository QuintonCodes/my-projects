"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { z } from "zod";

type SellerPayload = {
  storeName: string;
  storeDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  storeLocation?: string;
};

const sellerSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  storeDescription: z
    .string()
    .min(10, "Store description must be at least 10 characters"),
  storeLocation: z.string().min(2, "Store location is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
});

async function createSeller({
  storeName,
  storeDescription,
  contactEmail,
  contactPhone,
  storeLocation,
}: SellerPayload) {
  const session = await getSession();

  return await db.seller.create({
    data: {
      storeName,
      storeDescription: storeDescription || undefined,
      contactEmail: contactEmail || undefined,
      contactNumber: contactPhone || undefined,
      location: storeLocation || undefined,
      user: {
        connect: {
          id: session?.userId || "",
        },
      },
    },
  });
}

export async function register(formData: FormData) {
  const data = {
    storeName: formData.get("storeName")?.toString() || "",
    storeDescription: formData.get("storeDescription")?.toString() || "",
    contactEmail: formData.get("contactEmail")?.toString() || "",
    contactPhone: formData.get("contactPhone")?.toString() || "",
    storeLocation: formData.get("storeLocation")?.toString() || "",
  };

  try {
    const session = await getSession();

    if (!session?.userId) {
      return { success: false, error: "User not authenticated" };
    }

    const validatedData = sellerSchema.parse(data);

    const newSeller = await createSeller(validatedData);

    if (!newSeller) {
      return { success: false, error: "Failed to create seller" };
    }

    return { success: true, seller: newSeller };
  } catch (error) {
    console.error("Error creating seller:", error);
    return { success: false, error: "Failed to create seller" };
  }
}

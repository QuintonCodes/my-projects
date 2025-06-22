"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().optional(),
  username: z.string().optional(),

  storeName: z.string().optional(),
  storeDescription: z.string().optional(),
  storeLocation: z.string().optional(),
  contactEmail: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  contactPhone: z.string().optional(),
});

export async function updateProfile(formData: FormData) {
  const data = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
    username: formData.get("username")?.toString() || "",
    storeName: formData.get("storeName")?.toString() || "",
    storeDescription: formData.get("storeDescription")?.toString() || "",
    storeLocation: formData.get("storeLocation")?.toString() || "",
    contactEmail: formData.get("contactEmail")?.toString() || "",
    contactPhone: formData.get("contactPhone")?.toString() || "",
  };

  try {
    const validatedData = profileSchema.parse(data);

    const session = await getSession();
    if (!session?.userId) {
      return { success: false, error: "User not authenticated" };
    }

    const updatedUser = await db.user.update({
      where: { email: validatedData.email },
      data: {
        firstName: validatedData.name.split(" ")[0] || "",
        lastName: validatedData.name.split(" ").slice(1).join(" ") || "",
        phoneNumber: validatedData.phoneNumber,
        username: validatedData.username,
      },
      include: {
        sellerProfile: true,
      },
    });

    if (updatedUser.role === "seller" || updatedUser.role === "admin") {
      if (updatedUser.sellerProfile) {
        await db.seller.update({
          where: { userId: updatedUser.id },
          data: {
            storeName: validatedData.storeName,
            storeDescription: validatedData.storeDescription,
            location: validatedData.storeLocation,
            contactEmail: validatedData.contactEmail,
            contactNumber: validatedData.contactPhone,
          },
        });
      } else {
        await db.seller.create({
          data: {
            userId: updatedUser.id,
            storeName: validatedData.storeName || "",
            storeDescription: validatedData.storeDescription,
            location: validatedData.storeLocation,
            contactEmail: validatedData.contactEmail,
            contactNumber: validatedData.contactPhone,
            rating: 0,
            isVerified: false,
          },
        });
      }
    }

    const userWithSeller = await db.user.findUnique({
      where: { id: updatedUser.id },
      include: { sellerProfile: true },
    });

    return { success: true, user: userWithSeller };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return {
      success: false,
      error: "Update profile failed. Please try again.",
    };
  }
}

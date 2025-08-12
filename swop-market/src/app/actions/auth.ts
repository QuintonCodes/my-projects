"use server";

import {
  createSession,
  createUser,
  getUserByEmail,
  verifyPassword,
} from "@/lib/auth";
import { loginSchema, registerSchema } from "@/lib/types/auth";
import { z } from "zod";

export async function registerUser(formData: FormData) {
  const data = {
    firstName: formData.get("firstName")?.toString() || "",
    lastName: formData.get("lastName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phoneNumber: formData.get("phoneNumber")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  try {
    const validatedData = registerSchema.parse(data);

    const existingUser = await getUserByEmail(validatedData.email);

    if (existingUser) {
      return { error: "User with this email already exists." };
    }

    const user = await createUser({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phoneNumber: validatedData.phoneNumber,
      password: validatedData.password,
    });

    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Registration failed. Please try again." };
  }
}

export async function loginUser(formData: FormData) {
  const data = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  try {
    const validatedData = loginSchema.parse(data);

    const user = await getUserByEmail(validatedData.email);
    if (!user) {
      return { error: "Invalid email or password" };
    }

    const isValidPassword = await verifyPassword(
      validatedData.password,
      user.password
    );

    if (!isValidPassword) {
      return { error: "Invalid email or password" };
    }

    await createSession(user.id, user.email);

    return { success: true, user };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Login failed. Please try again." };
  }
}

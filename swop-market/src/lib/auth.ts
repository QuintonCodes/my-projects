import { User } from "@prisma/client";
import { compare, hash } from "bcryptjs";

import { db } from "./prisma";

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return compare(password, hash);
}

export async function getUserByEmail(userEmail: string) {
  return await db.user.findUnique({
    where: { email: userEmail },
  });
}

export async function createUser({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
}: RegisterPayload) {
  return await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      password: await hashPassword(password),
      username: email.split("@")[0],
    },
  });
}

export async function updateUser(userId: string, data: Partial<User>) {
  return await db.user.update({
    where: { id: userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      avatarUrl: data.avatarUrl,
      username: data.username,
      password: data.password ? await hashPassword(data.password) : undefined,
    },
  });
}

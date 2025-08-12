import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    const products = await db.product.findMany({
      where: {
        sellerId: {
          not: session?.userId,
        },
      },
      include: {
        seller: {
          select: {
            id: true,
            storeName: true,
            storeDescription: true,
            isVerified: true,
            rating: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
        },
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

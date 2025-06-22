import { PrismaClient } from "@prisma/client";
import { products } from "../src/lib/products";

const db = new PrismaClient();

async function main() {
  for (const product of products) {
    let seller = await db.seller.findFirst({
      where: { storeName: product.seller || "" },
    });

    // If seller doesn't exist, create seller and user
    if (!seller) {
      const user = await db.user.create({
        data: {
          firstName: product.seller || "",
          lastName: "",
          password: "",
          email: `${product.seller
            ?.toLowerCase()
            .replace(/\s+/g, "")}@example.com`, // Generate a dummy email
        },
      });

      seller = await db.seller.create({
        data: {
          storeName: product.seller || "",
          location: product.location ?? undefined,
          userId: user.id,
        },
      });
    }

    const created = await db.product.create({
      data: {
        name: product.name,
        description: product.description,
        imageUrl: product.images,
        category: product.category,
        condition: product.condition,
        location: product.location,
        deliveryOptions: product.deliveryOptions ?? undefined,
        price: product.price,
        originalPrice: product.originalPrice ?? undefined,
        status: product.status,
        brand: product.brand ?? undefined,
        model: product.model ?? undefined,
        reviews: {
          create:
            product.reviews?.map((review) => ({
              user: review.user,
              rating: review.rating,
              comment: review.comment ?? undefined,
              createdAt: review.date,
              buyer: {
                create: {
                  firstName: review.user,
                  lastName: "",
                  password: "",
                  email: `${review.user
                    ?.toLowerCase()
                    .replace(/\s+/g, "")}@example.com`,
                },
              },
            })) ?? [],
        },
        seller: {
          connect: { id: seller.id },
        },
      },
    });

    console.log(`Created product: ${created.name} with ID: ${created.id}`);
  }
}

main()
  .then(async () => {
    console.log("Seeding completed successfully.");
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error("Error during seeding:", error);
    await db.$disconnect();
    process.exit(1);
  });

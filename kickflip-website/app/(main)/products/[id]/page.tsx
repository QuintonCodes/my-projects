import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductGallery } from "@/components/product-gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      colors: true,
      sizes: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Mock reviews for now
  const reviews = [
    {
      id: "1",
      name: "Alex Rodriguez",
      rating: 5,
      date: "2023-10-15",
      comment:
        "This hoodie is amazing! The quality is top-notch and the design is exactly what I was looking for. Fits perfectly and is super comfortable.",
    },
    {
      id: "2",
      name: "Jamie Wilson",
      rating: 4,
      date: "2023-09-22",
      comment:
        "Great hoodie, very comfortable and warm. The only reason I'm giving 4 stars is because the color is slightly different from what I expected, but still looks good.",
    },
  ];

  // Mock product details
  const details = [
    "Premium cotton blend (80% cotton, 20% polyester)",
    "Relaxed fit",
    "Ribbed cuffs and hem",
    "Adjustable drawstring hood",
    "Large front pocket",
    "Bold graphic print",
    "Machine washable",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-16">
        <div className="container px-4 py-8 md:py-12">
          <nav className="flex items-center mb-8 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
            <span>{product.name}</span>
          </nav>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-16">
            <ProductGallery images={product.images} />

            <div className="space-y-6">
              <div>
                <h1 className="mb-2 text-3xl font-bold font-mochiy">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 4.5
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({reviews.length} reviews)
                  </span>
                </div>
                <p className="mb-4 text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <AddToCartForm
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  images: product.images,
                  colors: product.colors.map((c) => ({
                    name: c.name,
                    value: c.hexCode,
                  })),
                  sizes: product.sizes.map((s) => s.name),
                }}
              />

              <div className="pt-6 border-t">
                <h3 className="mb-2 font-medium">Product Details</h3>
                <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                  {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="justify-start w-full h-auto p-0 border-b rounded-none">
                <TabsTrigger
                  value="details"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-kickflip py-3"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-kickflip py-3"
                >
                  Reviews ({reviews.length})
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-kickflip py-3"
                >
                  Shipping & Returns
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-6">
                <div className="max-w-3xl">
                  <h3 className="mb-4 text-xl font-bold">
                    Product Description
                  </h3>
                  <p className="mb-4">{product.description}</p>
                  <p className="mb-4">
                    The relaxed fit provides freedom of movement, while the
                    ribbed cuffs and hem ensure a secure fit. The adjustable
                    drawstring hood offers protection from the elements, and the
                    large front pocket provides convenient storage for your
                    essentials.
                  </p>
                  <p>
                    The bold graphic print on the back is inspired by street art
                    and skate culture, making a statement wherever you go. This
                    hoodie is machine washable for easy care, ensuring it
                    remains a staple in your wardrobe for years to come.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="max-w-3xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b">
                        <div className="flex items-center mb-2">
                          <div className="flex mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium">{review.name}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="pt-6">
                <div className="max-w-3xl space-y-6">
                  <div>
                    <h3 className="mb-3 text-xl font-bold">
                      Shipping Information
                    </h3>
                    <p className="mb-2 text-muted-foreground">
                      We offer the following shipping options for all orders:
                    </p>
                    <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Standard Shipping (3-5 business days): $5.99</li>
                      <li>Express Shipping (1-2 business days): $12.99</li>
                      <li>Free Standard Shipping on orders over $75</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-bold">Return Policy</h3>
                    <p className="mb-2 text-muted-foreground">
                      We want you to be completely satisfied with your purchase.
                      If you&apos;re not happy with your order, we accept
                      returns within 30 days of delivery.
                    </p>
                    <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                      <li>
                        Items must be unworn, unwashed, and in original
                        condition with all tags attached
                      </li>
                      <li>
                        Return shipping costs are the responsibility of the
                        customer
                      </li>
                      <li>
                        Refunds will be issued to the original payment method
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

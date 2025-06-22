"use client";

import Head from "next/head";
import { notFound } from "next/navigation";
import { use } from "react";

import ProductDetails from "@/components/product-details";
import ProductReviews from "@/components/product-reviews";
import RelatedProducts from "@/components/related-products";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProductList } from "@/hooks/use-product-list";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { products, isLoading, error } = useProductList();
  const { id } = use(params);

  if (!id) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="w-full px-4 py-8 md:px-6">
        <Skeleton className="h-8 w-1/2 mb-6" />
        <Skeleton className="h-80 w-full mb-8" />
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-40 w-full mb-8" />
        <div className="grid grid-cols-2 gap-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-8 md:px-6">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2 text-destructive">
            Failed to load product
          </h3>
          <p className="text-muted-foreground">
            {typeof error === "object" && error !== null && "message" in error
              ? error.message
              : "An unexpected error occurred. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <>
      <Head>
        <title>{product.name} | Swop Market</title>
        <meta name="description" content={product.description} />
      </Head>
      <main className="w-full px-4 py-8 md:px-6">
        <ProductDetails product={product} />

        <Separator className="my-12" />

        <Tabs defaultValue="related" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="related">Related Products</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="related">
            <RelatedProducts productId={id} />
          </TabsContent>
          <TabsContent value="reviews">
            <div className="max-w-3xl mx-auto">
              <ProductReviews productId={id} />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

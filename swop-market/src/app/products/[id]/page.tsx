import { notFound } from "next/navigation";

import ProductDetails from "@/components/product-details";
import ProductReviews from "@/components/product-reviews";
import RelatedProducts from "@/components/related-products";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/products";
import { use } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  if (!id || isNaN(Number(id))) {
    notFound();
  }

  const product = products.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <div className="container px-4 py-8 md:px-6">
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
            <ProductReviews />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

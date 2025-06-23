"use client";

import { format } from "date-fns";
import {
  ArrowLeft,
  Edit,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { use, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProductList } from "@/hooks/use-product-list";
import { formatCurrency, getStatusColor } from "@/lib/utils";

export default function MarketItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { products } = useProductList();

  const { id } = use(params);

  if (!id) {
    notFound();
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <div className="py-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Product Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/market">
            <Button>Back to Market</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Product deleted", {
        description: "Your product has been removed from the marketplace.",
      });
      router.push("/market");
    }, 1500);
  };

  return (
    <div className="container px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Link href="/market">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Product Details</h1>
            <p className="text-muted-foreground">Manage your listing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={(product.imageUrl || [])[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-lg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <Badge
                    className={`absolute top-2 left-2 ${getStatusColor(
                      "active"
                    )} text-white`}
                  >
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <p className="mt-2 text-3xl font-bold text-teal-700">
                      {formatCurrency(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-lg line-through text-muted-foreground">
                        {formatCurrency(product.originalPrice)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/market/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">Description</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <p className="text-muted-foreground">{product.category}</p>
                  </div>
                  <div>
                    <span className="font-medium">Condition:</span>
                    <p className="text-muted-foreground">{product.condition}</p>
                  </div>
                  <div>
                    <span className="font-medium">Location:</span>
                    <p className="text-muted-foreground">{product.location}</p>
                  </div>
                  <div>
                    <span className="font-medium">Listed:</span>
                    <p className="text-muted-foreground">
                      {format(new Date(product.createdAt || ""), "dd MMM yyyy")}
                    </p>
                  </div>
                  {product.brand && (
                    <div>
                      <span className="font-medium">Brand:</span>
                      <p className="text-muted-foreground">{product.brand}</p>
                    </div>
                  )}
                  {product.model && (
                    <div>
                      <span className="font-medium">Model:</span>
                      <p className="text-muted-foreground">{product.model}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                      <Eye className="w-5 h-5 text-muted-foreground" />
                      {product.views}
                    </div>
                    <p className="text-sm text-muted-foreground">Views</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                      <Heart className="w-5 h-5 text-muted-foreground" />
                      {product.likes}
                    </div>
                    <p className="text-sm text-muted-foreground">Favourites</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/products/${product.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Public Page
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Product
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

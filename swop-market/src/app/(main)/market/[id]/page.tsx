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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProductList } from "@/hooks/use-product-list";
import { formatCurrency, getStatusColor } from "@/lib/utils";

export default function MarketItemPage() {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { products } = useProductList();

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="container px-4 md:px-6 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
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
    <div className="container px-4 md:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <Link href="/market">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Product Details</h1>
            <p className="text-muted-foreground">Manage your listing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full rounded-t-lg"
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
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <p className="text-3xl font-bold text-teal-700 mt-2">
                      {formatCurrency(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-lg text-muted-foreground line-through">
                        {formatCurrency(product.originalPrice)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/market/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
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
                      <Trash2 className="h-4 w-4 mr-2" />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
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
                      <Eye className="h-5 w-5 text-muted-foreground" />
                      {product.views}
                    </div>
                    <p className="text-sm text-muted-foreground">Views</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                      <Heart className="h-5 w-5 text-muted-foreground" />
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
                      <Eye className="h-4 w-4 mr-2" />
                      View Public Page
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Product
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
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

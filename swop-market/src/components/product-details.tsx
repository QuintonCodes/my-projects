"use client";

import {
  Heart,
  MapPin,
  MessageSquare,
  Share2,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/context/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    seller: string;
    category: string;
    condition: string;
    location: string;
    createdAt: string;
    originalPrice?: number;
    stock?: number;
    brand?: string;
    model?: string;
  };
}

// Map condition IDs to display labels
const conditionLabels: Record<string, string> = {
  new: "New",
  "used-like-new": "Like New",
  "used-good": "Good",
  "used-fair": "Fair",
  "for-parts": "For Parts",
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      seller: product.seller,
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist", {
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleShare = () => {
    // In a real app, you would implement sharing functionality
    // For now, we'll just show a toast
    toast.success("Share product", {
      description: "Product link copied to clipboard!",
    });
  };

  // Get the display label for the condition
  const conditionDisplay = product.condition
    ? conditionLabels[product.condition] || product.condition
    : undefined;

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative overflow-hidden border rounded-lg aspect-square">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {conditionDisplay && (
            <Badge
              className={`absolute top-2 left-2 ${
                product.condition === "new"
                  ? "bg-green-600"
                  : product.condition === "used-like-new"
                  ? "bg-teal-700"
                  : product.condition === "used-good"
                  ? "bg-amber-500"
                  : product.condition === "used-fair"
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            >
              {conditionDisplay}
            </Badge>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Star className="w-4 h-4 fill-amber-500/50 text-amber-500" />
            </div>
            <span className="text-sm text-muted-foreground">(24 reviews)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold text-teal-700">
            {formatCurrency(product.price)}
          </span>
          {/* If there's a discount, show original price */}
          {product.originalPrice && (
            <span className="text-lg line-through text-muted-foreground">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{product.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-muted-foreground" />
            <span>Shipping available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
              <span className="text-xs font-medium">
                {product.seller?.charAt(0) || "S"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{product.seller}</p>
              <p className="text-xs text-muted-foreground">Member since 2023</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-r-none"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="flex items-center justify-center h-8 px-4 border-y">
                <span className="text-sm font-medium">{quantity}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="w-8 h-8 rounded-l-none"
                onClick={() => setQuantity(quantity + 1)}
                disabled={
                  product.stock !== undefined
                    ? quantity >= product.stock
                    : false
                }
              >
                +
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">
              {product.stock ? `${product.stock} available` : "In stock"}
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              className="flex-1 bg-amber-500 hover:bg-amber-600"
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
              <Heart className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Add to Wishlist</span>
              <span className="sm:hidden">Wishlist</span>
            </Button>
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Seller
            </Button>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-4">
            <div className="space-y-4 text-sm">
              <p>{product.description}</p>
              {/* Additional description paragraphs would go here */}
            </div>
          </TabsContent>
          <TabsContent value="details" className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Condition</div>
                <div>{conditionDisplay}</div>
                <div className="text-muted-foreground">Category</div>
                <div>{product.category}</div>
                <div className="text-muted-foreground">Brand</div>
                <div>{product.brand || "Not specified"}</div>
                <div className="text-muted-foreground">Model</div>
                <div>{product.model || "Not specified"}</div>
                <div className="text-muted-foreground">Listed</div>
                <div>
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString()
                    : "Recently"}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <div className="space-y-4 text-sm">
              <p>
                This item can be shipped nationwide. The seller typically ships
                within 2-3 business days.
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Standard Shipping</div>
                <div>3-5 business days</div>
                <div className="text-muted-foreground">Express Shipping</div>
                <div>1-2 business days (additional fee)</div>
                <div className="text-muted-foreground">Local Pickup</div>
                <div>Available in {product.location}</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

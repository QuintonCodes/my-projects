"use client";

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Package,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/context/cart-provider";
import { useFavouritesStore } from "@/lib/stores/favourites-store";
import { ProductWithSeller } from "@/lib/types/product";
import {
  formatCondition,
  formatCurrency,
  formatDeliveryOption,
  getConditionColor,
} from "@/lib/utils";
import ContactSellerModal from "./contact-seller-modal";

export default function ProductDetails({
  product,
}: {
  product: ProductWithSeller;
}) {
  const { addItem, isInCart } = useCartStore();
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavouritesStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isProductFavourite = isFavourite(product.id);
  const isProductInCart = isInCart(product.id);

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;
  const savingsPercentage = product.originalPrice
    ? Math.round((savings / product.originalPrice) * 100)
    : 0;

  const reviews = product.reviews ?? [];
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;
  const fullStars = Math.floor(avgRating);
  const hasHalfStar =
    avgRating - fullStars >= 0.25 && avgRating - fullStars < 0.75;
  const totalStars = 5;

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: (product.imageUrl || [])[0],
      seller: product.seller?.storeName,
      sellerId: product.seller?.id,
      condition: product.condition,
      location: product.location,
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  }

  function handleAddToFavourites() {
    if (isProductFavourite) {
      removeFromFavourites(product.id);
      toast.info("Removed from favourites", {
        description: `${product.name} has been removed from your favourites.`,
      });
    } else {
      addToFavourites(product.id);
      toast.success("Added to favourites", {
        description: `${product.name} has been added to your favourites.`,
      });
    }
  }

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied", {
        description: "Product link has been copied to your clipboard.",
      });
    }
  }

  function handlePrevImage() {
    const images = product.imageUrl ?? [];
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNextImage() {
    const images = product.imageUrl ?? [];
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

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
              className="relative w-full h-full"
            >
              <Image
                src={
                  (product.imageUrl ?? [])[currentImageIndex] ||
                  "/placeholder.svg"
                }
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {(product.imageUrl ?? []).length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute w-8 h-8 -translate-y-1/2 rounded-full left-2 top-1/2 bg-background/80 hover:bg-background"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute w-8 h-8 -translate-y-1/2 rounded-full right-2 top-1/2 bg-background/80 hover:bg-background"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>

        {(product.imageUrl ?? []).length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {(product.imageUrl ?? []).map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
                  index === currentImageIndex ? "ring-2 ring-teal-700" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                  <Star
                    key={`star-full-${i}`}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
                {hasHalfStar && (
                  <Star
                    key="star-half"
                    className="w-4 h-4 fill-amber-300 text-amber-500"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                )}
                {[
                  ...Array(
                    Math.max(0, totalStars - fullStars - (hasHalfStar ? 1 : 0))
                  ),
                ].map((_, i) => (
                  <Star
                    key={`star-empty-${i}`}
                    className="w-4 h-4 fill-amber-500/50 text-amber-500"
                  />
                ))}
                <span className="ml-1 text-sm font-medium text-foreground">
                  {avgRating.toFixed(1)}/5
                </span>
              </div>
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </span>

              <Badge className={`${getConditionColor(product.condition)}`}>
                {formatCondition(product.condition)}
              </Badge>
              {product.brand && (
                <Badge variant="outline">{product.brand}</Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToFavourites}
            >
              <Heart
                className={`h-4 w-4 ${
                  isProductFavourite ? "fill-current text-red-500" : ""
                }`}
              />
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-teal-700">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg line-through text-muted-foreground">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <div className="flex items-center gap-2">
              <Badge className="text-green-800 bg-green-100">
                Save {formatCurrency(savings)}
              </Badge>
              <span className="text-sm text-green-600">
                ({savingsPercentage}% off)
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h3 className="mb-2 font-semibold">Description</h3>
          <p className="leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Location:</span>
              <span className="text-muted-foreground">{product.location}</span>
            </div>
            {product.brand && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Brand:</span>
                <span className="text-muted-foreground">{product.brand}</span>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Seller:</span>
              <span className="text-muted-foreground">
                {product.seller?.storeName}
              </span>
            </div>
            {product.model && (
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Model:</span>
                <span className="text-muted-foreground">{product.model}</span>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Options */}
        {product.deliveryOptions && product.deliveryOptions.length > 0 && (
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Delivery Options:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.deliveryOptions.map((option) => (
                <Badge key={option} variant="outline">
                  {formatDeliveryOption(option)}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        <div className="flex items-center gap-3">
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-600"
            size="lg"
            onClick={handleAddToCart}
          >
            {isProductInCart ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                <span>In Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span>Add to Cart</span>
              </>
            )}
          </Button>

          <ContactSellerModal product={product}>
            <Button variant="outline" size="lg" className="flex-1">
              Contact Seller
            </Button>
          </ContactSellerModal>
        </div>
      </motion.div>
    </div>
  );
}

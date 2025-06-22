"use client";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Package,
  Shield,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/context/auth-provider";
import { categories, conditionOptions } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

type ImageType = {
  id: string;
  url: string;
  file?: File;
};

export default function ProductPreview() {
  const { watch } = useFormContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuthStore();

  // Get form values
  const name = watch("name");
  const description = watch("description");
  const price = watch("price");
  const originalPrice = watch("originalPrice");
  const category =
    (Array.isArray(categories)
      ? conditionOptions.find((opt) => opt.value === watch("category"))?.label
      : undefined) || watch("category");
  const condition =
    (Array.isArray(conditionOptions)
      ? conditionOptions.find((opt) => opt.value === watch("condition"))?.label
      : undefined) || watch("condition");
  const images: ImageType[] = watch("images") || [];
  const location = watch("location");
  const deliveryOptions = watch("deliveryOptions") || [];

  const getDeliveryLabel = (id: string) =>
    deliveryOptions.find((opt: typeof deliveryOptions) => opt.id === id)
      ?.label || id;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Product Preview</h2>
        <p className="text-sm text-muted-foreground">
          This is how your listing will appear to buyers.
        </p>
      </div>

      <div className="overflow-hidden bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b bg-gradient-to-r from-teal-50 to-blue-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-teal-800">
              Live Preview
            </h3>
            <Badge variant="secondary" className="text-xs">
              Draft
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden border-2 border-gray-100 rounded-lg aspect-square">
                {images.length > 0 ? (
                  <>
                    <Image
                      src={images[currentImageIndex].url || "/placeholder.svg"}
                      alt={name || "Product image"}
                      fill
                      className="object-cover"
                    />

                    {images.length > 1 && (
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

                        <div className="absolute flex gap-1 -translate-x-1/2 bottom-2 left-1/2">
                          {images.map((_, index) => (
                            <div
                              key={index}
                              className={`h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? "w-6 bg-white"
                                  : "w-2 bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    {hasDiscount && (
                      <div className="absolute top-3 left-3">
                        <Badge className="font-semibold text-white bg-red-500">
                          -{discountPercentage}%
                        </Badge>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-50">
                    <div className="text-center">
                      <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm text-gray-400">No images added</p>
                    </div>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((image, index) => (
                    <div
                      key={image.id}
                      className={`relative aspect-square rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                        index === currentImageIndex
                          ? "ring-2 ring-teal-200 border-teal-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <Image
                        src={image.url || "/placeholder.svg"}
                        alt={`Product thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl font-bold">{name || "Product Name"}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-teal-700">
                      {formatCurrency(price || 0)}
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatCurrency(originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {condition && (
                    <Badge
                      className={
                        condition === "new"
                          ? "bg-green-600"
                          : condition === "used_new"
                          ? "bg-teal-700"
                          : condition === "used_good"
                          ? "bg-amber-500"
                          : condition === "used_fair"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }
                    >
                      {condition}
                    </Badge>
                  )}

                  {category && <Badge variant="outline">{category}</Badge>}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">Description</h3>
                <div className="prose-sm prose max-w-none">
                  <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                    {description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{location || "Location not specified"}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Shipping Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {deliveryOptions.length > 0 ? (
                      deliveryOptions.map((option: string) => (
                        <div
                          key={option}
                          className="flex items-center gap-3 p-2 text-xs rounded-full bg-muted"
                        >
                          <Package className="w-3 h-3" />
                          <span>{getDeliveryLabel(option)}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No shipping options specified
                      </span>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Seller Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Seller Information
                  </h3>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={user?.avatarUrl || "/placeholder.svg"}
                        alt={user?.sellerProfile?.storeName}
                      />
                      <AvatarFallback className="text-teal-700 bg-teal-100">
                        {user?.sellerProfile?.storeName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user?.sellerProfile?.storeName || "Seller"}
                        </p>
                        {user?.sellerProfile?.storeName && (
                          <p className="text-sm text-gray-600">
                            {user.firstName}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span>4.8 (127 reviews)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-green-500" />
                          <span>Verified Seller</span>
                        </div>
                      </div>

                      {user?.sellerProfile?.storeDescription && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {user.sellerProfile.storeDescription}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

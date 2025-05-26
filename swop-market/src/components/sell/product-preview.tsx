"use client";

import { ChevronLeft, ChevronRight, MapPin, Package, User } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

// Map condition IDs to display labels
const conditionLabels: Record<string, string> = {
  new: "New",
  "used-like-new": "Like New",
  "used-good": "Good",
  "used-fair": "Fair",
  "for-parts": "For Parts",
};

// Map shipping option IDs to display labels
const shippingLabels: Record<string, string> = {
  pickup: "Local Pickup",
  courier: "Courier Delivery",
  post: "Postal Service",
  meet: "Meet in Person",
};

// Map category IDs to display labels
const categoryLabels: Record<string, string> = {
  electronics: "Electronics",
  furniture: "Furniture",
  clothing: "Clothing",
  vehicles: "Vehicles",
  property: "Property",
  services: "Services",
  "home-garden": "Home & Garden",
  sports: "Sports & Leisure",
  "toys-games": "Toys & Games",
  "books-music-movies": "Books, Music & Movies",
};

type ImageType = {
  id: string;
  url: string;
  file?: File;
};

export default function ProductPreview() {
  const { watch } = useFormContext();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get form values
  const name = watch("name");
  const description = watch("description");
  const price = watch("price");
  const category = watch("category");
  const condition = watch("condition");
  const images: ImageType[] = watch("images") || [];
  const location = watch("location");
  const shippingOptions = watch("shippingOptions") || [];
  const sellerName = watch("sellerName");

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Product Preview</h2>
        <p className="text-sm text-muted-foreground">
          This is how your listing will appear to buyers.
        </p>
      </div>

      <div className="overflow-hidden border rounded-lg">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="text-lg font-semibold">Preview Mode</h3>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative overflow-hidden border rounded-md aspect-square">
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
                              className={`h-1.5 rounded-full ${
                                index === currentImageIndex
                                  ? "w-4 bg-white"
                                  : "w-1.5 bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted">
                    <p className="text-muted-foreground">No images added</p>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.slice(0, 5).map((image, index) => (
                    <div
                      key={image.id}
                      className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
                        index === currentImageIndex
                          ? "ring-2 ring-teal-700"
                          : ""
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
              <div>
                <h1 className="text-2xl font-bold">{name || "Product Name"}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-bold text-teal-700">
                    {formatCurrency(price || 0)}
                  </span>

                  {condition && (
                    <Badge
                      className={
                        condition === "new"
                          ? "bg-green-600"
                          : condition === "used-like-new"
                          ? "bg-teal-700"
                          : condition === "used-good"
                          ? "bg-amber-500"
                          : condition === "used-fair"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }
                    >
                      {conditionLabels[condition] || condition}
                    </Badge>
                  )}

                  {category && (
                    <Badge variant="outline">
                      {categoryLabels[category] || category}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-sm whitespace-pre-line">
                  {description || "No description provided."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{location || "Location not specified"}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">Shipping Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {shippingOptions.length > 0 ? (
                      shippingOptions.map((option: string) => (
                        <div
                          key={option}
                          className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-muted"
                        >
                          <Package className="w-3 h-3" />
                          <span>{shippingLabels[option] || option}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No shipping options specified
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {sellerName || "Seller"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Member since May 2024
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Button
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  disabled
                >
                  Contact Seller
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

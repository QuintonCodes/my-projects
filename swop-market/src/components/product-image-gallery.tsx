"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  condition?: string;
}

// Map condition IDs to display labels
const conditionLabels: Record<string, string> = {
  new: "New",
  "used-like-new": "Like New",
  "used-good": "Good",
  "used-fair": "Fair",
  "for-parts": "For Parts",
};

export function ProductImageGallery({
  images,
  productName,
  condition,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Get the display label for the condition
  const conditionDisplay = condition
    ? conditionLabels[condition] || condition
    : undefined;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full"
          >
            <Image
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
          onClick={handlePrevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/80 hover:bg-background"
          onClick={handleNextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {conditionDisplay && (
          <Badge
            className={`absolute top-2 left-2 ${
              condition === "new"
                ? "bg-green-600"
                : condition === "used-like-new"
                ? "bg-teal-700"
                : condition === "used-good"
                ? "bg-amber-500"
                : condition === "used-fair"
                ? "bg-orange-500"
                : "bg-red-500"
            }`}
          >
            {conditionDisplay}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer ${
              index === currentImageIndex ? "ring-2 ring-teal-700" : ""
            }`}
            onClick={() => setCurrentImageIndex(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

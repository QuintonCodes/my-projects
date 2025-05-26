"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/context/cart-provider";
import { formatCurrency, highlightText, truncateText } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    seller?: string;
    condition?: string;
    location?: string;
  };
  searchTerm?: string;
}

// Map condition IDs to display labels
const conditionLabels: Record<string, string> = {
  new: "New",
  "used-like-new": "Like New",
  "used-good": "Good",
  "used-fair": "Fair",
  "for-parts": "For Parts",
};

export function ProductCard({ product, searchTerm }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  // Get the display label for the condition
  const conditionDisplay = product.condition
    ? conditionLabels[product.condition] || product.condition
    : undefined;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      seller: product.seller,
    });

    toast.success("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  function renderText(text: string, limit?: number) {
    const display = limit ? truncateText(text, limit) : text;
    if (searchTerm) {
      return (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightText(display, searchTerm),
          }}
        />
      );
    }
    return display;
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden border rounded-lg group bg-background"
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
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

        <div className="p-4">
          <h3 className="font-semibold">{renderText(product.name)}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {renderText(product.description, 60)}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold">
              {formatCurrency(product.price)}
            </span>

            {product.location && (
              <span className="text-xs text-muted-foreground">
                {product.location}
              </span>
            )}
          </div>

          {product.seller && (
            <p className="mt-1 text-xs text-muted-foreground">
              Seller: {product.seller}
            </p>
          )}
        </div>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent"
      >
        <Button
          className="w-full bg-amber-500 hover:bg-amber-600"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </motion.div>
    </motion.div>
  );
}

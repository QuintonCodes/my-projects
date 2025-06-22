"use client";

import { format } from "date-fns";
import {
  Check,
  Edit,
  Eye,
  Heart,
  MoreHorizontal,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/context/cart-provider";
import { useFavouritesStore } from "@/lib/stores/favourites-store";
import { ProductWithSeller } from "@/lib/types/product";
import {
  formatCondition,
  formatCurrency,
  formatStatus,
  getConditionColor,
  getStatusColor,
  highlightText,
  truncateText,
} from "@/lib/utils";

type ProductCardProps = {
  product?: ProductWithSeller;
  searchTerm?: string;
  isMarketProduct?: boolean;
};

export function ProductCard({
  product,
  searchTerm,
  isMarketProduct = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, isInCart } = useCartStore();
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavouritesStore();

  const isProductFavourite = isFavourite(product?.id || "");
  const isProductInCart = isInCart(product?.id || "");
  const conditionDisplay = formatCondition(product?.condition || "");
  const statusDisplay = formatStatus(product?.status || "");

  function handleAddToCart() {
    addItem({
      id: product?.id || "",
      name: product?.name || "",
      price: Number(product?.price),
      imageUrl: (product?.imageUrl || [])[0],
      seller: product?.seller?.storeName,
      location: product?.location,
      condition: product?.condition,
    });

    toast.success("Added to cart", {
      description: `${product?.name} has been added to your cart.`,
    });
  }

  function handleToggleFavourite() {
    if (isProductFavourite) {
      removeFromFavourites(product?.id || "");
      toast.info("Removed from favourites", {
        description: `${product?.name} has been removed from your favourites.`,
      });
    } else {
      addToFavourites(product?.id || "");
      toast.success("Added to favourites", {
        description: `${product?.name} has been added to your favourites.`,
      });
    }
  }

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
      className="relative overflow-hidden transition-shadow border rounded-lg shadow-sm group bg-background hover:shadow-md"
    >
      <Link href={`/products/${product?.id}`} className="block">
        <div className="relative overflow-hidden aspect-square">
          <Image
            src={(product?.imageUrl || [])[0] || "/placeholder.svg"}
            alt={product?.name || ""}
            fill
            priority
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
          {isMarketProduct ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute w-8 h-8 top-2 right-2 bg-background/60 hover:bg-background"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View Product
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 hover:bg-background ${
                isProductFavourite
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggleFavourite();
              }}
            >
              <Heart
                className={`h-4 w-4 ${
                  isProductFavourite ? "fill-current" : ""
                }`}
              />
            </Button>
          )}

          <Badge
            className={`absolute top-2 left-2 text-white ${
              isMarketProduct
                ? getStatusColor(product?.status || "draft")
                : getConditionColor(product?.condition || "new")
            }`}
          >
            {isMarketProduct ? statusDisplay : conditionDisplay}
          </Badge>

          {isProductInCart && (
            <Badge className="absolute bg-green-600 bottom-2 right-2">
              <Check className="w-3 h-3 mr-1" />
              In Cart
            </Badge>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold">{renderText(product?.name || "")}</h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {renderText(product?.description || "", 60)}
          </p>

          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-teal-700">
              {formatCurrency(Number(product?.price))}
            </span>

            {isMarketProduct ? (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {product?.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="text-red-600 size-3 fill-red-600" />{" "}
                  {product?.likes}
                </span>
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">
                {product?.location}
              </span>
            )}
          </div>

          {isMarketProduct ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Listed on{" "}
              {format(new Date(product?.createdAt || ""), "dd MMM yyyy")}
            </p>
          ) : (
            <p className="mt-1 text-xs text-muted-foreground">
              Seller: {product?.seller?.storeName}
            </p>
          )}
        </div>
      </Link>

      {!isMarketProduct && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent"
        >
          <Button
            className={`w-full ${
              isProductInCart
                ? "bg-green-600 hover:bg-green-700"
                : "bg-amber-500 hover:bg-amber-600"
            }`}
            onClick={handleAddToCart}
            disabled={isProductInCart}
          >
            {isProductInCart ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

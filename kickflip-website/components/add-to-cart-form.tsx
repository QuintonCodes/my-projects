"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-provider";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface AddToCartFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    colors: { name: string; value: string }[];
    sizes: string[];
  };
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const { addItem, setIsOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to 'L'
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      color: selectedColor.value,
      colorName: selectedColor.name,
    });

    toast.success("Added to cart", {
      description: `${quantity} × ${product.name} (${selectedSize}, ${selectedColor.name}) added to your cart`,
    });

    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-medium">Color</h3>
        <div className="flex space-x-3">
          {product.colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color)}
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                selectedColor.value === color.value
                  ? "ring-2 ring-kickflip ring-offset-2"
                  : "ring-1 ring-border"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {selectedColor.value === color.value && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={
                    color.name.toLowerCase() === "white"
                      ? "text-black"
                      : "text-white"
                  }
                >
                  ✓
                </motion.span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Selected: {selectedColor.name}
        </p>
      </div>

      <div>
        <h3 className="mb-3 font-medium">Size</h3>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-10 min-w-[40px] rounded-md px-3 text-sm font-medium ${
                selectedSize === size
                  ? "bg-kickflip text-white"
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-medium">Quantity</h3>
        <div className="flex items-center w-32 h-10 border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-full rounded-none rounded-l-md"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="w-3 h-3" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          <div className="flex-1 text-center">{quantity}</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-full rounded-none rounded-r-md"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-3 h-3" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full bg-kickflip hover:bg-kickflip/90"
        onClick={handleAddToCart}
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}

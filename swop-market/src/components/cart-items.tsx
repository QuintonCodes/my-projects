"use client";

import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/context/cart-provider";
import { formatCurrency } from "@/lib/utils";

export default function CartItems() {
  const { items, removeItem, updateQuantity } = useCartStore();

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 pb-6 border-b sm:flex-row"
          >
            <div className="relative w-24 h-24 overflow-hidden rounded-md sm:h-32 sm:w-32">
              <Image
                src={item.image || "/placeholder.svg?height=128&width=128"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Seller: {item.seller || "Unknown"}
                  </p>
                </div>
                <div className="font-semibold">
                  {formatCurrency(item.price)}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                  >
                    <span>-</span>
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        item.id,
                        Number.parseInt(e.target.value) || 1
                      )
                    }
                    className="h-8 text-center w-14"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <span>+</span>
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>

              <div className="mt-2 text-sm text-right">
                <span className="font-medium">
                  Total: {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

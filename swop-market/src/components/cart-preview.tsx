"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/context/cart-provider";
import { formatCurrency } from "@/lib/utils";

export default function CartPreview({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-full px-3 py-2">
      {items.length > 0 ? (
        <>
          <ScrollArea className="flex-1 py-4">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4"
                >
                  <div className="relative w-16 h-16 overflow-hidden rounded-md">
                    <Image
                      src={item.image || "/placeholder.svg?height=64&width=64"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-4 h-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <span>-</span>
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <span>+</span>
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="py-4 space-y-4">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">
                  Calculated at checkout
                </span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center w-full gap-4">
              <Link href="/cart" onClick={onClose}>
                <Button className="w-full bg-teal-700 hover:bg-teal-800">
                  View Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full bg-amber-500 hover:bg-amber-600">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some products to your cart to see them here.
            </p>
          </div>
          <Link href="/products" onClick={onClose}>
            <Button className="bg-teal-700 hover:bg-teal-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

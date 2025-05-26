"use client";

import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/context/cart-provider";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  editable?: boolean;
  condensed?: boolean;
}

export default function OrderSummary({
  editable = false,
  condensed = false,
}: OrderSummaryProps) {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate order totals
  useEffect(() => {
    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Calculate shipping (free for orders over R1000, otherwise R150)
    const calculatedShipping = calculatedSubtotal > 1000 ? 0 : 150;

    // Calculate tax (15% VAT)
    const calculatedTax = calculatedSubtotal * 0.15;

    // Calculate total
    const calculatedTotal =
      calculatedSubtotal + calculatedShipping + calculatedTax;

    setSubtotal(calculatedSubtotal);
    setShipping(calculatedShipping);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [items]);

  // Handle quantity change
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  if (items.length === 0) {
    return (
      <div className="py-6 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Items List */}
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-4 ${!condensed ? "pb-4 border-b" : ""}`}
          >
            {/* Product Image */}
            <div
              className={`relative ${
                condensed ? "h-12 w-12" : "h-20 w-20"
              } overflow-hidden rounded-md flex-shrink-0`}
            >
              <Image
                src={item.image || "/placeholder.svg?height=80&width=80"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <div>
                  <h3
                    className={`font-medium ${
                      condensed ? "text-sm" : ""
                    } truncate`}
                  >
                    {item.name}
                  </h3>
                  {!condensed && (
                    <p className="text-sm text-muted-foreground">
                      Seller: {item.seller || "Unknown"}
                    </p>
                  )}
                </div>
                <div className={`font-semibold ${condensed ? "text-sm" : ""}`}>
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>

              <div
                className={`flex justify-between items-center ${
                  condensed ? "mt-1" : "mt-2"
                }`}
              >
                {editable ? (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <span>-</span>
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          Number.parseInt(e.target.value) || 1
                        )
                      }
                      className="w-12 text-center h-7"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <span>+</span>
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm">
                    Qty: {item.quantity} × {formatCurrency(item.price)}
                  </div>
                )}

                {editable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2 text-red-500 h-7 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Order Totals */}
      <div className={`space-y-2 ${condensed ? "text-sm" : ""}`}>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (15% VAT)</span>
          <span>{formatCurrency(tax)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>

        {shipping === 0 && (
          <div className="mt-1 text-xs text-green-600">
            Free shipping on orders over R1,000
          </div>
        )}
      </div>
    </div>
  );
}

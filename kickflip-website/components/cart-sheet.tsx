"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartSheet() {
  const router = useRouter();
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    isOpen,
    setIsOpen,
    clearCart,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setIsOpen(false);
    router.push("/checkout");
    setIsCheckingOut(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center text-xl font-mochiy">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <ShoppingBag className="w-12 h-12 mb-4 text-muted-foreground" />
            <p className="mb-1 text-lg font-medium">Your cart is empty</p>
            <p className="mb-6 text-sm text-muted-foreground">
              Add some awesome gear to your cart!
            </p>
            <Button
              onClick={() => {
                setIsOpen(false);
                router.push("/products");
              }}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 py-6 overflow-y-auto">
              <ul className="divide-y">
                {items.map((item) => (
                  <motion.li
                    key={`${item.id}-${item.size}-${item.color}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="py-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="text-sm font-medium">{item.name}</h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>Size: {item.size}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            Color: {item.colorName}
                            <span
                              className="w-3 h-3 ml-1 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 rounded-none rounded-l-md"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.color,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="flex items-center justify-center w-8 h-8 text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 rounded-none rounded-r-md"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.color,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="w-3 h-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <span className="text-sm font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          removeItem(item.id, item.size, item.color)
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            <SheetFooter className="pt-4 border-t">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Continue Shopping
                  </Button>
                  <Button onClick={handleCheckout} disabled={isCheckingOut}>
                    Checkout
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

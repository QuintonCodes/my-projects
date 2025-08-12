"use client";

import { ShoppingCart, X } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserWithSeller } from "@/context/auth-provider";
import { CartItem } from "@/lib/types/cart";
import { formatCurrency } from "@/lib/utils";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type CartButtonProps = {
  user: UserWithSeller | null;
  items: CartItem[];
  removeItem: (id: string) => void;
  getCartTotal: () => number;
};

export default function CartButton({
  user,
  items,
  removeItem,
  getCartTotal,
}: CartButtonProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subtotal = getCartTotal();
  const onClose = () => setIsCartOpen(false);

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="w-5 h-5" />
          {items?.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-1 -right-1 bg-amber-500"
            >
              {items.length}
            </motion.span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="pb-0">
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
        </SheetHeader>

        <Separator />

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
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between">
                          <div className="">
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
                  {user ? (
                    <>
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
                    </>
                  ) : (
                    <div className="w-full space-y-2">
                      <div className="text-xs text-center text-muted-foreground px-2">
                        Only logged in users can view or checkout their cart.
                      </div>
                      <Link href="/login" onClick={onClose}>
                        <Button className="w-full bg-teal-700 hover:bg-teal-800">
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
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
      </SheetContent>
    </Sheet>
  );
}

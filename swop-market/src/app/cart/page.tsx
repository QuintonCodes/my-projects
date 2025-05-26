"use client";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect } from "react";

import CartItems from "@/components/cart-items";
import CartSummary from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/context/cart-provider";

export default function CartPage() {
  const { items, fetchCartItems } = useCartStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div className="container px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="flex items-center gap-2 mb-8 text-3xl font-bold tracking-tight">
          <ShoppingCart className="w-8 h-8" />
          Your Shopping Cart
        </h1>

        {items.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <CartItems />
            </div>
            <CartSummary />
          </div>
        ) : (
          <div className="py-16 text-center">
            <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mb-8 text-muted-foreground">
              Looks like you haven&apos;t added any products to your cart yet.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-teal-700 hover:bg-teal-800">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

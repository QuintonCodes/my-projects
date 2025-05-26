"use client";

import { Menu, ShoppingCart, User } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartStore } from "@/context/cart-provider";
import CartPreview from "./cart-preview";
import { Separator } from "./ui/separator";

export default function Header() {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/sell", label: "Sell" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-teal-700">SwopMarket</span>
          </Link>

          <nav className="items-center hidden gap-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`text-sm font-medium transition-colors hover:text-teal-700 ${
                  pathname === route.href
                    ? "text-teal-700"
                    : "text-muted-foreground"
                }`}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/account">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>

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

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader className="pb-0">
                <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
              </SheetHeader>
              <Separator />
              <CartPreview onClose={() => setIsCartOpen(false)} />
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="grid gap-6 text-lg font-medium">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`hover:text-teal-700 ${
                      pathname === route.href
                        ? "text-teal-700"
                        : "text-muted-foreground"
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

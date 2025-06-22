"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/context/auth-provider";
import { useCartStore } from "@/context/cart-provider";
import { categories, routes } from "@/lib/data";
import { useNotificationsStore } from "@/lib/stores/notification-store";
import CartButton from "./cart-button";
import MobileMenu from "./mobile-menu";
import NotificationButton from "./notification-button";
import SearchBar from "./search-bar";
import UserMenu from "./user-menu";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout, isLoading } = useAuthStore();
  const { notifications, markAsRead, markAllAsRead } = useNotificationsStore();
  const { items, removeItem, getCartTotal } = useCartStore();

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-teal-700">SwopMarket</span>
          </Link>

          <nav className="items-center hidden gap-6 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium transition-colors hover:text-teal-700 ${
                    pathname.startsWith("/products")
                      ? "text-teal-700"
                      : "text-muted-foreground"
                  }`}
                >
                  Products
                  <ChevronDown className="ml-1 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Browse Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/products")}>
                  All Products
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className="flex justify-between"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.count}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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

        <SearchBar className="hidden max-w-md mx-8 md:flex" />

        <div className="flex items-center gap-2">
          <NotificationButton
            notifications={notifications}
            markAllAsRead={markAllAsRead}
            markAsRead={markAsRead}
          />

          <CartButton
            items={items}
            removeItem={removeItem}
            getCartTotal={getCartTotal}
          />

          {isLoading ? null : isAuthenticated ? (
            <div className="hidden md:block">
              <UserMenu user={user} logout={logout} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="bg-teal-700 hover:bg-teal-800"
                asChild
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          <div className="block md:hidden">
            <MobileMenu
              user={user}
              isLoading={isLoading}
              cartItems={items}
              notifications={notifications}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

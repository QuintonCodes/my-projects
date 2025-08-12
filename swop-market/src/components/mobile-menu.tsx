"use client";

import {
  Bell,
  ChevronDown,
  ChevronRight,
  Heart,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Store,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserWithSeller } from "@/context/auth-provider";
import { categories } from "@/lib/data";
import { Notification } from "@/lib/stores/notification-store";
import { CartItem } from "@/lib/types/cart";
import { useEffect, useState } from "react";
import SearchBar from "./search-bar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type MobileMenuProps = {
  user: UserWithSeller | null;
  isLoading: boolean;
  notifications: Notification[];
  cartItems: CartItem[];
};

export default function MobileMenu({
  user,
  isLoading,
  notifications,
  cartItems,
}: MobileMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname, setIsMobileMenuOpen]);

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
    setIsMobileMenuOpen(false);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative transition-colors hover:bg-accent/50"
          aria-label="Open Menu"
        >
          <motion.div
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={{
              closed: { rotate: 0 },
              open: { rotate: 180 },
            }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.div>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetTitle className="sr-only">Main menu</SheetTitle>
        <motion.div
          variants={{
            closed: {
              opacity: 0,
              y: -20,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            },
            open: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.05,
              },
            },
          }}
          initial="closed"
          animate="open"
          exit="closed"
          className="flex flex-col h-full"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between p-4 border-b bg-muted/30"
          >
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-xl font-bold text-teal-700">
                SwopMarket
              </span>
            </Link>
          </motion.div>

          {user && (
            <motion.div
              variants={itemVariants}
              className="p-4 border-b bg-muted/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-12 h-12 border-2 border-teal-100">
                  <AvatarImage
                    src={user.avatarUrl || "/placeholder.svg"}
                    alt={user.firstName}
                  />
                  <AvatarFallback className="font-semibold text-teal-700 bg-teal-50">
                    {user.firstName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs truncate text-muted-foreground">
                    {user.email}
                  </p>
                  <Badge
                    variant="secondary"
                    className="mt-1 text-xs capitalize"
                  >
                    {user.role}
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  <span>{cartItems.length} items</span>
                </div>
                {unreadNotifications > 0 && (
                  <div className="flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    <span>{unreadNotifications} new</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div variants={itemVariants} className="p-4 border-b">
            <div className="relative">
              <SearchBar className="w-full h-12 text-base" />
            </div>
          </motion.div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <motion.nav variants={itemVariants} className="p-2">
              {/* Main Navigation */}
              <div className="mb-4 space-y-1">
                <motion.div variants={itemVariants}>
                  <Link
                    href="/"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
                      pathname === "/"
                        ? "bg-teal-50 text-teal-700 border border-teal-200"
                        : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Home className="w-5 h-5" />
                    <span>Home</span>
                  </Link>
                </motion.div>

                {user && user.sellerProfile ? (
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/sell"
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
                        pathname === "/sell"
                          ? "bg-teal-50 text-teal-700 border border-teal-200"
                          : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package className="w-5 h-5" />
                      <span>Sell Item</span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div variants={itemVariants}>
                    <Link
                      href="/become-seller"
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-accent ${
                        pathname === "/become-seller"
                          ? "bg-teal-50 text-teal-700 border border-teal-200"
                          : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package className="w-5 h-5" />
                      <span>Become A Seller</span>
                    </Link>
                  </motion.div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Products & Categories */}
              <motion.div variants={itemVariants} className="mb-4">
                <button
                  onClick={() => toggleSection("products")}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-accent"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Products</span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: expandedSection === "products" ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedSection === "products" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 pl-4 space-y-1">
                        <Link
                          href="/products"
                          className="flex items-center justify-between px-4 py-2 text-sm transition-colors rounded-lg hover:bg-accent"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>All Products</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>

                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className="flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors rounded-lg hover:bg-accent"
                          >
                            <div className="flex items-center gap-2">
                              <category.icon className="size-4" />
                              <span>{category.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {category.count}
                              </Badge>
                              <ChevronRight className="w-3 h-3" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* User Menu Items */}
              {isLoading
                ? null
                : user && (
                    <>
                      <Separator className="my-4" />

                      <div className="space-y-1">
                        <motion.div variants={itemVariants}>
                          <Link
                            href="/account"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-accent"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Settings className="w-5 h-5" />
                            <span>Account Settings</span>
                          </Link>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <Link
                            href="/favourites"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-accent"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Heart className="w-5 h-5" />
                            <span>Favourites</span>
                          </Link>
                        </motion.div>

                        {user.role === "user" && (
                          <motion.div variants={itemVariants}>
                            <Link
                              href="/become-seller"
                              className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-accent"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Store className="w-5 h-5" />
                              <span>Become a Seller</span>
                            </Link>
                          </motion.div>
                        )}
                        {(user.role === "seller" || user.role === "admin") && (
                          <motion.div variants={itemVariants}>
                            <Link
                              href="/market"
                              className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-accent"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Store className="w-5 h-5" />
                              <span>My Market</span>
                            </Link>
                          </motion.div>
                        )}

                        {user.role === "admin" && (
                          <motion.div variants={itemVariants}>
                            <Link
                              href="/admin"
                              className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg hover:bg-accent"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <Settings className="w-5 h-5" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    </>
                  )}

              {/* Auth Section for Non-Users */}
              {isLoading
                ? null
                : !user && (
                    <>
                      <Separator className="my-4" />

                      <div className="px-2 space-y-2">
                        <motion.div variants={itemVariants}>
                          <Link
                            href="/login"
                            className="block w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button
                              variant="outline"
                              className="w-full h-12 text-base"
                            >
                              <User className="w-5 h-5 mr-2" />
                              Log In
                            </Button>
                          </Link>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                          <Link
                            href="/register"
                            className="block w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Button className="w-full h-12 text-base bg-teal-700 hover:bg-teal-800">
                              Get Started
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </>
                  )}
            </motion.nav>
          </div>

          {/* Footer */}
          {isLoading
            ? null
            : user && (
                <motion.div
                  variants={itemVariants}
                  className="p-4 border-t bg-muted/20"
                >
                  <Button
                    variant="ghost"
                    className="justify-start w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      // Handle logout
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="text-base">Sign Out</span>
                  </Button>
                </motion.div>
              )}
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}

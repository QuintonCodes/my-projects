"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Eye,
  MessageSquare,
  Package,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/context/auth-provider";
import { useProductList } from "@/hooks/use-product-list";
import { ProductWithSeller } from "@/lib/types/product";
import { formatCurrency } from "@/lib/utils";

const searchSchema = z.object({
  search: z.string().min(1, "Please enter a search term"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function MarketPage() {
  const { user } = useAuthStore();
  const { products: allProducts, isLoading, error } = useProductList();

  const currentUserId = user?.id;

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: "" },
  });

  const searchQuery = form.watch("search") || "";

  const myProducts = allProducts.filter(
    (product) => product.seller?.user.id === currentUserId
  );

  const filteredProducts = myProducts.filter((product) => {
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    totalProducts: myProducts.length,
    activeProducts: myProducts.filter((p) => p.status === "active").length,
    soldProducts: myProducts.filter((p) => p.status === "sold").length,
    totalViews: myProducts.reduce((sum, p) => sum + (p.views || 0), 0),
    totalEarnings: myProducts
      .filter((p) => p.status === "sold")
      .reduce((sum, p) => sum + p.price, 0),
  };

  function onSubmit(values: SearchFormValues) {
    console.log(values);
    form.reset();
  }

  if (isLoading) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
            <div>
              <Skeleton className="w-48 h-8 mb-2" />
              <Skeleton className="w-64 h-4" />
            </div>
            <Skeleton className="w-40 h-10" />
          </div>
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-24 rounded-lg" />
            ))}
          </div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="w-32 h-6 mb-2" />
                  <Skeleton className="w-48 h-4" />
                </div>
                <Skeleton className="h-10 w-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-6 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-full h-20 rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-8 md:px-6">
        <div className="py-12 text-center">
          <h3 className="mb-2 text-lg font-semibold text-destructive">
            Failed to load your products
          </h3>
          <p className="text-muted-foreground">
            {typeof error === "object" && error !== null && "message" in error
              ? error.message
              : "An unexpected error occurred. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Market Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your store and listings
            </p>
          </div>
          <Link href="/sell">
            <Button className="bg-teal-700 hover:bg-teal-800">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Listings
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeProducts} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Listings
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProducts}</div>
              <p className="text-xs text-muted-foreground">
                Currently for sale
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalViews} all-time views
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(stats.totalEarnings)}
              </div>
              <p className="text-xs text-muted-foreground">All-time profit</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Listings</CardTitle>
                <CardDescription>
                  Manage your products and track performance
                </CardDescription>
              </div>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="relative"
                  >
                    <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                    <FormField
                      control={form.control}
                      name="search"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Search for anything..."
                              className="pl-10 pr-4"
                              id="search-input"
                              autoComplete={undefined}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">
                  Active ({stats.activeProducts})
                </TabsTrigger>
                <TabsTrigger value="sold">
                  Sold ({stats.soldProducts})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({stats.totalProducts})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="mt-6">
                <div className="space-y-4">
                  {filteredProducts.filter(
                    (product) => product.status === "active"
                  ).length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No active products found.
                    </div>
                  ) : (
                    filteredProducts
                      .filter((product) => product.status === "active")
                      .map((product) => (
                        <ProductItem product={product} key={product.id} />
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sold" className="mt-6">
                <div className="space-y-4">
                  {filteredProducts.filter(
                    (product) => product.status === "sold"
                  ).length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No sold products found.
                    </div>
                  ) : (
                    filteredProducts
                      .filter((product) => product.status === "sold")
                      .map((product) => (
                        <ProductItem product={product} key={product.id} />
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {filteredProducts.length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No products found.
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                      <ProductItem product={product} key={product.id} />
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function ProductItem({ product }: { product: ProductWithSeller }) {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Image
        src={(product.imageUrl || [])[0] || "/placeholder.svg"}
        alt={product.name}
        className="object-cover w-16 h-16 rounded"
        width={64}
        height={64}
      />
      <div className="flex-1">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant={product.status !== "sold" ? "secondary" : "outline"}>
            {product.status === "sold"
              ? "Sold"
              : product.status !== "draft"
              ? "Active"
              : "Draft"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Listed {format(new Date(product.createdAt || ""), "dd/MM/yyyy")}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatCurrency(product.price)}</p>
        <p className="text-sm text-muted-foreground">
          {product.status !== "draft" && product.views}
        </p>
      </div>
      <div className="flex gap-2">
        <Link href={`/market/${product.id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        <Link href={`/market/${product.id}/edit`}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

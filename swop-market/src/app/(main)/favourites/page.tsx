"use client";

import { ProductCard } from "@/components/product-card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProductList } from "@/hooks/use-product-list";
import { useFavouritesStore } from "@/lib/stores/favourites-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  search: z.string().min(1, "Please enter a search term"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

export default function FavouritesPage() {
  const { favourites } = useFavouritesStore();
  const { products } = useProductList();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: "" },
  });

  const searchQuery = form.watch("search") || "";

  const favouriteProducts = favourites
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  const filteredProducts = favouriteProducts.filter(
    (product) =>
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function onSubmit() {
    const input = document.getElementById("search-input");
    if (input) (input as HTMLInputElement).blur();
  }

  return (
    <div className="w-full gap-8 px-4 py-8 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your Favourites
            </h2>
            <p className="text-sm text-muted-foreground">
              {favouriteProducts.length}{" "}
              {favouriteProducts.length === 1 ? "item" : "items"} saved
            </p>
          </div>
        </div>

        <div className="w-fit">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
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

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProductCard product={product} searchTerm={searchQuery} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 border border-dashed rounded-md">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "No favourites match your search."
                  : "No favourites found."}
              </p>
              {!searchQuery && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Start browsing products to add them to your favourites!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

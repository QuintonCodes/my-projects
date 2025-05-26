"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/products";
import Link from "next/link";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
});

type SearchForm = z.infer<typeof searchSchema>;

export default function HeroSection() {
  const router = useRouter();

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(data: SearchForm) {
    router.push(`/products?search=${encodeURIComponent(data.query)}`);
  }

  return (
    <section className="relative text-white bg-teal-700">
      <div className="container px-4 py-16 md:px-6 md:py-24">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Buy & Sell in South Africa
            </h1>
            <p className="text-lg text-teal-100 md:text-xl">
              Join South Africa&apos;s trusted marketplace for buying and
              selling new and pre-owned items.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="text-background bg-amber-500 hover:bg-amber-600"
              >
                <Link href="/sell">Start Selling</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-background hover:bg-background hover:text-teal-700"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <h2 className="mb-4 text-xl font-semibold">
              Find what you&apos;re looking for
            </h2>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="relative"
                >
                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex gap-2 w-full">
                            <Input
                              placeholder="Search for anything..."
                              className="text-white bg-white/20 border-white/30 placeholder:text-white/70"
                              {...field}
                            />
                            <Button
                              type="submit"
                              className="bg-amber-500 hover:bg-amber-600"
                            >
                              <Search className="w-4 h-4" />
                              <span className="sr-only">Search</span>
                            </Button>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.slice(0, 4).map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-white bg-transparent border-white/30 hover:bg-white/20"
                >
                  <Link href={`/products?category=${category.id}`}>
                    {category.name}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

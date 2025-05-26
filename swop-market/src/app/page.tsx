import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

import CategoryGrid from "@/components/category-grid";
import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <div className="container px-4 py-8 md:px-6">
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <Link href="/products">
              <Button variant="ghost" className="gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <FeaturedProducts />
        </section>

        <section className="py-12">
          <h2 className="mb-8 text-3xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <CategoryGrid />
        </section>

        <section className="p-8 py-12 rounded-lg bg-muted">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Start Selling Today
            </h2>
            <p className="mb-6 text-muted-foreground">
              Join thousands of South Africans who are making money by selling
              items they no longer need. It&apos;s quick, easy, and free to get
              started!
            </p>
            <Button
              asChild
              size="lg"
              className="bg-amber-500 hover:bg-amber-600"
            >
              <Link href="/sell">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Create Your Shop
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}

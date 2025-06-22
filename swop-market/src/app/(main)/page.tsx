import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

import CategoryGrid from "@/components/category-grid";
import FeaturedProducts from "@/components/featured-products";
import HeroSection from "@/components/hero-section";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <div className="px-4 py-8 md:px-6">
        <section className="py-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Discover amazing deals from trusted sellers across South Africa
            </p>
            <Button variant="ghost" className="gap-2" asChild>
              <Link href="/products">
                View all <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <FeaturedProducts />
        </section>

        <section className="py-12">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="text-xl text-muted-foreground">
              Find exactly what you&apos;re looking for in our organized
              categories
            </p>
          </div>
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

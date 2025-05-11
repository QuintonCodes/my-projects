"use client";

import { SubscriptionForm } from "@/components/subscription-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1 pt-16">
      {/* Hero Section */}
      <section className="h-[90vh] flex items-center">
        <div className="container relative z-10 px-4 py-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Embrace Your Rebel Spirit
            </h1>
            <p className="max-w-2xl mb-8 text-lg md:text-xl">
              KickFlip brings you skater-inspired clothing that embodies
              freedom, rebellion, and style. Express yourself with our unique
              designs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-kickflip hover:bg-kickflip/90"
              >
                <Link href="/products">Shop Collection</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-12 text-3xl font-bold text-center font-mochiy">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <CategoryCard
              title="Hoodies"
              image="/images/category-hoodies.jpg"
              href="/products?category=hoodies"
            />
            <CategoryCard
              title="Sweaters"
              image="/images/category-sweaters.jpg"
              href="/products?category=sweaters"
            />
            <CategoryCard
              title="T-Shirts"
              image="/images/category-tshirts.jpg"
              href="/products?category=t-shirts"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold font-mochiy">Best Sellers</h2>
            <Button asChild variant="ghost" className="group">
              <Link href="/products" className="flex items-center">
                View All
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* These would be dynamic in a real app */}
            <ProductCard
              id="1"
              name="Rebel Hoodie"
              price={79.99}
              image="/images/product-1.jpg"
              colors={["#000000", "#7F1310", "#FFFFFF"]}
            />
            <ProductCard
              id="2"
              name="Street Sweater"
              price={64.99}
              image="/images/product-2.jpg"
              colors={["#000000", "#333333", "#FFFFFF"]}
            />
            <ProductCard
              id="3"
              name="Skate Legend Tee"
              price={34.99}
              image="/images/product-3.jpg"
              colors={["#000000", "#7F1310", "#FFFFFF"]}
            />
            <ProductCard
              id="4"
              name="Urban Hoodie"
              price={84.99}
              image="/images/product-4.jpg"
              colors={["#000000", "#333333"]}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-12 text-3xl font-bold text-center font-mochiy">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <TestimonialCard
              quote="The quality of KickFlip's hoodies is unmatched. Super comfortable and the designs are fire!"
              author="Alex Rodriguez"
              rating={5}
            />
            <TestimonialCard
              quote="I've been wearing KickFlip for years. Their clothes perfectly capture the skater vibe I'm going for."
              author="Jamie Wilson"
              rating={5}
            />
            <TestimonialCard
              quote="Great customer service and fast shipping. The t-shirts fit perfectly and the designs are unique."
              author="Sam Taylor"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 text-white md:py-24 bg-kickflip">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold font-mochiy">
            Join the Rebellion
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Subscribe to our newsletter for exclusive deals, new releases, and
            skater culture insights.
          </p>
          <div className="max-w-md mx-auto">
            <SubscriptionForm />
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="mb-4 text-3xl font-bold text-center font-mochiy">
            Follow Our Journey
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-center text-muted-foreground">
            Check out our Instagram for the latest styles, behind-the-scenes
            content, and community highlights.
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                href="#"
                key={i}
                className="relative overflow-hidden aspect-square group"
              >
                <Image
                  src={`/images/instagram-${i}.jpg`}
                  alt={`Instagram post ${i}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-colors duration-300 bg-black/0 group-hover:bg-black/30">
                  <span className="text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    @kickflip
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function CategoryCard({
  title,
  image,
  href,
}: {
  title: string;
  image: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-lg aspect-[3/4]"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white font-mochiy">{title}</h3>
        <p className="flex items-center mt-2 text-white/80 group-hover:text-white">
          Shop Now{" "}
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </Link>
  );
}

function ProductCard({
  id,
  name,
  price,
  image,
  colors,
}: {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[];
}) {
  return (
    <Link href={`/products/${id}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="font-medium">{name}</h3>
      <div className="flex items-center justify-between mt-2">
        <p className="font-semibold">${price.toFixed(2)}</p>
        <div className="flex space-x-1">
          {colors.map((color) => (
            <span
              key={color}
              className="w-3 h-3 border border-gray-300 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}

function TestimonialCard({
  quote,
  author,
  rating,
}: {
  quote: string;
  author: string;
  rating: number;
}) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-background">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="mb-4 text-muted-foreground">&quot;{quote}&quot;</p>
      <p className="font-medium">{author}</p>
    </div>
  );
}

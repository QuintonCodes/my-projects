"use client";

import { ShieldCheck, TrendingUp, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserWithSeller } from "@/context/auth-provider";
import { categories } from "@/lib/data";

const stats = [
  {
    label: "Active Users",
    value: "1k+",
  },
  {
    label: "Happy Users",
    value: "500+",
  },
  {
    label: "Successful Sales",
    value: "10k+",
  },
  {
    label: "Cities Covered",
    value: "All 9 Provinces",
  },
];

const features = [
  {
    icon: Users,
    title: "1M+ Users",
    description: "Join our growing community",
  },
  {
    icon: ShieldCheck,
    title: "Secure Trading",
    description: "Safe and protected transactions",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description: "Competitive marketplace rates",
  },
  {
    icon: Zap,
    title: "Quick Sales",
    description: "Sell items fast and easy",
  },
];

export default function HeroSection({ user }: { user: UserWithSeller | null }) {
  return (
    <section className="overflow-hidden text-white bg-gradient-to-br from-teal-700 via-teal-800 px-4 py-16 md:px-6 md:py-24">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Buy & Sell
              <span className="block text-amber-400">Anything</span>
              in South Africa
            </h1>
            <p className="max-w-lg text-lg text-teal-100 md:text-xl">
              Join South Africa&apos;s most trusted marketplace. Discover
              amazing deals, sell your items quickly, and connect with buyers
              and sellers nationwide.
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="text-background bg-amber-500 hover:bg-amber-600"
            >
              <Link
                href={user && user.sellerProfile ? "/sell" : "/become-seller"}
              >
                {user && user.sellerProfile
                  ? "Start Selling"
                  : "Become A Seller"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-background hover:bg-background hover:text-teal-700"
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                  <feature.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{feature.title}</p>
                  <p className="text-xs text-teal-100">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Popular Categories Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Popular Categories
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.slice(0, 4).map((category, index) => (
                  <Link
                    href={`/products?category=${category.name.toLowerCase()}`}
                    key={category.name}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex flex-col items-center p-4 transition-colors rounded-lg cursor-pointer bg-white/10 hover:bg-white/20"
                    >
                      <div className="flex items-center justify-center w-12 h-12 mb-2 text-2xl rounded-full bg-white/20">
                        <category.icon className="text-white size-5" />
                      </div>
                      <span className="text-sm font-medium text-white">
                        {category.name}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Why Choose SwopMarket?
              </h3>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div
                    className="flex items-center justify-between"
                    key={index}
                  >
                    <span className="text-teal-100">{stat.label}</span>
                    <span className="font-bold text-amber-400">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

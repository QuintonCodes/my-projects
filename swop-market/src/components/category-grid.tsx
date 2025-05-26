"use client";

import { categories } from "@/lib/products";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -5 }}
        >
          <Link
            href={`/products?category=${category.id}`}
            className="flex flex-col items-center p-4 text-center transition-colors border rounded-lg bg-background hover:border-teal-700"
          >
            <div className="relative w-16 h-16 mb-3">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="font-medium">{category.name}</h3>
            <p className="text-xs text-muted-foreground">
              {category.count} items
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  colors: string[]
}

export function ProductCard({ id, name, price, image, colors }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/10 flex items-center justify-center"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium"
              >
                View Product
              </motion.span>
            </motion.div>
          )}
        </div>

        <h3 className="font-medium">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <p className="font-semibold">{formatCurrency(price)}</p>
          <div className="flex space-x-1">
            {colors.map((color) => (
              <span
                key={color}
                className="h-3 w-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

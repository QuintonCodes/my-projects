"use client";

import { MapPin, Trash2, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import type { CartItem } from "@/lib/types/cart";
import { formatCondition, formatCurrency } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type CartItemsProps = {
  items: CartItem[];
  removeItem: (id: string) => void;
};

export default function CartItems({ items, removeItem }: CartItemsProps) {
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 p-4 border rounded-lg bg-card sm:flex-row"
          >
            <div className="relative w-24 h-24 overflow-hidden rounded-md sm:h-32 sm:w-32">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-between flex-1">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-tight">
                      {item.name}
                    </h3>

                    {item.seller && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{item.seller}</span>
                      </div>
                    )}

                    {item.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {item.condition && (
                      <Badge variant="secondary" className="w-fit">
                        {formatCondition(item.condition)}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2 text-right sm:mt-0">
                    <div className="text-xl font-bold text-teal-700">
                      {formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Unique item - Only 1 available
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

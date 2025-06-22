"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CartItem } from "@/lib/types/cart";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

const promoCodeSchema = z.object({
  code: z.string().min(1, "Promo code is required"),
});

type PromoCodeForm = z.infer<typeof promoCodeSchema>;

export default function CartSummary({ items }: { items: CartItem[] }) {
  const router = useRouter();
  const [discount, setDiscount] = useState(0);

  const form = useForm<PromoCodeForm>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const subtotal = items.reduce(
    (total, item) => total + (Number(item.price) || 0),
    0
  );
  const itemCount = items.length;
  const shipping = 0; // Free shipping for now
  const total = subtotal - (Number(discount) || 0) + shipping;

  function onSubmit(data: PromoCodeForm) {
    // In a real app, you would validate the promo code with an API
    if (data.code.toLowerCase() === "welcome10") {
      const newDiscount = subtotal * 0.1;
      setDiscount(newDiscount);
      form.reset();
    } else {
      form.setError("code", {
        type: "manual",
        message: "Invalid promo code",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Items ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex justify-between text-sm text-green-600"
            >
              <span>Discount</span>
              <span>-{formatCurrency(discount)}</span>
            </motion.div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
          </div>

          <div className="flex justify-between pt-2 text-lg font-bold border-t">
            <span>Total</span>
            <span className="text-teal-700">{formatCurrency(total)}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promo Code</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="Enter code" {...field} />
                    </FormControl>
                    <Button type="submit" variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="p-2 text-xs rounded text-muted-foreground bg-muted/50">
          <p>
            Try code: <strong>WELCOME10</strong> for 10% off
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleCheckout}
          className="w-full bg-amber-500 hover:bg-amber-600"
        >
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}

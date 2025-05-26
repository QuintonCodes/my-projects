"use client";

import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
  Package,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

// Mock order data
const orders = [
  {
    id: "ORD-12345",
    date: "2024-05-10",
    status: "delivered",
    total: 8999,
    items: [
      {
        id: "2",
        name: "Samsung Galaxy S22",
        price: 8999,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        seller: "TechTraders",
      },
    ],
    tracking: "TRK123456789",
    deliveryDate: "2024-05-15",
  },
  {
    id: "ORD-12346",
    date: "2024-05-05",
    status: "shipped",
    total: 350,
    items: [
      {
        id: "4",
        name: "Handmade Ceramic Vase",
        price: 350,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        seller: "ArtisanCrafts",
      },
    ],
    tracking: "TRK987654321",
    deliveryDate: "2024-05-12",
  },
  {
    id: "ORD-12347",
    date: "2024-04-28",
    status: "processing",
    total: 1200,
    items: [
      {
        id: "5",
        name: "Vintage Vinyl Records Collection",
        price: 1200,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
        seller: "MusicMasters",
      },
    ],
  },
];

export default function AccountOrders() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>View and manage your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="overflow-hidden border rounded-lg">
                <div
                  className="flex flex-col justify-between p-4 cursor-pointer sm:flex-row sm:items-center hover:bg-muted/50"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div>
                      <h3 className="font-medium">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>

                    <Badge
                      className={
                        order.status === "delivered"
                          ? "bg-green-600"
                          : order.status === "shipped"
                          ? "bg-amber-500"
                          : "bg-teal-700"
                      }
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <span className="font-semibold">
                      {formatCurrency(order.total)}
                    </span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border-t"
                  >
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-20 h-20 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Seller: {item.seller}
                            </p>
                            <div className="flex justify-between mt-2">
                              <span className="text-sm">
                                {formatCurrency(item.price)} x {item.quantity}
                              </span>
                              <span className="font-medium">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {(order.status === "shipped" ||
                        order.status === "delivered") && (
                        <div className="p-3 rounded-md bg-muted/30">
                          <div className="flex items-center gap-2 text-sm">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">
                              Tracking Number:
                            </span>
                            <span>{order.tracking}</span>
                            <Link
                              href="#"
                              className="inline-flex items-center ml-auto text-teal-700 hover:text-teal-800"
                            >
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Track
                            </Link>
                          </div>
                          {order.deliveryDate && (
                            <p className="mt-1 text-sm">
                              {order.status === "delivered"
                                ? `Delivered on ${new Date(
                                    order.deliveryDate
                                  ).toLocaleDateString()}`
                                : `Expected delivery by ${new Date(
                                    order.deliveryDate
                                  ).toLocaleDateString()}`}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between pt-4 border-t">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact Seller
                        </Button>

                        {order.status === "delivered" && (
                          <Button
                            size="sm"
                            className="bg-teal-700 hover:bg-teal-800"
                          >
                            Leave Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No orders yet</h3>
              <p className="mb-6 text-muted-foreground">
                When you make a purchase, your orders will appear here.
              </p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

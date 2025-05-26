"use client";

import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderConfirmationProps {
  orderNumber: string;
  shippingDetails: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  onContinueShopping: () => void;
}

export default function OrderConfirmation({
  orderNumber,
  shippingDetails,
  paymentMethod,
  onContinueShopping,
}: OrderConfirmationProps) {
  // Format payment method for display
  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case "credit-card":
        return "Credit/Debit Card";
      case "paypal":
        return "PayPal";
      case "eft":
        return "Electronic Funds Transfer (EFT)";
      default:
        return method;
    }
  };

  // Get estimated delivery date (7 days from now)
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Order Confirmed!</h2>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received.
        </p>
      </motion.div>

      <div className="space-y-6">
        <div className="p-6 rounded-lg bg-muted/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Order Details</h3>
            <Button variant="outline" size="sm" className="h-8">
              <Download className="w-4 h-4 mr-2" />
              Invoice
            </Button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-muted-foreground">Order Number:</div>
              <div className="font-medium">{orderNumber}</div>

              <div className="text-muted-foreground">Date:</div>
              <div>{new Date().toLocaleDateString()}</div>

              <div className="text-muted-foreground">Payment Method:</div>
              <div>{getPaymentMethodDisplay(paymentMethod)}</div>

              <div className="text-muted-foreground">Estimated Delivery:</div>
              <div>{getEstimatedDeliveryDate()}</div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-muted/30">
          <h3 className="mb-4 font-semibold">Shipping Information</h3>

          <div className="space-y-1 text-sm">
            <p className="font-medium">{shippingDetails.fullName}</p>
            <p>{shippingDetails.address}</p>
            <p>
              {shippingDetails.city}, {shippingDetails.province}{" "}
              {shippingDetails.postalCode}
            </p>
            <p>{shippingDetails.country}</p>
            <Separator className="my-2" />
            <p className="text-muted-foreground">
              Email: {shippingDetails.email}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-muted/30">
          <h3 className="mb-4 font-semibold">What&apos;s Next?</h3>

          <div className="space-y-4 text-sm">
            <p>
              You will receive an order confirmation email at{" "}
              <span className="font-medium">{shippingDetails.email}</span> with
              the details of your purchase.
            </p>

            <p>
              You can track your order status in your{" "}
              <Link
                href="/account/orders"
                className="text-teal-700 hover:underline"
              >
                account dashboard
              </Link>
              .
            </p>

            {paymentMethod === "eft" && (
              <div className="p-3 border rounded-md bg-amber-50 border-amber-200 text-amber-800">
                <p className="font-medium">
                  Important: Your order will be processed after payment is
                  received.
                </p>
                <p className="mt-1">
                  Please use your order number{" "}
                  <span className="font-medium">{orderNumber}</span> as the
                  payment reference.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Button variant="outline" size="lg" onClick={onContinueShopping}>
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </Button>

          <Link href="/account/orders">
            <Button className="bg-teal-700 hover:bg-teal-800" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Go to My Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

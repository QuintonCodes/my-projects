"use client";

import {
  CheckCircle,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CheckoutStepper from "@/components/checkout/checkout-stepper";
import OrderConfirmation from "@/components/checkout/order-confirmation";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentMethodForm from "@/components/checkout/payment-method-form";
import ShippingForm from "@/components/checkout/shipping-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/context/cart-provider";

// Handle form submissions
interface ShippingFormValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

type PaymentMethod = "credit-card" | "paypal" | "eft";
interface PaymentFormValues {
  method: PaymentMethod;
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

// Define checkout steps
const CHECKOUT_STEPS = [
  { id: "cart", label: "Cart", icon: ShoppingBag },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirmation", label: "Confirmation", icon: CheckCircle },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Form data states
  const [shippingData, setShippingData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
  });

  const [paymentData, setPaymentData] = useState<PaymentFormValues>({
    method: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Check if cart is empty and redirect if needed
  useEffect(() => {
    if (items.length === 0 && currentStep === "cart") {
      router.push("/cart");
    }
  }, [items.length, router, currentStep]);

  // Handle step navigation
  const goToNextStep = () => {
    const currentIndex = CHECKOUT_STEPS.findIndex(
      (step) => step.id === currentStep
    );
    if (currentIndex < CHECKOUT_STEPS.length - 1) {
      setCurrentStep(CHECKOUT_STEPS[currentIndex + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = CHECKOUT_STEPS.findIndex(
      (step) => step.id === currentStep
    );
    if (currentIndex > 0) {
      setCurrentStep(CHECKOUT_STEPS[currentIndex - 1].id);
      window.scrollTo(0, 0);
    }
  };

  const handleShippingSubmit = (data: ShippingFormValues) => {
    setShippingData(data);
    goToNextStep();
  };

  const handlePaymentSubmit = (data: PaymentFormValues) => {
    setPaymentData(data);
    processOrder();
  };

  // Process order (mock implementation)
  const processOrder = () => {
    setIsProcessing(true);

    // Simulate API call to process order
    setTimeout(() => {
      // Generate random order number
      const randomOrderNumber = `ORD-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
      setOrderNumber(randomOrderNumber);

      // Clear cart after successful order
      clearCart();

      // Move to confirmation step
      setCurrentStep("confirmation");
      setIsProcessing(false);
    }, 2000);
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="container px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Checkout</h1>

          {/* Checkout Stepper */}
          <div className="mb-8">
            <CheckoutStepper steps={CHECKOUT_STEPS} currentStep={currentStep} />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Cart Review Step */}
              {currentStep === "cart" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Review Your Cart</h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <ShieldCheck className="w-4 h-4 mr-1" />
                      Secure Checkout
                    </div>
                  </div>

                  <OrderSummary editable={true} />

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handleContinueShopping}>
                      Continue Shopping
                    </Button>
                    <Button
                      onClick={goToNextStep}
                      className="bg-teal-700 hover:bg-teal-800"
                      disabled={items.length === 0}
                    >
                      Proceed to Shipping
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">
                    Shipping Information
                  </h2>
                  <ShippingForm
                    defaultValues={shippingData}
                    onSubmit={handleShippingSubmit}
                    onBack={goToPreviousStep}
                  />
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  <PaymentMethodForm
                    defaultValues={paymentData}
                    onSubmit={handlePaymentSubmit}
                    onBack={goToPreviousStep}
                    isProcessing={isProcessing}
                  />
                </div>
              )}

              {/* Confirmation Step */}
              {currentStep === "confirmation" && (
                <OrderConfirmation
                  orderNumber={orderNumber}
                  shippingDetails={shippingData}
                  paymentMethod={paymentData.method}
                  onContinueShopping={handleContinueShopping}
                />
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              {currentStep !== "confirmation" && (
                <div className="sticky p-6 rounded-lg bg-muted/30 top-20">
                  <h3 className="mb-4 font-semibold">Order Summary</h3>
                  <OrderSummary editable={false} condensed={true} />

                  {currentStep !== "cart" && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-2 text-sm">
                        {currentStep === "payment" && (
                          <div className="space-y-1">
                            <p className="font-medium">Shipping To:</p>
                            <p>{shippingData.fullName}</p>
                            <p>{shippingData.address}</p>
                            <p>
                              {shippingData.city}, {shippingData.province}{" "}
                              {shippingData.postalCode}
                            </p>
                            <p>{shippingData.country}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

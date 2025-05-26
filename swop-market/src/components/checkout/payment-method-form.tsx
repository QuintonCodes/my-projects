"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronLeft,
  CreditCard,
  Loader2,
  DollarSignIcon as PaypalLogo,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

// Define form schema
const paymentFormSchema = z
  .object({
    method: z.enum(["credit-card", "paypal", "eft"]),
    cardNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{16}$/.test(val.replace(/\s/g, "")), {
        message: "Please enter a valid 16-digit card number",
      }),
    cardName: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 3, {
        message: "Please enter the name on your card",
      }),
    expiryDate: z
      .string()
      .optional()
      .refine((val) => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), {
        message: "Please enter a valid expiry date (MM/YY)",
      }),
    cvv: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{3,4}$/.test(val), {
        message: "Please enter a valid CVV code",
      }),
  })
  .refine(
    (data) => {
      if (data.method === "credit-card") {
        return (
          !!data.cardNumber &&
          !!data.cardName &&
          !!data.expiryDate &&
          !!data.cvv
        );
      }
      return true;
    },
    {
      message: "Please complete all credit card fields",
      path: ["method"],
    }
  );

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentMethodFormProps {
  defaultValues: Partial<PaymentFormValues>;
  onSubmit: (data: PaymentFormValues) => void;
  onBack: () => void;
  isProcessing: boolean;
}

export default function PaymentMethodForm({
  defaultValues,
  onSubmit,
  onBack,
  isProcessing,
}: PaymentMethodFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(
    defaultValues.method || "credit-card"
  );

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      method: "credit-card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      ...defaultValues,
    },
  });

  // Format credit card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as "credit-card" | "paypal" | "eft");
    form.setValue("method", value as "credit-card" | "paypal" | "eft");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    handlePaymentMethodChange(value);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="credit-card" />
                    </FormControl>
                    <FormLabel className="flex items-center font-normal cursor-pointer">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Credit or Debit Card
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="paypal" />
                    </FormControl>
                    <FormLabel className="flex items-center font-normal cursor-pointer">
                      <PaypalLogo className="w-4 h-4 mr-2" />
                      PayPal
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="eft" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Electronic Funds Transfer (EFT)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentMethod === "credit-card" && (
          <div className="p-4 space-y-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Card Details</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Secure Payment
              </div>
            </div>

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4111 1111 1111 1111"
                      {...field}
                      value={formatCardNumber(field.value || "")}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={19}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="J. SMITH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        {...field}
                        value={formatExpiryDate(field.value || "")}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="123"
                        {...field}
                        maxLength={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="p-4 text-center border rounded-lg">
            <p className="mb-4 text-sm">
              You will be redirected to PayPal to complete your payment.
            </p>
            <div className="flex justify-center">
              <PaypalLogo className="w-10 h-10 text-blue-600" />
            </div>
          </div>
        )}

        {paymentMethod === "eft" && (
          <div className="p-4 border rounded-lg">
            <h3 className="mb-2 text-sm font-medium">Bank Details</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Please use your order number as the payment reference.
            </p>

            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Bank:</div>
                <div>First National Bank</div>
                <div className="text-muted-foreground">Account Name:</div>
                <div>SwopMarket (Pty) Ltd</div>
                <div className="text-muted-foreground">Account Number:</div>
                <div>62123456789</div>
                <div className="text-muted-foreground">Branch Code:</div>
                <div>250655</div>
                <div className="text-muted-foreground">Reference:</div>
                <div>Your Order Number</div>
              </div>
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          <div className="text-sm">
            <p>
              By placing your order, you agree to SwopMarket&apos;s{" "}
              <a href="#" className="text-teal-700 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-700 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isProcessing}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Shipping
            </Button>
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>Place Order</>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

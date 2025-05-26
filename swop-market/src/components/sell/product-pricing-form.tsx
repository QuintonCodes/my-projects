"use client";

import { useFormContext } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const shippingOptions = [
  { id: "pickup", label: "Local Pickup" },
  { id: "courier", label: "Courier Delivery" },
  { id: "post", label: "Postal Service" },
  { id: "meet", label: "Meet in Person" },
];

const locations = [
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Nelspruit",
  "Kimberley",
  "Polokwane",
];

export default function ProductPricingForm() {
  const { control, setValue, watch } = useFormContext();
  const shippingOptionsValue = watch("shippingOptions") || [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Pricing & Shipping</h2>
        <p className="text-sm text-muted-foreground">
          Set your price and shipping options.
        </p>
      </div>

      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price (ZAR)</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
                  R
                </span>
                <Input
                  type="number"
                  min="0"
                  step="10.00"
                  className="pl-8"
                  // placeholder="0.00"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value) || 0)
                  }
                />
              </div>
            </FormControl>
            <FormDescription>
              Set a competitive price based on the condition and market value.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input
                list="locations"
                placeholder="e.g., Cape Town"
                {...field}
              />
            </FormControl>
            <datalist id="locations">
              {locations.map((location) => (
                <option key={location} value={location} />
              ))}
            </datalist>
            <FormDescription>
              Enter your city or area where the item is located.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="shippingOptions"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Shipping Options</FormLabel>
              <FormDescription>
                Select all the shipping methods you&apos;re willing to offer.
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {shippingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`shipping-${option.id}`}
                    checked={shippingOptionsValue.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setValue(
                          "shippingOptions",
                          [...shippingOptionsValue, option.id],
                          { shouldValidate: true }
                        );
                      } else {
                        setValue(
                          "shippingOptions",
                          shippingOptionsValue.filter(
                            (value: string) => value !== option.id
                          ),
                          { shouldValidate: true }
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`shipping-${option.id}`}>
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

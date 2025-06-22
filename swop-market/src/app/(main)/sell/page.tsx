"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createProduct } from "@/app/actions/product";
import ProductDetailsForm from "@/components/sell/product-details-form";
import ProductImagesForm from "@/components/sell/product-images-form";
import ProductPreview from "@/components/sell/product-preview";
import ProductPricingForm from "@/components/sell/product-pricing-form";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const productSchema = z.object({
  // Basic details
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  condition: z.enum(
    ["new", "used_new", "used_good", "used_fair", "for_parts"],
    {
      errorMap: () => ({ message: "Please select a valid condition" }),
    }
  ),
  brand: z.string().optional(),
  model: z.string().optional(),

  // Images
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        file: z.any().optional(),
      })
    )
    .min(1, "Please add at least one image"),

  // Pricing and shipping
  price: z.number().min(1, "Price must be greater than 0"),
  originalPrice: z.number().optional(),
  location: z.string().min(1, "Please enter your location"),
  deliveryOptions: z
    .array(z.string())
    .min(1, "Please select at least one delivery option"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function SellPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      condition: undefined,
      brand: "",
      model: "",
      images: [],
      price: 0,
      originalPrice: undefined,
      location: "",
      deliveryOptions: [],
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting, dirtyFields },
    getValues,
  } = methods;

  async function onSubmit(data: ProductFormValues) {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "images" || key === "deliveryOptions") {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      const result = await createProduct(formData);

      if (!result.success) {
        toast.error("Error listing product", {
          description: result.error,
        });
        return;
      }

      toast.success("Product listed successfully!", {
        description: "Your product has been listed for sale.",
      });

      router.push("/market");
    } catch (error) {
      console.error("Error listing product:", error);
      toast.error("Error listing product", {
        description:
          "There was an error listing your product. Please try again.",
      });
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const goToNextTab = () => {
    if (activeTab === "details") setActiveTab("images");
    else if (activeTab === "images") setActiveTab("pricing");
    else if (activeTab === "pricing") setActiveTab("preview");
  };

  const goToPreviousTab = () => {
    if (activeTab === "preview") setActiveTab("pricing");
    else if (activeTab === "pricing") setActiveTab("images");
    else if (activeTab === "images") setActiveTab("details");
  };

  return (
    <div className="container px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Sell Your Item
          </h1>
          <p className="mb-8 text-muted-foreground">
            Fill in the details below to list your item for sale on SwopMarket.
          </p>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger
                        value="details"
                        disabled={activeTab === "images" && !isValid}
                      >
                        Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="images"
                        disabled={activeTab === "pricing" && !isValid}
                      >
                        Images
                      </TabsTrigger>
                      <TabsTrigger
                        value="pricing"
                        disabled={activeTab === "preview" && !isValid}
                      >
                        Pricing
                      </TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                      <ProductDetailsForm />
                    </TabsContent>

                    <TabsContent value="images">
                      <ProductImagesForm />
                    </TabsContent>

                    <TabsContent value="pricing">
                      <ProductPricingForm />
                    </TabsContent>

                    <TabsContent value="preview">
                      <ProductPreview />
                    </TabsContent>
                  </Tabs>
                </CardHeader>

                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={goToPreviousTab}
                    disabled={activeTab === "details"}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  {activeTab !== "preview" ? (
                    <Button
                      type="button"
                      onClick={goToNextTab}
                      disabled={
                        (activeTab === "details" && !dirtyFields.name) ||
                        (activeTab === "images" &&
                          (!getValues("images") ||
                            getValues("images").length === 0)) ||
                        (activeTab === "pricing" && !dirtyFields.price)
                      }
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-teal-700 hover:bg-teal-800"
                      disabled={!isValid || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Listing...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          List Item
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </FormProvider>
        </div>
      </motion.div>
    </div>
  );
}

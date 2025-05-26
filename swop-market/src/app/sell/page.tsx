"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ProductDetailsForm from "@/components/sell/product-details-form";
import ProductImagesForm from "@/components/sell/product-images-form";
import ProductPreview from "@/components/sell/product-preview";
import ProductPricingForm from "@/components/sell/product-pricing-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  // CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the schema for the entire form
const productSchema = z.object({
  // Basic details
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  condition: z.string().min(1, "Please select a condition"),

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
  location: z.string().min(1, "Please enter your location"),
  shippingOptions: z
    .array(z.string())
    .min(1, "Please select at least one shipping option"),

  // Seller info
  sellerName: z.string().min(1, "Seller name is required"),
  sellerContact: z.string().email("Please enter a valid email").optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function SellPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      condition: "",
      images: [],
      price: 0,
      location: "",
      shippingOptions: [],
      sellerName: "Current User",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);

    try {
      // In a real app, you would upload images first and get URLs
      const processedImages = data.images.map((img) => ({
        id: img.id,
        url: img.url,
      }));

      // Format the data for the API
      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        condition: data.condition,
        image: processedImages[0].url, // Use first image as main
        images: processedImages,
        location: data.location,
        seller: data.sellerName,
        shippingOptions: data.shippingOptions,
      };

      console.log(productData)

      toast.success("Product listed successfully!", {
        description: "Your product has been listed for sale.",
      });

      // Redirect to the product page or dashboard
      router.push("/account/listings");
    } catch (error) {
      console.error("Error listing product:", error);
      toast.error("Error listing product", {
        description:
          "There was an error listing your product. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        disabled={
                          activeTab === "images" && !methods.formState.isValid
                        }
                      >
                        Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="images"
                        disabled={
                          activeTab === "pricing" && !methods.formState.isValid
                        }
                      >
                        Images
                      </TabsTrigger>
                      <TabsTrigger
                        value="pricing"
                        disabled={
                          activeTab === "preview" && !methods.formState.isValid
                        }
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

                {/* <CardContent>
                  {activeTab === "details" && <ProductDetailsForm />}
                  {activeTab === "images" && <ProductImagesForm />}
                  {activeTab === "pricing" && <ProductPricingForm />}
                  {activeTab === "preview" && <ProductPreview />}
                </CardContent> */}

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
                        (activeTab === "details" &&
                          !methods.formState.dirtyFields.name) ||
                        (activeTab === "images" &&
                          (!methods.getValues("images") ||
                            methods.getValues("images").length === 0)) ||
                        (activeTab === "pricing" &&
                          !methods.formState.dirtyFields.price)
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

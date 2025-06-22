"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { register } from "@/app/actions/seller";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/context/auth-provider";
import { toast } from "sonner";

const sellerRegistrationSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  storeDescription: z
    .string()
    .min(10, "Store description must be at least 10 characters"),
  storeLocation: z.string().min(2, "Store location is required"),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
});

type SellerRegistrationForm = z.infer<typeof sellerRegistrationSchema>;

export default function BecomeSellerPage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();

  const form = useForm<SellerRegistrationForm>({
    resolver: zodResolver(sellerRegistrationSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      storeLocation: "",
      contactEmail: user?.email || "",
      contactNumber: user?.phoneNumber || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: SellerRegistrationForm) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const result = await register(formData);

      if (result.seller) {
        updateUser({ sellerProfile: result.seller });
      }

      if (result.error) {
        toast.error("Error", {
          description: result.error,
        });
        return;
      }

      toast("Application Submitted!", {
        description:
          "Your seller application has been submitted for review. You'll be notified once approved.",
      });

      router.push("/account");
    } catch {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  if (!user) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              You need to be logged in to become a seller.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/login")} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role === "seller" || user.role === "admin") {
    return (
      <div className="container px-4 py-8 mx-auto">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <CardTitle>You&apos;re Already a Seller!</CardTitle>
            <CardDescription>
              You can manage your store from your account dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/market")} className="w-full">
              Go to My Market
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <Store className="w-12 h-12 mx-auto mb-4 text-teal-600" />
            <h1 className="text-3xl font-bold">Become a Seller</h1>
            <p className="mt-2 text-muted-foreground">
              Join thousands of sellers on SwopMarket and start selling your
              products today.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
            <CardDescription>
              Tell us about your store. This information will be displayed to
              potential customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your store name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed as your store name on SwopMarket.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what you sell and what makes your store unique..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Help customers understand what your store is about.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="storeLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Province" {...field} />
                      </FormControl>
                      <FormDescription>
                        Where is your store located? This helps with local
                        delivery.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="store@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Email address for customer inquiries and order
                        notifications.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+27 12 345 6789" {...field} />
                      </FormControl>
                      <FormDescription>
                        Phone number for customer support and delivery
                        coordination.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting Application..."
                    : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-8 text-sm text-center text-muted-foreground">
          <p>
            By submitting this application, you agree to our{" "}
            <a href="/terms" className="text-teal-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

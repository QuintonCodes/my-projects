"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  location: z.string().min(2, "Please enter your location"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function AccountProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+27 12 345 6789",
      location: "Cape Town, South Africa",
      bio: "I'm a tech enthusiast who loves buying and selling gadgets. I always ensure my items are in great condition and accurately described.",
    },
  });

  function onSubmit() {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated", {
        description: "Your profile has been updated successfully.",
      });
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and public profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <div className="relative w-24 h-24 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=96&width=96&text=JD"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-background"
              >
                <Camera className="w-4 h-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">
                Member since May 2024
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-2 sm:justify-start">
                <div className="px-2 py-1 text-xs rounded-full bg-muted">
                  24 Sales
                </div>
                <div className="px-2 py-1 text-xs rounded-full bg-muted">
                  15 Purchases
                </div>
                <div className="px-2 py-1 text-xs rounded-full bg-muted">
                  4.8/5 Rating
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Tell potential buyers about yourself..."
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormDescription>
                      This will be displayed on your public profile. Max 500
                      characters.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-teal-700 hover:bg-teal-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}

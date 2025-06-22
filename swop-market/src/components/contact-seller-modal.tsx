"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useNotificationsStore } from "@/lib/stores/notification-store";
import { ProductWithSeller } from "@/lib/types/product";
import { formatCurrency } from "@/lib/utils";

const messageSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type MessageFormValues = z.infer<typeof messageSchema>;

export default function ContactSellerModal({
  product,
  children,
}: {
  product: ProductWithSeller;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { addNotification } = useNotificationsStore();

  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: `Hi! I'm interested in your ${product.name}. Is it still available?`,
    },
  });

  const {
    formState: { isSubmitting },
    control,
    handleSubmit,
    reset,
  } = form;

  async function onSubmit(data: MessageFormValues) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        formData.append(key, value.toString());
      }
    });

    try {
      // Simulate sending message to seller's notifications
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addNotification({
        title: "New message about your product",
        message: `Someone is interested in your ${product.name}.`,
        time: "Just now",
        unread: true,
        type: "message",
      });

      toast.success("Message sent!", {
        description: `Your message has been sent to ${product.seller?.storeName}. They will be notified and can respond to you.`,
      });

      reset();
      setOpen(false);
    } catch {
      toast.error("Error", {
        description: "Failed to send message. Please try again.",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="w-full bg-teal-700 hover:bg-teal-800">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Seller
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Seller</DialogTitle>
          <DialogDescription>
            Send a message to {product.seller?.storeName} about this product.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-3 mb-4 rounded-lg bg-muted/30">
          <Image
            src={(product.imageUrl || [])[0] || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-12 h-12 rounded"
            width={48}
            height={48}
          />
          <div className="flex-1">
            <h4 className="font-medium truncate">{product.name}</h4>
            <p className="text-sm text-muted-foreground">
              by {product.seller?.storeName}
            </p>
            <p className="text-sm font-semibold text-teal-700">
              {formatCurrency(product.price)}
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Hi, I'm interested in your product..."
                      {...field}
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button
                className="flex-1"
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-teal-700 hover:bg-teal-800"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

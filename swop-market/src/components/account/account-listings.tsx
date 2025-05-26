"use client";

import { Edit, Eye, MoreHorizontal, Package } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/utils";

// Mock listings data
const listings = [
  {
    id: "1",
    name: "Vintage Leather Sofa",
    description: "Beautiful vintage leather sofa in excellent condition.",
    price: 4500,
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
    views: 45,
    messages: 3,
    createdAt: "2024-04-15",
  },
  {
    id: "3",
    name: "Mountain Bike - Trek",
    description:
      "Trek mountain bike with front suspension. Great for trails and city riding.",
    price: 6500,
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
    views: 32,
    messages: 1,
    createdAt: "2024-04-28",
  },
  {
    id: "7",
    name: "Broken iPhone 12 for Parts",
    description:
      "iPhone 12 with cracked screen and battery issues. Good for parts or repair.",
    price: 2500,
    image: "/placeholder.svg?height=80&width=80",
    status: "sold",
    views: 67,
    messages: 5,
    createdAt: "2024-03-10",
  },
  {
    id: "9",
    name: "Antique Wooden Desk",
    description:
      "Beautiful antique wooden desk from the 1920s. Some wear but in good condition.",
    price: 7500,
    image: "/placeholder.svg?height=80&width=80",
    status: "inactive",
    views: 12,
    messages: 0,
    createdAt: "2024-05-02",
  },
  {
    id: "10",
    name: "Designer Handbag",
    description:
      "Authentic designer handbag, barely used. Comes with dust bag and authenticity card.",
    price: 25000,
    image: "/placeholder.svg?height=80&width=80",
    status: "active",
    views: 89,
    messages: 7,
    createdAt: "2024-05-08",
  },
];

export default function AccountListings() {
  const [userListings, setUserListings] = useState(listings);

  const handleDeleteListing = (id: string) => {
    setUserListings(userListings.filter((listing) => listing.id !== id));

    toast.success("Listing deleted", {
      description: "Your listing has been deleted successfully.",
    });
  };

  const handleStatusChange = (id: string, status: string) => {
    setUserListings(
      userListings.map((listing) =>
        listing.id === id ? { ...listing, status } : listing
      )
    );

    toast.success("Status updated", {
      description: `Listing has been marked as ${status}.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Your Listings</CardTitle>
          <CardDescription>Manage your product listings</CardDescription>
        </div>
        <Link href="/sell">
          <Button className="mt-4 bg-teal-700 sm:mt-0 hover:bg-teal-800">
            Create New Listing
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userListings.length > 0 ? (
            userListings.map((listing) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 border rounded-lg"
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative w-20 h-20 overflow-hidden rounded-md">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-medium">{listing.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {listing.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Badge
                          className={
                            listing.status === "active"
                              ? "bg-green-600"
                              : listing.status === "sold"
                              ? "bg-amber-500"
                              : "bg-muted"
                          }
                        >
                          {listing.status.charAt(0).toUpperCase() +
                            listing.status.slice(1)}
                        </Badge>
                        <span className="font-semibold">
                          {formatCurrency(listing.price)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between mt-4">
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {listing.views} views
                        </span>
                        <span>
                          Listed on{" "}
                          {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Link href={`/products/${listing.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>

                        <Link href={`/sell/edit/${listing.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </Link>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {listing.status !== "active" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(listing.id, "active")
                                }
                              >
                                Mark as Active
                              </DropdownMenuItem>
                            )}
                            {listing.status !== "sold" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(listing.id, "sold")
                                }
                              >
                                Mark as Sold
                              </DropdownMenuItem>
                            )}
                            {listing.status !== "inactive" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleStatusChange(listing.id, "inactive")
                                }
                              >
                                Mark as Inactive
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => handleDeleteListing(listing.id)}
                            >
                              Delete Listing
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No listings yet</h3>
              <p className="mb-6 text-muted-foreground">
                Start selling by creating your first listing.
              </p>
              <Link href="/sell">
                <Button className="bg-teal-700 hover:bg-teal-800">
                  Create Listing
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

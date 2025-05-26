"use client";

import {
  Bell,
  CreditCard,
  Edit,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import AccountListings from "@/components/account/account-listings";
import AccountOrders from "@/components/account/account-orders";
import AccountProfile from "@/components/account/account-profile";
import AccountSettings from "@/components/account/account-settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=64&width=64&text=JD"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>john.doe@example.com</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <nav className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      activeTab === "profile" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      activeTab === "orders" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Orders
                    <Badge className="ml-auto bg-teal-700">3</Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      activeTab === "listings" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("listings")}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    My Listings
                    <Badge className="ml-auto bg-amber-500">5</Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      activeTab === "payments" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("payments")}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      activeTab === "notifications" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                    <Badge className="ml-auto bg-red-500">2</Badge>
                  </Button>
                  <Button
                    variant="ghost"
                    className={`justify-start ${
                      activeTab === "settings" ? "bg-muted" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </nav>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-base">Seller Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Rating
                    </span>
                    <span className="text-sm font-medium">4.8/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sales</span>
                    <span className="text-sm font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Response Rate
                    </span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <Link href="/sell">
                  <Button className="w-full bg-teal-700 hover:bg-teal-800">
                    <Edit className="w-4 h-4 mr-2" />
                    Create New Listing
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="listings">Listings</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <AccountProfile />
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <AccountOrders />
              </TabsContent>

              <TabsContent value="listings" className="mt-6">
                <AccountListings />
              </TabsContent>

              <TabsContent value="payments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods and transaction history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      You have no saved payment methods.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button>Add Payment Method</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Manage your notification preferences and view recent
                      notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              New message from seller
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              TechTraders has responded to your inquiry about
                              Samsung Galaxy S22
                            </p>
                          </div>
                          <Badge>New</Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">Order status update</h3>
                            <p className="text-sm text-muted-foreground">
                              Your order #12345 has been shipped
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          1 day ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <AccountSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

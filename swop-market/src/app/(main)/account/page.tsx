"use client";

import { LogOut, Package, Settings, Store, User } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import AccountListings from "@/components/account/account-listings";
import AccountOrders from "@/components/account/account-orders";
import AccountProfile from "@/components/account/account-profile";
import AccountSettings from "@/components/account/account-settings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/context/auth-provider";

export default function AccountPage() {
  const { user, setUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return (
      <div className="w-full px-4 py-8 md:px-6">
        <div className="py-12 text-center">
          <h2 className="mb-4 text-2xl font-bold">Please log in</h2>
          <p className="text-muted-foreground">
            You need to be logged in to view your account.
          </p>
        </div>
      </div>
    );
  }

  const isSeller = user.role === "seller" || user.role === "admin";

  return (
    <div className="w-full px-4 py-8 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
          <p className="text-muted-foreground">
            {isSeller
              ? "Manage your store and account settings"
              : "Manage your account and orders"}
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 overflow-hidden rounded-full">
                    <Image
                      src={user?.avatarUrl || "/placeholder.svg"}
                      alt={`${user?.firstName} ${user?.lastName} Picture`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <CardTitle>
                      {user?.firstName} {user?.lastName}
                    </CardTitle>
                    <CardDescription>{user?.username}</CardDescription>
                    <CardDescription className="capitalize">
                      {user?.role}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Orders</span>
                </TabsTrigger>
                {isSeller && (
                  <TabsTrigger
                    value="listings"
                    className="flex items-center gap-2"
                  >
                    <Store className="w-4 h-4" />
                    <span className="hidden sm:inline">Listings</span>
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="settings"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <AccountProfile user={user} setUser={setUser} />
              </TabsContent>

              <TabsContent value="orders" className="mt-6">
                <AccountOrders />
              </TabsContent>

              {isSeller && (
                <TabsContent value="listings" className="mt-6">
                  <AccountListings />
                </TabsContent>
              )}

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

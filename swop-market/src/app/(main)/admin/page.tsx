"use client";

import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FilterAnalytics } from "@/components/filter-analytics";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for the dashboard
const salesData = [
  { name: "Jan", total: 12450 },
  { name: "Feb", total: 18500 },
  { name: "Mar", total: 25300 },
  { name: "Apr", total: 19800 },
  { name: "May", total: 27600 },
  { name: "Jun", total: 32100 },
  { name: "Jul", total: 29800 },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState("week");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>Download Report</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R145,230.89</div>
                <p className="text-xs text-muted-foreground">
                  <span className="flex items-center text-green-500">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +18.2%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">
                  <span className="flex items-center text-green-500">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +5.4%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Listings
                </CardTitle>
                <Package className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,672</div>
                <p className="text-xs text-muted-foreground">
                  <span className="flex items-center text-green-500">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +12.7%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Sales
                </CardTitle>
                <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,782</div>
                <p className="text-xs text-muted-foreground">
                  <span className="flex items-center text-red-500">
                    <ArrowDown className="w-3 h-3 mr-1" />
                    -2.5%
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Sales Overview</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPeriod("week")}
                    className={period === "week" ? "bg-muted" : ""}
                  >
                    Week
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPeriod("month")}
                    className={period === "month" ? "bg-muted" : ""}
                  >
                    Month
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPeriod("year")}
                    className={period === "year" ? "bg-muted" : ""}
                  >
                    Year
                  </Button>
                </div>
              </div>
              <CardDescription>
                Total sales and revenue over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [`R${value}`, "Revenue"]}
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="total"
                        fill="#0F766E"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest transactions and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    user: "John Doe",
                    action: "purchased",
                    item: "Samsung Galaxy S22",
                    amount: 8999,
                    time: "2 hours ago",
                  },
                  {
                    user: "Sarah Smith",
                    action: "listed",
                    item: "Vintage Leather Sofa",
                    amount: 4500,
                    time: "5 hours ago",
                  },
                  {
                    user: "Michael Brown",
                    action: "purchased",
                    item: "Mountain Bike - Trek",
                    amount: 6500,
                    time: "1 day ago",
                  },
                  {
                    user: "Emily Johnson",
                    action: "listed",
                    item: "Professional DSLR Camera",
                    amount: 15000,
                    time: "1 day ago",
                  },
                  {
                    user: "David Wilson",
                    action: "purchased",
                    item: "Handmade Ceramic Vase",
                    amount: 350,
                    time: "2 days ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.action} {activity.item} for R
                          {activity.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <FilterAnalytics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and download custom reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Report generation functionality coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

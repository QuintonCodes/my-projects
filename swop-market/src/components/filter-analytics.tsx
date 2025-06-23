"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for filter analytics
const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Furniture", value: 20 },
  { name: "Clothing", value: 15 },
  { name: "Vehicles", value: 10 },
  { name: "Home & Garden", value: 8 },
  { name: "Sports", value: 7 },
  { name: "Other", value: 5 },
];

const conditionData = [
  { name: "New", value: 30 },
  { name: "Like New", value: 25 },
  { name: "Good", value: 20 },
  { name: "Fair", value: 15 },
  { name: "For Parts", value: 10 },
];

const priceRangeData = [
  { name: "R0-R500", value: 15 },
  { name: "R500-R1000", value: 20 },
  { name: "R1000-R5000", value: 30 },
  { name: "R5000-R10000", value: 18 },
  { name: "R10000+", value: 17 },
];

const locationData = [
  { name: "Johannesburg", value: 30 },
  { name: "Cape Town", value: 25 },
  { name: "Durban", value: 15 },
  { name: "Pretoria", value: 12 },
  { name: "Port Elizabeth", value: 8 },
  { name: "Other", value: 10 },
];

// Colors for the charts
const COLORS = [
  "#0F766E",
  "#14B8A6",
  "#2DD4BF",
  "#5EEAD4",
  "#99F6E4",
  "#F59E0B",
  "#FBBF24",
];

export function FilterAnalytics() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Filter Analytics
          </h2>
          <p className="text-muted-foreground">
            Insights into how users are filtering products on the platform
          </p>
        </div>
      </div>

      <Tabs defaultValue="category" className="space-y-6">
        <TabsList>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="condition">Condition</TabsTrigger>
          <TabsTrigger value="price">Price Range</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Filtered Categories</CardTitle>
                <CardDescription>
                  Percentage of users filtering by each category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Filter Usage</CardTitle>
                <CardDescription>
                  Number of users filtering by each category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                        <Bar
                          dataKey="value"
                          fill="#0F766E"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="condition" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Condition Filter Distribution</CardTitle>
                <CardDescription>
                  Percentage of users filtering by each condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={conditionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {conditionData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Condition Filter Usage</CardTitle>
                <CardDescription>
                  Number of users filtering by each condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={conditionData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                        <Bar
                          dataKey="value"
                          fill="#0F766E"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="price" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Price Range Filter Distribution</CardTitle>
                <CardDescription>
                  Percentage of users filtering by each price range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={priceRangeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {priceRangeData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Range Filter Usage</CardTitle>
                <CardDescription>
                  Number of users filtering by each price range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priceRangeData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                        <Bar
                          dataKey="value"
                          fill="#0F766E"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Location Filter Distribution</CardTitle>
                <CardDescription>
                  Percentage of users filtering by each location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {locationData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Filter Usage</CardTitle>
                <CardDescription>
                  Number of users filtering by each location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={locationData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Usage"]}
                        />
                        <Bar
                          dataKey="value"
                          fill="#0F766E"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Coffee,
  Utensils,
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  Star,
  Clock,
  Calendar,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Download,
  Filter,
} from "lucide-react";

interface BangkokCafeAnalyticsProps {
  data?: any;
}

const BangkokCafeAnalytics: React.FC<BangkokCafeAnalyticsProps> = ({
  data,
}) => {
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line">("bar");
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">(
    "month",
  );

  // Mock data for charts
  const typeDistribution = [
    { name: "Cafe", value: 42 },
    { name: "Restaurant", value: 28 },
    { name: "Bakery", value: 15 },
    { name: "Coffee Shop", value: 15 },
  ];

  const priceDistribution = [
    { name: "฿", value: 25 },
    { name: "฿฿", value: 40 },
    { name: "฿฿฿", value: 30 },
    { name: "฿฿฿฿", value: 5 },
  ];

  const neighborhoodDistribution = [
    { name: "Sukhumvit", value: 22 },
    { name: "Silom", value: 18 },
    { name: "Siam", value: 15 },
    { name: "Thonglor", value: 12 },
    { name: "Ekkamai", value: 10 },
    { name: "Ari", value: 8 },
    { name: "Others", value: 15 },
  ];

  const monthlyTrends = [
    { name: "Jan", cafes: 38, restaurants: 25, bakeries: 12, coffeeShops: 12 },
    { name: "Feb", cafes: 39, restaurants: 26, bakeries: 13, coffeeShops: 13 },
    { name: "Mar", cafes: 40, restaurants: 27, bakeries: 14, coffeeShops: 14 },
    { name: "Apr", cafes: 41, restaurants: 27, bakeries: 14, coffeeShops: 14 },
    { name: "May", cafes: 42, restaurants: 28, bakeries: 15, coffeeShops: 15 },
    { name: "Jun", cafes: 43, restaurants: 28, bakeries: 15, coffeeShops: 15 },
    { name: "Jul", cafes: 44, restaurants: 29, bakeries: 16, coffeeShops: 16 },
    { name: "Aug", cafes: 45, restaurants: 30, bakeries: 16, coffeeShops: 16 },
    { name: "Sep", cafes: 46, restaurants: 30, bakeries: 17, coffeeShops: 17 },
    { name: "Oct", cafes: 47, restaurants: 31, bakeries: 17, coffeeShops: 17 },
    { name: "Nov", cafes: 48, restaurants: 32, bakeries: 18, coffeeShops: 18 },
    { name: "Dec", cafes: 49, restaurants: 32, bakeries: 18, coffeeShops: 18 },
  ];

  const growthTrends = [
    { name: "Jan", growth: 2.1 },
    { name: "Feb", growth: 2.3 },
    { name: "Mar", growth: 2.5 },
    { name: "Apr", growth: 2.4 },
    { name: "May", growth: 2.6 },
    { name: "Jun", growth: 2.8 },
    { name: "Jul", growth: 3.0 },
    { name: "Aug", growth: 3.2 },
    { name: "Sep", growth: 3.5 },
    { name: "Oct", growth: 3.8 },
    { name: "Nov", growth: 4.0 },
    { name: "Dec", growth: 4.2 },
  ];

  const customerDemographics = [
    { name: "Locals", value: 55 },
    { name: "Tourists", value: 30 },
    { name: "Business", value: 15 },
  ];

  const COLORS = [
    "#f59e0b",
    "#3b82f6",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
  ];

  // Top performing establishments
  const topPerformers = [
    {
      name: "Coffee House",
      type: "cafe",
      rating: 4.8,
      growth: 12,
      marketShare: 8,
    },
    {
      name: "Thai Kitchen",
      type: "restaurant",
      rating: 4.7,
      growth: 10,
      marketShare: 7,
    },
    {
      name: "Brew Lab",
      type: "coffee shop",
      rating: 4.9,
      growth: 15,
      marketShare: 6,
    },
    {
      name: "Basil Bistro",
      type: "restaurant",
      rating: 4.6,
      growth: 8,
      marketShare: 5,
    },
    {
      name: "Aroma Corner",
      type: "cafe",
      rating: 4.5,
      growth: 9,
      marketShare: 5,
    },
  ];

  // Market insights
  const marketInsights = [
    "Cafes with outdoor seating show 15% higher customer retention",
    "Establishments offering vegan options have seen 22% growth in the past year",
    "Specialty coffee shops command 30% higher prices on average",
    "Thonglor area has the highest concentration of premium establishments",
    "Breakfast-focused cafes see 40% of their traffic before 11am",
  ];

  return (
    <div className="p-6 bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-800 flex items-center">
              <Coffee className="mr-2 h-6 w-6" />
              Bangkok Cafe & Restaurant Market Analysis
            </h1>
            <p className="text-amber-700">
              Comprehensive data on 100 establishments across Bangkok
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="border-amber-200 text-amber-800 hover:bg-amber-100"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="border-amber-200 text-amber-800 hover:bg-amber-100"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-amber-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-amber-700">Total Establishments</p>
                  <h3 className="text-2xl font-bold">100</h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <Coffee className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8% growth
                </Badge>
                <span className="text-gray-500 ml-2">from last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-amber-700">Average Rating</p>
                  <h3 className="text-2xl font-bold">4.2</h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <Star className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +0.3 points
                </Badge>
                <span className="text-gray-500 ml-2">from last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-amber-700">Avg. Daily Visitors</p>
                  <h3 className="text-2xl font-bold">175</h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12% growth
                </Badge>
                <span className="text-gray-500 ml-2">from last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-amber-700">Avg. Spend</p>
                  <h3 className="text-2xl font-bold">฿450</h3>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +5% growth
                </Badge>
                <span className="text-gray-500 ml-2">from last quarter</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <Button
              variant={activeChart === "bar" ? "default" : "outline"}
              className={
                activeChart === "bar"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setActiveChart("bar")}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Bar
            </Button>
            <Button
              variant={activeChart === "pie" ? "default" : "outline"}
              className={
                activeChart === "pie"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setActiveChart("pie")}
            >
              <PieChartIcon className="mr-2 h-4 w-4" />
              Pie
            </Button>
            <Button
              variant={activeChart === "line" ? "default" : "outline"}
              className={
                activeChart === "line"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setActiveChart("line")}
            >
              <LineChartIcon className="mr-2 h-4 w-4" />
              Line
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button
              variant={timeRange === "day" ? "default" : "outline"}
              size="sm"
              className={
                timeRange === "day"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setTimeRange("day")}
            >
              Day
            </Button>
            <Button
              variant={timeRange === "week" ? "default" : "outline"}
              size="sm"
              className={
                timeRange === "week"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setTimeRange("week")}
            >
              Week
            </Button>
            <Button
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              className={
                timeRange === "month"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setTimeRange("month")}
            >
              Month
            </Button>
            <Button
              variant={timeRange === "year" ? "default" : "outline"}
              size="sm"
              className={
                timeRange === "year"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "border-amber-200 text-amber-800 hover:bg-amber-100"
              }
              onClick={() => setTimeRange("year")}
            >
              Year
            </Button>
          </div>
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-white border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">
                Establishment Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {activeChart === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={typeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#fbbf24",
                        }}
                        cursor={{ fill: "#fef3c7" }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#f59e0b"
                        name="Number of Establishments"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {activeChart === "pie" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={typeDistribution}
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
                        {typeDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#fbbf24",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {activeChart === "line" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#fbbf24",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="cafes"
                        stroke="#f59e0b"
                        activeDot={{ r: 8 }}
                        name="Cafes"
                      />
                      <Line
                        type="monotone"
                        dataKey="restaurants"
                        stroke="#3b82f6"
                        name="Restaurants"
                      />
                      <Line
                        type="monotone"
                        dataKey="bakeries"
                        stroke="#10b981"
                        name="Bakeries"
                      />
                      <Line
                        type="monotone"
                        dataKey="coffeeShops"
                        stroke="#8b5cf6"
                        name="Coffee Shops"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">
                Neighborhood Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {activeChart === "bar" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={neighborhoodDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#fbbf24",
                        }}
                        cursor={{ fill: "#fef3c7" }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        name="Number of Establishments"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {activeChart === "pie" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={neighborhoodDistribution}
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
                        {neighborhoodDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#fbbf24",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {activeChart === "line" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#fbbf24",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="growth"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                        name="Growth Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">
                Price Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {priceDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderColor: "#fbbf24",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">
                Customer Demographics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerDemographics}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerDemographics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderColor: "#fbbf24",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800">Market Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {marketInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2 mt-0.5 flex-shrink-0">
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="bg-white border-amber-200 mb-6">
          <CardHeader>
            <CardTitle className="text-amber-800">
              Top Performing Establishments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-amber-200">
                    <th className="text-left py-3 px-4 text-amber-800">Name</th>
                    <th className="text-left py-3 px-4 text-amber-800">Type</th>
                    <th className="text-left py-3 px-4 text-amber-800">
                      Rating
                    </th>
                    <th className="text-left py-3 px-4 text-amber-800">
                      Growth
                    </th>
                    <th className="text-left py-3 px-4 text-amber-800">
                      Market Share
                    </th>
                    <th className="text-left py-3 px-4 text-amber-800">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPerformers.map((performer, index) => (
                    <tr
                      key={index}
                      className="border-b border-amber-100 hover:bg-amber-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{performer.name}</div>
                      </td>
                      <td className="py-3 px-4 capitalize">{performer.type}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>{performer.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-800">
                          +{performer.growth}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full max-w-xs">
                          <Progress
                            value={performer.marketShare * 5}
                            className="h-2"
                          >
                            <div
                              className="h-full bg-amber-600 rounded-full"
                              style={{ width: `${performer.marketShare * 5}%` }}
                            />
                          </Progress>
                          <span className="text-xs">
                            {performer.marketShare}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-white border-amber-200">
          <CardHeader>
            <CardTitle className="text-amber-800">
              Market Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">
                  Growth Opportunities
                </h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5 flex-shrink-0">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                    <p>Specialty coffee market is growing at 15% annually</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5 flex-shrink-0">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                    <p>Ari neighborhood shows potential for upscale cafes</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 mt-0.5 flex-shrink-0">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                    <p>
                      Plant-based menu options can attract new customer segments
                    </p>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Market Trends
                </h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <Coffee className="h-3 w-3" />
                    </div>
                    <p>Increasing demand for ethically sourced coffee</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <Coffee className="h-3 w-3" />
                    </div>
                    <p>
                      Digital ordering and delivery services adoption rising
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2 mt-0.5 flex-shrink-0">
                      <Coffee className="h-3 w-3" />
                    </div>
                    <p>
                      Instagram-friendly aesthetics driving customer traffic
                    </p>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <h3 className="font-medium text-amber-800 mb-2">
                  Strategic Recommendations
                </h3>
                <ul className="space-y-2 text-sm text-amber-700">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2 mt-0.5 flex-shrink-0">
                      <MapPin className="h-3 w-3" />
                    </div>
                    <p>Focus expansion on Sukhumvit and Thonglor areas</p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2 mt-0.5 flex-shrink-0">
                      <MapPin className="h-3 w-3" />
                    </div>
                    <p>
                      Develop mid-range pricing strategy (฿฿-฿฿฿) for optimal
                      market fit
                    </p>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2 mt-0.5 flex-shrink-0">
                      <MapPin className="h-3 w-3" />
                    </div>
                    <p>
                      Invest in outdoor seating and workspace-friendly
                      environments
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BangkokCafeAnalytics;

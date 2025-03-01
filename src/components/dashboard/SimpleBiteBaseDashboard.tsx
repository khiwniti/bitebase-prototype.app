import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  Map,
  DollarSign,
  Megaphone,
  Search,
  Filter,
  Download,
  Star,
  MapPin,
  Users,
  TrendingUp,
} from "lucide-react";

const SimpleBiteBaseDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "product" | "place" | "price" | "promotion"
  >("place");
  const [searchQuery, setSearchQuery] = useState("");

  // Competitor comparison data
  const competitorComparison = [
    {
      name: "Your Restaurant",
      rating: 4.6,
      price: "฿฿",
      sales: 52000,
      growth: 12,
    },
    {
      name: "Thai Kitchen",
      rating: 4.7,
      price: "฿฿",
      sales: 48000,
      growth: 10,
    },
    {
      name: "Spice Bistro",
      rating: 4.5,
      price: "฿฿฿",
      sales: 45000,
      growth: 8,
    },
    { name: "Golden Plate", rating: 4.2, price: "฿฿", sales: 38000, growth: 5 },
    {
      name: "Basil Garden",
      rating: 4.8,
      price: "฿฿฿฿",
      sales: 60000,
      growth: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              BiteBase AI Restaurant Market Analysis
            </h1>
            <p className="text-gray-600">
              Comprehensive data-driven insights for restaurant business
              planning
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search locations..."
                className="pl-10 pr-4 h-10 bg-white shadow-sm border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
          className="mb-4"
        >
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
            <TabsTrigger value="product" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Product
            </TabsTrigger>
            <TabsTrigger value="place" className="flex items-center">
              <Map className="mr-2 h-4 w-4" />
              Place
            </TabsTrigger>
            <TabsTrigger value="price" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Price
            </TabsTrigger>
            <TabsTrigger value="promotion" className="flex items-center">
              <Megaphone className="mr-2 h-4 w-4" />
              Promotion
            </TabsTrigger>
          </TabsList>

          {/* Product Tab Content */}
          <TabsContent value="product" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <Card className="col-span-8">
                <CardHeader>
                  <CardTitle>Menu Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    Menu performance chart will appear here
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Food Cost vs. Profitability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    Cost breakdown chart will appear here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Place Tab Content */}
          <TabsContent value="place" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <Card className="col-span-8 row-span-2">
                <CardHeader>
                  <CardTitle>Geographic Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 flex items-center justify-center h-[500px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    Map visualization will appear here
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Competitor Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {competitorComparison.slice(0, 3).map((comp, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 border border-gray-100"
                      >
                        <div>
                          <div className="font-medium">{comp.name}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                            <span>{comp.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{comp.price}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-1">
                      Market Saturation
                    </h3>
                    <p className="text-sm text-blue-700">
                      This area has moderate competition with 4 similar
                      establishments within 1km radius.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Delivery & Pickup Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">
                        Delivery Hotspots
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-amber-50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-amber-900">
                            1.2 km
                          </div>
                          <div className="text-xs text-amber-700">
                            Avg. Delivery Distance
                          </div>
                        </div>
                        <div className="bg-amber-50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-amber-900">
                            22 min
                          </div>
                          <div className="text-xs text-amber-700">
                            Avg. Delivery Time
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <h3 className="font-medium text-green-800 mb-1">
                        Recommendation
                      </h3>
                      <p className="text-sm text-green-700">
                        Optimize for delivery to Sukhumvit area (high demand)
                        and promote pickup options to reduce delivery costs.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Price Tab Content */}
          <TabsContent value="price" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <Card className="col-span-8">
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    Revenue forecast chart will appear here
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Key Financial Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-700">
                        ฿48.5k
                      </div>
                      <div className="text-sm text-blue-600">
                        Avg. Monthly Revenue
                      </div>
                      <div className="flex items-center justify-center mt-1 text-green-600 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+8.5%</span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-700">
                        ฿9.7k
                      </div>
                      <div className="text-sm text-green-600">
                        Avg. Monthly Profit
                      </div>
                      <div className="flex items-center justify-center mt-1 text-green-600 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        <span>+12.3%</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-1">
                      Financial Insight
                    </h3>
                    <p className="text-sm text-blue-700">
                      Current profit margins are above industry average (15%).
                      Focus on maintaining food costs while scaling operations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Promotion Tab Content */}
          <TabsContent value="promotion" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <Card className="col-span-6">
                <CardHeader>
                  <CardTitle>Customer Segmentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    Customer segmentation chart will appear here
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-6">
                <CardHeader>
                  <CardTitle>Marketing ROI Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-8 flex items-center justify-center h-[300px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                    Marketing ROI chart will appear here
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-12">
                <CardHeader>
                  <CardTitle>Marketing Campaign Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-1">
                        Seasonal Promotion
                      </h3>
                      <p className="text-sm text-blue-700">
                        Launch a summer menu promotion featuring light dishes
                        and refreshing drinks to capitalize on seasonal
                        preferences.
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <h3 className="font-medium text-green-800 mb-1">
                        Loyalty Program
                      </h3>
                      <p className="text-sm text-green-700">
                        Implement a digital loyalty program offering a free dish
                        after 10 visits to increase customer retention rate.
                      </p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <h3 className="font-medium text-amber-800 mb-1">
                        Review Campaign
                      </h3>
                      <p className="text-sm text-amber-700">
                        Encourage customers to leave reviews by offering a 10%
                        discount on their next visit, focusing on improving
                        online visibility.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SimpleBiteBaseDashboard;

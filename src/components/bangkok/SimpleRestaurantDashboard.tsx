import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Star } from "lucide-react";

const SimpleRestaurantDashboard = () => {
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
              Restaurant Market Analysis Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive data on Bangkok's restaurant market
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search locations..."
                className="pl-10 pr-4 h-10 bg-white shadow-sm border-gray-200"
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

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  CATEGORIES
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Thai</span>
                  </div>
                  <span className="text-xs font-medium">42%</span>
                </div>
                <Progress value={42} className="h-1" />

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-sm">International</span>
                  </div>
                  <span className="text-xs font-medium">28%</span>
                </div>
                <Progress value={28} className="h-1">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: "28%" }}
                  />
                </Progress>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Fusion</span>
                  </div>
                  <span className="text-xs font-medium">15%</span>
                </div>
                <Progress value={15} className="h-1">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "15%" }}
                  />
                </Progress>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  POPULAR AREAS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sukhumvit</span>
                  <span className="text-xs font-medium">22%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Silom</span>
                  <span className="text-xs font-medium">18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Siam</span>
                  <span className="text-xs font-medium">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Thonglor</span>
                  <span className="text-xs font-medium">12%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-8 flex items-center justify-center h-[400px] bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
                  Map visualization will appear here
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  COMPETITOR COMPARISON
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {competitorComparison.map((comp, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium text-sm">{comp.name}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                        <span>{comp.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{comp.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        ฿{(comp.sales / 1000).toFixed(1)}k
                      </div>
                      <div className="text-xs text-green-600">
                        +{comp.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  MARKET INSIGHTS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800">
                    Thai cuisine remains the most popular category with 42%
                    market share
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-800">
                    Sukhumvit area shows highest growth potential at 22%
                  </p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-sm text-amber-800">
                    Mid-range restaurants (฿฿) perform best in current market
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRestaurantDashboard;

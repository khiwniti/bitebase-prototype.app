import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Filter,
  Tag,
  Clock,
  Calendar,
} from "lucide-react";

interface ProductInsightsProps {
  topDishes: any[];
  lowPerformingDishes: any[];
  monthlyRevenue: any[];
}

const ProductInsights: React.FC<ProductInsightsProps> = ({
  topDishes = [],
  lowPerformingDishes = [],
  monthlyRevenue = [],
}) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Top Selling & Low Performing Dishes */}
      <Card className="col-span-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Menu Performance Analysis</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Select defaultValue="sales">
                <SelectTrigger className="h-8 w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Volume</SelectItem>
                  <SelectItem value="profit">Profit Margin</SelectItem>
                  <SelectItem value="growth">Growth Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="top">
            <TabsList className="mb-4">
              <TabsTrigger value="top">Top Performers</TabsTrigger>
              <TabsTrigger value="low">Low Performers</TabsTrigger>
            </TabsList>
            <TabsContent value="top">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topDishes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                      cursor={{ fill: "#f9fafb" }}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Sales Volume" fill="#3b82f6" />
                    <Bar dataKey="profit" name="Profit Margin (%)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="low">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={lowPerformingDishes} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                      cursor={{ fill: "#f9fafb" }}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Sales Volume" fill="#ef4444" />
                    <Bar dataKey="cost" name="Food Cost (%)" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Food Cost vs. Profitability */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Food Cost vs. Profitability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" dataKey="cost" name="Food Cost (%)" domain={[40, 90]} />
                <YAxis type="number" dataKey="profit" name="Profit Margin (%)" domain={[15, 55]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                  formatter={(value, name) => {
                    if (name === 'Food Cost (%)' || name === 'Profit Margin (%)') 
                      return [`${value}%`, name];
                    return [value, name];
                  }}
                />
                <Legend />
                <Scatter 
                  name="Top Dishes" 
                  data={topDishes} 
                  fill="#3b82f6" 
                  shape="circle"
                />
                <Scatter 
                  name="Low Performing" 
                  data={lowPerformingDishes} 
                  fill="#ef4444" 
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Seasonal & Trend Analysis */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Seasonal & Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  name="Revenue (฿)"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="customers"
                  name="Customer Count"
                  stroke="#10b981"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Pricing Recommendations */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Dynamic Pricing Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">Premium Pricing Window</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Increase prices for Pad Thai and Green Curry by 10-15% during peak hours (18:00-20:00) on weekends to maximize revenue.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Tag className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Bundle Opportunities</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Create a "Family Special" bundle with Tom Yum Soup, Green Curry, and Spring Rolls at a 15% discount to increase average order value.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Happy Hour Strategy</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Implement a 25% discount on low-performing dishes during 14:00-17:00 to increase traffic during slow periods and test customer response.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-purple-800">Seasonal Pricing</h3>
                  <p className="text-sm text-purple-700 mt-1">
                    Adjust pricing for Mango Sticky Rice by +20% during peak mango season (April-June) when quality is highest and demand increases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInsights; 
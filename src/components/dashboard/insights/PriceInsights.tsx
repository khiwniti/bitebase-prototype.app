import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface PriceInsightsProps {
  monthlyRevenue: any[];
  hourlyTraffic: any[];
  promotionEffectiveness: any[];
  customerSpendingBehavior: any[];
}

const PriceInsights: React.FC<PriceInsightsProps> = ({
  monthlyRevenue = [],
  hourlyTraffic = [],
  promotionEffectiveness = [],
  customerSpendingBehavior = [],
}) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sales & Revenue Forecasting */}
      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Revenue Forecast & Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                  formatter={(value) => [`฿${value}`, "Revenue"]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Actual Revenue"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="customers"
                  name="Customer Count"
                  stroke="#10b981"
                  fill="#6ee7b7"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Key Financial Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-700">฿48.5k</div>
              <div className="text-sm text-blue-600">Avg. Monthly Revenue</div>
              <div className="flex items-center justify-center mt-1 text-green-600 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+8.5%</span>
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-700">฿9.7k</div>
              <div className="text-sm text-green-600">Avg. Monthly Profit</div>
              <div className="flex items-center justify-center mt-1 text-green-600 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+12.3%</span>
              </div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-amber-700">฿28</div>
              <div className="text-sm text-amber-600">Avg. Order Value</div>
              <div className="flex items-center justify-center mt-1 text-green-600 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+5.2%</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-700">20%</div>
              <div className="text-sm text-purple-600">Profit Margin</div>
              <div className="flex items-center justify-center mt-1 text-green-600 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                <span>+2.1%</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-1">Financial Insight</h3>
            <p className="text-sm text-blue-700">Current profit margins are above industry average (15%). Focus on maintaining food costs while scaling operations.</p>
          </div>
        </CardContent>
      </Card>

      {/* Peak Days & Hours Analysis */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Peak Hours Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyTraffic}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                />
                <Bar dataKey="traffic" name="Customer Traffic" fill="#3b82f6">
                  {hourlyTraffic.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.traffic >= 80 ? "#ef4444" : entry.traffic >= 50 ? "#f59e0b" : "#3b82f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Discount & Promotion Effectiveness */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Promotion Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-700">22%</div>
                <div className="text-xs text-blue-600">Discount Usage</div>
              </div>
              <div className="bg-green-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold text-green-700">2.4x</div>
                <div className="text-xs text-green-600">ROI on Promos</div>
              </div>
              <div className="bg-amber-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold text-amber-700">35%</div>
                <div className="text-xs text-amber-600">New Customers</div>
              </div>
            </div>
            <div className="space-y-3">
              {promotionEffectiveness.map((promo, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{promo.name}</span>
                    <span className="text-xs font-medium">{promo.roi}% ROI</span>
                  </div>
                  <Progress value={promo.roi / 5} className="h-2">
                    <div 
                      className={`h-full rounded-full ${
                        promo.roi >= 300 ? 'bg-green-500' : 
                        promo.roi >= 200 ? 'bg-blue-500' : 
                        promo.roi >= 100 ? 'bg-amber-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${promo.roi / 5}%` }} 
                    />
                  </Progress>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Spending Behavior */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Customer Spending Behavior</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerSpendingBehavior}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="segment" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgSpend"
                  name="Avg. Spend (฿)"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="frequency"
                  name="Visit Frequency (per month)"
                  stroke="#10b981"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="loyaltyRate"
                  name="Loyalty Rate (%)"
                  stroke="#f59e0b"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceInsights; 
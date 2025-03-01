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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Calendar,
  Users,
  Star,
} from "lucide-react";

interface PromotionInsightsProps {
  customerSegments: any[];
  marketingEffectiveness: any[];
  sentimentAnalysis: any[];
  marketingCampaignData: any[];
}

const PromotionInsights: React.FC<PromotionInsightsProps> = ({
  customerSegments = [],
  marketingEffectiveness = [],
  sentimentAnalysis = [],
  marketingCampaignData = [],
}) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Customer Segmentation & Loyalty */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Customer Segmentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Regulars (3+ visits/month)", value: 35, color: "#3b82f6" },
                    { name: "Occasionals (1-2 visits/month)", value: 40, color: "#f59e0b" },
                    { name: "First-timers", value: 25, color: "#10b981" },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                  formatter={(value) => [`${value}%`, "Percentage"]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Ad Performance & ROI */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Marketing ROI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketingEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="value" name="Budget Allocation (%)" fill="#3b82f6" />
                <Bar yAxisId="right" dataKey="roi" name="ROI (x)" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Analysis */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sentimentAnalysis.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-xs font-medium">
                    {item.positive}% Positive
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: `${item.positive}%` }}
                    ></div>
                    <div
                      className="bg-gray-400 h-full"
                      style={{ width: `${item.neutral}%` }}
                    ></div>
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: `${item.negative}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Positive</span>
                  <span>Neutral</span>
                  <span>Negative</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Suggestions */}
      <Card className="col-span-6">
        <CardHeader>
          <CardTitle>Marketing Campaign Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <div className="flex items-center mb-1">
                <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-800">Seasonal Promotion</h3>
              </div>
              <p className="text-sm text-blue-700">Launch a summer menu promotion featuring light dishes and refreshing drinks to capitalize on seasonal preferences.</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <div className="flex items-center mb-1">
                <Users className="h-4 w-4 text-green-600 mr-2" />
                <h3 className="font-medium text-green-800">Loyalty Program</h3>
              </div>
              <p className="text-sm text-green-700">Implement a digital loyalty program offering a free dish after 10 visits to increase customer retention rate.</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <div className="flex items-center mb-1">
                <Star className="h-4 w-4 text-amber-600 mr-2" />
                <h3 className="font-medium text-amber-800">Review Campaign</h3>
              </div>
              <p className="text-sm text-amber-700">Encourage customers to leave reviews by offering a 10% discount on their next visit, focusing on improving online visibility.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Campaign Performance */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Marketing Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marketingCampaignData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                />
                <Legend />
                <Bar dataKey="roi" name="ROI (x)" fill="#10b981" />
                <Bar dataKey="conversion" name="Conversion Rate (%)" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionInsights; 
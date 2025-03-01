import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataVisualizerProps {
  data?: any[];
}

const DataVisualizer = ({
  data = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 500 },
    { name: "Thu", value: 280 },
    { name: "Fri", value: 590 },
    { name: "Sat", value: 800 },
    { name: "Sun", value: 700 },
  ],
}: DataVisualizerProps) => {
  return (
    <Card className="w-full h-full bg-zinc-900/90 backdrop-blur-sm border-zinc-800 text-white">
      <CardHeader>
        <CardTitle>Customer Traffic Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181B",
                  border: "1px solid #3F3F46",
                  borderRadius: "6px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualizer;

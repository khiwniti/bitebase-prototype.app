import React from "react";
import MetricCard from "./MetricCard";

interface MetricsGridProps {
  metrics?: Array<{
    title: string;
    value: string | number;
    trend: number;
    description: string;
    type: "competitors" | "customers" | "revenue";
  }>;
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  const defaultMetrics = [
    {
      title: "Competitor Analysis",
      value: "12",
      trend: 8,
      description: "New competitors in your area this month",
      type: "competitors" as const,
    },
    {
      title: "Customer Behavior",
      value: "2,547",
      trend: 12,
      description: "Active customers in the last 30 days",
      type: "customers" as const,
    },
    {
      title: "Revenue Forecast",
      value: "$45,678",
      trend: -2,
      description: "Projected revenue for next month",
      type: "revenue" as const,
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            description={metric.description}
            type={metric.type}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;

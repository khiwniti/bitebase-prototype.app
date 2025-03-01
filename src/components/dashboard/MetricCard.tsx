import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  title?: string;
  value?: string | number;
  trend?: number;
  description?: string;
  type?: "competitors" | "customers" | "revenue";
}

const MetricCard = ({
  title = "Metric Title",
  value = "0",
  trend = 0,
  description = "This is a sample insight about your business metrics.",
  type = "competitors",
}: MetricCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "competitors":
        return <TrendingUp className="h-6 w-6" />;
      case "customers":
        return <Users className="h-6 w-6" />;
      case "revenue":
        return <DollarSign className="h-6 w-6" />;
      default:
        return <TrendingUp className="h-6 w-6" />;
    }
  };

  return (
    <Card className="w-full h-full bg-zinc-900/90 backdrop-blur-sm border-zinc-800 text-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 mt-2">
          <span
            className={`text-sm ${trend >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {trend >= 0 ? "+" : ""}
            {trend}%
          </span>
          <span className="text-sm text-muted-foreground">from last month</span>
        </div>
        <p className="text-sm text-muted-foreground mt-4">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This insight was helpful</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This insight was not helpful</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default MetricCard;

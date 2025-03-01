import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  AreaChart,
  Area,
} from "recharts";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
  Polygon,
} from "react-leaflet";
import { Icon } from "leaflet";
import {
  Coffee,
  Utensils,
  Users,
  TrendingUp,
  DollarSign,
  MapPin,
  Star,
  Clock,
  Download,
  Filter,
  Search,
  Globe,
  PieChart as PieChartIcon,
  BarChart2,
  AlertCircle,
  Info,
  Truck,
  ShoppingBag,
  Map,
  Tag,
  Megaphone,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  ChevronDown,
  MousePointer,
  Crosshair,
  Cursor,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Import insight components
import ProductInsights from "./insights/ProductInsights";
import PlaceInsights from "./insights/PlaceInsights";
import PriceInsights from "./insights/PriceInsights";
import PromotionInsights from "./insights/PromotionInsights";

const BiteBaseDashboard = () => {
  const [activeTab, setActiveTab] = useState<"product" | "place" | "price" | "promotion">("place");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [analysisRadius, setAnalysisRadius] = useState(1000); // meters

  // Customer density data
  const customerDensity = [
    { id: "1", position: [13.7563, 100.5018], density: 85, color: "#3b82f6" },
    { id: "2", position: [13.7469, 100.5349], density: 65, color: "#3b82f6" },
    { id: "3", position: [13.7262, 100.5149], density: 95, color: "#ef4444" },
    { id: "4", position: [13.7372, 100.5789], density: 75, color: "#f59e0b" },
    { id: "5", position: [13.7463, 100.5318], density: 90, color: "#ef4444" },
    { id: "6", position: [13.7663, 100.5118], density: 60, color: "#3b82f6" },
    { id: "7", position: [13.7363, 100.5418], density: 80, color: "#f59e0b" },
    { id: "8", position: [13.7163, 100.5218], density: 70, color: "#f59e0b" },
    { id: "9", position: [13.7763, 100.5318], density: 55, color: "#3b82f6" },
    { id: "10", position: [13.7463, 100.5618], density: 85, color: "#ef4444" },
  ];

  // Competitor data
  const competitors = [
    { id: "c1", position: [13.7503, 100.5048], name: "Thai Kitchen", rating: 4.7, price: "฿฿" },
    { id: "c2", position: [13.7429, 100.5379], name: "Spice Bistro", rating: 4.5, price: "฿฿฿" },
    { id: "c3", position: [13.7222, 100.5179], name: "Golden Plate", rating: 4.2, price: "฿฿" },
    { id: "c4", position: [13.7332, 100.5819], name: "Basil Garden", rating: 4.8, price: "฿฿฿฿" },
    { id: "c5", position: [13.7423, 100.5348], name: "Siam Spice", rating: 4.3, price: "฿฿" },
    { id: "c6", position: [13.7623, 100.5148], name: "Bangkok Bites", rating: 4.6, price: "฿฿฿" },
    { id: "c7", position: [13.7323, 100.5448], name: "Royal Thai", rating: 4.4, price: "฿฿฿" },
    { id: "c8", position: [13.7123, 100.5248], name: "Lemongrass", rating: 4.1, price: "฿฿" },
  ];

  // Top dishes data
  const topDishes = [
    { name: "Pad Thai", sales: 350, profit: 45, cost: 55, growth: 8 },
    { name: "Green Curry", sales: 280, profit: 50, cost: 50, growth: 12 },
    { name: "Tom Yum Soup", sales: 250, profit: 55, cost: 45, growth: 5 },
    { name: "Mango Sticky Rice", sales: 220, profit: 60, cost: 40, growth: 15 },
    { name: "Spring Rolls", sales: 200, profit: 40, cost: 60, growth: 3 },
  ];

  // Low performing dishes
  const lowPerformingDishes = [
    { name: "Fried Rice", sales: 120, decline: -8, profit: 25, cost: 75, reason: "High competition" },
    { name: "Pad See Ew", sales: 100, decline: -5, profit: 30, cost: 70, reason: "Inconsistent quality" },
    { name: "Thai Omelette", sales: 90, decline: -10, profit: 20, cost: 80, reason: "Low profit margin" },
    { name: "Chicken Satay", sales: 80, decline: -12, profit: 28, cost: 72, reason: "Rising ingredient costs" },
  ];

  // Monthly revenue data
  const monthlyRevenue = [
    { month: "Jan", revenue: 42000, customers: 1500 },
    { month: "Feb", revenue: 38000, customers: 1400 },
    { month: "Mar", revenue: 45000, customers: 1600 },
    { month: "Apr", revenue: 50000, customers: 1800 },
    { month: "May", revenue: 55000, customers: 2000 },
    { month: "Jun", revenue: 58000, customers: 2100 },
    { month: "Jul", revenue: 56000, customers: 2050 },
    { month: "Aug", revenue: 52000, customers: 1900 },
    { month: "Sep", revenue: 48000, customers: 1750 },
    { month: "Oct", revenue: 45000, customers: 1650 },
    { month: "Nov", revenue: 47000, customers: 1700 },
    { month: "Dec", revenue: 60000, customers: 2200 },
  ];

  // Hourly traffic data
  const hourlyTraffic = [
    { hour: "6-8", traffic: 15 },
    { hour: "8-10", traffic: 25 },
    { hour: "10-12", traffic: 40 },
    { hour: "12-14", traffic: 65 },
    { hour: "14-16", traffic: 45 },
    { hour: "16-18", traffic: 35 },
    { hour: "18-20", traffic: 70 },
    { hour: "20-22", traffic: 55 },
    { hour: "22-24", traffic: 30 },
  ];

  // Promotion effectiveness
  const promotionEffectiveness = [
    { name: "Happy Hour (30% off)", revenue: 12000, cost: 3600, roi: 233, customers: 350 },
    { name: "Buy 1 Get 1 Free", revenue: 15000, cost: 7500, roi: 100, customers: 420 },
    { name: "Loyalty Points (2x)", revenue: 8500, cost: 1700, roi: 400, customers: 280 },
    { name: "Free Appetizer", revenue: 10000, cost: 2500, roi: 300, customers: 320 },
    { name: "Weekend Brunch Special", revenue: 18000, cost: 5400, roi: 233, customers: 450 },
  ];

  // Customer spending behavior
  const customerSpendingBehavior = [
    { segment: "Students", avgSpend: 22, frequency: 3.2, loyaltyRate: 40 },
    { segment: "Office Workers", avgSpend: 35, frequency: 4.5, loyaltyRate: 65 },
    { segment: "Tourists", avgSpend: 45, frequency: 1.2, loyaltyRate: 15 },
    { segment: "Families", avgSpend: 120, frequency: 2.1, loyaltyRate: 55 },
    { segment: "Business Diners", avgSpend: 85, frequency: 3.8, loyaltyRate: 70 },
  ];

  // Marketing effectiveness
  const marketingEffectiveness = [
    { name: "Social Media", value: 35, roi: 3.2 },
    { name: "Local Ads", value: 25, roi: 2.5 },
    { name: "Email", value: 15, roi: 4.8 },
    { name: "Partnerships", value: 20, roi: 3.5 },
    { name: "Events", value: 5, roi: 1.8 },
  ];

  // Sentiment analysis
  const sentimentAnalysis = [
    { category: "Food Quality", positive: 85, neutral: 10, negative: 5 },
    { category: "Service", positive: 75, neutral: 15, negative: 10 },
    { category: "Ambiance", positive: 80, neutral: 15, negative: 5 },
    { category: "Value for Money", positive: 70, neutral: 20, negative: 10 },
    { category: "Cleanliness", positive: 90, neutral: 8, negative: 2 },
  ];

  // Marketing campaign data
  const marketingCampaignData = [
    { name: "Social Media Ads", reach: 15000, conversion: 3.5, cost: 5000, roi: 2.1 },
    { name: "Email Newsletter", reach: 8000, conversion: 4.2, cost: 1200, roi: 5.6 },
    { name: "Local Partnerships", reach: 5000, conversion: 6.8, cost: 3000, roi: 3.4 },
    { name: "Influencer Campaign", reach: 25000, conversion: 2.1, cost: 8000, roi: 1.3 },
    { name: "Loyalty Program", reach: 3500, conversion: 12.5, cost: 2500, roi: 4.2 },
  ];

  // Real estate data
  const realEstateData = [
    { area: "Sukhumvit", rent: 850, footfall: 1200, competition: 15, potential: 85 },
    { area: "Silom", rent: 950, footfall: 1500, competition: 20, potential: 80 },
    { area: "Siam", rent: 1200, footfall: 2000, competition: 25, potential: 75 },
    { area: "Thonglor", rent: 1100, footfall: 1300, competition: 18, potential: 82 },
    { area: "Asoke", rent: 1000, footfall: 1600, competition: 22, potential: 78 },
  ];

  // Get marker icon for customer density
  const getDensityMarkerIcon = (density: number) => {
    let color;
    if (density >= 80) {
      color = "#ef4444"; // Red for high density
    } else if (density >= 70) {
      color = "#f59e0b"; // Amber for medium density
    } else {
      color = "#3b82f6"; // Blue for low density
    }

    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color === "#ef4444" ? "red" : color === "#f59e0b" ? "gold" : "blue"}.png`,
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  // Handle map click to select location
  const handleMapClick = (e: any) => {
    setSelectedLocation([e.latlng.lat, e.latlng.lng]);
  };

  // Custom cursor component
  const CustomCursor = () => {
    return (
      <div className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="text-blue-600" />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">BiteBase Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search locations, dishes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 flex-1">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="product" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Product</span>
            </TabsTrigger>
            <TabsTrigger value="place" className="flex items-center">
              <Map className="mr-2 h-4 w-4" />
              <span>Place</span>
            </TabsTrigger>
            <TabsTrigger value="price" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Price</span>
            </TabsTrigger>
            <TabsTrigger value="promotion" className="flex items-center">
              <Megaphone className="mr-2 h-4 w-4" />
              <span>Promotion</span>
            </TabsTrigger>
          </TabsList>

          {/* Product Tab Content */}
          <TabsContent value="product">
            <ProductInsights 
              topDishes={topDishes}
              lowPerformingDishes={lowPerformingDishes}
              monthlyRevenue={monthlyRevenue}
            />
          </TabsContent>

          {/* Place Tab Content */}
          <TabsContent value="place">
            <PlaceInsights 
              customerDensity={customerDensity}
              competitors={competitors}
              realEstateData={realEstateData}
            />
          </TabsContent>

          {/* Price Tab Content */}
          <TabsContent value="price">
            <PriceInsights 
              monthlyRevenue={monthlyRevenue}
              hourlyTraffic={hourlyTraffic}
              promotionEffectiveness={promotionEffectiveness}
              customerSpendingBehavior={customerSpendingBehavior}
            />
          </TabsContent>

          {/* Promotion Tab Content */}
          <TabsContent value="promotion">
            <PromotionInsights 
              customerSegments={customerSpendingBehavior}
              marketingEffectiveness={marketingEffectiveness}
              sentimentAnalysis={sentimentAnalysis}
              marketingCampaignData={marketingCampaignData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BiteBaseDashboard;
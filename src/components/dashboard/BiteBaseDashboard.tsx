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
  ];

  // Top dishes data
  const topDishes = [
    { name: "Pad Thai", sales: 450, growth: 12, profit: 35 },
    { name: "Green Curry", sales: 380, growth: 8, profit: 42 },
    { name: "Tom Yum Soup", sales: 320, growth: 15, profit: 38 },
    { name: "Mango Sticky Rice", sales: 280, growth: 5, profit: 45 },
    { name: "Spring Rolls", sales: 250, growth: 10, profit: 30 },
  ];

  // Monthly revenue data
  const monthlyRevenue = [
    { month: "Jan", revenue: 42000, customers: 1200 },
    { month: "Feb", revenue: 38000, customers: 1100 },
    { month: "Mar", revenue: 45000, customers: 1300 },
    { month: "Apr", revenue: 40000, customers: 1150 },
    { month: "May", revenue: 43000, customers: 1250 },
    { month: "Jun", revenue: 48000, customers: 1400 },
    { month: "Jul", revenue: 52000, customers: 1500 },
    { month: "Aug", revenue: 49000, customers: 1450 },
    { month: "Sep", revenue: 55000, customers: 1600 },
    { month: "Oct", revenue: 58000, customers: 1700 },
    { month: "Nov", revenue: 56000, customers: 1650 },
    { month: "Dec", revenue: 60000, customers: 1800 },
  ];

  // Customer segments
  const customerSegments = [
    { name: "Locals", value: 55, color: "#3b82f6" },
    { name: "Tourists", value: 30, color: "#f59e0b" },
    { name: "Business", value: 15, color: "#10b981" },
  ];

  // Hourly traffic data
  const hourlyTraffic = [
    { hour: "6AM", traffic: 10 },
    { hour: "7AM", traffic: 20 },
    { hour: "8AM", traffic: 40 },
    { hour: "9AM", traffic: 60 },
    { hour: "10AM", traffic: 50 },
    { hour: "11AM", traffic: 70 },
    { hour: "12PM", traffic: 90 },
    { hour: "1PM", traffic: 100 },
    { hour: "2PM", traffic: 80 },
    { hour: "3PM", traffic: 60 },
    { hour: "4PM", traffic: 50 },
    { hour: "5PM", traffic: 70 },
    { hour: "6PM", traffic: 90 },
    { hour: "7PM", traffic: 100 },
    { hour: "8PM", traffic: 85 },
    { hour: "9PM", traffic: 60 },
    { hour: "10PM", traffic: 40 },
    { hour: "11PM", traffic: 20 },
  ];

  // Marketing campaign effectiveness
  const marketingEffectiveness = [
    { name: "Social Media", value: 35, roi: 2.8 },
    { name: "Local Ads", value: 25, roi: 1.9 },
    { name: "Loyalty Program", value: 20, roi: 3.5 },
    { name: "Promotions", value: 15, roi: 2.2 },
    { name: "Events", value: 5, roi: 1.5 },
  ];

  // Sentiment analysis
  const sentimentAnalysis = [
    { category: "Food Quality", positive: 85, neutral: 10, negative: 5 },
    { category: "Service", positive: 75, neutral: 15, negative: 10 },
    { category: "Ambiance", positive: 80, neutral: 15, negative: 5 },
    { category: "Value", positive: 70, neutral: 20, negative: 10 },
    { category: "Cleanliness", positive: 90, neutral: 7, negative: 3 },
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
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">BiteBase AI Restaurant Market Analysis</h1>
            <p className="text-gray-600">Comprehensive data-driven insights for restaurant business planning</p>
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
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="mb-4">
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
              {/* Top Selling & Low Performing Dishes */}
              <Card className="col-span-8">
                <CardHeader>
                  <CardTitle>Menu Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
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
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Food Cost", value: 35 },
                            { name: "Labor", value: 30 },
                            { name: "Overhead", value: 15 },
                            { name: "Profit", value: 20 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#ef4444" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#3b82f6" />
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
                      <h3 className="font-medium text-blue-800 mb-1">Peak Hour Pricing</h3>
                      <p className="text-sm text-blue-700">Increase prices by 10-15% during 12-2PM and 6-8PM to maximize revenue during high-demand periods.</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <h3 className="font-medium text-green-800 mb-1">Weekday Promotions</h3>
                      <p className="text-sm text-green-700">Offer 15% discount on select menu items Monday-Thursday to increase traffic during slower periods.</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <h3 className="font-medium text-amber-800 mb-1">Seasonal Menu Pricing</h3>
                      <p className="text-sm text-amber-700">Adjust pricing for seasonal dishes based on ingredient availability and demand patterns.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Place Tab Content */}
          <TabsContent value="place" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Customer Density Heatmap */}
              <Card className="col-span-8 row-span-2 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Geographic Analysis</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Layers className="mr-2 h-4 w-4" />
                        Layers
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <MousePointer className="mr-2 h-4 w-4" />
                        Select Location
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px] relative">
                    <MapContainer
                      center={[13.7563, 100.5018]}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                      zoomControl={false}
                      onClick={handleMapClick}
                    >
                      <ZoomControl position="bottomright" />
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      
                      {/* Customer Density Markers */}
                      {customerDensity.map((point) => (
                        <Marker
                          key={point.id}
                          position={point.position}
                          icon={getDensityMarkerIcon(point.density)}
                        >
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-semibold">Customer Density</h3>
                              <p className="text-sm">Density Score: {point.density}%</p>
                              <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${point.density >= 80 ? 'bg-red-500' : point.density >= 70 ? 'bg-amber-500' : 'bg-blue-500'}`}
                                  style={{ width: `${point.density}%` }}
                                ></div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}

                      {/* Competitor Markers */}
                      {competitors.map((comp) => (
                        <Marker
                          key={comp.id}
                          position={comp.position}
                          icon={new Icon({
                            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
                            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41],
                          })}
                        >
                          <Popup>
                            <div className="p-2">
                              <h3 className="font-semibold">{comp.name}</h3>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                                <span>{comp.rating}</span>
                              </div>
                              <p className="text-sm mt-1">Price: {comp.price}</p>
                              <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-100">
                                Competitor
                              </Badge>
                            </div>
                          </Popup>
                        </Marker>
                      ))}

                      {/* Selected Location */}
                      {selectedLocation && (
                        <>
                          <Marker
                            position={selectedLocation}
                            icon={new Icon({
                              iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                              iconSize: [25, 41],
                              iconAnchor: [12, 41],
                              popupAnchor: [1, -34],
                              shadowSize: [41, 41],
                            })}
                          >
                            <Popup>
                              <div className="p-2">
                                <h3 className="font-semibold">Selected Location</h3>
                                <p className="text-sm">Lat: {selectedLocation[0].toFixed(4)}</p>
                                <p className="text-sm">Lng: {selectedLocation[1].toFixed(4)}</p>
                                <Button size="sm" className="mt-2 w-full bg-blue-600 hover:bg-blue-700">
                                  Analyze This Location
                                </Button>
                              </div>
                            </Popup>
                          </Marker>
                          <Circle
                            center={selectedLocation}
                            radius={analysisRadius}
                            pathOptions={{
                              color: "#10b981",
                              fillColor: "#10b981",
                              fillOpacity: 0.1,
                            }}
                          />
                        </>
                      )}
                    </MapContainer>

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000] border border-gray-200">
                      <h3 className="font-semibold text-sm mb-2">Map Legend</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-xs">High Density (80%+)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-xs">Medium Density (70-79%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                          <span className="text-xs">Low Density (<70%)</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                          <span className="text-xs">Competitor</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-xs">Selected Location</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Competitor & Market Landscape */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Competitor Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {competitors.map((comp, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 border border-gray-100">
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
                    <h3 className="font-medium text-blue-800 mb-1">Market Saturation</h3>
                    <p className="text-sm text-blue-700">This area has moderate competition with 4 similar establishments within 1km radius.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery & Pickup Hotspots */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Delivery & Pickup Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Delivery Hotspots</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-amber-50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-amber-900">1.2 km</div>
                          <div className="text-xs text-amber-700">Avg. Delivery Distance</div>
                        </div>
                        <div className="bg-amber-50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-amber-900">22 min</div>
                          <div className="text-xs text-amber-700">Avg. Delivery Time</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Pickup Analysis</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-blue-50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-900">40%</div>
                          <div className="text-xs text-blue-700">Pickup Rate</div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg text-center">
                          <div className="text-lg font-bold text-blue-900">8 min</div>
                          <div className="text-xs text-blue-700">Avg. Pickup Wait</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                      <h3 className="font-medium text-green-800 mb-1">Recommendation</h3>
                      <p className="text-sm text-green-700">Optimize for delivery to Sukhumvit area (high demand) and promote pickup options to reduce delivery costs.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Price Tab Content */}
          <TabsContent value="price" className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              {/* Sales & Revenue Forecasting */}
              <Card className="col-span-8">
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
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
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Happy Hour (30% off)</span>
                          <span className="text-xs font-medium">3.2x ROI</span>
                        </div>
                        <Progress value={80} className="h-2">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }} />
                        </Progress>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Lunch Special (20% off)</span>
                          <span className="text-xs font-medium">2.8x ROI</span>
                        </div>
                        <Progress value={70} className="h-2">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }} />
                        </Progress>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Weekend Brunch (15% off)</span>
                          <span className="text-xs font-medium">1.9x ROI</span>
                        </div>
                        <Progress value={50} className="h-2">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "50%" }} />
                        </Progress>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">BOGO Desserts</span>
                          <span className="text-xs font-medium">1.2x ROI</span>
                        </div>
                        <Progress value={30} className="h-2">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "30%" }} />
                        </Progress>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Promotion Tab Content */}
          <TabsContent value="promotion" className="space-y-4">
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BiteBaseDashboard;
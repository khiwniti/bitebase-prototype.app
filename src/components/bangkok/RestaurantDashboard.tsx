import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
} from "recharts";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
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
} from "lucide-react";

const RestaurantDashboard = () => {
  const [activeTab, setActiveTab] = useState<"map" | "data">("map");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Food cost data
  const foodCostData = {
    delivery: 58.65,
    pickup: 38.65,
    deliveryPercentage: 60,
    pickupPercentage: 40,
  };

  // Operations data
  const operationsData = {
    current: 53.55,
    target: 55.00,
    percentage: 97.4,
  };

  // Monthly revenue data
  const monthlyRevenue = [
    { month: "Jan", revenue: 42000 },
    { month: "Feb", revenue: 38000 },
    { month: "Mar", revenue: 45000 },
    { month: "Apr", revenue: 40000 },
    { month: "May", revenue: 43000 },
    { month: "Jun", revenue: 48000 },
    { month: "Jul", revenue: 52000 },
    { month: "Aug", revenue: 49000 },
    { month: "Sep", revenue: 55000 },
    { month: "Oct", revenue: 58000 },
    { month: "Nov", revenue: 56000 },
    { month: "Dec", revenue: 60000 },
  ];

  // Top dishes data
  const topDishes = [
    { name: "Pad Thai", sales: 450, growth: 12 },
    { name: "Green Curry", sales: 380, growth: 8 },
    { name: "Tom Yum Soup", sales: 320, growth: 15 },
    { name: "Mango Sticky Rice", sales: 280, growth: 5 },
    { name: "Spring Rolls", sales: 250, growth: 10 },
  ];

  // Price range data
  const priceRangeData = [
    { name: "฿", value: 25 },
    { name: "฿฿", value: 40 },
    { name: "฿฿฿", value: 30 },
    { name: "฿฿฿฿", value: 5 },
  ];

  // Customer demographics
  const customerDemographics = [
    { name: "Locals", value: 55, color: "#3b82f6" },
    { name: "Tourists", value: 30, color: "#f59e0b" },
    { name: "Business", value: 15, color: "#10b981" },
  ];

  // Competitor comparison data
  const competitorComparison = [
    { name: "Your Restaurant", rating: 4.6, price: "฿฿", sales: 52000, growth: 12 },
    { name: "Thai Kitchen", rating: 4.7, price: "฿฿", sales: 48000, growth: 10 },
    { name: "Spice Bistro", rating: 4.5, price: "฿฿฿", sales: 45000, growth: 8 },
    { name: "Golden Plate", rating: 4.2, price: "฿฿", sales: 38000, growth: 5 },
    { name: "Basil Garden", rating: 4.8, price: "฿฿฿฿", sales: 60000, growth: 15 },
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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Restaurant Market Analysis Dashboard</h1>
            <p className="text-gray-600">Comprehensive data on Bangkok's restaurant market</p>
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

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Sidebar */}
          <div className="col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">CATEGORIES</CardTitle>
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
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "28%" }} />
                </Progress>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Fusion</span>
                  </div>
                  <span className="text-xs font-medium">15%</span>
                </div>
                <Progress value={15} className="h-1">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "15%" }} />
                </Progress>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm">Other</span>
                  </div>
                  <span className="text-xs font-medium">15%</span>
                </div>
                <Progress value={15} className="h-1">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "15%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">PRICE RANGE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">฿</span>
                  </div>
                  <span className="text-xs font-medium">25%</span>
                </div>
                <Progress value={25} className="h-1" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-sm">฿฿</span>
                  </div>
                  <span className="text-xs font-medium">40%</span>
                </div>
                <Progress value={40} className="h-1">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "40%" }} />
                </Progress>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">฿฿฿</span>
                  </div>
                  <span className="text-xs font-medium">30%</span>
                </div>
                <Progress value={30} className="h-1">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "30%" }} />
                </Progress>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-sm">฿฿฿฿</span>
                  </div>
                  <span className="text-xs font-medium">5%</span>
                </div>
                <Progress value={5} className="h-1">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "5%" }} />
                </Progress>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">POPULAR AREAS</CardTitle>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm">Others</span>
                  <span className="text-xs font-medium">33%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">CUSTOMER TRAFFIC</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Breakfast</span>
                  <span className="text-xs font-medium">20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lunch</span>
                  <span className="text-xs font-medium">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dinner</span>
                  <span className="text-xs font-medium">40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Late Night</span>
                  <span className="text-xs font-medium">5%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-7">
            {/* Map Section */}
            <Card className="mb-4 overflow-hidden">
              <div className="h-[500px]">
                <MapContainer
                  center={[13.7563, 100.5018]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  zoomControl={false}
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
                </MapContainer>
              </div>
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Customer Density Map</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <span className="text-xs">High (80%+)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                      <span className="text-xs">Medium (70-79%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                      <span className="text-xs">Low (<70%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                      <span className="text-xs">Competitor</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bottom Charts */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Price Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceRangeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                          cursor={{ fill: "#f9fafb" }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Top Dishes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topDishes} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                          cursor={{ fill: "#f9fafb" }}
                        />
                        <Bar dataKey="sales" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Price Ranges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priceRangeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                          cursor={{ fill: "#f9fafb" }}
                        />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-4">
            {/* Operations Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">OPERATIONS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-2">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="97.4, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold">{operationsData.current}</span>
                      <span className="text-xs text-gray-500">/ {operationsData.target}</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Operations Score</h3>
                  <p className="text-sm text-gray-500">{operationsData.percentage}% of target</p>
                </div>
              </CardContent>
            </Card>

            {/* Food Cost Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">FOOD COST VS. PICKUP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        strokeDasharray="60, 100"
                        strokeDashoffset="25"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="40, 100"
                        strokeDashoffset="-35"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-medium">Delivery</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-amber-50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Truck className="h-4 w-4 text-amber-500 mr-1" />
                      <span className="text-xs font-medium text-amber-700">Delivery</span>
                    </div>
                    <div className="text-lg font-bold text-amber-900">฿{foodCostData.delivery}</div>
                    <div className="text-xs text-amber-700">{foodCostData.deliveryPercentage}%</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-xs font-medium text-blue-700">Pickup</span>
                    </div>
                    <div className="text-lg font-bold text-blue-900">฿{foodCostData.pickup}</div>
                    <div className="text-xs text-blue-700">{foodCostData.pickupPercentage}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">MONTHLY REVENUE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                        cursor={{ fill: "#f9fafb" }}
                        formatter={(value) => [`฿${value}`, "Revenue"]}
                      />
                      <Bar dataKey="revenue" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Customer Demographics */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">CUSTOMER DEMOGRAPHICS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerDemographics}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {customerDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-2">
                  {customerDemographics.map((demo, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: demo.color }}></div>
                      <span className="text-xs">{demo.name}: {demo.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitor Comparison */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">COMPETITOR COMPARISON</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {competitorComparison.map((comp, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
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
                      <div className="text-sm font-medium">฿{(comp.sales/1000).toFixed(1)}k</div>
                      <div className="text-xs text-green-600">+{comp.growth}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
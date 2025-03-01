import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Layers,
  ChevronDown,
  MousePointer,
  Star,
  Check,
  AlertCircle,
  X,
  MapPin,
  Users,
  DollarSign,
  Truck,
  Building,
  Crosshair,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
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

interface PlaceInsightsProps {
  customerDensity: any[];
  competitors: any[];
  realEstateData: any[];
}

const PlaceInsights: React.FC<PlaceInsightsProps> = ({
  customerDensity = [],
  competitors = [],
  realEstateData = [],
}) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const [analysisRadius, setAnalysisRadius] = useState(1000); // meters
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showCompetitors, setShowCompetitors] = useState(true);
  const [showTrafficPatterns, setShowTrafficPatterns] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "afternoon" | "evening" | "night">("afternoon");
  const [dayOfWeek, setDayOfWeek] = useState<"weekday" | "weekend">("weekday");

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
    setAnalysisComplete(false);
  };

  // Handle analysis of selected location
  const handleAnalyzeLocation = () => {
    if (!selectedLocation) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  // Generate heatmap data
  const generateHeatmapData = () => {
    return customerDensity.map(point => ({
      lat: point.position[0],
      lng: point.position[1],
      intensity: point.density / 100
    }));
  };

  // Map controls component
  const MapControls = () => {
    return (
      <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-md space-y-3">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Map Layers</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-heatmap" className="text-xs">Customer Density</Label>
            <Switch id="show-heatmap" checked={showHeatmap} onCheckedChange={setShowHeatmap} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-competitors" className="text-xs">Competitors</Label>
            <Switch id="show-competitors" checked={showCompetitors} onCheckedChange={setShowCompetitors} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-traffic" className="text-xs">Traffic Patterns</Label>
            <Switch id="show-traffic" checked={showTrafficPatterns} onCheckedChange={setShowTrafficPatterns} />
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Time Settings</h3>
          <div className="grid grid-cols-2 gap-2">
            <Select value={timeOfDay} onValueChange={(value) => setTimeOfDay(value as any)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Time of Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
                <SelectItem value="night">Night</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dayOfWeek} onValueChange={(value) => setDayOfWeek(value as any)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Day Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekday">Weekday</SelectItem>
                <SelectItem value="weekend">Weekend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Analysis Radius</h3>
          <div className="px-1">
            <Slider
              value={[analysisRadius]}
              min={500}
              max={3000}
              step={100}
              onValueChange={(value) => setAnalysisRadius(value[0])}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>500m</span>
            <span>{analysisRadius}m</span>
            <span>3000m</span>
          </div>
        </div>
      </div>
    );
  };

  // Location Analysis Results component
  const LocationAnalysisResults = () => {
    if (!analysisComplete || !selectedLocation) return null;

    return (
      <div className="absolute bottom-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-lg border border-gray-200 w-72">
        <h3 className="font-semibold text-sm mb-2">Location Analysis Results</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-blue-700">85%</div>
              <div className="text-xs text-blue-600">Viability Score</div>
            </div>
            <div className="bg-green-50 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-green-700">3</div>
              <div className="text-xs text-green-600">Competitors</div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Customer Density</span>
              <span className="text-xs font-medium">High</span>
            </div>
            <Progress value={85} className="h-1.5" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Foot Traffic</span>
              <span className="text-xs font-medium">Medium</span>
            </div>
            <Progress value={65} className="h-1.5" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Rent Affordability</span>
              <span className="text-xs font-medium">Good</span>
            </div>
            <Progress value={75} className="h-1.5" />
          </div>
          <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-700">This location has high potential with good customer density and moderate competition. Estimated ROI is 25% higher than average.</p>
          </div>
          <Button size="sm" className="w-full">View Detailed Report</Button>
        </div>
      </div>
    );
  };

  return (
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
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={() => setSelectedLocation(null)}
              >
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
              {showHeatmap && customerDensity.map((point) => (
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
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Peak Hours: {point.density >= 80 ? '12-2PM, 6-8PM' : point.density >= 70 ? '11AM-1PM, 7-9PM' : '10AM-12PM, 5-7PM'}</p>
                        <p>Avg. Spend: ฿{point.density >= 80 ? '45' : point.density >= 70 ? '35' : '25'} per person</p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Competitor Markers */}
              {showCompetitors && competitors.map((comp) => (
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
                        <Button 
                          size="sm" 
                          className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
                          onClick={handleAnalyzeLocation}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? "Analyzing..." : "Analyze This Location"}
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

            {/* Map Controls */}
            <MapControls />

            {/* Location Analysis Results */}
            <LocationAnalysisResults />

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
                  <span className="text-xs">Low Density (&lt;70%)</span>
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
            {competitors.slice(0, 4).map((comp, index) => (
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
          
          {analysisComplete && selectedLocation && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-1">Location Analysis</h3>
              <p className="text-sm text-green-700">
                Selected location has high potential with 85% customer density and only 2 direct competitors within 500m.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery & Pickup Hotspots */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Delivery & Pickup Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Dine-in", value: 45, color: "#3b82f6" },
                      { name: "Delivery", value: 35, color: "#f59e0b" },
                      { name: "Pickup", value: 20, color: "#10b981" },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
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
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Truck className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Delivery Hotspot</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    35% of orders in this area are delivery, with an average delivery radius of 3.5km.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Pickup Potential</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Pickup orders are growing at 15% monthly in this area, suggesting good potential for a pickup-optimized layout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real Estate & Rental Impact */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Real Estate Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={realEstateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ backgroundColor: "white", borderColor: "#e5e7eb" }}
                  />
                  <Legend />
                  <Bar dataKey="rent" name="Avg. Rent (฿k)" fill="#3b82f6" />
                  <Bar dataKey="potential" name="Potential Score" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800">Rental Impact</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Current location has a rent-to-revenue ratio of 12%, which is below the recommended 15% threshold.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">ROI Projection</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Based on foot traffic and rent costs, projected ROI is 22% higher than city average.
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

export default PlaceInsights; 
import React, { useState } from "react";
import {
  Home,
  BarChart2,
  Settings,
  LogOut,
  Filter,
  Download,
  Search,
  Globe,
  PieChart,
  TrendingUp,
  AlertCircle,
  Info,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, DivIcon } from "leaflet";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MarketsDashboard = () => {
  const [activeMarket, setActiveMarket] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "data">("map");

  // Market data
  const markets = [
    {
      id: "de",
      name: "Germany",
      position: [51.1657, 10.4515],
      status: "protected",
      percentage: 100,
      details: { patents: 145, trademarks: 78, copyrights: 32 },
    },
    {
      id: "no",
      name: "Norway",
      position: [60.472, 8.4689],
      status: "filed",
      percentage: 50,
      details: { patents: 67, trademarks: 41, copyrights: 18 },
    },
    {
      id: "se",
      name: "Sweden",
      position: [62.1282, 15.6435],
      status: "unprotected",
      percentage: 25,
      details: { patents: 32, trademarks: 29, copyrights: 11 },
    },
    {
      id: "dk",
      name: "Denmark",
      position: [56.2639, 9.5018],
      status: "protected",
      percentage: 75,
      details: { patents: 89, trademarks: 52, copyrights: 24 },
    },
    {
      id: "ca",
      name: "Canada",
      position: [56.1304, -106.3468],
      status: "filed",
      percentage: 60,
      details: { patents: 76, trademarks: 48, copyrights: 21 },
    },
    {
      id: "us",
      name: "United States",
      position: [37.0902, -95.7129],
      status: "unprotected",
      percentage: 40,
      details: { patents: 210, trademarks: 185, copyrights: 95 },
    },
    {
      id: "br",
      name: "Brazil",
      position: [-14.235, -51.9253],
      status: "protected",
      percentage: 90,
      details: { patents: 112, trademarks: 67, copyrights: 29 },
    },
  ];

  // Custom icons for map markers
  const getMarkerIcon = (status: string, isActive: boolean) => {
    const size = isActive ? [35, 56] : [25, 41];
    const iconUrl =
      status === "protected"
        ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png"
        : status === "filed"
          ? "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
          : "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";

    return new Icon({
      iconUrl,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: size,
      iconAnchor: [size[0] / 2, size[1]],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  // Create circle icons with percentage
  const getCircleIcon = (percentage: number) => {
    return new DivIcon({
      className: "",
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      html: `<div style="
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        background: conic-gradient(#10b981 ${percentage}%, #f3f4f6 0); 
        display: flex; 
        align-items: center; 
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      ">
        <div style="
          width: 30px; 
          height: 30px; 
          border-radius: 50%; 
          background: white; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        ">${percentage}%</div>
      </div>`,
    });
  };

  const handleMarketClick = (marketId: string) => {
    setActiveMarket(activeMarket === marketId ? null : marketId);
  };

  const filteredMarkets = markets.filter((market) =>
    market.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Tools Sidebar */}
      <TooltipProvider>
        <div className="bg-white w-16 flex flex-col items-center p-2 shadow-lg">
          <div className="mb-8 mt-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              MB
            </div>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="mb-4 p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                <Home size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Dashboard</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="mb-4 p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <Globe size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Markets</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="mb-4 p-3 rounded-xl hover:bg-gray-100 transition-colors">
                <BarChart2 size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Analytics</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="mb-4 p-3 rounded-xl hover:bg-gray-100 transition-colors">
                <TrendingUp size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Reports</p>
            </TooltipContent>
          </Tooltip>

          <div className="mt-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mb-4 p-3 rounded-xl hover:bg-gray-100 transition-colors">
                  <Settings size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className="mb-4 p-3 rounded-xl hover:bg-gray-100 transition-colors">
                  <LogOut size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-4 z-[1000]">
          <div className="relative w-64 mr-2">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search markets..."
              className="pl-10 pr-4 h-10 bg-white shadow-lg border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              className={`p-2 ${viewMode === "map" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setViewMode("map")}
            >
              <Globe size={20} />
            </button>
            <button
              className={`p-2 ${viewMode === "data" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setViewMode("data")}
            >
              <PieChart size={20} />
            </button>
          </div>

          <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
            <Download size={20} />
          </button>
        </div>

        <div className="w-full h-full">
          {viewMode === "map" ? (
            <MapContainer
              center={[30.0, 0.0]}
              zoom={2}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg shadow-lg"
              zoomControl={false}
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filteredMarkets.map((market) => (
                <React.Fragment key={market.id}>
                  <Marker
                    position={market.position as [number, number]}
                    icon={getMarkerIcon(
                      market.status,
                      activeMarket === market.id,
                    )}
                    eventHandlers={{
                      click: () => handleMarketClick(market.id),
                    }}
                  >
                    <Popup className="custom-popup">
                      <div className="p-2">
                        <h3 className="font-bold text-lg">{market.name}</h3>
                        <div className="flex items-center mt-2">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${market.status === "protected" ? "bg-green-500" : market.status === "filed" ? "bg-yellow-500" : "bg-red-500"}`}
                          ></div>
                          <span className="capitalize">{market.status}</span>
                          <span className="ml-auto font-semibold">
                            {market.percentage}%
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Patents:</span>
                            <span className="font-medium">
                              {market.details.patents}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Trademarks:</span>
                            <span className="font-medium">
                              {market.details.trademarks}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Copyrights:</span>
                            <span className="font-medium">
                              {market.details.copyrights}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </div>
                    </Popup>
                  </Marker>

                  {activeMarket === market.id && (
                    <Circle
                      center={market.position as [number, number]}
                      radius={500000}
                      pathOptions={{
                        color:
                          market.status === "protected"
                            ? "#10b981"
                            : market.status === "filed"
                              ? "#f59e0b"
                              : "#ef4444",
                        fillColor:
                          market.status === "protected"
                            ? "#10b981"
                            : market.status === "filed"
                              ? "#f59e0b"
                              : "#ef4444",
                        fillOpacity: 0.2,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </MapContainer>
          ) : (
            <div className="w-full h-full bg-gray-50 rounded-lg shadow-lg p-6 overflow-auto">
              <h2 className="text-2xl font-bold mb-6">Market Data Analysis</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Total Markets</h3>
                  <div className="text-3xl font-bold">{markets.length}</div>
                  <p className="text-sm text-gray-500 mt-2">
                    Across 4 continents
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">
                    Protected Markets
                  </h3>
                  <div className="text-3xl font-bold text-green-600">
                    {markets.filter((m) => m.status === "protected").length}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Fully secured intellectual property
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">
                    At Risk Markets
                  </h3>
                  <div className="text-3xl font-bold text-red-600">
                    {markets.filter((m) => m.status === "unprotected").length}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Require immediate attention
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Market
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Coverage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patents
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trademarks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Copyrights
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMarkets.map((market) => (
                      <tr key={market.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{market.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`w-2.5 h-2.5 rounded-full mr-2 ${market.status === "protected" ? "bg-green-500" : market.status === "filed" ? "bg-yellow-500" : "bg-red-500"}`}
                            ></div>
                            <span className="capitalize">{market.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full max-w-xs">
                            <Progress
                              value={market.percentage}
                              className="h-2"
                            />
                            <span className="text-xs text-gray-500">
                              {market.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {market.details.patents}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {market.details.trademarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {market.details.copyrights}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <Button size="sm" variant="outline" className="mr-2">
                            View
                          </Button>
                          <Button size="sm">Manage</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Floating Sidebar */}
        <div className="absolute top-4 left-20 bg-white w-80 p-5 shadow-lg rounded-lg z-[1000] border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
              NL
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold flex items-center">
                Hi Nils <span className="wave ml-1">👋</span>
              </h1>
              <p className="text-sm text-gray-500">Market Research Director</p>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-1 w-[0px] h-[1px]">
            <div className="bg-blue-100">01</div>
            <div className="bg-blue-200">02</div>
            <div className="bg-blue-300">03</div>
            <div className="bg-blue-400">04</div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Core Markets</h2>
              <span className="text-sm text-blue-600 font-medium">
                {markets.length} total
              </span>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
              <div className="flex items-center text-blue-800">
                <Info size={16} className="mr-2" />
                <span className="text-sm">3 markets require attention</span>
              </div>
            </div>

            <ul className="space-y-3">
              {filteredMarkets.map((market) => (
                <li
                  key={market.id}
                  className={`flex justify-between items-center p-2 rounded-lg transition-colors cursor-pointer ${activeMarket === market.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  onClick={() => handleMarketClick(market.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${market.status === "protected" ? "bg-green-500" : market.status === "filed" ? "bg-yellow-500" : "bg-red-500"}`}
                    ></div>
                    <span>{market.name}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${market.status === "protected" ? "bg-green-500" : market.status === "filed" ? "bg-yellow-500" : "bg-red-500"}`}
                        style={{ width: `${market.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium w-8 text-right">
                      {market.percentage}%
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              QUICK STATS
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold">3</div>
                <div className="text-xs text-gray-500">Protected</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold">2</div>
                <div className="text-xs text-gray-500">Filed</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-lg text-center">
                <div className="text-lg font-bold">2</div>
                <div className="text-xs text-gray-500">At Risk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="absolute bottom-4 left-20 right-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 z-[1000]">
          {/* Markets Coverage */}
          <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Market Coverage</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 p-0 h-auto"
              >
                See all
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium">Protected</span>
                  </div>
                  <span className="text-sm font-medium">43%</span>
                </div>
                <Progress value={43} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="font-medium">Filed</span>
                  </div>
                  <span className="text-sm font-medium">29%</span>
                </div>
                <Progress value={29} className="h-2 bg-gray-200">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: "29%" }}
                  />
                </Progress>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="font-medium">Unprotected</span>
                  </div>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <Progress value={28} className="h-2 bg-gray-200">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: "28%" }}
                  />
                </Progress>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle size={16} className="mr-2 text-blue-600" />
                <p>
                  3 markets require immediate attention to prevent potential IP
                  infringement risks.
                </p>
              </div>
            </div>
          </div>

          {/* Safeguards */}
          <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">IP Safeguards</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 p-0 h-auto"
              >
                See all
              </Button>
            </div>

            <div className="flex justify-center items-center mb-6">
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
                    strokeDasharray="67, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">67%</span>
                  <span className="text-sm text-gray-500">Protected</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Patents</span>
                <span className="font-medium">731</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Trademarks</span>
                <span className="font-medium">500</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span>Copyrights</span>
                <span className="font-medium">230</span>
              </div>
            </div>
          </div>

          {/* Policy Watches */}
          <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-1/3 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Policy Watches</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-800 p-0 h-auto"
              >
                See all
              </Button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">18</span>
                </div>
                <span className="text-sm font-medium">Renewals</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">4</span>
                </div>
                <span className="text-sm font-medium">Resorts</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gray-700 text-white rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xl font-bold">12</span>
                </div>
                <span className="text-sm font-medium">Of note</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle size={20} className="text-yellow-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Attention Required
                  </h3>
                  <div className="mt-1 text-sm text-yellow-700">
                    <p>5 patent renewals due in the next 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsDashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, DivIcon } from "leaflet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Coffee,
  Utensils,
  Clock,
  Users,
  DollarSign,
  Search,
  Filter,
  MapPin,
  Wifi,
  PawPrint,
  Umbrella,
  BookOpen,
  Camera,
  VolumeX,
  UserPlus,
  Leaf,
  ChevronDown,
  ChevronUp,
  BarChart2,
  PieChart,
  TrendingUp,
  Info,
} from "lucide-react";

interface CafeData {
  id: string;
  name: string;
  position: [number, number];
  type: "cafe" | "restaurant" | "bakery" | "coffee shop";
  rating: number;
  priceLevel: 1 | 2 | 3 | 4;
  popularity: number;
  cuisine?: string;
  specialty?: string[];
  openHours: string;
  image: string;
  tags: string[];
  address: string;
  reviews: number;
  distance: number;
  visitorsPerDay: number;
  peakHours: string;
  yearEstablished: number;
  description: string;
  competitors: string[];
  marketShare: number;
  growthRate: number;
  socialMediaFollowers: number;
  averageSpend: number;
  customerRetention: number;
  neighborhoodDensity: number;
  trafficSource: {
    locals: number;
    tourists: number;
    business: number;
  };
}

// Component to update map view when active place changes
const MapViewUpdater = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const BangkokCafeMap = () => {
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPriceLevel, setFilterPriceLevel] = useState<number | null>(null);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "data">("map");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    13.7563, 100.5018,
  ]);
  const [mapZoom, setMapZoom] = useState(13);

  // Bangkok center coordinates
  const bangkokCenter: [number, number] = [13.7563, 100.5018];

  // Generate 100 places around Bangkok
  const generatePlaces = (): CafeData[] => {
    const places: CafeData[] = [];
    const types = ["cafe", "restaurant", "bakery", "coffee shop"] as const;
    const cuisines = [
      "Thai",
      "International",
      "Fusion",
      "Japanese",
      "Italian",
      "French",
    ];
    const specialties = [
      "Espresso",
      "Pour Over",
      "Cold Brew",
      "Latte Art",
      "Single Origin",
      "Pastries",
      "Bubble Tea",
      "Matcha",
      "Organic Coffee",
      "Specialty Tea",
      "Vegan Desserts",
      "Gluten-Free Options",
    ];
    const tags = [
      "Wifi",
      "Pet Friendly",
      "Outdoor Seating",
      "Study Spot",
      "Instagrammable",
      "Quiet",
      "Busy",
      "Vegan Options",
      "Live Music",
      "Workspace",
      "Rooftop",
      "Air Conditioned",
      "Parking Available",
      "Open Late",
      "Breakfast",
      "Brunch",
      "Lunch",
      "Dinner",
    ];
    const neighborhoods = [
      "Sukhumvit",
      "Silom",
      "Siam",
      "Chinatown",
      "Sathorn",
      "Thonglor",
      "Ekkamai",
      "Ari",
      "Phra Khanong",
      "On Nut",
      "Asok",
      "Phrom Phong",
      "Chit Lom",
      "Sala Daeng",
    ];

    // Generate names for cafes and restaurants
    const cafeNamePrefixes = [
      "Cafe",
      "Coffee",
      "Brew",
      "Bean",
      "Roast",
      "Grind",
      "Aroma",
      "Sip",
    ];
    const cafeNameSuffixes = [
      "House",
      "Lab",
      "Co.",
      "Bar",
      "Studio",
      "Corner",
      "Society",
      "Culture",
    ];
    const restaurantNamePrefixes = [
      "Thai",
      "Royal",
      "Golden",
      "Spice",
      "Basil",
      "Mango",
      "Elephant",
      "Lotus",
    ];
    const restaurantNameSuffixes = [
      "Kitchen",
      "Bistro",
      "Garden",
      "Table",
      "Plate",
      "Terrace",
      "Dining",
      "Eatery",
    ];

    for (let i = 1; i <= 100; i++) {
      // Generate random position around Bangkok center
      const lat = bangkokCenter[0] + (Math.random() - 0.5) * 0.1;
      const lng = bangkokCenter[1] + (Math.random() - 0.5) * 0.1;

      // Random type
      const type = types[Math.floor(Math.random() * types.length)];

      // Generate name based on type
      let name = "";
      if (type === "cafe" || type === "coffee shop") {
        const prefix =
          cafeNamePrefixes[Math.floor(Math.random() * cafeNamePrefixes.length)];
        const suffix =
          cafeNameSuffixes[Math.floor(Math.random() * cafeNameSuffixes.length)];
        name = `${prefix} ${suffix}`;
      } else {
        const prefix =
          restaurantNamePrefixes[
            Math.floor(Math.random() * restaurantNamePrefixes.length)
          ];
        const suffix =
          restaurantNameSuffixes[
            Math.floor(Math.random() * restaurantNameSuffixes.length)
          ];
        name = `${prefix} ${suffix}`;
      }

      // Random rating between 3.0 and 5.0
      const rating = Math.round((3 + Math.random() * 2) * 10) / 10;

      // Random price level
      const priceLevel = (Math.floor(Math.random() * 4) + 1) as 1 | 2 | 3 | 4;

      // Random popularity between 50 and 100
      const popularity = Math.floor(50 + Math.random() * 50);

      // Random cuisine if restaurant
      const cuisine =
        type === "restaurant"
          ? cuisines[Math.floor(Math.random() * cuisines.length)]
          : undefined;

      // Random specialties (1-3)
      const numSpecialties = Math.floor(Math.random() * 3) + 1;
      const placeSpecialties: string[] = [];
      for (let j = 0; j < numSpecialties; j++) {
        const specialty =
          specialties[Math.floor(Math.random() * specialties.length)];
        if (!placeSpecialties.includes(specialty)) {
          placeSpecialties.push(specialty);
        }
      }

      // Random tags (2-5)
      const numTags = Math.floor(Math.random() * 4) + 2;
      const placeTags: string[] = [];
      for (let j = 0; j < numTags; j++) {
        const tag = tags[Math.floor(Math.random() * tags.length)];
        if (!placeTags.includes(tag)) {
          placeTags.push(tag);
        }
      }

      // Random open hours
      const openHour = Math.floor(Math.random() * 4) + 6; // 6-9 AM
      const closeHour = Math.floor(Math.random() * 6) + 18; // 6-11 PM
      const openHours = `${openHour}:00 - ${closeHour}:00`;

      // Random neighborhood for address
      const neighborhood =
        neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
      const streetNumber = Math.floor(Math.random() * 200) + 1;
      const address = `${streetNumber} ${neighborhood}, Bangkok`;

      // Random image from Unsplash (coffee or food related)
      const imageKeywords =
        type === "restaurant" ? "restaurant-food" : "coffee-cafe";
      const imageId = Math.floor(Math.random() * 1000);
      const image = `https://source.unsplash.com/random/300x200/?${imageKeywords}&sig=${imageId}`;

      // Random number of reviews
      const reviews = Math.floor(Math.random() * 500) + 10;

      // Random distance (0.1 - 5.0 km)
      const distance = Math.round((0.1 + Math.random() * 4.9) * 10) / 10;

      // Random visitors per day
      const visitorsPerDay = Math.floor(Math.random() * 300) + 50;

      // Random peak hours
      const peakHours = Math.random() > 0.5 ? "11:00 - 14:00" : "17:00 - 20:00";

      // Random year established (between 2000 and 2023)
      const yearEstablished = Math.floor(Math.random() * 23) + 2000;

      // Random description
      const descriptions = [
        `A charming ${type} offering a variety of ${placeSpecialties.join(" and ")}. Popular among locals and tourists alike.`,
        `This cozy ${type} is known for its ${placeSpecialties.join(" and ")}. A perfect spot to relax or work.`,
        `One of Bangkok's hidden gems, this ${type} specializes in ${placeSpecialties.join(" and ")}.`,
        `A trendy ${type} in the heart of ${neighborhood}, famous for its ${placeSpecialties.join(" and ")}.`,
        `This stylish ${type} offers exceptional ${placeSpecialties.join(" and ")} in a relaxed atmosphere.`,
      ];
      const description =
        descriptions[Math.floor(Math.random() * descriptions.length)];

      // Random competitors (2-4 other places)
      const competitors = [];
      const numCompetitors = Math.floor(Math.random() * 3) + 2;
      for (let j = 0; j < numCompetitors; j++) {
        if (type === "cafe" || type === "coffee shop") {
          const prefix =
            cafeNamePrefixes[
              Math.floor(Math.random() * cafeNamePrefixes.length)
            ];
          const suffix =
            cafeNameSuffixes[
              Math.floor(Math.random() * cafeNameSuffixes.length)
            ];
          competitors.push(`${prefix} ${suffix}`);
        } else {
          const prefix =
            restaurantNamePrefixes[
              Math.floor(Math.random() * restaurantNamePrefixes.length)
            ];
          const suffix =
            restaurantNameSuffixes[
              Math.floor(Math.random() * restaurantNameSuffixes.length)
            ];
          competitors.push(`${prefix} ${suffix}`);
        }
      }

      // Random market share (5-25%)
      const marketShare = Math.floor(Math.random() * 20) + 5;

      // Random growth rate (-5 to +15%)
      const growthRate = Math.floor(Math.random() * 20) - 5;

      // Random social media followers
      const socialMediaFollowers = Math.floor(Math.random() * 10000) + 500;

      // Random average spend per customer (in THB)
      const averageSpend = (Math.floor(Math.random() * 300) + 100) * priceLevel;

      // Random customer retention rate (50-95%)
      const customerRetention = Math.floor(Math.random() * 45) + 50;

      // Random neighborhood density score (1-10)
      const neighborhoodDensity = Math.floor(Math.random() * 10) + 1;

      // Random traffic source breakdown
      const locals = Math.floor(Math.random() * 70) + 20;
      const tourists = Math.floor(Math.random() * (100 - locals));
      const business = 100 - locals - tourists;

      places.push({
        id: `place-${i}`,
        name,
        position: [lat, lng],
        type,
        rating,
        priceLevel,
        popularity,
        cuisine,
        specialty: placeSpecialties,
        openHours,
        image,
        tags: placeTags,
        address,
        reviews,
        distance,
        visitorsPerDay,
        peakHours,
        yearEstablished,
        description,
        competitors,
        marketShare,
        growthRate,
        socialMediaFollowers,
        averageSpend,
        customerRetention,
        neighborhoodDensity,
        trafficSource: {
          locals,
          tourists,
          business,
        },
      });
    }

    return places;
  };

  // Generate places once
  const [places] = useState<CafeData[]>(generatePlaces());

  // Get marker icon based on type and rating
  const getMarkerIcon = (place: CafeData, isActive: boolean) => {
    const size = isActive ? [35, 56] : [25, 41];
    let color;

    if (place.rating >= 4.5) {
      color = "green";
    } else if (place.rating >= 4.0) {
      color = "blue";
    } else if (place.rating >= 3.5) {
      color = "gold";
    } else {
      color = "red";
    }

    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: size,
      iconAnchor: [size[0] / 2, size[1]],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  // Get icon for place type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cafe":
      case "coffee shop":
        return <Coffee className="h-4 w-4" />;
      case "restaurant":
        return <Utensils className="h-4 w-4" />;
      case "bakery":
        return <Utensils className="h-4 w-4" />;
      default:
        return <Coffee className="h-4 w-4" />;
    }
  };

  // Get icon for tag
  const getTagIcon = (tag: string) => {
    switch (tag) {
      case "Wifi":
        return <Wifi className="h-3 w-3" />;
      case "Pet Friendly":
        return <PawPrint className="h-3 w-3" />;
      case "Outdoor Seating":
        return <Umbrella className="h-3 w-3" />;
      case "Study Spot":
        return <BookOpen className="h-3 w-3" />;
      case "Instagrammable":
        return <Camera className="h-3 w-3" />;
      case "Quiet":
        return <VolumeX className="h-3 w-3" />;
      case "Busy":
        return <UserPlus className="h-3 w-3" />;
      case "Vegan Options":
        return <Leaf className="h-3 w-3" />;
      default:
        return <Info className="h-3 w-3" />;
    }
  };

  // Format price level
  const formatPriceLevel = (level: number) => {
    return "฿".repeat(level);
  };

  // Handle place click
  const handlePlaceClick = (placeId: string) => {
    const place = places.find((p) => p.id === placeId);
    if (place) {
      setMapCenter(place.position);
      setMapZoom(16);
    }
    setActivePlace(activePlace === placeId ? null : placeId);
  };

  // Filter places based on criteria
  const filteredPlaces = places.filter((place) => {
    // Filter by search query
    if (
      searchQuery &&
      !place.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !place.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    ) {
      return false;
    }

    // Filter by type
    if (filterType && place.type !== filterType) {
      return false;
    }

    // Filter by price level
    if (filterPriceLevel && place.priceLevel !== filterPriceLevel) {
      return false;
    }

    // Filter by rating
    if (filterRating && place.rating < filterRating) {
      return false;
    }

    return true;
  });

  // Get active place
  const activePlaceData = activePlace
    ? places.find((p) => p.id === activePlace)
    : null;

  // Calculate statistics
  const calculateStatistics = () => {
    const totalPlaces = filteredPlaces.length;
    const avgRating =
      filteredPlaces.reduce((sum, place) => sum + place.rating, 0) /
      totalPlaces;
    const avgPrice =
      filteredPlaces.reduce((sum, place) => sum + place.priceLevel, 0) /
      totalPlaces;
    const typeBreakdown = {
      cafe: filteredPlaces.filter((p) => p.type === "cafe").length,
      restaurant: filteredPlaces.filter((p) => p.type === "restaurant").length,
      bakery: filteredPlaces.filter((p) => p.type === "bakery").length,
      coffeeShop: filteredPlaces.filter((p) => p.type === "coffee shop").length,
    };
    const avgVisitors = Math.round(
      filteredPlaces.reduce((sum, place) => sum + place.visitorsPerDay, 0) /
        totalPlaces,
    );
    const avgGrowth =
      Math.round(
        (filteredPlaces.reduce((sum, place) => sum + place.growthRate, 0) /
          totalPlaces) *
          10,
      ) / 10;

    return {
      totalPlaces,
      avgRating: Math.round(avgRating * 10) / 10,
      avgPrice: Math.round(avgPrice * 10) / 10,
      typeBreakdown,
      avgVisitors,
      avgGrowth,
    };
  };

  const statistics = calculateStatistics();

  return (
    <div className="flex h-[calc(100vh-64px)] bg-amber-50">
      {/* Sidebar */}
      <div className="w-96 bg-white p-4 shadow-lg overflow-auto z-10">
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Discover and analyze cafes and restaurants in Bangkok
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
            <Input
              placeholder="Search by name or tag..."
              className="pl-10 bg-amber-50 border-amber-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Select
                value={filterType || ""}
                onValueChange={(value) => setFilterType(value || null)}
              >
                <SelectTrigger className="bg-amber-50 border-amber-200">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="cafe">Cafe</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="coffee shop">Coffee Shop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={filterPriceLevel ? filterPriceLevel.toString() : ""}
                onValueChange={(value) =>
                  setFilterPriceLevel(value ? parseInt(value) : null)
                }
              >
                <SelectTrigger className="bg-amber-50 border-amber-200">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Price</SelectItem>
                  <SelectItem value="1">฿</SelectItem>
                  <SelectItem value="2">฿฿</SelectItem>
                  <SelectItem value="3">฿฿฿</SelectItem>
                  <SelectItem value="4">฿฿฿฿</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Select
                value={filterRating ? filterRating.toString() : ""}
                onValueChange={(value) =>
                  setFilterRating(value ? parseFloat(value) : null)
                }
              >
                <SelectTrigger className="bg-amber-50 border-amber-200">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Rating</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                  <SelectItem value="4">4.0+</SelectItem>
                  <SelectItem value="3.5">3.5+</SelectItem>
                  <SelectItem value="3">3.0+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="border-amber-200 text-amber-800 hover:bg-amber-100"
              onClick={() => {
                setFilterType(null);
                setFilterPriceLevel(null);
                setFilterRating(null);
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Statistics summary */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-amber-800">Market Overview</h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-0 text-amber-600"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              {showAnalytics ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="bg-amber-100 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-amber-800">
                {statistics.totalPlaces}
              </div>
              <div className="text-xs text-amber-700">Places</div>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-amber-800">
                {statistics.avgRating}⭐
              </div>
              <div className="text-xs text-amber-700">Avg. Rating</div>
            </div>
            <div className="bg-amber-100 p-2 rounded-lg text-center">
              <div className="text-lg font-bold text-amber-800">
                {formatPriceLevel(Math.round(statistics.avgPrice))}
              </div>
              <div className="text-xs text-amber-700">Avg. Price</div>
            </div>
          </div>

          {showAnalytics && (
            <div className="space-y-4 bg-amber-50 p-3 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-amber-800 mb-2">
                  Establishment Types
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Cafes</span>
                      <span>
                        {Math.round(
                          (statistics.typeBreakdown.cafe /
                            statistics.totalPlaces) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (statistics.typeBreakdown.cafe /
                          statistics.totalPlaces) *
                        100
                      }
                      className="h-1.5"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${(statistics.typeBreakdown.cafe / statistics.totalPlaces) * 100}%`,
                        }}
                      />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Restaurants</span>
                      <span>
                        {Math.round(
                          (statistics.typeBreakdown.restaurant /
                            statistics.totalPlaces) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (statistics.typeBreakdown.restaurant /
                          statistics.totalPlaces) *
                        100
                      }
                      className="h-1.5"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${(statistics.typeBreakdown.restaurant / statistics.totalPlaces) * 100}%`,
                        }}
                      />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Bakeries</span>
                      <span>
                        {Math.round(
                          (statistics.typeBreakdown.bakery /
                            statistics.totalPlaces) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (statistics.typeBreakdown.bakery /
                          statistics.totalPlaces) *
                        100
                      }
                      className="h-1.5"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${(statistics.typeBreakdown.bakery / statistics.totalPlaces) * 100}%`,
                        }}
                      />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Coffee Shops</span>
                      <span>
                        {Math.round(
                          (statistics.typeBreakdown.coffeeShop /
                            statistics.totalPlaces) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (statistics.typeBreakdown.coffeeShop /
                          statistics.totalPlaces) *
                        100
                      }
                      className="h-1.5"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${(statistics.typeBreakdown.coffeeShop / statistics.totalPlaces) * 100}%`,
                        }}
                      />
                    </Progress>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-2 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-amber-700">
                      Avg. Daily Visitors
                    </div>
                    <Users className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="text-lg font-bold text-amber-800">
                    {statistics.avgVisitors}
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-amber-700">
                      Avg. Growth Rate
                    </div>
                    <TrendingUp className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="text-lg font-bold text-amber-800">
                    {statistics.avgGrowth}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Places list */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-amber-800">
              Places ({filteredPlaces.length})
            </h2>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${viewMode === "map" ? "bg-amber-100 text-amber-800" : "text-amber-600"}`}
                onClick={() => setViewMode("map")}
              >
                <MapPin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 ${viewMode === "data" ? "bg-amber-100 text-amber-800" : "text-amber-600"}`}
                onClick={() => setViewMode("data")}
              >
                <BarChart2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-420px)] overflow-auto pr-2">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className={`p-3 border rounded-lg transition-colors cursor-pointer ${activePlace === place.id ? "bg-amber-100 border-amber-300" : "bg-white border-amber-200 hover:bg-amber-50"}`}
                onClick={() => handlePlaceClick(place.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-amber-200">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-amber-900">
                        {place.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-sm font-medium">
                          {place.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      {getTypeIcon(place.type)}
                      <span className="ml-1 capitalize">{place.type}</span>
                      <span className="mx-2">•</span>
                      <span>{formatPriceLevel(place.priceLevel)}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {place.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs py-0 h-5 bg-amber-50 border-amber-200 text-amber-800"
                        >
                          {getTagIcon(tag)}
                          <span className="ml-1">{tag}</span>
                        </Badge>
                      ))}
                      {place.tags.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs py-0 h-5 bg-amber-50 border-amber-200 text-amber-800"
                        >
                          +{place.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 relative">
        {viewMode === "map" ? (
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <MapViewUpdater center={mapCenter} zoom={mapZoom} />
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredPlaces.map((place) => (
              <React.Fragment key={place.id}>
                <Marker
                  position={place.position}
                  icon={getMarkerIcon(place, activePlace === place.id)}
                  eventHandlers={{
                    click: () => handlePlaceClick(place.id),
                  }}
                >
                  <Popup className="custom-popup">
                    <div>
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                          <h3 className="font-bold text-white text-lg">
                            {place.name}
                          </h3>
                          <div className="flex items-center text-white/90 text-sm">
                            <span className="capitalize">{place.type}</span>
                            <span className="mx-2">•</span>
                            <span>{formatPriceLevel(place.priceLevel)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span className="font-medium">{place.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({place.reviews})
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <Clock className="h-4 w-4 inline mr-1" />
                            {place.openHours}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-3">
                          {place.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {place.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs py-0 h-5 bg-amber-50 border-amber-200 text-amber-800"
                            >
                              {getTagIcon(tag)}
                              <span className="ml-1">{tag}</span>
                            </Badge>
                          ))}
                        </div>

                        <Link to="/bangkok/analytics">
                          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                            View Full Analysis
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>

                {activePlace === place.id && (
                  <Circle
                    center={place.position}
                    radius={200}
                    pathOptions={{
                      color: "#f59e0b",
                      fillColor: "#f59e0b",
                      fillOpacity: 0.1,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </MapContainer>
        ) : (
          <div className="h-full overflow-auto p-6 bg-white">
            <h2 className="text-2xl font-bold text-amber-800 mb-6">
              Bangkok Cafe & Restaurant Data
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-amber-100">
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Type
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Rating
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Price
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Popularity
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Daily Visitors
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Growth Rate
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Market Share
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Established
                    </th>
                    <th className="border border-amber-200 px-4 py-2 text-left">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlaces.map((place) => (
                    <tr
                      key={place.id}
                      className={`${activePlace === place.id ? "bg-amber-50" : "hover:bg-amber-50"} cursor-pointer`}
                      onClick={() => handlePlaceClick(place.id)}
                    >
                      <td className="border border-amber-200 px-4 py-2">
                        <div className="font-medium">{place.name}</div>
                        <div className="text-xs text-gray-500">
                          {place.address}
                        </div>
                      </td>
                      <td className="border border-amber-200 px-4 py-2 capitalize">
                        {place.type}
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                          <span>{place.rating}</span>
                        </div>
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        {formatPriceLevel(place.priceLevel)}
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        <div className="w-full max-w-xs">
                          <Progress value={place.popularity} className="h-2">
                            <div
                              className="h-full bg-amber-600 rounded-full"
                              style={{ width: `${place.popularity}%` }}
                            />
                          </Progress>
                          <span className="text-xs">{place.popularity}%</span>
                        </div>
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        {place.visitorsPerDay}
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        <span
                          className={
                            place.growthRate >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {place.growthRate >= 0 ? "+" : ""}
                          {place.growthRate}%
                        </span>
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        {place.marketShare}%
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        {place.yearEstablished}
                      </td>
                      <td className="border border-amber-200 px-4 py-2">
                        <Button
                          size="sm"
                          className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                        >
                          Analyze
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Active place details panel */}
        {activePlaceData && (
          <div className="absolute top-4 right-4 w-96 bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden z-10">
            <div className="relative h-40">
              <img
                src={activePlaceData.image}
                alt={activePlaceData.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-black/30 hover:bg-black/50 text-white rounded-full"
                onClick={() => setActivePlace(null)}
              >
                ×
              </Button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <h3 className="font-bold text-white text-lg">
                  {activePlaceData.name}
                </h3>
                <div className="flex items-center text-white/90 text-sm">
                  <span className="capitalize">{activePlaceData.type}</span>
                  <span className="mx-2">•</span>
                  <span>{formatPriceLevel(activePlaceData.priceLevel)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 max-h-[calc(100vh-12rem)] overflow-auto">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500 mr-1" />
                  <span className="font-medium text-lg">
                    {activePlaceData.rating}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    ({activePlaceData.reviews} reviews)
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={`${activePlaceData.growthRate >= 0 ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {activePlaceData.growthRate >= 0 ? "+" : ""}
                  {activePlaceData.growthRate}% growth
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <div className="text-xs text-amber-700 mb-1">
                    Daily Visitors
                  </div>
                  <div className="text-lg font-bold text-amber-900">
                    {activePlaceData.visitorsPerDay}
                  </div>
                </div>
                <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <div className="text-xs text-amber-700 mb-1">
                    Market Share
                  </div>
                  <div className="text-lg font-bold text-amber-900">
                    {activePlaceData.marketShare}%
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-amber-800 mb-2">About</h4>
                <p className="text-sm text-gray-600">
                  {activePlaceData.description}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-amber-800 mb-2">Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <div className="w-32 text-gray-500">Address:</div>
                    <div>{activePlaceData.address}</div>
                  </div>
                  <div className="flex">
                    <div className="w-32 text-gray-500">Open Hours:</div>
                    <div>{activePlaceData.openHours}</div>
                  </div>
                  <div className="flex">
                    <div className="w-32 text-gray-500">Peak Hours:</div>
                    <div>{activePlaceData.peakHours}</div>
                  </div>
                  <div className="flex">
                    <div className="w-32 text-gray-500">Established:</div>
                    <div>{activePlaceData.yearEstablished}</div>
                  </div>
                  <div className="flex">
                    <div className="w-32 text-gray-500">Avg. Spend:</div>
                    <div>฿{activePlaceData.averageSpend}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-amber-800 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {activePlaceData.specialty?.map((item, index) => (
                    <Badge
                      key={index}
                      className="bg-amber-100 text-amber-800 border-amber-200"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-amber-800 mb-2">
                  Customer Demographics
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Locals</span>
                      <span>{activePlaceData.trafficSource.locals}%</span>
                    </div>
                    <Progress
                      value={activePlaceData.trafficSource.locals}
                      className="h-2"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${activePlaceData.trafficSource.locals}%`,
                        }}
                      />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Tourists</span>
                      <span>{activePlaceData.trafficSource.tourists}%</span>
                    </div>
                    <Progress
                      value={activePlaceData.trafficSource.tourists}
                      className="h-2"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${activePlaceData.trafficSource.tourists}%`,
                        }}
                      />
                    </Progress>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Business</span>
                      <span>{activePlaceData.trafficSource.business}%</span>
                    </div>
                    <Progress
                      value={activePlaceData.trafficSource.business}
                      className="h-2"
                    >
                      <div
                        className="h-full bg-amber-600 rounded-full"
                        style={{
                          width: `${activePlaceData.trafficSource.business}%`,
                        }}
                      />
                    </Progress>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-amber-800 mb-2">
                  Main Competitors
                </h4>
                <div className="space-y-2">
                  {activePlaceData.competitors.map((competitor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-amber-50 rounded-lg border border-amber-100"
                    >
                      <span>{competitor}</span>
                      <Badge
                        variant="outline"
                        className="bg-white border-amber-200 text-amber-800"
                      >
                        Competitor
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/bangkok/analytics">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Generate Full Market Report
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BangkokCafeMap;

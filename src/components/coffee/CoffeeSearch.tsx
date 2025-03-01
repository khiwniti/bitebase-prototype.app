import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, SlidersHorizontal, Coffee, User } from "lucide-react";
import CoffeeShopList from "./CoffeeShopList";
import CoffeeMap from "./CoffeeMap";

const CoffeeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Bangkok");

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto p-4 bg-white rounded-xl shadow-sm">
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold text-amber-700 flex items-center">
              <Coffee className="mr-2 h-5 w-5" />
              BangkokBrew
            </h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-amber-900 hover:text-amber-700">
                Discover
              </a>
              <a href="#" className="text-amber-900 hover:text-amber-700">
                Roasters
              </a>
              <a href="#" className="text-amber-900 hover:text-amber-700">
                About
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-amber-700 hover:bg-amber-800">
              <Coffee className="mr-2 h-4 w-4" /> Add Shop
            </Button>
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <User className="h-6 w-6 text-amber-700" />
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-2 my-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
            <Input
              placeholder="Search coffee shops or specialty..."
              className="pl-10 bg-amber-50 border-amber-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-amber-400" />
            <select
              className="w-full h-10 pl-10 pr-4 bg-amber-50 border-amber-200 rounded-md focus:ring-2 focus:ring-amber-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>Bangkok</option>
              <option>Sukhumvit</option>
              <option>Silom</option>
              <option>Thonglor</option>
            </select>
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto border-amber-200 text-amber-800 hover:bg-amber-100"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>

        {/* Results */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/5">
            <p className="text-sm text-amber-700 mb-4">
              4 Coffee Shops in Bangkok, Thailand
            </p>
            <CoffeeShopList />
          </div>
          <div className="w-full md:w-3/5 h-[600px] bg-amber-50 rounded-lg overflow-hidden border border-amber-200">
            <CoffeeMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeSearch;

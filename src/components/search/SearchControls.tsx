import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";

type SearchControlsProps = {
  onSearch?: (params: SearchParams) => void;
  defaultValues?: SearchParams;
};

type SearchParams = {
  query: string;
  radius: number;
  category: string;
  priceRange: number[];
};

const SearchControls = ({
  onSearch = () => {},
  defaultValues = {
    query: "",
    radius: 5,
    category: "all",
    priceRange: [0, 100],
  },
}: SearchControlsProps) => {
  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          Search Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Search restaurants..."
            defaultValue={defaultValues.query}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select defaultValue={defaultValues.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="restaurant">Restaurants</SelectItem>
              <SelectItem value="cafe">Cafes</SelectItem>
              <SelectItem value="bar">Bars</SelectItem>
              <SelectItem value="fastfood">Fast Food</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Search Radius (km)</label>
          <div className="pt-2">
            <Slider
              defaultValue={[defaultValues.radius]}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="pt-2">
            <Slider
              defaultValue={defaultValues.priceRange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchControls;

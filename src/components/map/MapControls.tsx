import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Layers, Search, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MapControlsProps {
  onLayerChange?: (layer: string) => void;
  onRadiusChange?: (radius: number) => void;
  onSearch?: (query: string) => void;
  onLocationSelect?: () => void;
}

const MapControls = ({
  onLayerChange = () => {},
  onRadiusChange = () => {},
  onSearch = () => {},
  onLocationSelect = () => {},
}: MapControlsProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-zinc-900/90 backdrop-blur-sm border-zinc-800 p-4 rounded-lg border shadow-lg w-64 text-white">
      <div className="flex gap-2">
        <Input
          placeholder="Search location..."
          className="flex-1"
          onKeyDown={(e) =>
            e.key === "Enter" && onSearch(e.currentTarget.value)
          }
        />
        <Button size="icon" variant="outline" onClick={onLocationSelect}>
          <MapPin className="h-4 w-4" />
        </Button>
      </div>

      <Select onValueChange={onLayerChange} defaultValue="street">
        <SelectTrigger>
          <SelectValue placeholder="Select map layer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="street">Street</SelectItem>
          <SelectItem value="satellite">Satellite</SelectItem>
          <SelectItem value="terrain">Terrain</SelectItem>
        </SelectContent>
      </Select>

      <div className="space-y-2">
        <label className="text-sm font-medium">Search Radius (km)</label>
        <Slider
          defaultValue={[5]}
          max={50}
          step={1}
          onValueChange={(value) => onRadiusChange(value[0])}
        />
      </div>
    </div>
  );
};

export default MapControls;

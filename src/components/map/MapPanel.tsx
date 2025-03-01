import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface MapPanelProps {
  onRadiusChange?: (value: number) => void;
  onTogglePOI?: (value: boolean) => void;
  onViewHeatmap?: () => void;
}

const MapPanel = ({
  onRadiusChange = () => {},
  onTogglePOI = () => {},
  onViewHeatmap = () => {},
}: MapPanelProps) => {
  return (
    <div className="absolute left-4 top-4 w-72 rounded-lg bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 shadow-lg z-[1000] p-4 text-white">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Buffer Radius</label>
          <Slider
            defaultValue={[5]}
            max={20}
            step={1}
            onValueChange={(value) => onRadiusChange(value[0])}
            className="[&_[role=slider]]:bg-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm">Show Points of Interest</label>
          <Switch onCheckedChange={onTogglePOI} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="w-full bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
          >
            Add Pin
          </Button>
          <Button
            variant="outline"
            className="w-full bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
            onClick={onViewHeatmap}
          >
            View Heat Map
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;

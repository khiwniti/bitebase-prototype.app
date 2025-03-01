import React, { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer } from "react-leaflet";
import "@/lib/leaflet-setup";
import MapMarkers from "./MapMarkers";
import MapPanel from "./MapPanel";
import CompetitorPanel from "./CompetitorPanel";
import MapLayers from "./MapLayers";
import MapEvents from "./MapEvents";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import DataVisualizer from "../dashboard/DataVisualizer";

interface MapViewProps {
  onSearch?: (query: string) => void;
  onRadiusChange?: (radius: number) => void;
  center?: [number, number];
  zoom?: number;
}

const MapView: React.FC<MapViewProps> = ({
  onSearch = () => {},
  onRadiusChange = () => {},
  center = [40.7128, -74.006],
  zoom = 13,
}) => {
  const [mapLayer, setMapLayer] = useState("street");
  const [searchRadius, setSearchRadius] = useState(5);
  const [showPOI, setShowPOI] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [mapCenter, setMapCenter] = useState(center);

  const handleRadiusChange = useCallback(
    (radius: number) => {
      setSearchRadius(radius);
      onRadiusChange(radius);
    },
    [onRadiusChange],
  );

  const handleTogglePOI = useCallback((value: boolean) => {
    setShowPOI(value);
  }, []);

  const handleViewHeatmap = useCallback(() => {
    setShowHeatmap((prev) => !prev);
  }, []);

  return (
    <TooltipProvider>
      <div className="w-full h-full relative">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
        >
          <MapLayers
            layer={mapLayer}
            center={mapCenter}
            searchRadius={searchRadius}
            showHeatmap={showHeatmap}
          />
          {showPOI && <MapMarkers locations={[]} />}
          <MapEvents center={mapCenter} zoom={zoom} />
        </MapContainer>
        <MapPanel
          onRadiusChange={handleRadiusChange}
          onTogglePOI={handleTogglePOI}
          onViewHeatmap={handleViewHeatmap}
        />
        <CompetitorPanel />
        <div className="absolute right-4 bottom-4 w-96 space-y-4">
          <DataVisualizer />
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-800 text-white"
            >
              Cluster View
            </Button>
            <Button
              variant="outline"
              className="bg-zinc-900/90 border-zinc-800 hover:bg-zinc-800 text-white"
            >
              Bubble Chart
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MapView;

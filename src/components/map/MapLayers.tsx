import React from "react";
import { Circle, LayerGroup, TileLayer, Rectangle } from "react-leaflet";

interface MapLayersProps {
  layer?: string;
  center?: [number, number];
  searchRadius?: number;
  showHeatmap?: boolean;
  heatmapData?: Array<[number, number, number]>;
}

const MapLayers = ({
  layer = "street",
  center = [40.7128, -74.006],
  searchRadius = 5,
  showHeatmap = false,
  heatmapData = [],
}: MapLayersProps) => {
  const getTileLayer = () => {
    switch (layer) {
      case "satellite":
        return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case "terrain":
        return "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png";
      default:
        return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    }
  };

  // Create a grid of rectangles for the heatmap
  const generateHeatmapGrid = () => {
    if (!showHeatmap || !center) return null;

    const gridSize = 20; // Size of each grid cell in pixels
    const bounds = [
      [center[0] - 0.1, center[1] - 0.1],
      [center[0] + 0.1, center[1] + 0.1],
    ];

    const grid = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const opacity = Math.random() * 0.5; // Random opacity for demo
        const cellBounds = [
          [
            bounds[0][0] + (i / gridSize) * 0.2,
            bounds[0][1] + (j / gridSize) * 0.2,
          ],
          [
            bounds[0][0] + ((i + 1) / gridSize) * 0.2,
            bounds[0][1] + ((j + 1) / gridSize) * 0.2,
          ],
        ];

        grid.push(
          <Rectangle
            key={`${i}-${j}`}
            bounds={cellBounds as [[number, number], [number, number]]}
            pathOptions={{
              color: "transparent",
              fillColor: "#ff6b6b",
              fillOpacity: opacity,
            }}
          />,
        );
      }
    }
    return grid;
  };

  return (
    <LayerGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={getTileLayer()}
      />
      {center && searchRadius && (
        <Circle
          center={center}
          radius={searchRadius * 1000}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#3b82f6",
            fillOpacity: 0.2,
          }}
        />
      )}
      {showHeatmap && generateHeatmapGrid()}
    </LayerGroup>
  );
};

export default MapLayers;

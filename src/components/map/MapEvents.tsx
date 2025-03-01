import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapEventsProps {
  center: [number, number];
  zoom: number;
}

const MapEvents: React.FC<MapEventsProps> = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

export default MapEvents;

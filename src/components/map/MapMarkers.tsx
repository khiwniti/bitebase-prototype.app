import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category?: string;
  rating?: number;
}

interface MapMarkersProps {
  locations: Location[];
}

const MapMarkers: React.FC<MapMarkersProps> = ({
  locations = [
    {
      id: "1",
      name: "Sample Restaurant",
      latitude: 40.7128,
      longitude: -74.006,
      category: "Restaurant",
      rating: 4.5,
    },
  ],
}) => {
  const getCustomIcon = (rating: number = 0) => {
    const color =
      rating >= 4.5
        ? "green"
        : rating >= 4.0
          ? "blue"
          : rating >= 3.5
            ? "yellow"
            : "red";

    return new Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };

  return (
    <>
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={getCustomIcon(location.rating)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{location.name}</h3>
              {location.category && (
                <p className="text-sm text-muted-foreground">
                  {location.category}
                </p>
              )}
              {location.rating && (
                <p className="text-sm">Rating: {location.rating} ⭐</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapMarkers;

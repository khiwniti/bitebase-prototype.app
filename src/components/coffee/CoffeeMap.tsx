import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

interface CoffeeShopMarker {
  id: string;
  position: [number, number];
  name: string;
  type: string;
  price: string;
  logo: string;
  rating: number;
}

const CoffeeMap = () => {
  const markers: CoffeeShopMarker[] = [
    {
      id: "1",
      position: [13.7563, 100.5018], // Roots Bangkok
      name: "Roots Bangkok",
      type: "Specialty Coffee",
      price: "฿฿",
      logo: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.8,
    },
    {
      id: "2",
      position: [13.7469, 100.5349], // Factory Coffee
      name: "Factory Coffee",
      type: "Roastery & Cafe",
      price: "฿฿฿",
      logo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.7,
    },
    {
      id: "3",
      position: [13.7262, 100.5149], // Ceresia Coffee Roasters
      name: "Ceresia Coffee Roasters",
      type: "Specialty Coffee",
      price: "฿฿฿",
      logo: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.9,
    },
    {
      id: "4",
      position: [13.7372, 100.5789], // Brave Roasters
      name: "Brave Roasters",
      type: "Artisan Coffee",
      price: "฿฿",
      logo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      rating: 4.6,
    },
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1047/1047503.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <MapContainer
      center={[13.7563, 100.5018]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Marker key={marker.id} position={marker.position} icon={customIcon}>
          <Popup>
            <div className="p-2 max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={marker.logo}
                    alt={marker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium">{marker.name}</span>
              </div>
              <p className="text-sm text-amber-800">{marker.type}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-amber-700 font-medium">{marker.price}</p>
                <p className="text-sm">Rating: {marker.rating}⭐</p>
              </div>
              <button className="mt-2 w-full py-1 px-3 bg-amber-600 text-white rounded text-sm hover:bg-amber-700 transition-colors">
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CoffeeMap;

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface CoffeeShop {
  id: string;
  name: string;
  logo: string;
  type: string;
  location: string;
  price: string;
  specialties: string[];
  rating: number;
  isNew: boolean;
  isFeatured?: boolean;
  openHours: string;
}

const coffeeShops: CoffeeShop[] = [
  {
    id: "1",
    name: "Roots Bangkok",
    logo: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    type: "Specialty Coffee",
    location: "Sukhumvit, Bangkok",
    price: "฿฿",
    specialties: ["Single Origin", "Pour Over", "Cold Brew"],
    rating: 4.8,
    isNew: false,
    isFeatured: true,
    openHours: "7:00 - 18:00",
  },
  {
    id: "2",
    name: "Factory Coffee",
    logo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    type: "Roastery & Cafe",
    location: "Phaya Thai, Bangkok",
    price: "฿฿฿",
    specialties: ["House Blend", "Aeropress", "Espresso"],
    rating: 4.7,
    isNew: true,
    openHours: "8:00 - 19:00",
  },
  {
    id: "3",
    name: "Ceresia Coffee Roasters",
    logo: "https://images.unsplash.com/photo-1515442261605-65987783cb6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    type: "Specialty Coffee",
    location: "Sathorn, Bangkok",
    price: "฿฿฿",
    specialties: ["House Roast", "Siphon", "Flat White"],
    rating: 4.9,
    isNew: false,
    isFeatured: true,
    openHours: "7:30 - 17:30",
  },
  {
    id: "4",
    name: "Brave Roasters",
    logo: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    type: "Artisan Coffee",
    location: "Thonglor, Bangkok",
    price: "฿฿",
    specialties: ["Signature Blend", "Nitro Cold Brew", "Latte Art"],
    rating: 4.6,
    isNew: true,
    openHours: "8:00 - 20:00",
  },
];

const CoffeeShopList = () => {
  return (
    <div className="space-y-4">
      {coffeeShops.map((shop) => (
        <div
          key={shop.id}
          className="p-4 border border-amber-200 rounded-lg hover:shadow-md transition-shadow bg-amber-50"
        >
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-amber-300">
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-amber-800">{shop.type}</p>
                  <h3 className="font-medium text-lg">{shop.name}</h3>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-700">{shop.price}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="ml-1 text-sm font-medium">
                      {shop.rating}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">{shop.location}</p>
              <p className="text-xs text-gray-500 mt-1">
                Open: {shop.openHours}
              </p>

              <div className="flex justify-between items-center mt-3">
                <div className="flex flex-wrap gap-2">
                  {shop.specialties.map((specialty, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-amber-100 text-amber-800 border-amber-200"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center justify-end mt-3 pt-3 border-t border-amber-100">
            <div className="flex items-center gap-2">
              {shop.isFeatured && (
                <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-200">
                  Featured
                </Badge>
              )}
              {shop.isNew && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  New
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoffeeShopList;

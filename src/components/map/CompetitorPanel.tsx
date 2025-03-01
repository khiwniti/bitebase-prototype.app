import React from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  image: string;
  price?: string;
}

interface CompetitorPanelProps {
  products?: Product[];
}

const CompetitorPanel = ({
  products = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: "$9.99",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: "$12.99",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: "$8.99",
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      price: "$15.99",
    },
  ],
}: CompetitorPanelProps) => {
  return (
    <div className="absolute left-4 top-72 w-72 rounded-lg bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 shadow-lg z-[1000] p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Top Competitor</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {products.map((product) => (
            <div key={product.id} className="space-y-2">
              <div className="aspect-square rounded-md overflow-hidden bg-zinc-800">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Product ID - </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                >
                  Explore
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
          variant="outline"
        >
          See all products
        </Button>
      </div>
    </div>
  );
};

export default CompetitorPanel;

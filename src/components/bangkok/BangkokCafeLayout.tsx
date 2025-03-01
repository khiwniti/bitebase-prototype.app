import React from "react";
import { Link } from "react-router-dom";
import { Coffee, BarChart2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BangkokCafeLayoutProps {
  children: React.ReactNode;
  activeTab?: "map" | "analytics";
}

const BangkokCafeLayout: React.FC<BangkokCafeLayoutProps> = ({
  children,
  activeTab = "map",
}) => {
  return (
    <div className="min-h-screen bg-amber-50">
      <header className="bg-white shadow-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Coffee className="h-6 w-6 text-amber-600 mr-2" />
              <h1 className="text-xl font-bold text-amber-800">
                BangkokBrew Explorer
              </h1>
            </div>

            <nav className="flex space-x-4">
              <Link to="/bangkok">
                <Button
                  variant={activeTab === "map" ? "default" : "outline"}
                  className={
                    activeTab === "map"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "border-amber-200 text-amber-800 hover:bg-amber-100"
                  }
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Map View
                </Button>
              </Link>
              <Link to="/bangkok/analytics">
                <Button
                  variant={activeTab === "analytics" ? "default" : "outline"}
                  className={
                    activeTab === "analytics"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "border-amber-200 text-amber-800 hover:bg-amber-100"
                  }
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
};

export default BangkokCafeLayout;

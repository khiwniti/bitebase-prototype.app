import React from "react";
import Header from "./dashboard/Header";
import MetricsGrid from "./dashboard/MetricsGrid";
import DataVisualizer from "./dashboard/DataVisualizer";
import AIChat from "./dashboard/AIChat";
import MapView from "./map/MapView";
import CompetitorList from "./analysis/CompetitorList";

const Home = () => {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <div className="relative h-[calc(100vh-64px)]">
        <MapView />
        <div className="absolute right-4 top-4 w-96 z-[1000] space-y-4">
          <CompetitorList />
          <AIChat />
        </div>
      </div>
    </div>
  );
};

export default Home;

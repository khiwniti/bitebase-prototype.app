import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import SettingsLayout from "./components/settings/SettingsLayout";
import GeneralSettings from "./components/settings/GeneralSettings";
import AccountSettings from "./components/settings/AccountSettings";
import ApiSettings from "./components/settings/ApiSettings";
import CoffeeSearch from "./components/coffee/CoffeeSearch";
import MarketsDashboard from "./components/dashboard/MarketsDashboard";
import BangkokCafeMap from "./components/bangkok/BangkokCafeMap";
import BangkokCafeAnalytics from "./components/bangkok/BangkokCafeAnalytics";
import BangkokCafeLayout from "./components/bangkok/BangkokCafeLayout";
import SimpleRestaurantDashboard from "./components/bangkok/SimpleRestaurantDashboard";
import SimpleBiteBaseDashboard from "./components/dashboard/SimpleBiteBaseDashboard";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      <Suspense fallback={<p>Loading...</p>}>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<SimpleBiteBaseDashboard />} />
          <Route path="/coffee" element={<CoffeeSearch />} />
          <Route path="/map" element={<Home />} />
          <Route
            path="/restaurant-dashboard"
            element={<SimpleRestaurantDashboard />}
          />
          <Route
            path="/bangkok"
            element={
              <BangkokCafeLayout activeTab="map">
                <BangkokCafeMap />
              </BangkokCafeLayout>
            }
          />
          <Route
            path="/bangkok/analytics"
            element={
              <BangkokCafeLayout activeTab="analytics">
                <BangkokCafeAnalytics />
              </BangkokCafeLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsLayout>
                <GeneralSettings />
              </SettingsLayout>
            }
          />
          <Route
            path="/settings/account"
            element={
              <SettingsLayout>
                <AccountSettings />
              </SettingsLayout>
            }
          />
          <Route
            path="/settings/api"
            element={
              <SettingsLayout>
                <ApiSettings />
              </SettingsLayout>
            }
          />
        </Routes>
      </Suspense>
    </Providers>
  );
}

export default App;

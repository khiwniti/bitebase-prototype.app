import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SettingsLayout from "./components/settings/SettingsLayout";
import GeneralSettings from "./components/settings/GeneralSettings";
import BiteBaseDashboard from "./components/dashboard/BiteBaseDashboard";

const TestComponent = () => (
  <div className="p-10">
    <h1 className="text-3xl font-bold text-blue-600">Test Component</h1>
    <p className="mt-4">If you can see this, React is rendering correctly!</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestComponent />} />
        {/* Other routes commented out for testing */}
        {/* <Route path="/dashboard" element={<BiteBaseDashboard />} /> */}
        {/* <Route path="/settings" element={<SettingsLayout />}>
          <Route path="general" element={<GeneralSettings />} />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default App;

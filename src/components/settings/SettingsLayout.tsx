import React from "react";
import { Link } from "react-router-dom";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="container mx-auto p-6 bg-zinc-900/90 backdrop-blur-sm text-white">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <nav className="space-y-2">
            <Link
              to="/settings"
              className="block p-2 rounded hover:bg-zinc-800 transition-colors"
            >
              General
            </Link>
            <Link
              to="/settings/account"
              className="block p-2 rounded hover:bg-zinc-800 transition-colors"
            >
              Account
            </Link>
            <Link
              to="/settings/api"
              className="block p-2 rounded hover:bg-zinc-800 transition-colors"
            >
              API
            </Link>
          </nav>
        </div>
        <div className="w-full md:w-3/4">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;

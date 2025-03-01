import React from "react";
import { MoonIcon, SunIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  userName?: string;
}

const Header = ({
  theme = "light",
  onThemeToggle = () => {},
  userName = "Restaurant Owner",
}: HeaderProps) => {
  return (
    <header className="sticky top-0 w-full border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold">BiteBase AI</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Analytics</Button>
          <Button variant="ghost">Reports</Button>
          <Button variant="ghost">Settings</Button>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onThemeToggle}>
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {userName.charAt(0)}
                  </span>
                </div>
                <span className="hidden md:inline-block">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

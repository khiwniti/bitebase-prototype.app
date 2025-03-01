import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      {children}
      <div className="flex flex-row space-x-1 w-[800px] h-[600px]">
        <div className="w-32 bg-blue-100">01</div>
        <div className="w-32 bg-blue-200">02</div>
      </div>
    </TooltipProvider>
  );
}

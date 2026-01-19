"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { createContext, useState } from "react";

export const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="min-h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 gradient-bg will-change-[background-position,filter]"
          aria-hidden="true"
        />
        <AppSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <main
          className="p-8 min-h-screen transition-all duration-300 ease-in-out"
          style={{
            marginLeft: isCollapsed ? "104px" : "304px",
          }}
        >
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}

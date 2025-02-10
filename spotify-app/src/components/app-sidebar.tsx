"use client";

import { Library } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const toggles = [
  {
    value: "playlists",
    label: "Toggle Playlists",
  },
  {
    value: "albums",
    label: "Toggle Albums",
  },
  {
    value: "artists",
    label: "Toggle Artists",
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        {state === "collapsed" ? (
          <div className="flex flex-col gap-2 items-center">
            <SidebarTrigger />
            <Library />
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-1">
              <Library />
              Your Library
            </div>
            <div>
              <SidebarTrigger />
            </div>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {state === "expanded" && (
          <SidebarGroup>
            <SidebarGroupContent>
              <ToggleGroup size={"sm"} type="multiple" className="w-full">
                {toggles.map((item) => (
                  <ToggleGroupItem
                    key={item.value}
                    value={item.value}
                    aria-label={item.label}
                    className="rounded-full bg-neutral-700/50 px-4 hover:bg-neutral-700/65 data-[state=on]:bg-slate-200 data-[state=on]:text-black capitalize"
                  >
                    {item.value}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

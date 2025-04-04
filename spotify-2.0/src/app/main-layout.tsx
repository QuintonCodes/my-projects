"use client";

import LeftSidebar from "@/components/left-sidebar";
import PlaybackControls from "@/components/playback-controls";
import RightSidebar from "@/components/right-sidebar";
import TopNavBar from "@/components/top-navbar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRightSidebar } from "@/context/right-sidebar-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useRightSidebar();

  return (
    <div className="flex flex-col">
      <div className="h-[calc(100vh_-5.4rem_-16px)]">
        <ResizablePanelGroup direction="horizontal" className="flex">
          <ResizablePanel
            defaultSize={15}
            minSize={5}
            maxSize={25}
            className="flex-1 mx-2 mt-2"
          >
            <LeftSidebar />
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Content */}
          <ResizablePanel
            defaultSize={30}
            className={`flex flex-col items-center flex-1 transition-all duration-300 ${
              !isOpen && "mr-2"
            }`}
          >
            <TopNavBar />
            <div className="m-0 overflow-hidden size-full bg-neutral-900 rounded-xl">
              <ScrollArea className="size-full">{children}</ScrollArea>
            </div>
          </ResizablePanel>

          {isOpen && (
            <>
              <ResizableHandle />

              <ResizablePanel
                defaultSize={15}
                minSize={0}
                maxSize={25}
                className="flex-1 mx-2 mt-2"
              >
                <RightSidebar />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
      <PlaybackControls />
    </div>
  );
}

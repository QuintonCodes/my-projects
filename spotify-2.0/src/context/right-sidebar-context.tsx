import { createContext, ReactNode, useContext, useState } from "react";

type RightSidebarContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const RightSidebarContext = createContext<RightSidebarContextType>({
  activeTab: "queue",
  setActiveTab: () => {},
  isOpen: true,
  setIsOpen: () => {},
});

export const RightSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState("queue");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <RightSidebarContext.Provider
      value={{ activeTab, setActiveTab, isOpen, setIsOpen }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
};

export const useRightSidebar = () => useContext(RightSidebarContext);

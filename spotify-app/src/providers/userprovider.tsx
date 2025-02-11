"use client";

import { UserContextProvider } from "@/hooks/use-user";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default UserProvider;

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { UserDetails } from "../../types";
import { useSupabase } from "./supabase-context";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading: isLoadingUser, supabase } = useSupabase();
  const user = session?.user ?? null;

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const { data, error } = await supabase.from("users").select("*").single();

      if (error) {
        console.error("Error fetching user details:", error);
        return null;
      }

      return data as UserDetails;
    };

    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);

      getUserDetails()
        .then((details) => {
          if (details) setUserDetails(details);
        })
        .finally(() => setIsLoadingData(false));
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser, isLoadingData, userDetails, supabase]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }

  return context;
};

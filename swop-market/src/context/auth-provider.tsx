import { Seller, User } from "@prisma/client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserWithSeller = Omit<User, "password"> & {
  sellerProfile?: Seller | null;
};

type AuthStore = {
  user: UserWithSeller | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user?: UserWithSeller | null) => void;
  logout: () => Promise<void>;
  updateUser: (user: Partial<UserWithSeller>) => void;
};

type SessionResponse = {
  user: UserWithSeller | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<StoreApi<AuthStore> | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() =>
    createStore<AuthStore>()(
      persist(
        (set, get) => ({
          user: null,
          isAuthenticated: false,
          isLoading: true,
          setUser: (user) => {
            set({
              user: user ?? null,
              isAuthenticated: !!user,
              isLoading: false,
            });
          },
          logout: async () => {
            try {
              axios.post("/api/auth/logout");
            } catch {
              set({ user: null, isAuthenticated: false, isLoading: false });
            }
            set({ user: null, isAuthenticated: false, isLoading: false });
          },
          updateUser: (user) => {
            const currentUser = get().user;
            if (!currentUser) return;
            set({
              user: { ...currentUser, ...user } as UserWithSeller,
            });
          },
        }),
        {
          name: "auth-storage",
          storage: createJSONStorage(() => sessionStorage),
          partialize: (state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
          }),
        }
      )
    )
  );

  useEffect(() => {
    let isMounted = true;
    async function fetchSession() {
      try {
        const response = await axios.get<SessionResponse>("/api/auth/session");
        const data = response.data;
        if (isMounted) {
          store.getState().setUser(data.user);
        }
      } catch {
        if (isMounted) {
          store.getState().setUser(null);
        }
      }
    }

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, [store]);

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}

export function useAuthStore() {
  const store = useContext(AuthContext);
  if (!store)
    throw new Error("useAuthStore must be used within an AuthProvider");
  return useStore(store);
}

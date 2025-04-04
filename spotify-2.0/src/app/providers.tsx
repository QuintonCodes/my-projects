"use client";

import AuthModal from "@/components/auth-modal";
import { RightSidebarProvider } from "@/context/right-sidebar-context";
import SupabaseProvider from "@/context/supabase-context";
import UserProvider from "@/context/user-context";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <UserProvider>
        <RightSidebarProvider>
          <Toaster
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
          <AuthModal />
          {children}
        </RightSidebarProvider>
      </UserProvider>
    </SupabaseProvider>
  );
}

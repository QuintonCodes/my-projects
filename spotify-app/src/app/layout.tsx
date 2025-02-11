import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ModalProvider from "@/providers/modalprovider";
import SupabaseProvider from "@/providers/supabaseprovider";
import ToasterProvider from "@/providers/toasterprovider";
import UserProvider from "@/providers/userprovider";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spotify App",
  description: "Spotify API web app for users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="icon.ico" type="image/x-icon" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <SidebarProvider className="rounded-lg">
              <AppSidebar />
              <main className="w-full">
                <Navbar />
                {children}
              </main>
            </SidebarProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

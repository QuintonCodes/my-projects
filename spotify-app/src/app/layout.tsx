import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
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
      <Navbar />
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}

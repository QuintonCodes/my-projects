import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { LayoutWrapper } from "./layout-wrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Chordify - Enhanced Spotify Experience",
  description:
    "A modern, futuristic dashboard that improves upon Spotify's desktop application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

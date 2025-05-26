import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwopMarket | Buy & Sell in South Africa",
  description:
    "South Africa's trusted marketplace for buying and selling new and pre-owned items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <Toaster richColors className={`${inter.variable}`} />
        </Providers>
      </body>
    </html>
  );
}

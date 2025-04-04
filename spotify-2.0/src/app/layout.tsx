import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import MainLayout from "./main-layout";
import Providers from "./providers";

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
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

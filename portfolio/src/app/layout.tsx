import AppErrorBoundary from "@/components/error-boundary";
import Header from "@/components/header";
import { PageTransition, StairTransition } from "@/components/transitions";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "react-toastify/ReactToastify.css";
import "./globals.css";
import Providers from "./providers";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  description: "Quinton's portfolio website",
  title: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Providers>
          <AppErrorBoundary>
            <Header />
            <StairTransition />
            <PageTransition>{children}</PageTransition>
          </AppErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}

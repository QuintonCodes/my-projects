import type { Metadata } from "next";
import { Mochiy_Pop_One } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";

const mochiyPopOne = Mochiy_Pop_One({
  variable: "--font-mochiy-pop-one",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KickFlip",
  description:
    "Skater inspired hoodies, sweaters and t-shirts for the rebel in you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mochiyPopOne.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster richColors className={`${mochiyPopOne.variable}`} />
      </body>
    </html>
  );
}

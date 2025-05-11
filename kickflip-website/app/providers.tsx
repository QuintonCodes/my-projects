import { CartProvider } from "@/context/cart-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <MotionConfig reducedMotion="user">
          <CartProvider>{children}</CartProvider>
        </MotionConfig>
      </ThemeProvider>
    </ClerkProvider>
  );
}

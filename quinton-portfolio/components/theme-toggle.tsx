"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const next = theme === "light" ? "dark" : "light";

  return (
    <div
      className={`transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(next)}
        aria-label={`Switch to ${next} theme`}
        className="w-10 h-10 rounded-full"
      >
        {theme === "light" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={() => setTheme(activeTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="transition-transform hover:scale-105"
    >
      {activeTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

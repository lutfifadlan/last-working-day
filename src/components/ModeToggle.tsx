"use client";

import * as React from "react";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkMode = resolvedTheme === "dark";

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
  };

  // Ensure component only renders after mounting to avoid SSR issues
  if (!isMounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Switch id="dark-mode" checked={isDarkMode} onClick={handleToggle} />
      <Label htmlFor="dark-mode">
        <Moon />
      </Label>
    </div>
  );
}

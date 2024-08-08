"use client"

import * as React from "react"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Switch id="dark-mode" onClick={theme === 'dark' ? () => setTheme("light") : () => setTheme("dark") }/>
      <Label htmlFor="dark-mode"><Moon/></Label>
    </div>
  )
}

"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="fixed bottom-20 left-6 z-50 h-10 w-10 rounded-full bg-[#131316]/80 backdrop-blur-md border border-[#c9a978]/30 shadow-lg shadow-black/40" />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle visual theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="fixed bottom-20 left-6 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-[#131316]/80 backdrop-blur-md border border-[#c9a978]/30 shadow-lg shadow-black/40 hover:border-[#c9a978] transition-all"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#c9a978]" />
      ) : (
        <Moon className="w-4 h-4 text-[#0b0b0e]" />
      )}
    </button>
  );
}

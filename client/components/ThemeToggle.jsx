"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ variant = "navbar", className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return variant === "floating" ? (
      <div className={`w-12 h-12 rounded-full glass-pill ${className}`} />
    ) : (
      <div className={`w-14 h-8 rounded-full border border-line bg-bg-alt ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle color theme"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className={`group flex items-center gap-2.5 pl-3 pr-4 py-3 rounded-full glass-pill text-accent hover:border-line-hover hover:scale-105 active:scale-95 transition-all ${className}`}
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-strong text-black shadow-md">
          {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-heading">
          {isDark ? "Dark" : "Light"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative flex items-center w-14 h-8 rounded-full border border-line bg-bg-alt px-1 transition-colors hover:border-line-hover ${className}`}
    >
      <span
        className={`absolute top-1 left-1 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-strong text-black shadow-md transition-transform duration-300 ease-out ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </span>
    </button>
  );
}

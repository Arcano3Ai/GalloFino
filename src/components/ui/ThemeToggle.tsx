"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Light/Dark Theme"
      title={theme === "dark" ? "Cambiar a Versión Clara" : "Cambiar a Versión Oscura"}
      className="inline-flex items-center justify-center w-8 h-8 bg-black/60 border border-gold/30 text-gold hover:border-gold hover:text-cream transition-all text-sm"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

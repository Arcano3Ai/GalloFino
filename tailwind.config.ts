import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0B",
        dark: "#111111",
        darkgray: "#1A1A1A",
        cream: {
          DEFAULT: "#F1E5CC",
          muted: "#C8B99A",
        },
        gold: {
          DEFAULT: "#B89245",
          light: "#D4AA6A",
          dark: "#8A6B30",
        },
        wine: {
          DEFAULT: "#681B1B",
          light: "#8B2A2A",
        },
      },
      fontFamily: {
        brand: ["var(--font-cinzel)", "serif"],
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #B89245 0%, #D4AA6A 50%, #8A6B30 100%)",
        "dark-gradient":
          "linear-gradient(180deg, #0B0B0B 0%, #111111 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.8s ease forwards",
        "pulse-gold": "pulse-gold 2s infinite",
        "rooster-bob": "rooster-bob 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(184, 146, 69, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(184, 146, 69, 0)" },
        },
        "rooster-bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;

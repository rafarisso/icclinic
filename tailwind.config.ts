import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ic: {
          cream: "#F5EDE0",
          "cream-light": "#FAF5EC",
          "cream-dark": "#E8DCC8",
          gold: "#B89968",
          "gold-light": "#D4B88A",
          "gold-dark": "#8B6F47",
          black: "#1A1A1A",
          charcoal: "#2D2620",
          white: "#FFFFFF",
          "gray-600": "#6B6258",
          "gray-400": "#9B9388",
          success: "#7A9166",
          warning: "#C9A961"
        }
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        "ic-sm": "8px",
        "ic-md": "12px",
        "ic-lg": "16px",
        "ic-xl": "24px",
        "ic-pill": "999px"
      },
      spacing: {
        "screen-px": "20px"
      },
      boxShadow: {
        "ic-soft": "0 18px 50px rgba(45, 38, 32, 0.11)",
        "ic-card": "0 12px 34px rgba(26, 26, 26, 0.08)",
        "ic-elevated": "0 20px 40px rgba(26, 26, 26, 0.22)"
      },
      keyframes: {
        "wa-pulse": {
          "0%, 80%, 100%": {
            boxShadow: "0 16px 34px rgba(37, 211, 102, 0.28)"
          },
          "88%": {
            boxShadow: "0 0 0 14px rgba(37, 211, 102, 0.13)"
          }
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.72", transform: "scale(1.08)" }
        }
      },
      animation: {
        "wa-pulse": "wa-pulse 4s ease-in-out 1",
        "soft-pulse": "soft-pulse 1.6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

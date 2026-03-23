import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base:    "#0a0a0f",
          raised:  "#111118",
          overlay: "#1a1a27",
        },
        accent: {
          DEFAULT: "#7c3aed",
          light:   "#a78bfa",
          glow:    "rgba(124,58,237,0.25)",
        },
        "cyan-accent": "#06b6d4",
        "cyan-light":  "#67e8f9",
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card:           "0 1px 0 rgba(255,255,255,0.05) inset, 0 20px 60px rgba(0,0,0,0.6)",
        "glow-violet":  "0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(124,58,237,0.1)",
        "glow-cyan":    "0 0 40px rgba(6,182,212,0.20), 0 0 80px rgba(6,182,212,0.08)",
        soft:           "0 10px 30px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "glow-pulse":    "glowPulse 3s ease-in-out infinite",
        "float":         "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;

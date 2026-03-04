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
        // Dark theme base - deep blacks/grays (not pure black)
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        muted: "var(--muted)",
        border: "var(--border)",
        // Accent - electric blue (customize in globals.css)
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-muted": "var(--accent-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px var(--accent)",
        "glow-sm": "0 0 20px -5px var(--accent)",
        card: "0 4px 24px -4px rgba(0,0,0,0.4)",
        "card-hover": "0 12px 40px -8px rgba(0,0,0,0.5), 0 0 30px -8px var(--accent-muted)",
      },
    },
  },
  plugins: [],
};

export default config;

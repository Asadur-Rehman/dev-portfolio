import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        "background-2": "var(--background-2)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-hover": "var(--surface-hover)",
        muted: "var(--muted)",
        "muted-strong": "var(--muted-strong)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-muted": "var(--accent-muted)",
        "accent-glow": "var(--accent-glow)",
        "accent-2": "var(--accent-2)",
        "accent-2-muted": "var(--accent-2-muted)",
        "accent-3": "var(--accent-3)",
        success: "var(--success)",
        error: "var(--error)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "rotate-border": "rotate-border 4s linear infinite",
        "breathing-glow": "breathingGlow 2.5s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s linear infinite",
        "orbit-ring": "orbitRing 12s linear infinite",
        "liquid-fill": "liquidFill 4s ease infinite",
        "draw-line": "drawLine 1.5s ease forwards",
        "slide-up": "slideUpEnter 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px var(--accent-glow)",
        "glow-sm": "0 0 16px -4px var(--accent-glow)",
        "glow-2": "0 0 40px -10px rgba(3, 105, 161, 0.12)",
        card: "0 1px 2px rgba(26, 24, 20, 0.06), 0 4px 20px -4px rgba(26, 24, 20, 0.1)",
        "card-hover":
          "0 4px 24px -4px rgba(26, 24, 20, 0.12), 0 8px 32px -8px rgba(29, 78, 216, 0.1)",
        "glow-accent": "0 4px 20px -4px var(--accent-glow)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(ellipse at center, var(--accent-muted) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;

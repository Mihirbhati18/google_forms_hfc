import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          light: "var(--color-primary-light)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
          light: "var(--color-secondary-light)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          hover: "var(--color-surface-hover)",
        },
        background: "var(--color-background)",
        foreground: "var(--color-text)",
        muted: "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        success: {
          DEFAULT: "var(--color-success)",
          light: "var(--color-success-light)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          light: "var(--color-warning-light)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          light: "var(--color-error-light)",
        },
        // Dark mode
        "dark-bg": "var(--color-dark-bg)",
        "dark-surface": "var(--color-dark-surface)",
        "dark-surface-hover": "var(--color-dark-surface-hover)",
        "dark-border": "var(--color-dark-border)",
        "dark-text": "var(--color-dark-text)",
        "dark-text-muted": "var(--color-dark-text-muted)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px var(--color-primary)",
        "glow-sm": "0 0 10px var(--color-primary)",
        soft: "0 2px 15px var(--color-shadow)",
        "soft-lg": "0 4px 25px var(--color-shadow)",
      },
      animation: {
        "float-slow": "float 20s ease-in-out infinite",
        "float-medium": "float 15s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(10px)" },
          "50%": { transform: "translateY(-10px) translateX(-10px)" },
          "75%": { transform: "translateY(-25px) translateX(5px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px var(--color-primary)" },
          "50%": { boxShadow: "0 0 20px var(--color-primary), 0 0 40px var(--color-primary)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bnnr: {
          50: "#fdf0e8",
          100: "#fde8d0",
          200: "#f5b888",
          300: "#f0a069",
          400: "#e08850",
          500: "#c96a35",
          600: "#8b4a25",
          700: "#5c3118",
          800: "#2e190c",
          900: "#170c06",
        },
        dark: {
          bg: "#080810",
          "bg-subtle": "#0d0d18",
          card: "#141423",
          border: "rgba(240, 160, 105, 0.18)",
        },
        light: {
          bg: "#faf7f2",
          "bg-subtle": "#f5f0e8",
          card: "#ffffff",
          border: "rgba(200, 106, 53, 0.18)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        bnnr: "12px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(240, 160, 105, 0.08), 0 0 40px rgba(240, 160, 105, 0.04)",
        "glow-strong": "0 0 20px rgba(240, 160, 105, 0.15), 0 0 60px rgba(240, 160, 105, 0.08)",
        "glow-accent": "0 0 30px rgba(240, 160, 105, 0.25), 0 0 80px rgba(240, 160, 105, 0.12)",
        "card-dark": "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-light": "0 1px 3px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite alternate",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "terminal-cursor": "terminal-cursor 1s step-end infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(240, 160, 105, 0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(240, 160, 105, 0.25), 0 0 80px rgba(240, 160, 105, 0.1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "terminal-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

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
        brand: {
          navy: "#0A192F",
          navyDark: "#050C1A",
          navyLight: "#132743",
          navyBorder: "#1E3A5F",
          gold: "#F59E0B",
          goldHover: "#D97706",
          goldLight: "#FEF3C7",
          goldGradientStart: "#FBBF24",
          goldGradientEnd: "#D97706",
          blue: "#2563EB",
          blueLight: "#38BDF8",
          cardBg: "rgba(15, 23, 42, 0.75)",
          cardBorder: "rgba(245, 158, 11, 0.2)",
        },
      },
      fontFamily: {
        gujarati: [
          "'Noto Sans Gujarati'",
          "'Hind Vadodara'",
          "'Mukta Vaani'",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(37, 99, 235, 0.25), rgba(10, 25, 47, 0))",
        "gold-gradient": "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(30, 58, 95, 0.4) 0%, rgba(10, 25, 47, 0.8) 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        "blue-glow": "0 0 25px -5px rgba(37, 99, 235, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;

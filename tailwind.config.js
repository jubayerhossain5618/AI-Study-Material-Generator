import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        ink: "#0E1024",
        brand: {
          50: "#F0EEFF",
          100: "#E4E0FE",
          200: "#C9C2FD",
          300: "#A99EFC",
          400: "#8B7CF7",
          500: "#6D54EE",
          600: "#5A3BDD",
          700: "#4A2EBB",
          800: "#3B2494",
          900: "#2E1D72",
        },
        accent: {
          400: "#FFB648",
          500: "#FF9F1C",
          600: "#E8850A",
        },
      },
      boxShadow: {
        soft: "0 4px 24px -6px rgba(46, 29, 114, 0.12)",
        card: "0 2px 12px rgba(14, 16, 36, 0.06)",
        glow: "0 0 60px rgba(109, 84, 238, 0.35)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6D54EE 0%, #8B7CF7 50%, #FF9F1C 130%)",
        "ink-gradient": "radial-gradient(circle at top right, #2E1D72 0%, #0E1024 60%)",
      },
    },
  },
  plugins: [typography],
};

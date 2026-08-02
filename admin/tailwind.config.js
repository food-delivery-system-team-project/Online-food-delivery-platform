/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff6e4a",
          50: "#fff3f0",
          100: "#ffe3db",
          200: "#ffc4b3",
          300: "#ff9d80",
          400: "#ff8763",
          500: "#ff6e4a",
          600: "#f14f28",
          700: "#c93c1c",
          800: "#a1321c",
          900: "#822c1c",
        },
        ink: {
          900: "#1c1917",
          800: "#292524",
          700: "#44403c",
          500: "#78716c",
          300: "#d6d3d1",
          100: "#f5f4f2",
          50: "#faf9f8",
        },
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(28, 25, 23, 0.05), 0 1px 3px 0 rgba(28, 25, 23, 0.06)",
        soft: "0 8px 24px -8px rgba(255, 110, 74, 0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
}

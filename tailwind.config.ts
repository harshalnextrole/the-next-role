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
        navy: {
          50: "#f0f1f5",
          100: "#d9dce6",
          200: "#b3b9cd",
          300: "#8d96b4",
          400: "#67739b",
          500: "#414f82",
          600: "#343f68",
          700: "#272f4e",
          800: "#1a1f36",
          900: "#0d101b",
          950: "#070810",
        },
        coral: {
          50: "#fef3f0",
          100: "#fde3dc",
          200: "#fbc7b9",
          300: "#f7a08a",
          400: "#f17a5b",
          500: "#e85d3a",
          600: "#d04425",
          700: "#ad361d",
          800: "#8a2c18",
          900: "#6e2314",
          950: "#3b110a",
        },
        cream: {
          50: "#fefdfb",
          100: "#faf8f5",
          200: "#f5f0ea",
          300: "#ede5da",
          400: "#ddd0bf",
          500: "#c9b89e",
        },
        forest: {
          50: "#edf5f0",
          100: "#d4e8db",
          200: "#a9d1b7",
          300: "#7eba93",
          400: "#53a36f",
          500: "#2d6a4f",
          600: "#245540",
          700: "#1b4030",
          800: "#122b20",
          900: "#091510",
        },
      },
      fontFamily: {
        display: ['"DM Sans"', "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

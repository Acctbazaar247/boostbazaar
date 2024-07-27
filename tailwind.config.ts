import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1rem",
        xl: "2rem",
        "2xl": "0rem",
      },
    },
    colors: {
      primary: "#5D5FDF",
      white: "#FFFFFF",
      black: "#333333",
      grey: "#F8F8F8",
      "dark-grey": "#9090A1",
      red: "#FF4E4E",
      transparent: "transparent",
    },
    extend: {
      backgroundColor: {
        "primary-7": "rgba(93, 95, 223, 0.07)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

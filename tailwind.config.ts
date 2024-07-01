import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        blue: "#8DC9E2",
        purple: "#C9AED6",
        "brown-light": "#F5E9E2",
        pink: "#DD667D",
        "pastel-pink": "#DDABAD",
        brown: "#704b3e",
        "bag-purple": "#bcb3db",
        "bag-blue": "#398bca",
        "dark-blue": "#344045",
        "purple-light": "#E9D9F1",
        "blue-light": "#D9E9F1",
      },
    },
  },
  plugins: [],
};
export default config;

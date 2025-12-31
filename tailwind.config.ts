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
        navy: "#0A3981",
        primary: "#1F509A",
        lightblue: "#D4EBF8",
        accent: "#E38E49",
        neutral: "#D4EBF8",
      },
      fontFamily: {
        heading: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;


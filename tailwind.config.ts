import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      secondary: "Kelsi, sans-serif",
    },
    extend: {
      colors: {
        gray: "#999999",
        red: "#FF2F3D",
        black: "#2d112b",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;

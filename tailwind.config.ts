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
        primary: "#FF2F3D",
        black: "#2d112b",
        cream: "#FEDCC8",
      },
    },
  },
  plugins: [],
} satisfies Config;

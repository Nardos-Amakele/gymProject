const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/node_modules/@nextui-org/theme/dist/components/[object Object].js",
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }, // Move to the left 50% of the total width
        },
        slideLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" }, // Move to the right 50% of the total width
        },
      },
      animation: {
        slideRight: "slideRight 30s linear infinite",
        slideLeft: "slideLeft 30s linear infinite",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      colors: {
        customBlue: "#2596BE",
        customHoverBlue: "#2595bedb",
      },
    },
  },
  plugins: [nextui(), require("tailwind-scrollbar")],
};

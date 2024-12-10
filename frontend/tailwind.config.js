const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
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
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        slideLeft: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(50%)",
          },
        },
      },
      animation: {
        slideRight: "slideRight 30s linear infinite",
        slideLeft: "slideLeft 30s linear infinite",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
        jostVariable: ["JostVariable", "sans-serif"],
      },
      colors: {
        customBlue: "#2596BE",
        customHoverBlue: "#2595bedb",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    nextui(),
    require("tailwind-scrollbar"),
    require("tailwindcss-animate"),
  ],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Move to the left 50% of the total width
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(50%)' }, // Move to the right 50% of the total width
        },
      },
      animation: {
        slideRight: 'slideRight 30s linear infinite',
        slideLeft: 'slideLeft 30s linear infinite',
      },
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
      },
      colors: {
        customBlue: '#2596BE', 
        customHoverBlue: '#2595bedb', 
      },
    },
  },
  plugins: [],
}
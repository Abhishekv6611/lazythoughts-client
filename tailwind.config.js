/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        customSpin: "customSpin 2s infinite",
      },
      keyframes: {
        customSpin: {
          "0%": { borderRadius: "50% 50% 0 0" },
          "25%": { borderRadius: "0 50% 50% 0" },
          "50%": { borderRadius: "0 0 50% 50%" },
          "75%": { borderRadius: "50% 0 0 50%" },
          "100%": { borderRadius: "50% 50% 0 0" },
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Epilogue", "sans-serif"],
    },
    extend: {
      fontFamily: {
        bilbo: ["Bilbo", "cursive"],
        epilouge: ["Epilogue", "sans-serif"],
      },
    },
  },
  plugins: [],
};

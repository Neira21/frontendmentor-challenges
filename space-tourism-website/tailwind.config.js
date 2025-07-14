/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        bluedark: "hsl(230, 35%, 7%)",
        bluelight: "hsl(231, 77%, 90%)",
        white: "hsl(0, 0%, 100%)"
      },
      fontFamily: {
        bellefair: ["bellefair", "serif"],
        barlow: ["barlow", "sans-serif"],
        'barlow-condensed': ["barlow-condensed", "sans-serif"]
      }
    },
  },
  plugins: [],
}


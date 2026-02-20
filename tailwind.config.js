/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#B48B78',
          dark: '#0F0B08',
          darkSecondary: "#0F0B08",
          lightDark:"#332D2B",
          secondary: "#E3C9AC",
        }
      },
      fontFamily: {
        nunito: ["Nunito Sans", 'sans-serif'],
        serif: ["Enikra", "serif"],
      }
    },
  },
  plugins: [],
}

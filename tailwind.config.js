/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      smythe: ["Smythe", "serif"]
    },
    extend: {},
  },
  plugins: [],
}
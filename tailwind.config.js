/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'r-xl':'1700px',
        'r-lg':'1450px',
        'r-md':'1300px',
        'r-sm':'1000px',
        'r-xs':'800px'
        // Define a custom breakpoint for screens smaller than sm
      }
    },
  },
  plugins: [],
}
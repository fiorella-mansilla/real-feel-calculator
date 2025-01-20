/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px", // Small screens
        md: "768px", // Medium screens
        lg: "1024px", // Large screens
      },
    }, 
  },
  plugins: [], 
};
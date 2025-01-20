/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // Fluid typography with `clamp` function
        sm: "clamp(0.875rem, 1.5vw, 1rem)",  
        base: "clamp(1rem, 2vw, 1.125rem)",  
        lg: "clamp(1.125rem, 2.25vw, 1.375rem)", 
        xl: "clamp(1.375rem, 2.75vw, 1.75rem)", 
        "2xl": "clamp(1.75rem, 3vw, 2.25rem)", 
        "3xl": "clamp(2rem, 3.5vw, 2.5rem)", 
        "4xl": "clamp(2.5rem, 4vw, 3rem)", 
      },
      spacing: {
        // Scalable padding and margin
        "fluid-1": "clamp(1rem, 2vw, 2rem)",
        "fluid-2": "clamp(1.5rem, 2.5vw, 2.5rem)",
      },
    },
  },
  plugins: [],
};
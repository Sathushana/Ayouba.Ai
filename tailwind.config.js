// tailwind.config.js (Create this file in your project root)

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Crucial: Tell Tailwind where your component files are
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Catches Hero.js
  ],
  theme: {
    extend: {
      // 2. Define your custom colors using semantic names
      colors: {
        'primary': {
          DEFAULT: '#e72638', // Main red/accent color
          hover: '#c71f40',   // Darker hover red
        },
        'light-bg': '#e0e4ef', // Hero section light background
        'section-bg': '#f0f0f0', // Symbols row background
      },
    },
  },
  plugins: [],
}
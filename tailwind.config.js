/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#d81f26',
        primaryHover: '#ab070d',
        secondary: '#0c2d57',
        success: '#00cc00',
        successHover: '#009900',
        error: '#e62e00',
        errorHover: '#b30000',
      },
    },
  },
  plugins: [],
}

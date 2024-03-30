/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0052cc',
        primaryHover: '#003380',
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

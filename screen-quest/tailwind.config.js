/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#10B981',
        background: '#0F172A',
        surface: '#1E293B',
        text: {
          primary: '#F1F5F9',
          secondary: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
}
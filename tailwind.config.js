/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1f2937',
        mist: '#eff6ff',
        ocean: '#0f766e',
        coral: '#f97316',
      },
      boxShadow: {
        soft: '0 12px 34px -18px rgba(15, 118, 110, 0.35)',
      },
    },
  },
  plugins: [],
}


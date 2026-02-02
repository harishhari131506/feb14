/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-rose': '#FFE5E5',
        'blush-pink': '#FFB6C1',
        'warm-beige': '#F5EBE0',
        'rose-gold': '#E8C4B8',
        'muted-red': '#D4696A',
        'cream': '#FFF8F3',
        'soft-black': '#2A2A2A',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
      spacing: {
        'section-gap': '8rem',
      },
    },
  },
  plugins: [],
}
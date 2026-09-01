/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'kajabi-teal': '#3A6278',
        'kajabi-gold': '#D6A151',
        'kajabi-beige': '#F8F8F6',
        'kajabi-sage': '#405B50',
      },
    },
  },
  plugins: [],
};

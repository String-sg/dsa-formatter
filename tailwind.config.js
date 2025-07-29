/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#75F8CC',
        secondary: '#C0F4FB',
        background: '#33373B',
      },
      fontFamily: {
        'title': ['Space Grotesk', 'sans-serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

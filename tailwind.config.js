/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hackathon-dark-purple': '#141434',
        'hackathon-purple': '3F0884',
      },
    },
  },
  plugins: [],
};

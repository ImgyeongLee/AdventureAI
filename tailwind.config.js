/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hackathon-dark-purple': '#230C40',
        'hackathon-purple': '#3F0884',
        'hackathon-gradient': '#641f99',
        'hackathon-dark-blue': '#141434',
        'hackathon-pink': '#F838B7',
        'hackathon-black': '#141414',
        'hackathon-yellow': '#FFDA7A',
        'hackathon-dark-gradient': '#362550',
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        'hackathon-row-2': '20% auto',
      },
    },
  },
  plugins: [],
};

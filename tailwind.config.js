/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'hackathon-dark-purple': '#141434',
        'hackathon-purple': '#3F0884',
        'hackathon-gradient': '#641f99',
        'hackathon-dark-blue': '#141434',
        'hackathon-pink': '#F838B7',
        'hackathon-black': '#141414',
        'hackathon-yellow': '#FFDA7A',
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        'hackathon-row-2': '15% auto',
      },
    },
  },
  plugins: [],
};

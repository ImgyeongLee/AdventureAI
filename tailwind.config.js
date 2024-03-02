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
        'hackathon-blue': '#4700A2',
        'hackathon-dev-card-white': '#D9D9D9',
        'hackathon-chatbox-background': "#121212"
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateRows: {
        'hackathon-row-2': '20% auto',
        'hackathon-form': '1fr 3fr 0.5fr',
        'hackathon-role-form': '1fr 3fr',
      },
      gridTemplateColumns: {
        half: '1fr 1fr',
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(to bottom, rgb(75, 75, 75) 0%, rgb(15, 15, 15) 100%)",
      },
    },
  },
  plugins: [],
};

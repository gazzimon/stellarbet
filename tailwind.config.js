/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0b0d',
        panel: '#141517',
        panel2: '#1a1c1e',
        line: '#27292b',
        accent: '#10b981',
        odd: '#f5d96a',
      },
    },
  },
  plugins: [],
};

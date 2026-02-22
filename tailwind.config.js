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
        bg: '#0d0f12',
        panel: '#14171b',
        panel2: '#1b1f24',
        line: '#2d343d',
        accent: '#24b36b',
        odd: '#f5d96a',
      },
    },
  },
  plugins: [],
};
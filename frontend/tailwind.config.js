/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'promptgen-deep-blue-gray': '#222c36',
        'promptgen-light-gray': '#e2e8f0',
        'promptgen-teal': '#20b2aa',
        'promptgen-green': '#38a169',
        'promptgen-white': '#f4f8fb',
        'promptgen-slate': '#5a6872',
      },
    },
  },
  plugins: [],
}

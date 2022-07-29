/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'm-1' : '36px',
        'm-sub-1': '20px',
        'm-sub-2': '18px',
        'm-p': '15px',
        'm-span': '10px',
        'm-form-label': '13px',
        'm-form-ph': '15px',
        'm-btn': '16px'
      },
      colors: {
        'dark-one': '#06283D',
        'dark-two': '#395b64',
        'light-one': '#d9d9d9'
      },
      backgroundColor: {
        'dark-one': '#06283D',
        'dark-two': '#395b64',
        'light-one': '#d9d9d9'
      }
    },
  },
  plugins: [],
}

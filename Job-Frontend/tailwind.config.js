/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    './app/**/*.{js,tsx,ts,jsx}',
    "./src/**/*.{js,jsx,ts,tsx}"
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

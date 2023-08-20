export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    '*.{html,js}'
  ],

  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-override')(),
  ],
}
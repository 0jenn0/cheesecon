/** @type {import('tailwindcss').Config} */
import pxToRem from 'tailwindcss-preset-px-to-rem';

const config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [pxToRem],
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};

export default config;

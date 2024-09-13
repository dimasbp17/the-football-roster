const withMT = require('@material-tailwind/react/utils/withMT');

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        navy: '#1F316F',
      },

      fontFamily: {
        lato: 'Lato, sans-serif',
      },

      cursor: {
        custom: 'url(/assets/images/ball.png), auto', // Tambahkan kursor kustom
      },
    },
  },
  plugins: [],
});
